import * as React from "react";
import { default as axios } from "axios";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Alert, AlertColor, Autocomplete, Button, ClickAwayListener, Snackbar, TextField, Tooltip, Typography } from "@mui/material";

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Session, SessionContext } from "../../util/session";
import Routes from "../../util/routes/routes";
import { ShowdownLayout } from "../layout/showdown";
import { PartyMemberCard } from "./memberCard";
import copyContent from "../../util/misc/clipboard";
import { Group, User } from "../../util/models";

export const Party = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);

    const [copyTooltipOpen, setCopyTooltipOpen] = React.useState(false);
    const [group, setGroup] = React.useState<Group>({} as Group);

    React.useEffect(() => {
        document.title = "My Party | Screen Time Showdown";
    }, []);

    React.useEffect(() => {
        if (!session.user.groups || session.user.groups.length == 0) return;
        axios.get(`${Routes.BASEURL}/api/group/get?id=${session.user.groups[0].id}`).then((res) => {
            setGroup(res.data);
        }).catch((err) => {
            session.notify('Error fetching user group', 'error');
        });
    }, [session.user]);

    console.log("Group:", session.user.groups);

    return ("groups" in session.user && !!session.user.groups) ? (
        <ShowdownLayout>
            <div style={{ padding: "2em" }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "0.8em", flexWrap: "wrap" }}>
                    <Typography variant="h3">My Party</Typography>
                    {session.user.groups.length > 0 ? <ClickAwayListener onClickAway={() => setCopyTooltipOpen(false)}>
                        <Tooltip
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onClose={() => setCopyTooltipOpen(false)}
                            open={copyTooltipOpen}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title="Successfully Copied!"
                        >
                            <Button variant="outlined" onClick={(ev) => {
                                ev.preventDefault();
                                copyContent(`${window.location.protocol}//${window.location.host}/joinParty/${session.user.groups[0].id}`);
                                setCopyTooltipOpen(true);
                            }}>Copy Party Invite Link</Button>
                        </Tooltip>
                    </ClickAwayListener> : <></>}
                </div>


                {session.user.groups.length > 0 ?
                    <>
                        <Typography variant="h5">You will be showdowning with:</Typography>
                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                            {"id" in group ? group.users.map((user: User): JSX.Element => {
                                return <PartyMemberCard name={user.username} key={user.id} />;
                            }) : <></>}
                        </div>
                    </> :
                    <>
                        <Typography variant="h5" sx={{ mb: "0.5em" }}>No parties yet. You can also click on an invite link from a friend to join their party.</Typography>
                        <Button variant="contained" color="success" onClick={(ev) => {
                            ev.preventDefault();
                            axios.put(`${Routes.BASEURL}/api/group/create`, {
                                name: "My Party",
                                interval: 7,
                                bet: 5,
                            }).then((res) => {
                                session.notify("Successfully created party!", "success");
                                axios.get(`${Routes.BASEURL}/api/account/info`).then((res) => {
                                    session.setUser(res.data);
                                }).catch((err) => {
                                    session.notify("Error fetching user.", 'error');
                                    console.log("Error fetching user:", err);
                                });
                            }).catch((err) => {
                                session.notify("Error starting party", 'error');
                                console.log("Error starting party:", err);
                            });
                        }}>Create a new party</Button>
                    </>}
            </div>
        </ShowdownLayout>
    ) : <></>;
}