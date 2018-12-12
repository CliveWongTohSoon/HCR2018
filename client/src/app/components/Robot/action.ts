import { REQUEST_EYE_POS, RECEIVE_EYE_POS, RECEIVE_BOX_STATUS, REQUEST_BOX_OPEN } from './action.type';
import { Dispatch } from 'redux';
import { updateStatus } from 'app/components/StatusStepper/action';

export const requestGetEyePos = () => ({
    type: REQUEST_EYE_POS
});

export const receiveEyePos = (x: number) => ({
    type: RECEIVE_EYE_POS,
    eyePos: x
});

export const receiveBoxStatus = (open: boolean) => ({
    type: RECEIVE_BOX_STATUS,
    boxOpen: open
});

export const requestOpenBox = () => ({
    type: REQUEST_BOX_OPEN
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
        });

        socket.on('box', (data: any) => {
            // console.log(data);
            const { type } = data;
            switch (type) {
                case 'alarm':
                    const { authorised } = data;
                    if (authorised) {
                        audio.play();
                    } else {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                    break;
                case 'box_status':
                    // Dispatch to 
                    const { open } = data;
                    console.log('Received box_status!', open);
                    if (!open) {
                        dispatch(receiveBoxStatus(open));
                        // TODO:- Then dispatch socket to 'command' and gives location (origin)
                        updateStatus(socket, {
                            status: 'dispatch_to_origin',
                            data: {
                                pos_x: 3.64510726929,
                                pos_y: -7.12953662872,
                                pos_z: 0.00,
                                orient_x: 0.00,
                                orient_y: 0.00,
                                orient_z: 0.853072113367,
                                orient_w: 0.521793033104
                            }
                        })(dispatch);
                    }
                    break;
                default:
                    console.log('Error type');
                    break;
            }

        });
    }
};
