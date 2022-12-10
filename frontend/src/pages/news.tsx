import {NextPage} from "next";
import Layout from "../layouts/Layout";

// ----------------------------------------------------------------------

const NewsPage: NextPage = ({}) => {
    return (
        <>
            <h1>News Page</h1>
        </>
    );
};

// @ts-ignore
NewsPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default NewsPage;