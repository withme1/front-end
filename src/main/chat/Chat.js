/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, TextField } from '@mui/material';
import ChatView from './ChatView';
import { getSocket } from '../../socket/socket'
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import ChatRoomInfo from './ChatRoomInfo';

const chatStyle = css`
  height: calc(100% - 8px);
  margin: 3px;

  display: flex;
  flex-direction: column;
`;

const textFieldStyle = {
  flexGrow: '1',
  '.MuiOutlinedInput-root input': {
    padding: "5px;",
    fontSize: '0.8em',
    height: '20px',
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
  width: '55px',
  minWidth: '55px',

  "&:hover": {
    boxShadow: "0 0 0",
    backgroundColor: "#2BAE66"
  }
};

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

  return (
    <div css={chatStyle}>
      { isInRoom ? <ChatRoomInfo room={roomList.find(room => room.id === roomId)} isInRoom={isInRoom} isHost={isHost}/> : <></>}
      <ChatView chatList={chatList} setChatList={setChatList} chatStyleRef={chatStyleRef} />
      <form css={css`display:flex;height:30px;`} onSubmit={chatHandler}>
        <TextField autoComplete='off' sx={textFieldStyle} value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button variant="contained" sx={sendButtonStyle} onClick={chatHandler}>보내기</Button>
      </form>
    </div>
  )
}

export default Chat;