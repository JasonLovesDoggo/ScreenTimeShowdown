import * as React from "react";
import { default as axios } from "axios";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
// import { login } from "../../../util/services/auth"

import { useForm, SubmitHandler } from "react-hook-form";

import BadgeIcon from '@mui/icons-material/Badge';
import LockIcon from '@mui/icons-material/Lock';
import { Session, SessionContext } from "../../../util/session";
import Routes from "../../../util/routes/routes";
import { User } from "../../../util/models";
import { useQuery } from '../../../util/misc/query';

import jwt_decode from "jwt-decode";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

type LoginInputs = {
    username: string;
    password: string;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export const Login = (): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    const nav: NavigateFunction = useNavigate();
    const query: URLSearchParams = useQuery();
    const next: string | null = query.get("next");

    React.useEffect(() => {
        if (session.loggedIn()) nav("/party");
        else document.title = "Login | Screen Time Showdown";
    }, []);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginInputs>()
    const onSubmit: SubmitHandler<LoginInputs> = (data: LoginInputs) => {
        login(data.username, data.password);
    }

    const login = (username: string, password: string): void => {
        axios.post(`${Routes.AUTH.LOGIN}`, {
            username: username,
            password: password
        }).then((res) => {
            console.log("Token:", res.data);
            localStorage.setItem("token", res.data.token);
            session.setToken(res.data.token);

            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

            axios.get(`${Routes.BASEURL}/api/account/info`).then((res) => {
                session.setUser(res.data);
                session.notify("Successfully logged in!", "success");
                nav(next ? next : "/party");
            }).catch((err) => {
                session.notify("Error fetching user.", 'error');
                console.log("Error fetching user:", err);
            });
        }).catch((err) => {
            session.notify(`Error: ${err.response.data.error}`, "error");
        });
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, padding: "1em" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div style={{ padding: "0.5em", backgroundImage: "url('/static/img/learning-1.jpg')", height: "fit-content" }}>
                                    <Typography variant="h5" textAlign="left">
                                        Welcome back!
                                    </Typography>
                                    <Typography fontSize="15px">Don't have an account yet? <Link to={next ? `/register?next=${encodeURIComponent(next)}` : '/register'}>Create one here!</Link></Typography>
                                    <Box
                                        flexDirection="column"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        marginTop="1em"
                                    >
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "baseline" }}>
                                            <TextField
                                                required
                                                id="username"
                                                label="Username"
                                                sx={{ backgroundColor: "white" }}
                                                {...register("username")}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <BadgeIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <TextField
                                                id="password"
                                                label="Password"
                                                type="password"
                                                autoComplete="current-password"
                                                sx={{ backgroundColor: "white" }}
                                                {...register("password")}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LockIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <Button
                                                variant="outlined"
                                                type="submit"
                                                style={{ width: "100px" }}
                                                sx={{ backgroundColor: "white" }}
                                            >Login!</Button>
                                        </div>
                                    </Box>
                                </div>
                            </form>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}