/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import { getSocket } from '../../socket/socket'
import { useEffect } from 'react';

const buttonStyle = css`
    border: 1px solid #FCF6F5;
    color: #FCF6F5;
    font-size: 15px;
    
    
    &:hover {
        color: #FCF6F5;
    }
`;

function EnterButton({ enterId }) {
  const clickHandler = (e) => {
    e.preventDefault();
    getSocket().emit('joinRoomReq', enterId);
  }

  return (
    <>
      <Button css={buttonStyle} onClick={clickHandler}>입장</Button>
    </>
  )
}

export default EnterButton