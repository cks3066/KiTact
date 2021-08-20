import React from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps"; // 패키지 불러오기

NaverMap.refresh();

const ShowMap = (props) => {
  const {} = props;

  const [{ lat, lng }, setGeometricData] = React.useState({
    lat: 37.554722,
    lng: 126.970833
  });

  const NaverMapAPI = () => {
    return (
      <NaverMap
        mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
        style={{ width: "600px", height: "400px" }}
        defaultCenter={{ lat: 37.554722, lng: 126.970833 }} // 지도 초기 위치
        defaultZoom={10} // 지도 초기 확대 배율
      >
        <Marker
          key={1}
          position={new window.naver.maps.LatLng(lat, lng)}
          animation={2}
          onClick={() => {
            alert("마커 클릭");
          }}
        />
      </NaverMap>
    );
  };

  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={"b9z4didj22"} // 자신의 네이버 계정에서 발급받은 Client ID
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMapAPI />
    </RenderAfterNavermapsLoaded>
  );
};

export default ShowMap;
