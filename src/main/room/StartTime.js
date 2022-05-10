/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const style = css`
    display: flex;
    align-items: center;
    padding-right: 5px;
    border-right: 1px solid #FCF6F5;
    font-size: 15px;
`;

function StartTime({ time }) {
    return (
        <div css={style}>
            {time.format('HH시 mm분')}
        </div>
    )
}

export default StartTime