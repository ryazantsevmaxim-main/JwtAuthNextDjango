import {axiosBackend, axiosBackendWithoutUser} from "../utils/axios";
import {setUser} from "../redux/slices/user";
import {AppDispatch} from "../redux/store";

// ----------------------------------------------------------------------

export const verifyAccessTokenRequest =
    async ({accessToken, dispatch}: { accessToken: string, dispatch: AppDispatch }) => {

        // We have to use axiosBackendWithoutUser
        // because axiosBackend has an event handler
        // that will start 'api/user/refresh'

        axiosBackendWithoutUser.defaults.headers.Authorization = `Bearer ${accessToken}`;

        const response = await axiosBackendWithoutUser.get('api/user/token/verify');
        const {user} = response.data;

        delete axiosBackendWithoutUser.defaults.headers.Authorization;

        dispatch(setUser({user}));
    }

// ----------------------------------------------------------------------

export const refreshAccessTokenRequest =
    async ({refreshToken, cookies}: { refreshToken: string | undefined, cookies: any }) => {

        const data = {refresh: refreshToken};

        const response = await axiosBackend.post('api/user/token/refresh', data);
        const {access, refresh} = response.data;

        setAccessToken({access, cookies});
        setRefreshToken({refresh, cookies});

        return access;
    }

// ----------------------------------------------------------------------

export const setAccessToken = ({access, cookies}: { access: string, cookies: any }) => {
    if (access && cookies) {
        // @ts-ignore
        const maxAgeAccess = process.env.ACCESS_TOKEN_LIFETIME_IN_MINUTES * 1000 * 60; // Time in minutes

        cookies.set("accessToken", access, {maxAge: maxAgeAccess});
    }
}

// ----------------------------------------------------------------------

export const setRefreshToken = ({refresh, cookies}: { refresh: string, cookies: any }) => {
    if (refresh && cookies) {
        // @ts-ignore
        const maxAgeRefresh = process.env.REFRESH_TOKEN_LIFETIME_IN_DAYS * 1000 * 60 * 60 * 24; // Time in days

        cookies.set("refreshToken", refresh, {maxAge: maxAgeRefresh});
    }
}