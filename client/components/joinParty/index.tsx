import * as React from "react";
import { default as axios } from "axios";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Alert, AlertColor, Autocomplete, Button, ClickAwayListener, Snackbar, TextField, Tooltip, Typography } from "@mui/material";

import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { Session, SessionContext } from "../../util/session";
import Routes from "../../util/routes/routes";
import { ShowdownLayout } from "../layout/showdown";

export const JoinParty = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);
    const { partyID } = useParams();

    React.useEffect(() => {
        document.title = "Join Party | Screen Time Showdown";
    }, []);

    return (
        <ShowdownLayout>
            <div style={{ padding: "2em" }}>
                <div style={{ display: "flex", flexDirection: "column", marginBottom: "0.8em", gap: "0.8em" }}>
                    <Typography variant="h3">Join Party</Typography>
                    <Typography variant="body1">Are you sure you would like to join this party? ID: <code>{partyID}</code></Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: "0.5em" }}>
                        <Button variant="contained" color="success" onClick={(ev) => {
                            ev.preventDefault();
                            axios.post(`${Routes.BASEURL}/api/invite/accept`, {
                                id: partyID
                            }).then((res) => {
                                session.notify(`Successfully joined party ${partyID}!`, 'success');
                                nav('/party');
                            }).catch((err) => {
                                session.notify('Error accepting invite', 'error');
                            });
                        }}>Yes!</Button>
                        <Button variant="outlined" color="error" onClick={(ev) => {
                            ev.preventDefault();
                            nav('/party');
                        }}>No</Button>
                    </Box>
                </div>
            </div>
        </ShowdownLayout>
    );
}