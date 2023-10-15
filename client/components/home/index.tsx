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
        <div style={{ width: "100%", height: "100%" }}>
            <Box sx={{ padding: "3em", margin: "2em", width: "65%", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <h2 className="display-4">Meet</h2>
                <h1 className="display-1"><strong>Screen Time Showdown <img src="/static/img/logo-1.png" width="100px" /></strong></h1>
                <h3>Be the last phone standing</h3>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "right", justifyContent: "right" }}>
                <Box sx={{ padding: "3em", margin: "2em", width: "80%", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                    <Typography variant="h2" id="about">
                        What are we?
                    </Typography>
                    <Typography variant="h6">
                        We recognize that social media addiction is a very real issue among today's youth. However, no steps are taken to curb these addictions as it is a painful and unrewarding process. We set out to fix this by turning the act of quitting social media into a fun group activity with a touch of monetary incentives. 😉
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}