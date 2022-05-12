/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const formStyle = css`
display: flex;
padding: 3px 6px;
display: flex;
flex-direction: row-reverse;
`;

const itemStyle = css`
display: inline-block;
word-break: break-all;
background-color: #2BAE66;
border-radius: 13px;
border-bottom-right-radius: 0px;
padding: 4px 7px;
color: #FCF6F5;
`;

function MyChat({ text, time }) {
    return (
        <div css={formStyle}>
            <div css={css`display:flex; flex-direction:column`}>
                <div css={itemStyle}>
                    {text}
                </div>
                <div css={css`display:flex; flex-direction:row-reverse; font-size:0.3em`}>
                    {time.format('A hh:mm')}
                </div>
            </div>
        </div>
    )
}

export default MyChat