import {FC, ReactNode, useEffect} from "react";
import useAuth from "./useAuth";
import {useRouter} from "next/router";
import PATH_MAIN, {PATH_USER} from "../routes/paths";

// ----------------------------------------------------------------------

interface AuthGuardProps {
    children: ReactNode;
}

// ----------------------------------------------------------------------

const AuthGuard: FC<AuthGuardProps> = ({children}) => {
    const {user, isAuth} = useAuth();
    const {replace, pathname} = useRouter();

    useEffect(() => {

        if (isAuth && user !== null && (pathname === PATH_USER.login || pathname === PATH_USER.signup)) {
            replace(PATH_MAIN);
        }

        if ((!isAuth || user === null) && (pathname !== PATH_USER.login && pathname !== PATH_USER.signup)) {
            replace(PATH_USER.login);
        }

    }, [user, isAuth, pathname])

    return <>{children}</>;
};

export default AuthGuard;