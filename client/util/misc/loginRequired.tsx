import * as React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Session, SessionContext } from "../session";

export const LoginRequired = (props: { children: JSX.Element }): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);

    React.useEffect(() => {
        if (!localStorage.getItem("token")) {
            nav(`/login?next=${encodeURIComponent(window.location.pathname)}`, { replace: true });
            session.notify('Please log in to access this page.', 'info');
        }
    });

    return session.loggedIn() ? props.children : <></>;
}