// import { TodoModel } from 'app/models';
import { RouterState } from 'react-router-redux';

export interface RootState {
	router: RouterState;
	routeState: any;
	status: any;
	eyePos: any;
	popup: RootState.Popup;
	vid: RootState.Video;
}

// TODO:- Add more types
export namespace RootState {
	export interface Popup {
		src: string,
		open: boolean
	}

	export interface Video {
		vidSrc: string
	}
}
