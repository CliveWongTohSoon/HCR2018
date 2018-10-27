import { REQUEST_CHANGE_STATE } from './action.types';

export const initialState = {
    routeState: 0
}

export const routeStateReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case REQUEST_CHANGE_STATE:
            return {
                ...state,
                routeState: action.routeState
            }
        default:
            return state;
    }
};
