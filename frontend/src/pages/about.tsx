import {NextPage} from "next";
import Layout from "../layouts/Layout";

// ----------------------------------------------------------------------

const AboutPage: NextPage = ({}) => {
    return (
        <>
            <h1>About Page</h1>
        </>
    );
};

// @ts-ignore
AboutPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default AboutPage;