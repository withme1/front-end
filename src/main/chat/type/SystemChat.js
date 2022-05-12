/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const formStyle = css`
display: flex;
padding: 3px 6px;
display: flex;
flex-direction: row;
justify-content: center;
`;

const itemStyle = css`
display: inline-block;
word-break: break-all;
border: 1px solid #2BAE66;
border-radius: 10px;
padding: 2px 5px;
color: #2BAE66;
font-size: 0.7em;
`;

function SystemChat({ text, time }) {
    return (
        <div css={formStyle}>
            <div css={itemStyle}>
                {text}
            </div>
        </div>
    )
}

export default SystemChat