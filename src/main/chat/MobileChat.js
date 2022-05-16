/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { SwipeableDrawer } from '@mui/material';
import Chat from './Chat';

const buttonStyle = css`
    border-color: #2BAE66;

    @media (min-width: 950px) {
        display: none;
      }
`;

const chatStyle = css`
      width: 300px;
      height: 100%;
`;

function MobileChat({remake, setRemake, isInRoom, setIsInRoom, isHost, setIsHost, roomId, setRoomId, chatList, setChatList, addMessage, setRoomList, chatStyleRef}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button css={buttonStyle} onMouseEnter={() => setOpen(true)}>
                &gt;
            </button>
            <SwipeableDrawer
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => { }}
            >
                <div css={chatStyle}>
                    <Chat remake={remake} setRemake={setRemake} isInRoom={isInRoom} setIsInRoom={setIsInRoom} isHost={isHost} setIsHost={setIsHost} roomId={roomId} setRoomId={setRoomId} chatList={chatList} setChatList={setChatList} addMessage={addMessage} setRoomList={setRoomList} chatStyleRef={chatStyleRef}/>
                </div>
            </SwipeableDrawer>
        </>
    )
}

export default MobileChat