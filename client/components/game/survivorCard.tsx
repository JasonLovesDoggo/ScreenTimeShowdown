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
            {/* <Typography variant="h6">Wants to learn: <strong>Something</strong></Typography> */}
            {/* <Typography variant="body1">User biography: {mentorship.target.bio}</Typography> */}
            {/* <div style={{ display: "flex", flexDirection: "row", gap: "0.5em" }}>
                <Button variant="contained" sx={{ mt: "0.75rem" }} onClick={(ev) => {
                    ev.preventDefault();
                    console.log("A");
                }}>Accept and Begin Mentorship!</Button>
            </div> */}
            <Typography variant="body1">Longest record: {getRandomInt(9) + 1} days</Typography>
        </Box>
    );
}