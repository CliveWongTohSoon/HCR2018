// import { TodoModel } from 'app/models';
import { RouterState } from 'react-router-redux';

export interface RootState {
	router: RouterState;
	routeState: any;
	status: any;
	eyePos: any;
	popup: RootState.Popup;
}

// TODO:- Add more types
export namespace RootState {
	export interface Popup {
		src: string,
		open: boolean
	}
}
