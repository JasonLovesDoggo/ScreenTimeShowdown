import { Box, Button, Typography } from "@mui/material";
import * as React from "react";

export const PartyMemberCard = ({ name }: { name: string }): JSX.Element => {
    return (
        <Box sx={{
            backgroundColor: "#fffbb8",
            margin: "1em",
            padding: "1em",
            maxWidth: "fit-content",
            boxShadow: "2.5px 2.5px 2.5px"
        }}>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="body1">Has deposited $5</Typography>
            <div style={{ display: "flex", flexDirection: "row", gap: "0.5em" }}>
                <Button
                    variant="contained"
                    color="warning"
                    sx={{ mt: "0.75rem" }}
                    onClick={(ev) => {
                        ev.preventDefault();
                        console.log("B");
                    }}>Remove from Party</Button>
            </div>
        </Box>
    );
}