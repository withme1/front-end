/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { SwipeableDrawer } from '@mui/material';
import Chat from './Chat';

const buttonStyle = css`
    border-color: #2BAE66;

    @media (min-width: 950px) {
        display: none;
      }
`;

const chatStyle = css`
      width: 300px;
      height: 100%;
`;

function MobileChat() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button css={buttonStyle} onMouseEnter={() => setOpen(true)}>
                &gt;
            </button>
            <SwipeableDrawer
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => { }}
            >
                <div css={chatStyle}>
                    <Chat />
                </div>
            </SwipeableDrawer>
        </>
    )
}

export default MobileChat