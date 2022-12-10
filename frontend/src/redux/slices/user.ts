import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginRequest, logoutRequest, signupRequest} from "../thunk/user";
import {Request} from "./types";

// ----------------------------------------------------------------------

type User = {
    email: string;
}

type SignupRequestValidation = {
    emailErrors?: string[];
    passwordErrors?: string[];
}

type UserState = {
    isAuth: boolean;
    user: null | User;
    request: {
        login: Request;
        signup: SignupRequestValidation & Request;
        logout: Request;
    }
};

const initialState: UserState = {
    isAuth: false,
    user: null,
    request: {
        login: {
            status: 'idle',
            error: null
        },
        signup: {
            status: 'idle',
            error: null
        },
        logout: {
            status: 'idle',
            error: null
        }
    }
};

// ----------------------------------------------------------------------

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<{ user: User }>) => {
            state.isAuth = true;
            state.user = action.payload.user;
        },
        logoutAction: (state: UserState) => {
            state.isAuth = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        // Log in
        builder.addCase(loginRequest.pending, (state: UserState) => {
            state.request.login.status = 'pending';
            state.request.login.error = null;
        })
        builder.addCase(loginRequest.fulfilled, (state: UserState, action: PayloadAction<{ user: User }>) => {
            state.request.login.status = 'succeeded';
            state.isAuth = true;
            state.user = action.payload.user;
        })
        builder.addCase(loginRequest.rejected, (state: UserState, action) => {
            state.request.login.status = 'failed';
            // @ts-ignore
            const {detail} = action.payload;
            if (detail) {
                state.request.login.error = detail;
            } else {
                // @ts-ignore
                state.request.login.error = action.payload;
            }
        })

        // Sign in
        builder.addCase(signupRequest.pending, (state: UserState) => {
            state.request.signup.status = 'pending';
            state.request.signup.error = null;
            delete state.request.signup.emailErrors;
            delete state.request.signup.passwordErrors;
        })
        builder.addCase(signupRequest.fulfilled, (state: UserState, action: PayloadAction<{ user: User }>) => {
            state.request.signup.status = 'succeeded';
            state.isAuth = true;
            state.user = action.payload.user;
        })
        builder.addCase(signupRequest.rejected, (state: UserState, action) => {
            state.request.signup.status = 'failed';

            // @ts-ignore
            const {email, password} = action.payload;

            if (password || email) {
                state.request.signup.passwordErrors = password;
                state.request.signup.emailErrors = email;
            } else {
                // @ts-ignore
                state.request.signup.error = action.payload;
            }
        })

        // Log out
        builder.addCase(logoutRequest.pending, (state: UserState) => {
            state.request.logout.status = 'pending';
            state.request.logout.error = null;
        })
        builder.addCase(logoutRequest.fulfilled, (state: UserState) => {
            state.request.logout.status = 'succeeded';
        })
        builder.addCase(logoutRequest.rejected, (state: UserState, action) => {
            state.request.logout.status = 'failed';
            // @ts-ignore
            state.request.logout.error = action.payload;
        })
    }
});

export const {
    logoutAction,
    setUser,
} = userSlice.actions;

export default userSlice.reducer;
