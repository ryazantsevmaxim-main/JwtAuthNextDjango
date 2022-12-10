import {useTypeDispatch, useTypedSelector} from "../redux/store";
import {
    loginRequest,
    loginRequestArguments,
    logoutRequest,
    signupRequest,
    signupRequestArguments
} from "../redux/thunk/user";

// ----------------------------------------------------------------------

const useAuth = () => {
    const {isAuth, user, request} = useTypedSelector(state => state.user);
    const dispatch = useTypeDispatch();

    // @ts-ignore
    const signup = ({email, password}: signupRequestArguments) => dispatch(signupRequest({email, password}));

    // @ts-ignore
    const login = ({email, password}: loginRequestArguments) => dispatch(loginRequest({email, password}));

    // @ts-ignore
    const logout = () => dispatch(logoutRequest());

    return {isAuth, user, request, signup, login, logout};
};

export default useAuth;