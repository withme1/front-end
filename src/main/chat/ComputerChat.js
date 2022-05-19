/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Chat from './Chat';

const chatStyle = css`
  height: calc(var(--vh, 1vh) * 100 - 85px);
  width: 250px;
  padding-bottom: 2px;
`;

function ComputerChat({ roomList, remake, setRemake, isInRoom, setIsInRoom, isHost, setIsHost, roomId, setRoomId, chatList, setChatList, addMessage, setRoomList, chatStyleRef}) {
  return (
    <div css={chatStyle}>
        <Chat roomList={roomList} remake={remake} setRemake={setRemake} isInRoom={isInRoom} setIsInRoom={setIsInRoom} isHost={isHost} setIsHost={setIsHost} roomId={roomId} setRoomId={setRoomId} chatList={chatList} setChatList={setChatList} addMessage={addMessage} setRoomList={setRoomList} chatStyleRef={chatStyleRef}/>
    </div>
  )
}

export default ComputerChat;