import {Button} from "@mui/material";
import useAuth from "../../user/useAuth";
import {NextPage} from "next";
import Layout from "../../layouts/Layout";
import useEffectUpdate from "../../hooks/useEffectUpdate";
import {useSnackbar} from "notistack";

// ----------------------------------------------------------------------

const UserPage: NextPage = ({}) => {

    const {user, logout, request: {logout: {status, error}}} = useAuth();

    const {enqueueSnackbar} = useSnackbar();

    useEffectUpdate(() => {
        if (status === 'failed' && error) {
            enqueueSnackbar(error, {variant: "error"});
        }
    }, [error]);

    return (
        <>
            <h1>{user?.email}</h1>
            <Button onClick={logout}>
                logout
            </Button>
        </>
    );
};

// ----------------------------------------------------------------------

// @ts-ignore
UserPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default UserPage;