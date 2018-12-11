import { REQUEST_IMG_SRC, RECEIVE_IMG_SRC, CLOSE_REQUEST_IMG_SRC } from './action.type';

const initialState = {
    src: null,
    open: false
}

export const popupReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case REQUEST_IMG_SRC:
            return {
                ...state,
                open: action.open
            };
        case RECEIVE_IMG_SRC:
            return {
                ...state,
                src: action.src
            };
        case CLOSE_REQUEST_IMG_SRC:
            return {
                ...state,
                open: action.open,
                src: null
            }
        default:
            return {
                ...state
            };
    }
}
