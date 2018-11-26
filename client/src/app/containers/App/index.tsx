import * as React from 'react';
import { connect } from 'react-redux';
// import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
// import { fetchHello } from 'app/actions';
import { Dispatch } from 'redux';
import * as io from 'socket.io-client';
import MenuBar from 'app/components/Header';
import * as style from './style.css';
import ContentCard from 'app/components/ContentView';
import { StatusStepper } from 'app/components/StatusStepper';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    response: any;
    getHello: any;
  }
}

let socket: any;

const mapStateToProps = (state: any) => ({
  response: state.response
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // getHello: () => fetchHello()
});

// @connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.Props> {
  constructor(props: App.Props) {
    super(props);
    socket = io.connect('http://localhost:9000');
  }

  render() {
    return (
      <div className={style.body}>
        {<MenuBar />}
        <div className='row'>
          <div className={`col-sm-4 ${style.status}`}>
            <StatusStepper 
              socket={socket}
              status={{}}
              postStatus={()=>{}}
            />
          </div>
          <div className='col-sm-8'>
            <ContentCard 
              routeState={0}
              socket={socket}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

// import * as React from 'react';
// import * as style from './style.css';
// import { connect } from 'react-redux';
// import { bindActionCreators, Dispatch } from 'redux';
// import { RouteComponentProps } from 'react-router';
// import { TodoActions } from 'app/actions';
// import { RootState } from 'app/reducers';
// import { TodoModel } from 'app/models';
// import { omit } from 'app/utils';
// import { Header, TodoList, Footer } from 'app/components';
// import { fetchHello } from 'app/actions';

// const FILTER_VALUES = (Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map(
//   (key) => TodoModel.Filter[key]
// );

// const FILTER_FUNCTIONS: Record<TodoModel.Filter, (todo: TodoModel) => boolean> = {
//   [TodoModel.Filter.SHOW_ALL]: () => true,
//   [TodoModel.Filter.SHOW_ACTIVE]: (todo) => !todo.completed,
//   [TodoModel.Filter.SHOW_COMPLETED]: (todo) => todo.completed
// };

// export namespace App {
//   export interface Props extends RouteComponentProps<void> {
//     todos: RootState.TodoState;
//     actions: TodoActions;
//     filter: TodoModel.Filter;
//     hello: any;
//   }
// }

// @connect(
//   (state: RootState): Pick<App.Props, 'todos' | 'filter' | 'hello'> => {
//     const hash = state.router.location && state.router.location.hash.replace('#', '');
//     const filter = FILTER_VALUES.find((value) => value === hash) || TodoModel.Filter.SHOW_ALL;
//     return { todos: state.todos, filter, hello: state.response };
//   },
//   (dispatch: Dispatch): Pick<App.Props, 'actions' | 'hello'> => ({
//     actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch),
//     hello: fetchHello(dispatch)
//   })
// )
// export class App extends React.Component<App.Props> {
//   static defaultProps: Partial<App.Props> = {
//     filter: TodoModel.Filter.SHOW_ALL
//   };

//   constructor(props: App.Props, context?: any) {
//     super(props, context);
//     this.handleClearCompleted = this.handleClearCompleted.bind(this);
//     this.handleFilterChange = this.handleFilterChange.bind(this);
//   }

//   handleClearCompleted(): void {
//     const hasCompletedTodo = this.props.todos.some((todo) => todo.completed || false);
//     if (hasCompletedTodo) {
//       this.props.actions.clearCompleted();
//     }
//   }

//   handleFilterChange(filter: TodoModel.Filter): void {
//     this.props.history.push(`#${filter}`);
//   }

//   render() {
//     const { todos, actions, filter, hello } = this.props;
//     const activeCount = todos.length - todos.filter((todo) => todo.completed).length;
//     const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos;
//     const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);
//     console.log('Clive gets: ', hello);
//     return (
//       <div className={style.normal}>
//         <Header addTodo={actions.addTodo} />
//         <TodoList todos={filteredTodos} actions={actions} />
//         <Footer
//           filter={filter}
//           activeCount={activeCount}
//           completedCount={completedCount}
//           onClickClearCompleted={this.handleClearCompleted}
//           onClickFilter={this.handleFilterChange}
//         />
//       </div>
//     );
//   }
// }
