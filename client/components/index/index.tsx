import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../home";
import ButtonAppBar from "./navbar";
import { Alert, Snackbar, ThemeProvider } from "@mui/material";
import { textTheme } from "../../util/misc/theme";
import { Register } from "../auth/register";
import { Login } from "../auth/login";
import { Session, SessionContext, SessionProvider } from "../../util/session";
import { LoginRequired } from "../../util/misc/loginRequired";
import { Party } from "../party";
import { Game } from "../game";
import { Payouts } from "../profile";
import { JoinParty } from "../joinParty";

const _App = (): React.JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        session.setMessage("");
    };
    return (
        <ThemeProvider theme={textTheme}>
            <ButtonAppBar />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/party" element={<LoginRequired><Party /></LoginRequired>} />
                <Route path="/game" element={<LoginRequired><Game /></LoginRequired>} />
                <Route path="/payouts" element={<LoginRequired><Payouts /></LoginRequired>} />
                <Route path="/joinParty/:partyID" element={
                    <LoginRequired>
                        <JoinParty />
                    </LoginRequired>
                } />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Snackbar open={!!session.message} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleClose} severity={session.type} sx={{ mt: "1.5em", width: '100%' }}>{session.message}</Alert>
            </Snackbar>
        </ThemeProvider>
    );
}

const App = (): React.JSX.Element => {
    return (
        <SessionProvider>
            <BrowserRouter>
                <_App />
            </BrowserRouter>
        </SessionProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
