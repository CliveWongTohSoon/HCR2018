import { POST_STATUS, OPEN_MENU, CLOSE_MENU, SELECT_MENU } from './action.type';
import { Dispatch } from 'redux';

// Send a post request to initiate a socket
export const setDestination = ({x, y, z}: any) => ({
    type: POST_STATUS,
    status: {status: 'dispatch', data: {x, y, z}}
});

export const getStatus = (socket: any) => {
    return (dispatch: Dispatch) => {
        socket.on('location', (statusData: any) => {
            console.log('Received Status: ', statusData);
        })
    };
};

export const updateStatus = (socket: any, {status, data}: any) => {
    // console.log(status, data);
    return (dispatch: Dispatch) => {
        switch (status) {
            case 'dispatch':
                dispatch(setDestination(data));
                socket.emit('status', {status, data});
                break;
            default:
                console.log('Not available yet!');
                break;
        }
    }
}

export const openMenu = (event: any) => ({
    type: OPEN_MENU,
    anchorEl: event.currentTarget
});

export const closeMenu = () => ({
    type: CLOSE_MENU
});

export const selectMenu = (index: number) => ({
    type: SELECT_MENU,
    selectedIndex: index
});
