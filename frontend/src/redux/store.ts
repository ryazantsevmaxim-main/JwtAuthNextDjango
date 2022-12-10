import {Action, AnyAction, configureStore, getDefaultMiddleware, ThunkAction} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import rootReducer from './rootReducer'

// ----------------------------------------------------------------------

const isDevelopment = process.env.NODE_ENV === "development"

// ----------------------------------------------------------------------

// @ts-ignore
const reducer = (state, action: AnyAction) => {
    if (action.type === HYDRATE) return {...state, ...action.payload};

    return rootReducer(state, action);
};

// ----------------------------------------------------------------------

const makeStore = () => configureStore({
    reducer,
    devTools: isDevelopment,
    middleware: [...getDefaultMiddleware({
        thunk: true,
        immutableCheck: isDevelopment,
        serializableCheck: isDevelopment
    })]
});

// ----------------------------------------------------------------------

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"]
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

// ----------------------------------------------------------------------

export const wrapper = createWrapper<AppStore>(makeStore);
export const useTypeDispatch: () => AppDispatch = useDispatch
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

