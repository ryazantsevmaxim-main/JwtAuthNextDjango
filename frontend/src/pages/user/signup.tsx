import {NextPage} from "next";
import {Stack} from "@mui/material";
import SignupForm from "../../user/SignupForm";
import {PATH_USER} from "../../routes/paths";
import Link from "next/link";

// ----------------------------------------------------------------------

const Signup: NextPage = ({}) => {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{height: '100vh'}}
        >
            <SignupForm />

            <Link href={PATH_USER.login}>Log in</Link>
        </Stack>
    );
};

export default Signup;