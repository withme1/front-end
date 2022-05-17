/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import ComputerChat from './chat/ComputerChat';
import MobileChat from './chat/MobileChat';
import RoomList from './room/RoomList';
import { getSocket } from '../socket/socket';
import { useMediaQuery } from 'react-responsive';

const mainStyle = css`
    display: flex;
    align-items: stretch;
`;

function Main() {
    const [roomList, setRoomList] = useState([]);
    const [isInRoom, setIsInRoom] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [roomId, setRoomId] = useState(null);
    const [chatList, setChatList] = useState([]);
    const chatStyleRef = useRef();
    const [remake, setRemake] = useState(false);
    const [rejoin, setRejoin] = useState(null);
    const [fullIds, setFullIds] = useState(new Set()); 

    const addMessage = (m) => {
        setChatList((prev) => [...prev, m]);
    }

    useEffect(() => {
        if (chatStyleRef.current)
            chatStyleRef.current.scrollTop = chatStyleRef.current.scrollHeight;
    }, [chatList])

    useEffect(() => {
        getSocket().on('roomDeleted', (id) => {
            setRoomList((prev) => (prev.filter((room) => room.id !== id)));
        })
    }, [])

    useEffect(() => {
        getSocket().removeAllListeners("roomDeletedC");
        getSocket().on('roomDeletedC', () => {
            if (isInRoom && !isHost) {
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

    const isPC = useMediaQuery({query : "(min-width: 700px)"});

    return (
        <div className="main" css={mainStyle}>
            {isPC
                ? <ComputerChat roomList={roomList} rejoin={rejoin} setRejoin={setRejoin} remake={remake} setRemake={setRemake} isInRoom={isInRoom} setIsInRoom={setIsInRoom} isHost={isHost} setIsHost={setIsHost} roomId={roomId} setRoomId={setRoomId} chatList={chatList} setChatList={setChatList} addMessage={addMessage} setRoomList={setRoomList} chatStyleRef={chatStyleRef} />
                : <MobileChat roomList={roomList} rejoin={rejoin} setRejoin={setRejoin} remake={remake} setRemake={setRemake} isInRoom={isInRoom} setIsInRoom={setIsInRoom} isHost={isHost} setIsHost={setIsHost} roomId={roomId} setRoomId={setRoomId} chatList={chatList} setChatList={setChatList} addMessage={addMessage} setRoomList={setRoomList} chatStyleRef={chatStyleRef} />
            }
            <RoomList fullIds={fullIds} setFullIds={setFullIds} rejoin={rejoin} setRejoin={setRejoin} remake={remake} setRemake={setRemake} roomList={roomList} setRoomList={setRoomList} isInRoom={isInRoom} setIsInRoom={setIsInRoom} isHost={isHost} setIsHost={setIsHost} roomId={roomId} setRoomId={setRoomId} addMessage={addMessage} />
        </div>
    )
}

export default Main