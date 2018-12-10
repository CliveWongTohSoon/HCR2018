import { REQUEST_EYE_POS, RECEIVE_EYE_POS } from './action.type';
import { Dispatch } from 'redux';

export const requestGetEyePos = () => ({
    type: REQUEST_EYE_POS
});

export const receiveEyePos = (x: number) => ({
    type: RECEIVE_EYE_POS,
    eyePos: x
});

export const getEyePosMock = (dispatch: Dispatch) => {
    let x = 2;
    dispatch(requestGetEyePos());
    setInterval( () => {
        x = x>50 ? 0 : x+10;
        dispatch(receiveEyePos(x));
    }, 1000);
};

const scaleBetween = (unscaledNum: number, minAllowed: number, maxAllowed: number, min: number, max: number) => {
    return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
};

// const scaleNum = (n: number) => {
//     return n !== 0 ? (1 / n) * 70 - 20 : -20;
// };

export const getEyePos = (socket: SocketIOClient.Socket, audio: HTMLAudioElement) => {
    let prevX = 0;
    
    return (dispatch: Dispatch) => {
        socket.on('eyePos', (data: any) => {
            const { eye_pos_x } = data;
            const x = Math.abs(scaleBetween(eye_pos_x, 0, 70, -80, 500) - 70) - 20;
            // const x = scaleNum(eye_pos_x);
            if (eye_pos_x == 0) { // If no body is present
                dispatch(receiveEyePos(25));
            }
            else if (Math.abs(x - prevX) > 8) {
                prevX = x
                dispatch(receiveEyePos(x));
            }
            // console.log('Received Eye Data: ', eye_pos_x, eye_pos_y);
        });
        socket.on('box', (data: any) => {
            // console.log(data);
            const { authorised } = data;
            if (authorised) {
                audio.play();
            } else {
                audio.pause();
                audio.currentTime = 0;
            }
        });
    }
};
