import { POST_STATUS, OPEN_MENU, CLOSE_MENU, SELECT_MENU } from './action.type';

const initialState = {
    status: 'end',
    data: {},
    anchorEl: null,
    selectedIndex: 0,
};

export const statusReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case POST_STATUS:
            return {
                ...state,
                ...action.status
            };
        case SELECT_MENU:
            return {
                ...state,
                selectedIndex: action.selectedIndex,
                anchorEl: null
            };
        case OPEN_MENU:
            return {
                ...state,
                anchorEl: action.anchorEl
            };
        case CLOSE_MENU:
            return {
                ...state,
                anchorEl: null
            };
        default:
            return {
                ...state
            };
    }
};
