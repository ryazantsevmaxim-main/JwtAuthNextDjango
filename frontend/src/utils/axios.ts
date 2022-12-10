import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

// ----------------------------------------------------------------------

// Next.js
export const axiosNext = axios.create({baseURL: '/'});

axiosNext.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

// ----------------------------------------------------------------------

// Backend without User
export const axiosBackendWithoutUser = axios.create({
    baseURL: process.env.BACKEND_API_KEY || '',
});

// ----------------------------------------------------------------------

// Backend with User
export const axiosBackend = axios.create({
    baseURL: process.env.BACKEND_API_KEY || '',
    headers: {
        Authorization: `Bearer`
    },
});


// If request was failed with 401, trying to refresh the AccessToken
createAuthRefreshInterceptor(axiosBackend, (failedRequest =>
    axiosNext.get('api/user/refresh').then(response => {
            const {accessToken} = response.data;
            const bearer = `Bearer ${accessToken}`;

            // Set auth headers
            axiosBackend.defaults.headers.Authorization = bearer;
            failedRequest.response.config.headers.Authorization = bearer;

            return Promise.resolve();
        }
    ))
);

