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

function ComputerChat() {
  return (
    <div css={chatStyle}>
        <Chat />
    </div>
  )
}

export default ComputerChat;