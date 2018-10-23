export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';

export const requestUser = () => ({
    type: REQUEST_USER
});

export const receiveUser = (user: any) => ({
    type: RECEIVE_USER,
    user: user
});

