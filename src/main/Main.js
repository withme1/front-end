/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ComputerChat from './chat/ComputerChat';
import MobileChat from './chat/MobileChat';
import RoomList from './room/RoomList';

const mainStyle = css`
    display: flex;
    align-items: stretch;
`;

function Main() {
    return (
        <div className="main" css={mainStyle}>
            <MobileChat />
            <ComputerChat/>
            <RoomList/>
        </div>
    )
}

export default Main