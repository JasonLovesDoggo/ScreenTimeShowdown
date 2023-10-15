import * as React from "react";
import { default as axios } from "axios";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Alert, AlertColor, Autocomplete, Button, Snackbar, TextField, Typography } from "@mui/material";

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Session, SessionContext } from "../../util/session";
import Routes from "../../util/routes/routes";
import { ShowdownLayout } from "../layout/showdown";
import { SurvivorCard } from "./survivorCard";
import { GameLog } from "./log/log";
import { Group, User } from "../../util/models";

export const Game = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);

    const [group, setGroup] = React.useState<Group>({} as Group);
    const [survivors, setSurvivors] = React.useState<Array<User>>([]);
    const [losers, setLosers] = React.useState<Array<User>>([]);
    const [copyButtonText, setCopyButtonText] = React.useState("Copy Party Invite Link");

    React.useEffect(() => {
        document.title = "My Game | Screen Time Showdown";
    }, []);

    React.useEffect(() => {
        if (!session.user.groups || session.user.groups.length == 0) return;
        axios.get(`${Routes.BASEURL}/api/group/get?id=${session.user.groups[0].id}`).then((res: { data: Group }) => {
            setGroup(res.data);
            const survivorIDs = res.data.surviving.split(",");
            let tempSurvivors: Array<User> = [];
            let tempLosers: Array<User> = [];
            res.data.users.forEach((foundUser: User) => {
                let survived = false;
                survivorIDs.forEach((survivorID: string) => {
                    if (survivorID === foundUser.id) {
                        survived = true;
                    }
                });
                if (survived) {
                    tempSurvivors.push(foundUser);
                } else {
                    tempLosers.push(foundUser);
                }
            });
            setSurvivors(tempSurvivors);
            setLosers(tempLosers);
        }).catch((err) => {
            session.notify('Error fetching user group', 'error');
        });
    }, [session.user]);

    return (
        <ShowdownLayout>
            {!!session.user.groups && session.user.groups.length > 0 ? <div style={{
                backgroundImage: "url('/static/img/showdown-2.jpg')",
                backgroundColor: "#cdc8ff",
                paddingTop: "1em",
                paddingBottom: "1em",
            }}>
                <Box sx={{
                    backgroundColor: "#f1f1f1",
                    margin: "0em 1em 1em 1em",
                    padding: "1em",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "1em"
                }}>
                    <Typography variant="h3">Current Showdown</Typography>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="h5">Round end date:</Typography>
                        <Typography variant="h5">2023-10-22 23:59:59 (7 days left)</Typography>
                    </Box>
                </Box>

                <Box sx={{ backgroundColor: "#b0fbb0", margin: "1em", padding: "1em", borderRadius: "12px" }}>
                    <Typography variant="h5">Survivors:</Typography>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", }}>
                        {
                            survivors.map((survivor: User): JSX.Element => {
                                return <SurvivorCard name={survivor.username} key={survivor.id}></SurvivorCard>
                            })
                        }
                        {/* <SurvivorCard name="Foo Bar" />
                        <SurvivorCard name="Foo Bar" />
                        <SurvivorCard name="Foo Bar" />
                        <SurvivorCard name="Foo Bar" />
                        <SurvivorCard name="Foo Bar" />
                        <SurvivorCard name="Foo Bar" /> */}
                    </div>
                </Box>
                <Box sx={{ backgroundColor: "#ffb0b0", margin: "1em", padding: "1em", borderRadius: "12px" }}>
                    <Typography variant="h5">The Fallen:</Typography>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                        {losers.length > 0 ?
                            losers.map((loser: User): JSX.Element => {
                                return <SurvivorCard name={loser.username} key={loser.id} />
                            }) : <Typography variant="body1">None yet!</Typography>}
                    </div>
                </Box>
                <Box sx={{ backgroundColor: "lightgray", margin: "1em", padding: "1em", borderRadius: "12px" }}>
                    <GameLog />
                </Box>
            </div> :
                <Box sx={{
                    margin: "0em 1em 1em 1em",
                    padding: "1em",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "1em"
                }}>
                    <Typography variant="h4">No ongoing games so far.</Typography>
                    <Typography variant="body1">Head to <Link to="/party">My Party</Link> to create a party or click a join link from a friend.</Typography>
                </Box>}
        </ShowdownLayout>
    );
}