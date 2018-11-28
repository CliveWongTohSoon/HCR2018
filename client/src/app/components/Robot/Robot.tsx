import * as React from 'react';
import * as styles from './style.css';
import { connect } from 'react-redux';
import { getEyePos } from './action';
import {TextField} from '@material-ui/core';

const eyesStyle = (eyePos: any) => {
    const x = eyePos.eyePos;
    return {
        top: '100px',
        width: '90%',
        height: '100px',
        left: `${x}px`,
        overflow: 'hidden',
        transition: '1s',
        WebkitTransition: '1s'
    }
};

export namespace RobotFace {
    export interface Props {
        eyePos: any;
        socket: any;
        getSocketEyePos: any;
    }
}

export class RobotFace extends React.Component<RobotFace.Props> {

    constructor(props: RobotFace.Props) {
        super(props);
        const { socket, getSocketEyePos } = this.props;
        getSocketEyePos(socket);
    }

    handleKeyPress = (event: any) => {
        const { socket } = this.props;
        socket.emit('command', {
            'key': event.target.value
        });
    }

    render() {
        const { eyePos } = this.props;

        return (
            <div className={styles.wrap}>
                <div className={styles.cat}>
                    <div className={styles.eyes} style={eyesStyle(eyePos)}>
                        <div className={styles.eye}></div>
                        <div className={`${styles.eye} ${styles.two}`}></div>
                    </div>
                    <div className={styles.mouth}>
                        <div className={styles.lezu}></div>
                    </div>
                    <TextField 
                        value={''}
                        onChange={this.handleKeyPress} 
                        fullWidth={true} />
                    {/* <h1 className={styles.status} onKeyPress={this.handleKeyPress}>
                        Arrived!
                    </h1> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    eyePos: state.eyePos
});

const mapDispatchToProps = (dispatch: any) => ({
    getSocketEyePos: (socket: any) => getEyePos(socket, dispatch)
}); 

export default connect(mapStateToProps, mapDispatchToProps)(RobotFace);
