import { POST_STATUS, OPEN_MENU, CLOSE_MENU, SELECT_MENU, RECEIVE_STATUS } from './action.type';
import { Dispatch } from 'redux';

// Send a post request to initiate a socket
export const setDestination = ({x, y, z}: any) => ({
    type: POST_STATUS,
    status: {status: 'dispatch', data: {x, y, z}}
});

export const receiveStatus = (status: string, {x, y, z}: any) => ({
    type: RECEIVE_STATUS,
    status: {status, data: {x, y, z}}
});

export const resetStatus = () => ({
    type: RECEIVE_STATUS, 
    status: {status: 'start', data: {}}
});

export const getStatus = (socket: SocketIOClient.Socket) => {
    return (dispatch: Dispatch) => {
        // TODO:- Remove this
        dispatch(receiveStatus('arrived_destination', {x: 1, y: 2, z: 3}));
        socket.on('location', (statusData: any) => {
            const {status, data} = statusData;
            switch (status) {
                case 'to_dest':
                    console.log('On the way.', data);
                    dispatch(receiveStatus(status, data));
                    break;
                case 'to_origin':
                    console.log('On the way back', data);
                    dispatch(receiveStatus(status, data));
                    break;
                case 'arrived_destination':
                    console.log('Arrived destination', data);
                    dispatch(receiveStatus(status, data));
                    break;
                case 'arrived_origin':
                    console.log('Arrived origin');
                    dispatch(receiveStatus(status, data));
                    socket.off('location');
                    break;
                default:
                    console.log('Something went wrong!');
                    break;
            }
        });
    } 
};

export const closeStatus = (socket: SocketIOClient.Socket, socketEvent: string) => {
    socket.off(socketEvent);
};

type DispatchFunction = (dispatch: Dispatch) => void;

export const updateStatus = (socket: SocketIOClient.Socket, {status, data}: any, index: number): DispatchFunction => {
    return (dispatch: Dispatch) => {
        switch (status) {
            case 'dispatch':
                dispatch(selectMenu(index));
                dispatch(setDestination(data));
                // Emit the destination
                /**
                 * The data has the following shape
                 * type: 'dispatch'
                 * data: {
                 *      pos_x
                 *      pos_y
                 *      pos_z
                 *      orient_x
                 *      orient_y
                 *      orient_z
                 *      orient_w
                 * }
                 */
                socket.emit('command', {type: status, data});
                getStatus(socket)(dispatch);
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
