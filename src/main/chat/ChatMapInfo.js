/*global kakao*/
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import { getDistance } from '../util/getDistance';
import { getLevelByDisance } from '../util/getLevelByDistance';
import { getMiddleLoc } from '../util/getMiddleLoc';

const mapButtonSytle = {
    color: 'white',
    boxShadow: "0 0 0",
    backgroundColor: "#2BAE66",
    padding: "0px",
    fontSize: '0.8em',
    width: '55px',
    minWidth: '55px',

    "&:hover": {
        boxShadow: "0 0 0",
        backgroundColor: "#2BAE66"
    }
};

function ChatMapInfo({ room }) {
    const [open, setOpen] = useState(false);
    const mapRef = useRef(null);

    const waitModalRender = (cb) => {
        if (mapRef.current === null)
            setTimeout(() => waitModalRender(cb), 0);
        else
            cb();
    }

    const clickHandler = (e) => {
        setOpen(true);
        
        waitModalRender(() => {
            const startLoc = room.startLoc;
            const endLoc = room.endLoc;
            const middleLoc = getMiddleLoc(startLoc, endLoc);
            const options = { //지도를 생성할 때 필요한 기본 옵션
                center: new kakao.maps.LatLng(middleLoc.latitude, middleLoc.longitude), //지도의 중심좌표.
                level: getLevelByDisance(getDistance(startLoc.latitude, startLoc.longitude, endLoc.latitude, endLoc.longitude)*1000) //지도의 레벨(확대, 축소 정도)
            };

            const map = new kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴

            //마커 생성
            const startMarker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(startLoc.latitude, startLoc.longitude)
            });
            startMarker.setMap(map);

            const startCustomOverlay = new kakao.maps.CustomOverlay({
                map: map,
                position: new kakao.maps.LatLng(startLoc.latitude, startLoc.longitude),
                content: `<div style="padding:3px;position: relative;bottom:55px;color:black;background-color:white;border-radius:5px;border:1px solid black">출발: ${room.start}</div>`,
            });

            //마커 생성
            const endMarker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(endLoc.latitude, endLoc.longitude)
            });
            endMarker.setMap(map);

            const endCustomOverlay = new kakao.maps.CustomOverlay({
                map: map,
                position: new kakao.maps.LatLng(endLoc.latitude, endLoc.longitude),
                content: `<div style="padding:3px;position: relative;bottom:55px;color:black;background-color:white;border-radius:5px;border:1px solid black">도착: ${room.end}</div>`,
            });
        })
    }

    return (
        <>
            <Button sx={mapButtonSytle} onClick={clickHandler}>위치</Button>
            <Modal
                style={{overlay: {zIndex: 2000}}}
                isOpen={open}
                onRequestClose={() => setOpen(false)}
                ariaHideApp={false}
            >
                <div ref={mapRef} css={css`height: 100%`}></div>
            </Modal>
        </>
    )
}

export default ChatMapInfo