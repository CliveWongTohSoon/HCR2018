import * as React from 'react';
// import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
import { StepContent, StepLabel, Step, Stepper, Typography } from '@material-ui/core';
import * as styles from './style.css';
import { connect } from 'react-redux'; 
import MenuList from './MenuList';

const getSteps = () => {
    return [
        'Dispatch the Silver Retriever',
        'Moving to destination',
        'Arrived',
        'Going back home',
        'Reached home!'
    ];
}

const getStepContent = (step: number) => {
    switch (step) {
        case 0:
            return 'Select a destination.';
        case 1:
            return 'Moving...'
        case 2:
            return 'Arrived.'
        case 3:
            return 'Going home, wait for me...'
        case 4:
            return 'I\'m home, open the door.'
        default:
            return 'Something went wrong!';
    }
}

const renderStepContent = (steps: string[], socket: SocketIOClient.Socket) => {
    return steps.map((label, index) => {
        return (
            <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent> 
                    <Typography>
                        {getStepContent(index)}
                    </Typography>
                    <MenuList 
                        socket={socket}
                    />
                    {/* <Button 
                        onClick={onClickHandler}
                    >
                        Click to send to socket    
                    </Button> */}
                </StepContent>
            </Step>
        );
    });
}

export namespace StatusStepper {
    export interface Props {
        status: any;
        postStatus: any;
        socket: SocketIOClient.Socket;
    }
}

export class StatusStepper extends React.Component<StatusStepper.Props> {

    constructor(props: StatusStepper.Props) {
        super(props);
    }

    render() {
        const { socket } = this.props;
        const steps = getSteps();

        return (
            <div className={styles.status}>
                <Stepper
                    activeStep={0}
                    orientation='vertical'
                >
                    {renderStepContent(steps, socket)}
                </Stepper>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    status: state.status    
});

const mapDispatchToProps = (dispatch: any) => ({
    // postStatus: (socket: any, locationData: any) => dispatch(updateStatus(socket, { status: 'dispatch', data: locationData }))
});

export default connect(mapStateToProps, mapDispatchToProps) (StatusStepper);
