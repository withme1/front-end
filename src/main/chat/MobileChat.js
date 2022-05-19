/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Box, Drawer } from '@mui/material';
import Chat from './Chat';

const buttonStyle = css`
    border-color: #2BAE66;
`;

const chatStyle = css`
      width: 100%;
      height: 100%;
      border-radius: 3px;
      padding-bottom: 3px;
`;

const pullerSytle = {
    width: 30,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
};

function MobileChat({ roomList, remake, setRemake, isInRoom, setIsInRoom, isHost, setIsHost, roomId, setRoomId, chatList, setChatList, addMessage, setRoomList, chatStyleRef }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Drawer
                anchor="bottom"
                open={open}
                PaperProps={{ style: { height: "90%", width: "100%", overflow: 'visible', borderRadius: '5px', backgroundColor: '#fcf6f5', fontSize: '1.3em' } }}
                onClose={() => open ? setOpen(false) : setOpen(true)}
                ModalProps={{
                    keepMounted: true
                }}
            >
                <Box
                    onClick={() => setOpen(!open)}
                    sx={{
                        position: 'absolute',
                        top: -30,
                        backgroundColor: 'white',
                        border: '1px solid #2BAE66',
                        borderBottom: '0px',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: '30%',
                        left: '30%',
                        height: '30px',
                    }}
                >
                    <Box sx={pullerSytle} />
                </Box>
                <div css={chatStyle} onClick={()=>setOpen(true)}>
                    <Chat roomList={roomList} remake={remake} setRemake={setRemake} isInRoom={isInRoom} setIsInRoom={setIsInRoom} isHost={isHost} setIsHost={setIsHost} roomId={roomId} setRoomId={setRoomId} chatList={chatList} setChatList={setChatList} addMessage={addMessage} setRoomList={setRoomList} chatStyleRef={chatStyleRef} />
                </div>
            </Drawer>
        </>
    )
}

export default MobileChat