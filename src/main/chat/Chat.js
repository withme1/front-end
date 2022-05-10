/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const chatStyle = css`
  border: 1px solid black;
  border-radius: 3px;
  height: calc(100% - 8px);
  margin: 3px;
`;

function Chat() {
  return (
    <div css={chatStyle}>
      hihi
    </div>
  )
}

export default Chat;