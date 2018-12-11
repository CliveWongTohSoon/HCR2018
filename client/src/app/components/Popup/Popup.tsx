import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import VideoCard from './VideoCard';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { openPopup, closePopup, openBox } from './action';

function Transition(props: any) {
    return <Slide direction="up" {...props} />;
}

export namespace AlertDialogSlide {
    export interface Props {
        socket: SocketIOClient.Socket;
        openPopup: (socket: SocketIOClient.Socket) => (dispatch: Dispatch) => void;
        closePopup: (socket: SocketIOClient.Socket) => (dispatch: Dispatch) => void;
        openBox: (socket: SocketIOClient.Socket) => (dispatch: Dispatch) => void;
        open: boolean;
    }
}

class AlertDialogSlide extends React.Component<AlertDialogSlide.Props> {

    handleClickOpen = () => {
        const { socket, openPopup } = this.props;
        openPopup(socket);
    };

    handleClose = () => {
        const { socket, closePopup } = this.props;
        closePopup(socket);
    };

    handleOpenBox = () => {
        const { socket, openBox, closePopup } = this.props;
        openBox(socket);
        closePopup(socket);
    }

    render() {

        const { open }  = this.props;
        return (
            <div>
                <Button onClick={this.handleClickOpen}>Click here to check</Button>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        Destination Arrived!
                    </DialogTitle>
                    <DialogContent>
                        <VideoCard />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Nope
                        </Button>
                        <Button onClick={this.handleOpenBox} color="primary">
                            Open
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    open: state.popup.open
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    openPopup: (socket: SocketIOClient.Socket) => openPopup(socket)(dispatch),
    closePopup: (socket: SocketIOClient.Socket) => closePopup(socket)(dispatch),
    openBox: (socket: SocketIOClient.Socket) => openBox(socket)(dispatch)
});

export default (connect(mapStateToProps, mapDispatchToProps) as any)(AlertDialogSlide);