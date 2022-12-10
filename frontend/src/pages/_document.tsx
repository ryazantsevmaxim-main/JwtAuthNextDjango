import {Head, Html, Main, NextScript} from 'next/document'

// ----------------------------------------------------------------------

const Document = () => {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" type="image/x-icon" href="/favicon.png" />
                <title>Next.js JWT Auth</title>
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
}

export default Document;

