/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import { getSocket } from '../../socket/socket';
import ChatMapInfo from './ChatMapInfo'
import { useMediaQuery } from 'react-responsive';

function ChatRoomInfo({ room, isInRoom, isHost }) {
    const leaveHandler = (e) => {
        if (!isInRoom)
            return;
        if (isHost)
            getSocket().emit('deleteRoomReq');
        else
            getSocket().emit('quitRoomReq');
    }

    const isPC = useMediaQuery({query : "(min-width: 700px)"});

    const timeSytle = {
        boxShadow: "0 0 0",
        backgroundColor: "#2BAE66",
        padding: "0px",
        fontSize: '0.8em',
        width: isPC ? '55px' : '100px',
        minWidth: 'none',
    
        "&:hover": {
            boxShadow: "0 0 0",
            backgroundColor: "#2BAE66"
        }
    };
    
    const leaveButtonStyle = {
        boxShadow: "0 0 0",
        backgroundColor: "#ff5b5b",
        padding: "0px",
        fontSize: '0.8em',
        width: isPC ? '55px' : '100px',
        minWidth: 'none',
        "&:hover": {
            boxShadow: "0 0 0",
            backgroundColor: "#ff5b5b"
        }
    };

    return (
        <div css={css`height: ${isPC ? '30px' : '40px'}; display: flex; justify-content: space-evenly; padding: 3px 0px;${isPC ? '' : 'font-size: 1.5em'}`}>
            <Button variant="contained" sx={timeSytle} onClick={() => { }}>{room.time.format('HH:mm')}</Button>
            <ChatMapInfo room={room}/>
            <Button variant="contained" sx={leaveButtonStyle} onClick={leaveHandler}>{isHost ? '방 삭제' : '방 퇴장'}</Button>
        </div>
    )
}

export default ChatRoomInfo