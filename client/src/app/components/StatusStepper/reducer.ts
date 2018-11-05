import { POST_STATUS } from './action.type';

const initialState = {
    status: 'end',
    data: {}
}

export const statusReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case POST_STATUS:
            return {
                ...action.status
            };
        default:
            return {
                ...state
            }
    }
};
