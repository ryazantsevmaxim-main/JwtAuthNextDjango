import {NextApiRequest, NextApiResponse} from 'next';
import Cookies from "cookies";

// ----------------------------------------------------------------------

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;

    if (method !== 'POST') {
        res.status(404).end();
    }

    try {
        const cookies = new Cookies(req, res);

        cookies.set("accessToken", '', {maxAge: -1});
        cookies.set("refreshToken", '', {maxAge: -1});

        res.status(200).end();
    } catch (error) {
        res.status(500).end();
    }
}