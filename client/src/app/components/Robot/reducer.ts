import {REQUEST_EYE_POS, RECEIVE_EYE_POS} from './action.type';

const initialState = {
    eyePos: 0
}

export const eyePosReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case REQUEST_EYE_POS:
            return {
                ...state
            }
        case RECEIVE_EYE_POS:
            return {
                ...state,
                eyePos: action.eyePos
            }
        default: {
            return {
                ...state
            }
        }
    }
};
