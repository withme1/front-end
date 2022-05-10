/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ModalText from './ModalText';

const style = css`
    display: flex;
    align-items: center;
    font-size: 20px;
`;

const seperatorStyle = css`
    margin-left: 5px;
    margin-right: 3px;
`;

function Start2End({ start, startLoc, end, endLoc }) {
    return (
        <div css={style}>
            <ModalText text={start} loc={startLoc}/>
            <div css={seperatorStyle}>{" → "}</div>
            <ModalText text={end} loc={endLoc}/>
        </div>
    )
}

export default Start2End