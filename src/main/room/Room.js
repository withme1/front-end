/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import EnterButton from './EnterButton';
import StartTime from './StartTime';
import Start2End from './Start2End';

const roomStyle = css`
    display: flex;
    
    justify-content: space-between;
    align-items: stretch;

    margin: 2px;
    padding: 6px;
    width: 99%;

    border-radius: 5px;

    background-color: #2BAE66;
    color: #FCF6F5;

    box-shadow: 3px 3px 3px gray;
    
`;

function Room({ setRejoin, roomData, isInRoom, setIsInRoom, isHost, setIsHost, roomId, setRoomId }) {
    return (
        <div css={roomStyle}>
            <StartTime time={roomData.time} />
            <Start2End start={roomData.start} startLoc={roomData.startLoc} end={roomData.end} endLoc={roomData.endLoc} />
            <EnterButton roomId={roomId} setRejoin={setRejoin} enterId={roomData.id} isInRoom={isInRoom} isHost={isHost}/>
        </div>
    )
}

export default Room