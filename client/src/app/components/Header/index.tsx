import * as React from 'react';
import MenuBar from './MenuBar';
import { routeStateReducer } from './reducer';

export {
    routeStateReducer
};

export default () => {
    return (
        <MenuBar
            routeState={0}
            changeRouteState={ (routeState:number) => {}}
        />)
}
