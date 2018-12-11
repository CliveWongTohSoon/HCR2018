import * as React from 'react';
const ReactTwitchEmbedVideo  = require("react-twitch-embed-video");
export class LocationComponent extends React.Component {
  render() {

   
    return (
      <div style={{width: "100%"}}>
        <ReactTwitchEmbedVideo channel="p3at_robot" style={{width: "100%"}}/>
      </div>
    );
  }
}

export default LocationComponent;
