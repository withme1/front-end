/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import { Box, } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import 'dayjs/locale/ko';
import CreateLocInput from './CreateLocInput';
import CreateDate from './CreateDate';
import CreateTime from './CreateTime';
import { checkText, checkDate, checkTime } from './ValidCheck'
import { getSocket } from '../../../socket/socket'


const dayjs = require("dayjs");
dayjs.locale('ko');

const modalStyle = {
    content: {
        top: 'calc(var(--vh, 1vh) * 10)',
        left: 'calc(50vw - 160px)',
        right: 'calc(50vw - 160px)',
        bottom: 'calc(var(--vh, 1vh) * 10)',
        borderRadius: "5px",
        border: "1px solid #2BAE66"
    }
}

const createRoomDivStyle = css`
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
`;

const inputComponentStyle = css`
    padding: 10px;
    display: flex;
    justify-content: center;
    color: #FCF6F5;
`;

const submitStyle = css`
    color: #2BAE66;
    border: 1px solid #2BAE66;

    &:hover {
        color: #2BAE66;
        border: 1px solid #2BAE66;
    }
`;

const closeStyle = css`
    color: #2BAE66;
    border: 1px solid #2BAE66;

    &:hover {
        color: #2BAE66;
        border: 1px solid #2BAE66;
    }
`;

const validColor = "#2BAE66";

const textFieldStyle = {
    ".MuiInputLabel-root.Mui-focused": {
        color: validColor
    },
    ".MuiOutlinedInput-root.Mui-focused fieldset": {
        borderColor: validColor
    }
};

function CreateRoom({ start, setStart, end, setEnd, startLoc, setStartLoc, endLoc, setEndLoc, setOpenCreateButton, setOpenSortButton, clearMessage, rejoin, setRejoin, setRoomList, remake, setRemake, open, setOpen, addRoom, isInRoom, setIsInRoom, isHost, setIsHost, roomId, setRoomId, deleteRoom, addMessage }) {
    const [startColor, setStartColor] = useState('none');
    const [endColor, setEndColor] = useState('none');
    const [startActivate, setStartActivate] = useState(null);
    const [endActivate, setEndActivate] = useState(null);
    const [startDay, setStartDay] = useState(dayjs().hour() === 23 ? dayjs().add(1, 'day') : dayjs());
    const [startTime, setStartTime] = useState(dayjs().add(1, 'hour'));

    const requestCreateRoom = () => {
        getSocket().emit('createRoomReq', {
            SrcText: start,
            DestText: end,
            SrcLatitude: startLoc.latitude,
            SrcLongitude: startLoc.longitude,
            DestLatitude: endLoc.latitude,
            DestLongitude: endLoc.longitude,
            date: startDay.format('YYYY-MM-DD'),
            time: startTime.format('HH:mm:ss')
        });
    }

    useEffect(() => {
        getSocket().removeAllListeners('createRoomRes');
        getSocket().on('createRoomRes', (res) => {
            if (res.ok) {
                const room = res.room;
                clearMessage();
                setIsInRoom(true);
                setIsHost(true);
                setRoomId(parseInt(room.id));
                addRoom({
                    id: parseInt(room.id),
                    start: room.SrcText,
                    startLoc: { latitude: parseFloat(room.SrcLatitude), longitude: parseFloat(room.SrcLongitude) },
                    end: room.DestText,
                    endLoc: { latitude: parseFloat(room.DestLatitude), longitude: parseFloat(room.DestLongitude) },
                    date: dayjs(room.date),
                    time: dayjs('2020-01-01 ' + room.time)
                });
                addMessage({ type: 'system', text: '방 생성' });
            } else {
                alert('createRoomRes error: ' + res.reason);
            }
        });
    }, [roomId])

    useEffect(() => {
        getSocket().removeAllListeners('deleteRoomRes');
        getSocket().on('deleteRoomRes', (res) => {
            if (res.ok) {
                if (remake) {
                    getSocket().emit('createRoomReq', {
                        SrcText: start,
                        DestText: end,
                        SrcLatitude: startLoc.latitude,
                        SrcLongitude: startLoc.longitude,
                        DestLatitude: endLoc.latitude,
                        DestLongitude: endLoc.longitude,
                        date: startDay.format('YYYY-MM-DD'),
                        time: startTime.format('HH:mm:ss')
                    })
                    setRemake(false);
                } else if (rejoin !== null) {
                    getSocket().emit('joinRoomReq', rejoin);
                    setRejoin(null);
                }
                setRoomList((prev) => (prev.filter((room) => room.id !== res.id)));
                addMessage({ type: 'system', text: '방 삭제' });
                setIsInRoom(false);
                setIsHost(false);
                setRoomId(null);
            } else {
                alert(res.reason)
            }
        })

        getSocket().removeAllListeners('quitRoomRes');
        getSocket().on('quitRoomRes', (res) => {
            addMessage({ type: 'system', text: '퇴장' });
            setIsInRoom(false);
            setIsHost(false);
            setRoomId(null);
            if (remake) {
                getSocket().emit('createRoomReq', {
                    SrcText: start,
                    DestText: end,
                    SrcLatitude: startLoc.latitude,
                    SrcLongitude: startLoc.longitude,
                    DestLatitude: endLoc.latitude,
                    DestLongitude: endLoc.longitude,
                    date: startDay.format('YYYY-MM-DD'),
                    time: startTime.format('HH:mm:ss')
                })
                setRemake(false);
            } else if (rejoin !== null) {
                getSocket().emit('joinRoomReq', rejoin);
                setRejoin(null);
            }
        })
    }, [rejoin, remake, start, end, startLoc, endLoc, startDay, startTime])

    const checkValidInput = () => {
        let r = false;
        if (checkDate(startDay) && checkTime(startDay, startTime)) {
            r =  true;
        }
        if (!checkText(start)) {
            r = false;
            setStartColor('red');
        }
        if (!checkText(end)) {
            r = false;
            setEndColor('red');
        }
        if (!startActivate) {
            r = false;
            setStartActivate(false);
        }
        if (!endActivate) {
            r = false;
            setEndActivate(false);
        }
        return r;
    }

    const closeModalHandler = () => {
        setOpen(false);
        setOpenCreateButton(true);
        setOpenSortButton(true);
    }

    const closeHandler = (e) => {
        closeModalHandler();
    }

    const submitHandler = (e) => {
        if (!checkValidInput()) {
            return;
        }
        if (isInRoom) {
            let message;
            if (isHost)
                message = "방을 재생성하시겠습니까?";
            else
                message = "기존 방에서는 퇴장하시겠습니까?";
            if (window.confirm(message)) {
                if (isHost) {
                    getSocket().emit('deleteRoomReq');
                } else {
                    getSocket().emit('quitRoomReq');
                }
                setIsHost(false);
                setIsInRoom(false);
                setRoomId(null);
                setRemake(true);
                closeModalHandler();
            }
            return;
        }
        requestCreateRoom();
        closeModalHandler();
    }

    return (
        <Modal
            style={modalStyle}
            isOpen={open}
            onRequestClose={closeModalHandler}
            ariaHideApp={false}
        >
            <div css={createRoomDivStyle}>
                <Box css={inputComponentStyle}>
                    <CreateLocInput label={"출발지"} color={startColor} setColor={setStartColor} textStyle={textFieldStyle} text={start} setText={setStart} loc={startLoc} setLoc={setStartLoc} activate={startActivate} setActivate={setStartActivate} />
                </Box>
                <Box css={inputComponentStyle}>
                    <CreateLocInput label={"목적지"} color={endColor} setColor={setEndColor} textStyle={textFieldStyle} text={end} setText={setEnd} loc={endLoc} setLoc={setEndLoc} activate={endActivate} setActivate={setEndActivate} />
                </Box>
                <br />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box css={inputComponentStyle}>
                        <CreateDate day={startDay} setDay={setStartDay} textStyle={textFieldStyle} />
                    </Box>
                    <br />
                    <Box css={inputComponentStyle}>
                        <CreateTime day={startDay} time={startTime} setTime={setStartTime} textStyle={textFieldStyle} />
                    </Box>
                </LocalizationProvider>
                <br />
                <Box css={inputComponentStyle}>
                    <Button css={submitStyle} onClick={submitHandler} variant="outlined">확인</Button>
                    <div css={css`padding: 10px;`}></div>
                    <Button css={closeStyle} onClick={closeHandler} variant="outlined">닫기</Button>
                </Box>
            </div>
        </Modal >
    )
}

export default CreateRoom