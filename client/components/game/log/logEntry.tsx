import * as React from "react";
import { Box } from "@mui/material";
import { GroupLog } from "../../../util/models";

export const GameLogEntry = ({ logEntry }: { logEntry: GroupLog }): JSX.Element => {
    return (
        <Box sx={{ borderRadius: "10px", backgroundColor: "white", padding: "5px" }}>
            {logEntry.content}
        </Box>
    );
}