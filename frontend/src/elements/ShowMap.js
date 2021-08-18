import React from "react";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";

class ShowMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      center: { lat: 37.3595704, lng: 127.105399 },
    };

    this.panToNaver = this.panToNaver.bind(this);
  }

  panToNaver() {
    this.setState({ center: { lat: 37.3595704, lng: 127.105399 } });
  }

  render() {
    return (
      <div>
        <button onClick={this.panToNaver}>Pan To Naver</button>
        <p>lat: {this.state.center.y || this.state.center.lat}</p>
        <p>lng: {this.state.center.x || this.state.center.lng}</p>
        <NaverMap
          id="maps-getting-started-controlled"
          style={{ width: "600px", height: "400px" }}
          // uncontrolled zoom
          defaultZoom={10}
          // controlled center
          // Not defaultCenter={this.state.center}
          center={this.state.center}
          onCenterChanged={(center) => this.setState({ center })}
        />
      </div>
    );
  }
}

<RenderAfterNavermapsLoaded clientId={"b9z4didj22"}>
  <ShowMap />
</RenderAfterNavermapsLoaded>;

export default ShowMap;
