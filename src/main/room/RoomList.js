/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fab, List, ListItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Room from './Room';
import CreateRoom from './createRoom/CreateRoom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

const roomListStyle = css`
    flex-grow: 1;

    height: calc(100vh - 90px);
    padding: 3px;
    
    overflow: auto;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #2BAE66;
    }
    &::-webkit-scrollbar-track {
        background-color: #DCEDC8;
    }
`;

const listItemStyle = css`
    padding: 2px;
`;

const createRoomButtonStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    color: "#2BAE66",
    backgroundColor: "white"
};

function RoomList() {
    const [open, setOpen] = useState(false);
    const [roomList, setRoomList] = useState([]);

    const clickHandler = (e) => {
        e.preventDefault();
        setOpen(true);
    }

    useEffect(() => {
        axios.get('http://211.229.250.42:25030/api/room_list')
            .then((res) => {
                const data = res.data;
                setRoomList(data.map((d) => {
                   return {id: d.key, start: d.SrcText, end: d.DestText, startLoc: {latitude: d.SrcLatitude, longitude: d.SrcLongitude}, endLoc: {latitude: d.DestLatitude, longitude: d.DestLongitude}, time: dayjs(dayjs(d.date).format('YYYY-MM-DD ') + dayjs('2020-01-01 '+d.time).format('HH:mm:ss'))};;
                }))
            })
    }, [])

    return (
        <>
            <List
                css={roomListStyle}
            >
                {roomList.map((data) => {
                    return (
                        <ListItem key={data.id} css={listItemStyle}>
                            <Room roomData={data} />
                        </ListItem>
                    )
                })}
            </List>
            <Fab style={createRoomButtonStyle} onClick={clickHandler}>
                <AddIcon />
            </Fab>
            <CreateRoom open={open} setOpen={setOpen} />
        </>
    )
}

export default RoomList