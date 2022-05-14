/*global kakao*/
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef, useState } from 'react'
import Modal from 'react-modal/lib/components/Modal'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { IconButton } from '@mui/material';

const validColor = "#2BAE66";

function SelectLoc({ loc, setLoc, sortBy }) {
    const [open, setOpen] = useState(false);
    const mapRef = useRef(null);

    const waitModalRender = (cb) => {
        if (mapRef.current === null)
            setTimeout(() => waitModalRender(cb), 0);
        else
            cb();
    }

    const iconClickHandler = (e) => {
        e.preventDefault();
        setOpen(true);

        waitModalRender(() => {
            const options = { //지도를 생성할 때 필요한 기본 옵션
                center: new kakao.maps.LatLng(loc.latitude, loc.longitude), //지도의 중심좌표.
                level: 3 //지도의 레벨(확대, 축소 정도)
            };
            const map = new kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴

            const marker = new kakao.maps.Marker({
                // 지도 중심좌표에 마커를 생성합니다 
                position: new kakao.maps.LatLng(loc.latitude, loc.longitude),
            });
            marker.setMap(map);

            const customOverlay = new kakao.maps.CustomOverlay({
                map: map,
                position: new kakao.maps.LatLng(loc.latitude, loc.longitude),
                content: `<div style="padding:3px;position: relative;bottom:55px;color:black;background-color:white;border-radius:5px;border:1px solid black">검색기준: ${sortBy === 'start' ? '출발지' : '도착지'}</div>`,
            });

            kakao.maps.event.addListener(map, 'click', (event) => {
                // 클릭한 위도, 경도 정보를 가져옵니다 
                const latlng = event.latLng;
                setLoc({ latitude: latlng.getLat(), longitude: latlng.getLng() });
                setOpen(false);
            });
        })
    }

    return (
        <>
            <IconButton sx={{ "svg.MuiSvgIcon-root": { color: loc === null ? 'none' : validColor } }} size="large" onClick={iconClickHandler}>
                <FmdGoodOutlinedIcon fontSize="inherit" />
            </IconButton>
            <Modal
                isOpen={open}
                onRequestClose={() => setOpen(false)}
                ariaHideApp={false}
            >
                <div ref={mapRef} css={css`height:100%`}>

                </div>

            </Modal>
        </>
    )
}

export default SelectLoc