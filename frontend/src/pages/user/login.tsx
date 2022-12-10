import {NextPage} from "next";
import {Stack} from "@mui/material";
import LoginForm from "../../user/LoginForm";
import Link from "next/link";
import {PATH_USER} from "../../routes/paths";

// ----------------------------------------------------------------------

const LoginPage: NextPage = ({}) => {

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{height: '100vh'}}
        >
            <LoginForm/>

            <Link href={PATH_USER.signup}>Sign up</Link>
        </Stack>
    );
};

export default LoginPage;