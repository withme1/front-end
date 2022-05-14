/*global kakao*/
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useRef } from "react";
import Modal from "react-modal/lib/components/Modal"

const modalStyle = {
    content: {
        top: '10vh',
        left: '10vw',
        right: '10vw',
        bottom: '10vh'
      }
}

const mapStyle = css`
    height: 100%
`;

const clickStyle = css`
    color: #FCF6F5;
    text-decoration: none;
    &:visited {
        color: #FCF6F5;
    }
`;

function ModalText({ text, loc }) {
    const [open, setOpen] = useState(false);
    const mapRef = useRef(null);

    const clickHandler = (e) => {
        e.preventDefault();
        setOpen(true);
        waitModalRender(() => {
            const options = { //지도를 생성할 때 필요한 기본 옵션
                center: new kakao.maps.LatLng(loc.latitude, loc.longitude), //지도의 중심좌표.
                level: 3 //지도의 레벨(확대, 축소 정도)
            };

            const map = new kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴

            //마커 생성
            const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(loc.latitude, loc.longitude)
            });
            marker.setMap(map);

            //마커 텍스트 생성
            // const markerTextDiv = `<div style="padding:5px; color:black;">${text}</div>`;
            // const infowindow = new kakao.maps.InfoWindow({
            //     position : new kakao.maps.LatLng(loc.latitude, loc.longitude),
            //     content : markerTextDiv
            // });
            // infowindow.open(map, marker); 

            const customOverlay = new kakao.maps.CustomOverlay({
                map: map,
                position: new kakao.maps.LatLng(loc.latitude, loc.longitude),
                content: `<div style="padding:3px;position: relative;bottom:55px;color:black;background-color:white;border-radius:5px;border:1px solid black">${text}</div>`,
            });
        })
    }

    const waitModalRender = (cb) => {
        if (mapRef.current === null)
            setTimeout(() => waitModalRender(cb), 0);
        else
            cb();
    }

    return (
        <>
            <a href="/" onClick={clickHandler} css={clickStyle}>
                {text}
            </a>
            <Modal
                style={modalStyle}
                isOpen={open}
                onRequestClose={() => setOpen(false)}
                ariaHideApp={false}
            >
                <div ref={mapRef} css={mapStyle}>
                    
                </div>
            </Modal>
        </>
    )

}

export default ModalText