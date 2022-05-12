/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import MyChat from './type/MyChat';
import OtherChat from './type/OtherChat';
import SystemChat from './type/SystemChat';


const viewStyle = css`
  flex-grow: 1;
  border: 1px solid #2BAE66;
  border-radius: 5px;
  overflow-y: scroll;
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  display: flex;
  flex-direction: column;
`;

function ChatView() {
    const [chatList, setChatList] = useState([
        { type: 'system', text: '상대 입장', time: dayjs() },
        { type: 'other', text: 'hihi', time: dayjs() },
        { type: 'me', text: 'hihdddddddddddddddddddddddddddddddddddddddddi', time: dayjs() },
        { type: 'me', text: 'hhiihi', time: dayjs() }]);
    return (
        <div css={viewStyle}>
            {chatList.map((chat, i) => {
                if (chat.type === 'me')
                    return <MyChat text={chat.text} time={chat.time} key={i} />
                else if (chat.type === 'other')
                    return <OtherChat text={chat.text} time={chat.time} key={i} />
                else if (chat.type === 'system')
                    return <SystemChat text={chat.text} time={chat.time} key={i} />
                return null;
            })}
        </div>
    )
}

export default ChatView