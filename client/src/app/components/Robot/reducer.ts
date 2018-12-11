import { REQUEST_EYE_POS, RECEIVE_EYE_POS, RECEIVE_BOX_STATUS, REQUEST_BOX_OPEN} from './action.type';

const initialState = {
    eyePos: 0,
    boxOpen: false
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
        case REQUEST_BOX_OPEN:
            return {
                ...state,
                boxOpen: true
            }
        case RECEIVE_BOX_STATUS:
            return {
                ...state,
                boxOpen: action.boxOpen
            }
        default: {
            return {
                ...state
            }
        }
    }
};
