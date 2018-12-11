import { Dispatch } from "redux";
import { RECEIVE_IMG_SRC, REQUEST_IMG_SRC, CLOSE_REQUEST_IMG_SRC } from './action.type';
import { requestOpenBox } from 'app/components/Robot/action';

export const receiveImgSrc = (src: string) => ({
    type: RECEIVE_IMG_SRC,
    src: src
});

export const requestImgSrc = () => ({
    type: REQUEST_IMG_SRC,
    open: true
});

export const closeRequestImgSrc = () => ({
    type: CLOSE_REQUEST_IMG_SRC,
    open: false
});

export const openPopup = (socket: SocketIOClient.Socket) => {
    return (dispatch: Dispatch) => {
        dispatch(requestImgSrc());
        socket.on('image', (data: any) => {
            dispatch(receiveImgSrc(`data:image/jpeg;base64,${data}`));
        });
    }
}

export const closePopup = (socket: SocketIOClient.Socket) => {
    return (dispatch: Dispatch) => {
        dispatch(closeRequestImgSrc());
        socket.off('image');
    }
};

export const openBox = (socket: SocketIOClient.Socket) => {
    return (dispatch: Dispatch) => {
        dispatch(requestOpenBox());
        socket.emit('box', {type: 'box_status', open: true});
    }
}
