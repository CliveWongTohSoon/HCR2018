import { POST_STATUS } from './action.type';
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