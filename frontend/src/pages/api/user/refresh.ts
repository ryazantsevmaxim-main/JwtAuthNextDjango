import {NextApiRequest, NextApiResponse} from 'next';
import Cookies from "cookies";
import {refreshAccessTokenRequest} from "../../../user/jwt";

// ----------------------------------------------------------------------

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;

    if (method !== 'GET') {
        res.status(404).end();
    }

    const cookies = new Cookies(req, res);
    const refreshToken = cookies.get("refreshToken");

    if (refreshToken) {
        try {
            const accessToken = await refreshAccessTokenRequest({refreshToken, cookies});

            res.status(200).json({accessToken});
        } catch (error) {
            // @ts-ignore
            const {response} = error;

            if (response) {
                const {status, data} = response;
                res.status(status).json(data);
            }

            res.status(500).end();
        }
    }

    res.status(400).end();
}