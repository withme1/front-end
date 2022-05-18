/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ModalText from './ModalText';

const style = css`
    display: flex;
    align-items: center;
    font-size: 20px;
`;

function Start2End({ start, startLoc, end, endLoc }) {
    return (
        <div css={style}>
            <ModalText start={start} startLoc={startLoc} end={end} endLoc={endLoc}/>
        </div>
    )
}

export default Start2End