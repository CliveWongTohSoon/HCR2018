import * as React from 'react';

export class LocationComponent extends React.Component {

	render() {
		return (
			<iframe
				src="https://player.twitch.tv/?channel=p3at_robot&autoplay=true"
				height="400px"
				width="100%"
				frameBorder="0"
				scrolling="no"
				allowFullScreen={true}
			>
			</iframe>
		)
  	}
}

export default LocationComponent;
