/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useMediaQuery } from 'react-responsive';

const formStyle = css`
    display: flex;
    padding: 3px 6px;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

function SystemChat({ text, time }) {
    const isPC = useMediaQuery({ query: "(min-width: 700px)" });

    const itemStyle = css`
        display: inline-block;
        word-break: break-all;
        border: 1px solid #2BAE66;
        border-radius: 10px;
        padding: 2px 5px;
        color: #2BAE66;
        font-size: ${isPC ? '0.7' : '1'}em;
    `;

    return (
        <div css={formStyle}>
            <div css={itemStyle}>
                {text}
            </div>
        </div>
    )
}

export default SystemChat