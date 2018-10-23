import { Dispatch } from "redux";

export const REQUEST_HELLO = 'REQUEST_HELLO';
export const RECEIVE_HELLO = 'RECEIVE_HELLO';

export const requestHello = () => ({
    type: REQUEST_HELLO
});

export const receiveHello = (hello: string) => ({
    type: RECEIVE_HELLO,
    response: hello
});

export const fetchHello: any = (dispatch: Dispatch) => {
    dispatch(requestHello());
    fetch(
        `http://localhost:5000/api/hello`
    )
    .then(
        response => response.json(),
        error => console.log('An error occured.', error)    
    )
    .then(
        (json: any) => {
            dispatch(receiveHello(json.response));
        }
    );
};  
