import { Dispatch } from "redux";
import { REQUEST_CHANGE_STATE } from './action.types';

export const requestChangeState = (state: number) => ({
    type: REQUEST_CHANGE_STATE,
    routeState: state
})

export const changeRouteState = (state: number) => {
    return (dispatch: Dispatch) => {
        dispatch(requestChangeState(state));
    };
};
