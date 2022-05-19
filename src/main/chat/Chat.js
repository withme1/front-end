/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, TextField } from '@mui/material';
import ChatView from './ChatView';
import { getSocket } from '../../socket/socket'
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import ChatRoomInfo from './ChatRoomInfo';
import { useMediaQuery } from 'react-responsive';

const chatStyle = css`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const checkMessage = (m) => {
  if (m === '')
    return false;
  return true;
}

function Chat({ roomList, remake, setRemake, isInRoom, setIsInRoom, isHost, setIsHost, roomId, setRoomId, chatList, setChatList, addMessage, setRoomList, chatStyleRef }) {
  const [message, setMessage] = useState('');

  const chatHandler = (e) => {
    e.preventDefault();
    if (!isInRoom)
      return;

    if (checkMessage(message))
      getSocket().emit('sendMessageReq', { message: message, time: dayjs().format('HH:mm:ss') });
  }

  useEffect(() => {
    getSocket().removeAllListeners("sendMessageRes");
    getSocket().on('sendMessageRes', (res) => {
      if (res.ok) {
        addMessage({ type: 'me', text: res.message, time: dayjs('2020-01-01 ' + res.time) });
        setMessage('');
      } else {
        alert(res.reason)
      }
    })
    getSocket().removeAllListeners("messageReceived");
    getSocket().on('messageReceived', (res) => {
      addMessage({ type: 'other', text: res.message, time: dayjs('2020-01-01 ' + res.time) });
    })
  }, [])

  const isPC = useMediaQuery({query : "(min-width: 700px)"});

  const textFieldStyle = {
    flexGrow: '1',
    '.MuiOutlinedInput-root': {
      height: '100%'
    },
    '.MuiOutlinedInput-root input': {
      padding: "5px;",
      fontSize: '1.3em',
      height: '100%',
    },
    '.MuiOutlinedInput-root fieldset': {
      borderColor: 'green',
    },
    '.MuiOutlinedInput-root.Mui-focused fieldset': {
      borderColor: 'green',
    }
  };
  
  const sendButtonStyle = {
    boxShadow: "0 0 0",
    backgroundColor: "#2BAE66",
    padding: "0px",
    fontSize: '0.8em',
    width: isPC ? '45px' : '80px',
    
    minWidth: 'none',
  
    "&:hover": {
      boxShadow: "0 0 0",
      backgroundColor: "#2BAE66"
    }
  };

  return (
    <div css={chatStyle}>
      { isInRoom ? <ChatRoomInfo room={roomList.find(room => room.id === roomId)} isInRoom={isInRoom} isHost={isHost}/> : <></>}
      <ChatView chatList={chatList} setChatList={setChatList} chatStyleRef={chatStyleRef} />
      <form css={css`display: flex; height: ${isPC ? '30px' : '40px'};`} onSubmit={chatHandler}>
        <TextField autoComplete='off' sx={textFieldStyle} value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button variant="contained" sx={sendButtonStyle} onClick={chatHandler}>보내기</Button>
      </form>
    </div>
  )
}

export default Chat;