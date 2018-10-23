import { REQUEST_HELLO, RECEIVE_HELLO } from 'app/actions/hello';

export const helloReducer = (state = {}, action: any) => {
    switch (action.type) {
        case REQUEST_HELLO:
            return { 
                ...state, 
                loading: true 
            };
        case RECEIVE_HELLO:
            return { 
                ...state, 
                hello: action.response, 
                loading: false 
            }
        default:
            return state;
    }
}
