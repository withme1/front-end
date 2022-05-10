/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

const chatStyle = css`
  height: calc(100% - 8px);
  margin: 3px;

  display: flex;
  flex-direction: column;
`;

const viewStyle = css`
  flex-grow: 1;
  border: 1px solid black;
`;

const textFieldStyle = {
  flexGrow: '1',
  '.MuiOutlinedInput-root input': {
    padding: "5px;",
    fontSize: '0.8em',
    height: '20px'
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

function Chat() {
  const [chatList, setChatList] = useState([]);

  const chatHandler = (e) => {
    e.preventDefault();
  }

  return (
    <div css={chatStyle}>
      <div css={viewStyle}>

      </div>
      <form css={css`display:flex;height:30px;`} onSubmit={chatHandler}>
        <TextField sx={textFieldStyle} />
        <Button variant="contained" sx={sendButtonStyle} onClick={chatHandler}>보내기</Button>
      </form>
    </div>
  )
}

export default Chat;