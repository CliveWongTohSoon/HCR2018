import * as React from 'react';
// import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
import { StepContent, StepLabel, Step, Stepper, Typography, Button } from '@material-ui/core';
import * as styles from './style.css';
import { connect } from 'react-redux'; 
import MenuList from './MenuList';
import { resetStatus } from './action';
import { Dispatch } from 'redux';
import { PopupBtn } from 'app/components/Popup';

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

const renderStepContent = (steps: string[], socket: SocketIOClient.Socket, onClickHandler: any) => {
    return steps.map((label, index) => {
        return (
            <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent> 
                    <Typography>
                        {getStepContent(index)}
                    </Typography>
                    {index == 0 && <MenuList 
                        socket={socket}
                    />}
                    
                    {index == steps.length - 1 && <Button 
                        onClick={onClickHandler}
                    >
                        Reset
                    </Button>}

                    {index === 2 && <PopupBtn />}
                    
                </StepContent>
            </Step>
        );
    });
}

export namespace StatusStepper {
    export type ResetHandlerType = () => void;

    export interface Props {
        status: any;
        postStatus: any;
        socket: SocketIOClient.Socket;
        resetStatus: ResetHandlerType;
    }
}

const matchActiveStep = (status: string): number => {
    switch (status) {
        case 'start':
            return 0;
        case 'dispatch':
            return 0;
        case 'to_dest':
            return 1;
        case 'arrived_destination':
            return 2;
        case 'to_origin':
            return 3;
        case 'arrived_origin':
            return 4;
        default:
            return 0;
    }
}

export class StatusStepper extends React.Component<StatusStepper.Props> {

    constructor(props: StatusStepper.Props) {
        super(props);
    }

    resetStatusHandler = () => {
        this.props.resetStatus();
    };

    render() {
        const { socket, status } = this.props;
        const steps = getSteps();

        return (
            <div className={styles.status}>
                <Stepper
                    activeStep={matchActiveStep(status)}
                    orientation='vertical'
                >
                    {renderStepContent(steps, socket, this.resetStatusHandler)}
                </Stepper>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    status: state.status.status    
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    resetStatus: () => dispatch(resetStatus())
    // postStatus: (socket: any, locationData: any) => dispatch(updateStatus(socket, { status: 'dispatch', data: locationData }))
});

export default (connect(mapStateToProps, mapDispatchToProps) as any)(StatusStepper);
