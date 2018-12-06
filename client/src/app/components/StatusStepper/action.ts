import { POST_STATUS, OPEN_MENU, CLOSE_MENU, SELECT_MENU } from './action.type';
import { Dispatch } from 'redux';

// Send a post request to initiate a socket
export const setDestination = ({x, y, z}: any) => ({
    type: POST_STATUS,
    status: {status: 'dispatch', data: {x, y, z}}
});

export const getStatus = (socket: SocketIOClient.Socket) => {
    return socket.on('location', (statusData: any) => {
        const {status, data} = statusData;
        switch (status) {
            case 'to_dest':
                console.log('On the way.', data);
                break;
            case 'to_origin':
                console.log('On the way back', data);
                break;
            case 'arrived_destination':
                console.log('Arrived destination', data);
                break;
            case 'arrived_origin':
                console.log('Arrived origin');
                socket.off('location');
                break;
            default:
                console.log('Something went wrong!');
                break;
        }
    });
};

export const closeStatus = (socket: SocketIOClient.Socket, socketEvent: string) => {
    socket.off(socketEvent);
};

type DispatchFunction = (dispatch: Dispatch) => void;

export const updateStatus = (socket: SocketIOClient.Socket, {status, data}: any, index: number): DispatchFunction => {
    // console.log(status, data);
    return (dispatch: Dispatch) => {
        switch (status) {
            case 'dispatch':
                dispatch(selectMenu(index));
                dispatch(setDestination(data));
                socket.emit('status', {type: status, data});
                getStatus(socket);
                break;
            // case 'arrived':
            //     // TODO:- Need to be done on client
            //     socket.emit('status', { status, data})
            //     break;
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
