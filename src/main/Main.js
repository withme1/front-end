/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import ComputerChat from './chat/ComputerChat';
import MobileChat from './chat/MobileChat';
import RoomList from './room/RoomList';
import { getSocket } from '../socket/socket';

const mainStyle = css`
    display: flex;
    align-items: stretch;
`;

function Main() {
    const [roomList, setRoomList] = useState([]);
    const [isInRoom, setIsInRoom] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [roomId, setRoomId] = useState(null);
    const [chatList, setChatList] = useState([
        { type: 'system', text: '상대 입장', time: dayjs() },
        { type: 'other', text: 'hihi', time: dayjs() },
        { type: 'me', text: 'hihdddddddddddddddddddddddddddddddddddddddddi', time: dayjs() },
        { type: 'me', text: 'hhiihi', time: dayjs() }]);
    const chatStyleRef = useRef();

    const addMessage = (m) => {
        setChatList((prev) => [...prev, m]);
    }

    useEffect(() => {
        chatStyleRef.current.scrollTop = chatStyleRef.current.scrollHeight
    }, [chatList]);

    useEffect(() => {
        getSocket().removeAllListeners("roomDeleted");
        getSocket().on('roomDeleted', (id) => {
            setRoomList((prev) => (prev.filter((room) => room.id !== id)));
            if (isInRoom) {
                addMessage({ type: 'system', text: '방 삭제됨' });
                setIsInRoom(false);
                setIsHost(false);
                setRoomId(null);
            }
        })

        getSocket().removeAllListeners("roomQuited");
        getSocket().on('roomQuited', () => {
            if (isInRoom && isHost) {
                addMessage({ type: 'system', text: '상대 퇴장' });
                setIsInRoom(true);
                setIsHost(true);
                setRoomId(roomId);
            }
        })

    }, [isInRoom])

    return (
        <div className="main" css={mainStyle}>
            <MobileChat isInRoom={isInRoom} setIsInRoom={setIsInRoom} isHost={isHost} setIsHost={setIsHost} roomId={roomId} setRoomId={setRoomId} chatList={chatList} setChatList={setChatList} addMessage={addMessage} setRoomList={setRoomList} chatStyleRef={chatStyleRef}/>
            <ComputerChat isInRoom={isInRoom} setIsInRoom={setIsInRoom} isHost={isHost} setIsHost={setIsHost} roomId={roomId} setRoomId={setRoomId} chatList={chatList} setChatList={setChatList} addMessage={addMessage} setRoomList={setRoomList} chatStyleRef={chatStyleRef}/>
            <RoomList roomList={roomList} setRoomList={setRoomList} isInRoom={isInRoom} setIsInRoom={setIsInRoom} isHost={isHost} setIsHost={setIsHost} roomId={roomId} setRoomId={setRoomId} addMessage={addMessage} />
        </div>
    )
}

export default Main