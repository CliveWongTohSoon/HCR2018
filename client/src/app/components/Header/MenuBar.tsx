import * as React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { changeRouteState } from './action';
import { connect } from 'react-redux';
import { Icon } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';

export namespace MenuBar {
    export interface Props {
        routeState: any;
        changeRouteState: (state: number) => void;
        theme?: any;
    }
}

const mapStateToProps = (state: any) => ({
    routeState: state.routeState.routeState
})

const mapDispatchToProps = (dispatch: any) => ({
    changeRouteState: (state: number) => dispatch(changeRouteState(state))
})

class FloatingActionButtonZoom extends React.Component<MenuBar.Props> {
    handleChange = (event: any, value: any) => {
        const { changeRouteState } = this.props;
        changeRouteState(value);
    };

    render() {
        const { routeState } = this.props; 
        return (
            <div>
                <AppBar position="static" color="primary">
                    <Tabs   
                        value={routeState} 
                        indicatorColor="secondary" 
                        textColor="inherit" 
                        onChange={this.handleChange}
                        fullWidth 
                        centered>
                            <Tab label="robot" icon={<Icon>android</Icon>}/>
                            <Tab label="location" icon={<LocationOnIcon />}/>
                            <Tab label="video" icon={<Icon>videocam</Icon>}/>
                    </Tabs>
                </AppBar>
            </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FloatingActionButtonZoom);
