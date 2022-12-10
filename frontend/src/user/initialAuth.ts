import {AppDispatch} from "../redux/store";
import {logoutAction} from "../redux/slices/user";
import {refreshAccessTokenRequest, verifyAccessTokenRequest} from "./jwt";
import {IncomingMessage, ServerResponse} from "http";
import PATH_MAIN, {PATH_USER} from "../routes/paths";

// ----------------------------------------------------------------------

export const authentication = async ({cookies, dispatch}: { cookies: any, dispatch: AppDispatch }) => {

    const accessToken = cookies.get("accessToken");
    const refreshToken = cookies.get("refreshToken");

    if (!refreshToken) return;

    try {
        await verifyAccessTokenRequest({accessToken, dispatch});

        return accessToken;
    } catch (error) {
        // @ts-ignore
        if (error?.response?.status === 401) {
            try {
                const accessToken = await refreshAccessTokenRequest({refreshToken, cookies});

                await verifyAccessTokenRequest({accessToken, dispatch});

                return accessToken;
            } catch (error) {
                // If not auth, delete cookies and logout
                cookies.set("accessToken", '', {maxAge: -1});
                cookies.set("refreshToken", '', {maxAge: -1});

                dispatch(logoutAction());
            }
        }
    }
}

// ----------------------------------------------------------------------

export const initialAuthGuard =
    ({req, res, isAuth}: { req: IncomingMessage, res: ServerResponse, isAuth: boolean }) => {

        if (isAuth) {
            if (req?.url === PATH_USER.login || req?.url === PATH_USER.signup) {
                res.writeHead(307, {Location: PATH_MAIN}).end();
            }

        } else {
            if (req?.url !== PATH_USER.login && req?.url !== PATH_USER.signup) {
                res.writeHead(307, {Location: PATH_USER.login}).end();
            }
        }
    }