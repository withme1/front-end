/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fab, List, ListItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Room from './Room';
import CreateRoom from './createRoom/CreateRoom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import birdImg from '../../img/bird.png'
import SortRoom from './sort/SortRoom';
import { getDistance } from '../util/getDistance';

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

const openSortButtonStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 85,
    left: 'auto',
    position: 'fixed',
    color: "#2BAE66",
    backgroundColor: "white"
};

const noRoomStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;

    flex-grow: 1;

    height: calc(100vh - 90px);

    font-size: 4em;
`;

function RoomList() {
    const [openCreateRoom, setOpenCreateRoom] = useState(false);
    const [openSort, setOpenSort] = useState(false);
    const [sortBy, setSortBy] = useState('start');
    const [sortLoc, setSortLoc] = useState(() => { return { latitude: 36.76969121081084, longitude: 126.94982606139604 } });
    const [roomList, setRoomList] = useState([]);

    const addRoom = (room) => {
        setRoomList((prev) => [...prev, room].sort((a, b) => {
            if (sortBy === 'start') {
                return getDistance(a.startLoc.latitude, a.startLoc.longitude, sortLoc.latitude, sortLoc.longitude) - getDistance(b.startLoc.latitude, b.startLoc.longitude, sortLoc.latitude, sortLoc.longitude)
            } else if (sortBy === 'end') {
                return getDistance(a.endLoc.latitude, a.endLoc.longitude, sortLoc.latitude, sortLoc.longitude) - getDistance(b.endLoc.latitude, b.endLoc.longitude, sortLoc.latitude, sortLoc.longitude)
            } else {
                return 0;
            }
        }))
    }

    const reload = () => {
        axios.get('http://211.229.250.42:25030/api/room_list')
            .then((res) => {
                const data = res.data;
                setRoomList(data.map((d) => {
                    return { id: d.id, start: d.SrcText, end: d.DestText, startLoc: { latitude: d.SrcLatitude, longitude: d.SrcLongitude }, endLoc: { latitude: d.DestLatitude, longitude: d.DestLongitude }, date: dayjs(d.date), time: dayjs('2020-01-01 ' + d.time) };
                }).sort((a, b) => {
                    if (sortBy === 'start') {
                        return getDistance(a.startLoc.latitude, a.startLoc.longitude, sortLoc.latitude, sortLoc.longitude) - getDistance(b.startLoc.latitude, b.startLoc.longitude, sortLoc.latitude, sortLoc.longitude)
                    } else if (sortBy === 'end') {
                        return getDistance(a.endLoc.latitude, a.endLoc.longitude, sortLoc.latitude, sortLoc.longitude) - getDistance(b.endLoc.latitude, b.endLoc.longitude, sortLoc.latitude, sortLoc.longitude)
                    } else {
                        return 0;
                    }
                }))
            })
    }

    const sortRoomClickHandler = (e) => {
        e.preventDefault();
        setOpenSort(true);
    }

    const createRoomClickHandler = (e) => {
        e.preventDefault();
        setOpenCreateRoom(true);
    }

    useEffect(() => {
        reload();
    }, [sortLoc, sortBy])// eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>
            {roomList.length === 0
                ? <div css={noRoomStyle}><img src={birdImg} alt='noRoom' css={css`position:relative;bottom:30px;width:128px;height:auto`} /><pre> . . .</pre></div>
                : <List
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
            }
            <Fab style={openSortButtonStyle} onClick={sortRoomClickHandler}>
                <SearchIcon />
            </Fab>
            <SortRoom open={openSort} setOpen={setOpenSort} sortBy={sortBy} setSortBy={setSortBy} sortLoc={sortLoc} setSortLoc={setSortLoc} />
            <Fab style={createRoomButtonStyle} onClick={createRoomClickHandler}>
                <AddIcon />
            </Fab>
            <CreateRoom open={openCreateRoom} setOpen={setOpenCreateRoom} addRoom={addRoom} />
        </>
    )
}

export default RoomList