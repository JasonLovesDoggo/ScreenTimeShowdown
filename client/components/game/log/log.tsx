import * as React from "react";
import { default as axios } from "axios";
import { Box, Typography } from "@mui/material";
import { GameLogEntry } from "./logEntry";
import { Session, SessionContext } from "../../../util/session";
import { GroupLog } from "../../../util/models";
import Routes from "../../../util/routes/routes";

export const GameLog = (): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    const [logs, setLogs] = React.useState<Array<GroupLog>>([]);

    React.useEffect(() => {
        if (!session.user.groups) return;
        axios.get(`${Routes.BASEURL}/api/group/logs?id=${session.user.groups[0].id}`).then((res) => {
            setLogs(res.data.logs);
            console.log("Group log data:", res.data.logs);
        }).catch((err) => {
            session.notify('Error fetching group logs', 'error');
        });
    }, [session.user]);

    return logs.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.75em" }}>
            <Typography variant="h5">Game Log</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.75em" }}>
                {logs.map((log: GroupLog): JSX.Element => {
                    return <GameLogEntry logEntry={log} key={log.id} />;
                })}
            </Box>
        </Box>
    ) : <>
        <Typography variant="h5">Game Log</Typography>
        <Typography variant="body1">Nothing here yet.</Typography>
    </>;
}