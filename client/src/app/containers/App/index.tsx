import * as React from 'react';
import * as io from 'socket.io-client';
import MenuBar from 'app/components/Header';
import * as style from './style.css';
import ContentCard from 'app/components/ContentView';
import { StatusStepper } from 'app/components/StatusStepper';

const socketUrl = process.env.NODE_ENV == 'production' 
  ? 'http://ec2-52-56-122-124.eu-west-2.compute.amazonaws.com:9000' // TODO:- URL of the server, change to your own
: 'http://localhost:9000';


let socket = io.connect(socketUrl, {
  agent: false,
  transports: ['websocket', 'htmlfile', 'xhr-polling', 'json-polling', 'polling']
});

// @connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component {

  render() {
    return (
      <div className={style.body}>
        {<MenuBar />}
        <div className='row'>
          <div className={`col-sm-4`}>
            <StatusStepper 
              socket={socket}
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

export default App;
