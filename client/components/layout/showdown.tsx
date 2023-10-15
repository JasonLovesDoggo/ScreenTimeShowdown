import * as React from "react";
import { Box, Grid } from "@mui/material";
import SideNav from "./sidenav";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const ShowdownLayout = ({ children }: { children: JSX.Element }): JSX.Element => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box sx={{ flexGrow: 1, padding: "1em" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <Item sx={{ padding: "2em" }}>
                        <SideNav />
                    </Item>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Item>
                        {children}
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}