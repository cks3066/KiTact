import React from 'react'
import { RenderAfterNavermapsLoaded, NaverMap, Rectangle, Marker } from 'react-naver-maps'
import { withNavermaps } from 'react-naver-maps/hocs'

function ControlBtn({ controlOn = false, ...restProps }) {
  let style = {
    margin: 0,
    color: '#555',
    padding: '2px 6px',
    background: '#fff',
    border: 'solid 1px #333',
    cursor: 'pointer',
    borderRadius: '5px',
    outline: '0 none',
    boxShadow: '2px 2px 1px 1px rgba(0, 0, 0, 0.5)',
    fontSize: '14px',
    margin: '0 5px 5px 0',
  }

  if (controlOn) {
    style = {
      ...style,
      background: '#2780E3',
      color: '#FFF',
    }
  }

  return <button style={style} {...restProps} />
}

function Buttons(props) {
  return (
    <div
      style={{
        zIndex: 1000,
        position: 'absolute',
        display: 'inline-block',
      }}
      {...props}
    />
  )
}

const Rect = props => (
  <Marker
    position={new window.naver.maps.LatLng(37.554722, 126.970833)}
    animation={0}
    onClick={() => {
      alert('마커 클릭')
    }}
  />
)

class ShowMap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rect: null,
    }
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this)
    this.goToDokdo = this.goToDokdo.bind(this)

    this.dokdo = new window.naver.maps.LatLngBounds(
      new window.naver.maps.LatLng(37.555722, 126.971833),
      new window.naver.maps.LatLng(37.553722, 126.969833)
    )
  }

  changeBounds(bounds) {
    this.setState({ bounds })

    if (this.rectTimeout) clearTimeout(this.rectTimeout)
    this.rectTimeout = setTimeout(() => {
      this.setState({ rect: <Rect bounds={this.state.bounds} /> })
    }, 500)
  }

  goToDokdo() {
    this.setState({ bounds: this.dokdo })
  }

  handleBoundsChanged(bounds) {
    this.changeBounds(bounds)
  }

  render() {
    return (
      <React.Fragment>
        <NaverMap
          naverRef={ref => {
            this.mapRef = ref
          }}
          id='maps-examples-map-bounds'
          style={{
            width: '600px',
            height: '400px',
          }}
          defaultCenter={new window.naver.maps.LatLng(37.554722, 126.970833)}
          defaultZoom={5}
          bounds={this.state.bounds}
          onBoundsChanged={this.handleBoundsChanged}
        >
          {this.state.rect}
        </NaverMap>
        <Buttons>
          <ControlBtn onClick={this.goToDokdo}>좌표 이동하기</ControlBtn>
        </Buttons>
      </React.Fragment>
    )
  }

  componentDidMount() {
    // map이 생성될 때의 bounds를 알기 위해 method를 이용합니다.
    this.changeBounds(this.mapRef.getBounds())
  }
}

const EnhancedApp = withNavermaps(ShowMap)

;<RenderAfterNavermapsLoaded clientId={'b9z4didj22'}>
  <EnhancedApp />
</RenderAfterNavermapsLoaded>

export default ShowMap