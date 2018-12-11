import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getVideo, closeRequestVideo, requestVideo } from './action';

export namespace VideoComponent {
    export interface Props {
        routeState: number;
        socket: SocketIOClient.Socket;
        vidSrc: string
        getVideoSrc: (socket: SocketIOClient.Socket) => (dispatch: Dispatch) => void;
        closeSocket: (socket: SocketIOClient.Socket) => (dispatch: Dispatch) => void;
    }
}

export class VideoComponent extends React.Component<VideoComponent.Props> {
    
    componentDidUpdate() {
        const { routeState, getVideoSrc, closeSocket, socket } = this.props;
        if (routeState == 2) {
            getVideoSrc(socket);
        } else {
            closeSocket(socket);
        }
    }

    render() {
        const { vidSrc } = this.props;
        const image = new Image();
        image.src = vidSrc;

        return (
            <div>
                <img src={image.src} style={{ width: '100%' }} />
                <h1 style={{textAlign: "center"}}>
                    This is what I see!
                </h1>
            </div>
        );
    }
}

export const mapStateToProps = (state: any) => ({
    routeState: state.routeState.routeState,
    vidSrc: state.vid.vidSrc
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
    reqVideo: () => dispatch(requestVideo()),
    getVideoSrc: (socket: SocketIOClient.Socket) => getVideo(socket)(dispatch),
    closeSocket: (socket: SocketIOClient.Socket) => closeRequestVideo(socket)(dispatch)
});

export default (connect(mapStateToProps, mapDispatchToProps) as any)(VideoComponent);
