import { REQUEST_VID, RECEIVE_VID, CLOSE_VID } from './action.type';
import { Dispatch } from 'redux';

export const requestVideo = () => ({
    type: REQUEST_VID
})

export const receiveVideo = (src: string) => ({
    type: RECEIVE_VID, 
    vidSrc: src
});

export const closeVideo = () => ({
    type: CLOSE_VID
});

export const getVideo = (socket: SocketIOClient.Socket) => {
    return (dispatch: Dispatch) => {
        socket.on('image', (data: any) => {
            dispatch(receiveVideo(`data:image/jpeg;base64,${data}`));
        });
    }
}

export const closeRequestVideo = (socket: SocketIOClient.Socket) => {
    return (dispatch: Dispatch) => {
        socket.off('image');
        dispatch(closeVideo());
    }
}
