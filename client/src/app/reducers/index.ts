import { combineReducers } from 'redux';
import { RootState } from './state';
import { routerReducer, RouterState } from 'react-router-redux';
import { routeStateReducer } from 'app/components/Header';
import { statusReducer } from 'app/components/StatusStepper';
import { eyePosReducer } from 'app/components/Robot'
import { popupReducer } from 'app/components/Popup';
import { videoReducer } from 'app/components/Video/reducer';

// NOTE: current type definition of Reducer in 'react-router-redux' and 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  router: routerReducer as any,
  routeState: routeStateReducer as any,
  status: statusReducer as any,
  eyePos: eyePosReducer as any,
  popup: popupReducer as any,
  vid: videoReducer as any
});

export { RootState, RouterState };
