import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { Session, SessionContext } from "../../util/session";

import MenuBookIcon from '@mui/icons-material/MenuBook';
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock';
import { User } from '../../util/models';
import { useQuery } from '../../util/misc/query';

export default function ButtonAppBar() {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);
    const query: URLSearchParams = useQuery();
    const next: string | null = query.get("next");

    return (
        <Box sx={{ flexGrow: 1, display: "flex" }}>
            <AppBar position="static" sx={{ backgroundColor: "purple" }}>
                <Toolbar disableGutters>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 1.5, ml: 1.5, paddingBottom: "15px" }}
                    >
                        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                            <img src="/static/img/logo-1.png" width="30px" />
                        </Link>
                    </IconButton>

                    <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "row", gap: "1em" }}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <Link to="/" style={{ textDecoration: "none", color: "yellow" }}>Screen Time Showdown</Link>
                            </Typography>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <a href="/#about" style={{ textDecoration: "none", color: "white" }}>About</a>
                            </Typography>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <Link to="/party" style={{ textDecoration: "none", color: "white" }}>Showdown</Link>
                            </Typography>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", gap: "1em", marginRight: "1.5em" }}>
                            {!!session.token ?
                                <>
                                    <Button color="inherit" onClick={() => {
                                        localStorage.removeItem("token"); session.setToken(""); session.setUser({} as User);
                                        nav("/login");
                                    }}>Hello, {session.user.username}!</Button>
                                </> :
                                <>
                                    <Button color="inherit" onClick={() => nav(next ? `/login?next=${encodeURIComponent(next)}` : "/login")}>Login</Button>
                                    <Button color="inherit" onClick={() => nav(next ? `/register?next=${encodeURIComponent(next)}` : "/register")}>Register</Button>
                                </>}
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}