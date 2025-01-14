/*global kako */
//https://developers.kakao.com/ api받아오기
//https://cotist.tistory.com/3 참고
//https://apis.map.kakao.com/web/sample/addMapCenterChangedEvent/ LatLng이랑 level 알아 올 수 있음
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { createContext } from "react";

const MapViewStyle = styled.div`
  #map {
    width: 65%;
    height: 450px;
    margin: 0 auto;
  }
  @media screen and (max-width: 958px) {
    #map {
      width: 95%;
    }
  }
`;

function Map({ contents }) {
  useEffect(() => {
    mapscript(contents);
  }, [contents]);
  const mapscript = (contents) => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(
        37.56284927225243,
        126.97138694483239
      ),
      level: 8,
    };
    console.log("함수실행");
    //map
    const map = new window.kakao.maps.Map(container, options);

    contents.map((item) => {
      // 마커를 생성합니다
      //console.log(item)
      const marker = new window.kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new window.kakao.maps.LatLng(item.위도, item.경도),
      });
      // allContent 변수를 선언해서 markerdata의 title,tag를 받아옴 맞나? ㅋㅋㅋㅋㅋ
      var allContent = `<div style="text-align:left" overflow:auto;>이름 | ${item.이름}<br/>주소 | ${item.주소}<br/>대표음식 | ${item.대표음식}</div>`;
      // infowindow 선언 content:allContent로 다 띄울 수 있을 듯?
      var infowindow = new window.kakao.maps.InfoWindow({
        content: allContent,
      });

      //마커에 mouseover, mouseout 이벤트를 등록함
      // 이벤트리스너로 클로저를 만들어줌
      // 안만들어주면 마지막 마커에만 이벤트 등록됨 ㅇㅇ
      window.kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, infowindow)
      );
      window.kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infowindow)
      );
    });
    // 인포윈도우를 표시하는 클로저를 만드는 함수
    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수
    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }
  };

  return <div id="map"></div>;
}
//아니 왜 안됨? 진짜..
function MapView(props) {
  const { contents, Data } = props;
  return (
    <center>
      <MapViewStyle>
        <Map contents={contents} />
      </MapViewStyle>
    </center>
  );
}

export default MapView;
