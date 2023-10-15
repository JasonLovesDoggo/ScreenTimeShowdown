import * as React from "react";
import { Box, Typography } from "@mui/material";
import { GroupLog } from "../../../util/models";

export const GameLogEntry = ({ logEntry }: { logEntry: GroupLog }): JSX.Element => {
    return (
        <Box sx={{ borderRadius: "10px", backgroundColor: "white", padding: "5px" }}>
            <Typography variant="body1" fontWeight='400'>{logEntry.title}:</Typography>
            <Typography variant="body1">{logEntry.content}</Typography>
        </Box>
    );
}