/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Chat from './Chat';

const chatStyle = css`
  height: calc(100vh - 85px);
  width: 250px;

  @media (max-width: 950px) {
    display: none;
  }
`;

function ComputerChat({remake, setRemake, isInRoom, setIsInRoom, isHost, setIsHost, roomId, setRoomId, chatList, setChatList, addMessage, setRoomList, chatStyleRef}) {
  return (
    <div css={chatStyle}>
        <Chat remake={remake} setRemake={setRemake} isInRoom={isInRoom} setIsInRoom={setIsInRoom} isHost={isHost} setIsHost={setIsHost} roomId={roomId} setRoomId={setRoomId} chatList={chatList} setChatList={setChatList} addMessage={addMessage} setRoomList={setRoomList} chatStyleRef={chatStyleRef}/>
    </div>
  )
}

export default ComputerChat;