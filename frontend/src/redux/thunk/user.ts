import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosBackend, axiosNext} from "../../utils/axios";
import {logoutAction} from "../slices/user";

// ----------------------------------------------------------------------

export type loginRequestArguments = {
    email: string;
    password: string;
}

export type signupRequestArguments = {
    email: string;
    password: string;
}

// ----------------------------------------------------------------------

export const loginRequest = createAsyncThunk('user/login',
    async (data: loginRequestArguments, {rejectWithValue}) => {
        try {
            const response = await axiosNext.post('api/user/login', data);
            const {user, access} = response.data;

            axiosBackend.defaults.headers.Authorization = `Bearer ${access}`;

            return {user};
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const signupRequest = createAsyncThunk('user/signup',
    async (data: signupRequestArguments, {rejectWithValue}) => {
        try {
            const response = await axiosNext.post('api/user/signup', data);
            const {user, access} = response.data;

            axiosBackend.defaults.headers.Authorization = `Bearer ${access}`;

            return {user};
        } catch (error) {
            return rejectWithValue(error);
        }

    }
);

export const logoutRequest = createAsyncThunk('user/logout',
    async (data, {rejectWithValue, dispatch}) => {
        try {
            await axiosNext.post('api/user/logout');

            axiosBackend.defaults.headers.Authorization = `Bearer`;

            dispatch(logoutAction());
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


