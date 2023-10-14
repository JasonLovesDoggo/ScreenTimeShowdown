import * as React from "react";
import { default as axios } from 'axios';

import Routes from '../../routes/routes';
import { Session, SessionContext } from '../../session';

import jwt_decode from "jwt-decode";
import { User } from "../../models";

export const login = (username: string, password: string): void => {
    const session: Session = React.useContext(SessionContext);
    axios.post(`${Routes.AUTH.LOGIN}`, {
        username: username,
        password: password
    }).then((res) => {
        console.log("Token:", res.data);
        session.setToken(res.data.token);

        const decodedUser: User = jwt_decode(res.data.token);
        session.setUser(decodedUser);
    }).catch((err) => {
        console.error("Error occurred while logging in:", err);
    });
}