import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps' // 패키지 불러오기
import React, { Component } from 'react'
import jquery from 'jquery'
import $ from 'jquery'

const { naver } = window
const Map2 = props => {
  var restaurant = new naver.maps.LatLng(30, 30)

  var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(30, 30),
    zoom: 10,
  })

  var contentString = [
    '<div class="iw_inner">',
    '   <h3>서울특별시청</h3>',
    '   <p>서울특별시 중구 태평로1가 31 | 서울특별시 중구 세종대로 110 서울특별시청<br>',
    '       <img src="./img/hi-seoul.jpg" width="55" height="55" alt="서울시청" class="thumb" /><br>',
    '       02-120 | 공공,사회기관 > 특별,광역시청<br>',
    '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
    '   </p>',
    '</div>',
  ].join('')

  var marker = new naver.maps.Marker({
    map: map,
    position: restaurant,
  })

  var infoWindow = new naver.maps.InfoWindow({
    content: contentString,
  })

  naver.maps.Event.addListener(marker, 'click', function (e) {
    if (infoWindow.getMap()) {
      infoWindow.close()
    } else {
      infoWindow.open(map, marker)
    }
  })

  map.setCursor('pointer')

  function searchCoordinateToAddress(latlng) {
    infoWindow.close()

    naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [naver.maps.Service.OrderType.ADDR, naver.maps.Service.OrderType.ROAD_ADDR].join(
          ','
        ),
      },
      function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert('Something Wrong!')
        }

        var items = response.v2.results,
          address = '',
          htmlAddresses = []

        for (var i = 0, ii = items.length, item, addrType; i < ii; i++) {
          item = items[i]
          address = makeAddress(item) || ''
          addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]'

          htmlAddresses.push(i + 1 + '. ' + addrType + ' ' + address)
        }

        infoWindow.open(map, latlng)
      }
    )
  }

  function searchAddressToCoordinate(address) {
    naver.maps.Service.geocode(
      {
        query: address,
      },
      function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert('Something Wrong!')
        }

        if (response.v2.meta.totalCount === 0) {
          return alert('totalCount' + response.v2.meta.totalCount)
        }

        var htmlAddresses = [],
          item = response.v2.addresses[0],
          point = new naver.maps.Point(item.x, item.y)

        if (item.roadAddress) {
          htmlAddresses.push('[도로명 주소] ' + item.roadAddress)
        }

        if (item.jibunAddress) {
          htmlAddresses.push('[지번 주소] ' + item.jibunAddress)
        }

        if (item.englishAddress) {
          htmlAddresses.push('[영문명 주소] ' + item.englishAddress)
        }

        infoWindow.setContent(
          [
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h4 style="margin-top:5px;">검색 주소 : ' + address + '</h4><br />',
            htmlAddresses.join('<br />'),
            '</div>',
          ].join('\n')
        )

        map.setCenter(point)
        infoWindow.open(map, point)
      }
    )
  }

  function initGeocoder() {
    if (!map.isStyleMapReady) {
      return
    }

    map.addListener('click', function (e) {
      searchCoordinateToAddress(e.coord)
    })

    $('#address').on('keydown', function (e) {
      var keyCode = e.which

      if (keyCode === 13) {
        // Enter Key
        searchAddressToCoordinate($('#address').val())
      }
    })

    $('#submit').on('click', function (e) {
      e.preventDefault()

      searchAddressToCoordinate($('#address').val())
    })

    searchAddressToCoordinate('정자동 178-1')
  }

  function makeAddress(item) {
    if (!item) {
      return
    }

    var name = item.name,
      region = item.region,
      land = item.land,
      isRoadAddress = name === 'roadaddr'

    var sido = '',
      sigugun = '',
      dongmyun = '',
      ri = '',
      rest = ''

    if (hasArea(region.area1)) {
      sido = region.area1.name
    }

    if (hasArea(region.area2)) {
      sigugun = region.area2.name
    }

    if (hasArea(region.area3)) {
      dongmyun = region.area3.name
    }

    if (hasArea(region.area4)) {
      ri = region.area4.name
    }

    if (land) {
      if (hasData(land.number1)) {
        if (hasData(land.type) && land.type === '2') {
          rest += '산'
        }

        rest += land.number1

        if (hasData(land.number2)) {
          rest += '-' + land.number2
        }
      }

      if (isRoadAddress === true) {
        if (checkLastString(dongmyun, '면')) {
          ri = land.name
        } else {
          dongmyun = land.name
          ri = ''
        }

        if (hasAddition(land.addition0)) {
          rest += ' ' + land.addition0.value
        }
      }
    }

    return [sido, sigugun, dongmyun, ri, rest].join(' ')
  }

  function hasArea(area) {
    return !!(area && area.name && area.name !== '')
  }

  function hasData(data) {
    return !!(data && data !== '')
  }

  function checkLastString(word, lastString) {
    return new RegExp(lastString + '$').test(word)
  }

  function hasAddition(addition) {
    return !!(addition && addition.value)
  }

  naver.maps.onJSContentLoaded = initGeocoder
  naver.maps.Event.once(map, 'init_stylemap', initGeocoder)

  window.addEventListener('DOMContentLoaded', function () {
    resize()
    window.addEventListener('resize', resize)
  })

  function resize() {
    var Size = new naver.maps.Size(500, 500)
    map.setSize(Size)
  }

  return (
    <div>
      <div className='Map2' id='map'></div>
    </div>
  )
}

export default Map2
