/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import { getSocket } from '../../socket/socket'

const buttonStyle = css`
    border: 1px solid #FCF6F5;
    color: #FCF6F5;
    font-size: 15px;
    
    
    &:hover {
        color: #FCF6F5;
    }
`;

function EnterButton({ roomId, setRejoin, enterId, isInRoom, isHost }) {
  const clickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (enterId === roomId) {
      window.alert('이미 들어간 방입니다.');
      return;
    }
    if (!isInRoom) {
      getSocket().emit('joinRoomReq', enterId);
      return;
    }
    let message;
    if (isHost)
      message = '기존 방은 삭제하시겠습니까?';
    else
      message = '기존 방에서는 퇴장하시겠습니까?';
    if (window.confirm(message)) {
      if (isHost) {
        getSocket().emit('deleteRoomReq');
      } else {
        getSocket().emit('quitRoomReq')
      }
      setRejoin(enterId);
    }
  }

  return (
    <>
      <Button css={buttonStyle} onClick={clickHandler}>입장</Button>
    </>
  )
}

export default EnterButton