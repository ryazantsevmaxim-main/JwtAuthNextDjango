import {NextApiRequest, NextApiResponse} from 'next';
import Cookies from "cookies";
import {axiosBackendWithoutUser} from "../../../utils/axios";
import {setAccessToken, setRefreshToken} from "../../../user/jwt";

// ----------------------------------------------------------------------

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;

    if (method !== 'POST') {
        res.status(404).end();
    }

    const data = req.body;

    if (data.email && data.password) {
        try {
            const response = await axiosBackendWithoutUser.post('api/user/login', data);
            const {access, refresh, user} = response.data;

            const cookies = new Cookies(req, res);

            setAccessToken({access, cookies});
            setRefreshToken({refresh, cookies});

            res.status(200).json({user, access});
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