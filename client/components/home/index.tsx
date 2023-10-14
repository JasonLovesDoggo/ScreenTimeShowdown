import * as React from "react";
import { default as axios } from "axios";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Typography } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export const Home = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();

    React.useEffect(() => {
        document.title = "About Us | Screen Time Showdown";
    }, []);

    return (
        <div style={{ width: "100%", height: "100%"/*, backgroundImage: "url('/static/img/social-media-1-blurred.jpg')"*/ }}>
            {/* <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ padding: "3em", width: "50%" }}>
                    <h2 className="display-4">Meet</h2>
                    <h1 className="display-1"><strong>Screen Time Showdown</strong></h1>
                    <h4>Be the last phone standing</h4>
                </Box>
                <Box sx={{ width: "50%" }}>
                    <img src='/static/img/social-media-1.jpeg' width="100%" height="56%"></img>
                </Box> */}
            {/* <div
                    style={{
                        margin: "1.5em",
                        paddingLeft: "1em",
                        paddingTop: "1em",
                        backgroundImage: "url('/static/img/social-media-1.jpeg')",
                        width: "957px",
                        height: "536px",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "25px 25px 25px 25px",
                        boxShadow: "3px 3px 3px 0"
                    }}
                >
                    <div
                        id="intro-content"
                        style={{
                            position: "absolute",
                            bottom: "264px",
                            right: "264px",
                            width: "100%"
                        }}
                    >
                        <Box sx={{ padding: "3em", width: "50%" }}>
                            <h2 className="display-4">Meet</h2>
                            <h1 className="display-1"><strong>Screen Time Showdown</strong></h1>
                            <h4>Be the last phone standing</h4>
                        </Box>
                        <div style={{ display: "flex", flexDirection: "row" /*, alignItems: "center", justifyContent: "center" }}>
                            <Button
                                variant="contained"
                                sx={{ marginTop: "2em", backgroundColor: "purple" }}
                                onClick={() => nav("/register")}
                            >Get started now!</Button>
                        </div>
                    </div>
                </div>
            </Box> */}
            <Box sx={{ padding: "3em", margin: "2em", width: "65%", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <h2 className="display-4">Meet</h2>
                <h1 className="display-1"><strong>Screen Time Showdown <PhonelinkLockIcon fontSize='large' /></strong></h1>
                <h3>Be the last phone standing</h3>
            </Box>
            {/* <Box sx={{ flexGrow: 1, margin: "1.5em" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item sx={{ padding: "2em", borderRadius: "25px" }}>
                            <Typography variant="h2" id="about">
                                What are we?
                            </Typography>
                            <Typography variant="h6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra vitae congue eu consequat. Lorem mollis aliquam ut porttitor leo. Scelerisque fermentum dui faucibus in. Senectus et netus et malesuada fames ac turpis. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Sed vulputate odio ut enim. Et malesuada fames ac turpis egestas integer eget. Est sit amet facilisis magna etiam tempor. Massa massa ultricies mi quis hendrerit dolor magna eget est. Donec et odio pellentesque diam. Nec feugiat nisl pretium fusce id.
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box> */}
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "right", justifyContent: "right" }}>
                <Box sx={{ padding: "3em", margin: "2em", width: "80%", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                    <Typography variant="h2" id="about">
                        What are we?
                    </Typography>
                    <Typography variant="h6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra vitae congue eu consequat. Lorem mollis aliquam ut porttitor leo. Scelerisque fermentum dui faucibus in. Senectus et netus et malesuada fames ac turpis. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Sed vulputate odio ut enim. Et malesuada fames ac turpis egestas integer eget. Est sit amet facilisis magna etiam tempor. Massa massa ultricies mi quis hendrerit dolor magna eget est. Donec et odio pellentesque diam. Nec feugiat nisl pretium fusce id.
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}