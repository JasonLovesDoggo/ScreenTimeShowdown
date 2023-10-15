import { Box, Button, Typography } from "@mui/material";
import * as React from "react";

export const SurvivorCard = ({ name }: { name: string }): JSX.Element => {
    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    return (
        <Box sx={{
            backgroundColor: "#eeeeee",
            margin: "1em",
            padding: "1em",
            maxWidth: "fit-content",
            boxShadow: "2.5px 2.5px 2.5px",
            borderRadius: "10px"
        }}>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="body1">Longest record: {name.length} days</Typography>
        </Box>
    );
}