import * as React from "react";
import { default as axios } from "axios";

import Box from '@mui/material/Box';
import { Button, Typography } from "@mui/material";

import { NavigateFunction, useNavigate } from "react-router-dom";
import { Session, SessionContext } from "../../util/session";
import Routes from "../../util/routes/routes";
import { ShowdownLayout } from "../layout/showdown";
import { TransactionCard } from "./transaction";
import { Transaction, User } from "../../util/models";

export const Payouts = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);

    React.useEffect(() => {
        document.title = "Profile | Screen Time Showdown";
    }, []);

    return !!session.user.transactions ? (
        <ShowdownLayout>
            <div style={{ display: "flex", flexDirection: "column", padding: "2em", gap: "1em", alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "0.8em", width: "100%" }}>
                    <Typography variant="h3">User Profile</Typography>
                    <Button variant="outlined" onClick={(ev) => {
                        ev.preventDefault();
                        window.location.href = ('https://api.screentimeshowdown.tech/oauth/authorize');
                    }}>Login with Instagram OAuth</Button>
                </div>

                <Box sx={{ backgroundColor: "lightgray", padding: "1em", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "0.5em", alignItems: "flex-start" }}>
                    <Typography variant="h4">Account Balance:</Typography>
                    <Typography variant="h5">You currently have ${session.user.money} worth of funds.</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: "1em" }}>
                        <Button variant="contained" onClick={(ev) => {
                            ev.preventDefault();
                            axios.post(`${Routes.BASEURL}/api/account/payout`, {
                                amount: session.user.money
                            }).then((res) => {
                                session.notify('Successfully cashed out!', 'success');
                                axios.get(`${Routes.BASEURL}/api/account/info`).then((res) => {
                                    session.setUser(res.data);
                                }).catch((err) => {
                                    session.notify("Error fetching user.", 'error');
                                    console.log("Error fetching user:", err);
                                });
                            }).catch((err) => {
                                session.notify('Error occurred while cashing out', 'error');
                                console.log("Error cashing out:", err);
                            })
                        }}>Cash Out</Button>
                        <Button variant="contained" onClick={(ev) => {
                            ev.preventDefault();
                            axios.post(`${Routes.BASEURL}/api/account/topup`, {
                                amount: 5
                            }).then((res) => {
                                session.notify('Successfully added $5 to your balance!', 'success');
                                axios.get(`${Routes.BASEURL}/api/account/info`).then((res2: { data: User }) => {
                                    session.setUser(res2.data);
                                    window.location.href = (res.data.redirect);
                                }).catch((err) => {
                                    session.notify("Error fetching user.", 'error');
                                    console.log("Error fetching user:", err);
                                });
                            }).catch((err) => {
                                session.notify('Error occurred in topping up balance', 'error');
                                console.log("Error topping up:", err);
                            });
                        }}>Top-Up $5</Button>
                    </Box>
                </Box>
                <Box sx={{ backgroundColor: "lightgray", padding: "1em", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "0.5em", alignItems: "flex-start" }}>
                    <Typography variant="h4">Transaction History</Typography>
                    {session.user.transactions.length > 0 ? session.user.transactions.map((transaction: Transaction): JSX.Element => {
                        return <TransactionCard transaction={transaction} key={transaction.id} />;
                    }) : <Typography variant="h6">Nothing here yet.</Typography>}
                </Box>
            </div>
        </ShowdownLayout>
    ) : <></>;
}
