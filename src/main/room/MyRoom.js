/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import EnterButton from './EnterButton';
import StartTime from './StartTime';
import Start2End from './Start2End';
import HouseIcon from '@mui/icons-material/House';
import { IconButton } from '@mui/material';
import { useState } from 'react';

const roomStyle = css`
    display: flex;
    
    justify-content: space-between;
    align-items: stretch;

    margin: 2px;
    padding: 6px;
    width: 99%;

    border-radius: 5px;

    background-color: #5CA00C;
    color: #FCF6F5;

    box-shadow: 3px 3px 3px gray;
    
`;

function MyRoom({ setRejoin, roomData, isInRoom, setIsInRoom, isHost, setIsHost, roomId, setRoomId }) {
    const [openMap, setOpenMap] = useState(false);

    const closeMap = () => {
        setOpenMap(false);
    }

    const clickHandler = () => {
        if (!openMap){
            setOpenMap(true)
        }
    }

    return (
        <div css={roomStyle} onClick={clickHandler}>
            <StartTime time={roomData.time} />
            <Start2End closeMap={closeMap} openMap={openMap} setOpenMap={setOpenMap} start={roomData.start} startLoc={roomData.startLoc} end={roomData.end} endLoc={roomData.endLoc} />
            <div css={css`display:flex; justify-content: center; border-radius: 4px; border: 1px white solid; padding: 6px 8px; width: 46px; height: 26.25px;`}>
                <HouseIcon />
            </div>
        </div>
    )
}

export default MyRoom