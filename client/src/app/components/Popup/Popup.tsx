import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import VideoCard from './VideoCard';

function Transition(props: any) {
    return <Slide direction="up" {...props} />;
}

export namespace AlertDialogSlide {
    export interface Props {
        socket: SocketIOClient.Socket;
    }
}

class AlertDialogSlide extends React.Component<AlertDialogSlide.Props> {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {

        const {socket}: any = this.props;
        return (
            <div>
                <Button onClick={this.handleClickOpen}>Click here to check</Button>
                <Dialog
                    open={this.state.open}
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
                        <VideoCard 
                            socket={socket}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Nope
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Open
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialogSlide;