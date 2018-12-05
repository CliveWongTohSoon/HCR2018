import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Typography, Card, CardContent} from '@material-ui/core'
import * as styles from './style.css';
// import { Route, Switch } from 'react-router';
import RobotFace from 'app/components/Robot';
import LocationComponent from 'app/components/Location';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { changeRouteState } from 'app/components/Header/action';

export namespace ContentCard {
    export interface Props {
        routeState: any;
        theme?: any;
        socket: any;
    }
}

const TabContainer = (props: any) => {
    const { children, dir } = props;

    return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
        {children}
    </Typography>
    );
};

const mapStateToProps = (state: any) => ({
    routeState: state.routeState.routeState
});

const mapDispatchToProps = (dispatch: any) => ({
  changeRouteState: (state: number) => dispatch(changeRouteState(state))
});

export class ContentCard extends React.Component<ContentCard.Props> {

    handleChange = (event: any, value: any) => {
        console.log('In swipeable view: ', value);
    }

    render() {
        const { routeState, theme, socket } = this.props;
        return (
            <Card className={styles.card}>
                <CardContent>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={routeState}
                        onChangeIndex={this.handleChange}
                        className={styles.swipe}
                    >
                        <TabContainer dir={theme.direction}><RobotFace 
                                                                eyePos={0}
                                                                socket={socket}
                                                                getSocketEyePos={()=>{}}
                                                            /></TabContainer>
                        <TabContainer dir={theme.direction}>{<LocationComponent />}</TabContainer>
                        <TabContainer dir={theme.direction}>Video</TabContainer>
                    </SwipeableViews>
                </CardContent>
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(ContentCard));
