export type StatusRequest = 'idle' | 'pending' | 'succeeded' | 'failed';

export type ErrorRequest = null | string | undefined;

// ----------------------------------------------------------------------

export type Request = {
    status: StatusRequest;
    error: ErrorRequest;
}