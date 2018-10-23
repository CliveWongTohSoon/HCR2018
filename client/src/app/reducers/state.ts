import { TodoModel } from 'app/models';
import { RouterState } from 'react-router-redux';

export interface RootState {
  todos: RootState.TodoState;
  router: RouterState;
  response: any
}

export namespace RootState {
  export type TodoState = TodoModel[];
}
