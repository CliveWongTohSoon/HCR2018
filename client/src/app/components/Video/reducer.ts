import { REQUEST_VID, RECEIVE_VID, CLOSE_VID } from './action.type';

const initialState = {
    vidSrc: null
}

export const videoReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case REQUEST_VID:
            return {
                ...state,
                vidSrc: null
            }
        case RECEIVE_VID:
            return {
                ...state,
                vidSrc: action.vidSrc
            }
        case CLOSE_VID:
            return {
                ...state,
                vidSrc: null
            }
        default:
            return {
                ...state
            };
    }
}