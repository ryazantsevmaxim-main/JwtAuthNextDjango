import {NextPage} from "next";
import Layout from "../layouts/Layout";

// ----------------------------------------------------------------------

const ProductPage: NextPage = ({}) => {
    return (
        <>
            <h1>Product Page</h1>
        </>
    );
};

// @ts-ignore
ProductPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default ProductPage;