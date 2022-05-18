/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ModalText from './ModalText';

const style = css`
    display: flex;
    align-items: center;
    font-size: 20px;
`;

function Start2End({ closeMap, openMap, setOpenMap, start, startLoc, end, endLoc }) {
    return (
        <div css={style}>
            <ModalText closeMap={closeMap} open={openMap} setOpen={setOpenMap} start={start} startLoc={startLoc} end={end} endLoc={endLoc}/>
        </div>
    )
}

export default Start2End