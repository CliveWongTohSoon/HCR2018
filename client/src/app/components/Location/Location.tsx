import * as React from 'react';
const ReactTwitchEmbedVideo  = require("react-twitch-embed-video");
export class LocationComponent extends React.Component {
  render() {

   
    return  <div>This is Location
      <ReactTwitchEmbedVideo channel="p3at_robot" />
      
    </div>;
  }
}

export default LocationComponent;
