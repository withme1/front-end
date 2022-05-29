/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fab, List, ListItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Room from './Room';
import MyRoom from './MyRoom';
import CreateRoom from './createRoom/CreateRoom';
import { useEffect, useState } from 'react';
import birdImg from '../../img/bird.png'
import SortRoom from './sort/SortRoom';
import { getDistance } from '../util/getDistance';
import { getSocket } from '../../socket/socket';
import dayjs from 'dayjs';
import { useMediaQuery } from 'react-responsive';

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

function RoomList({ clearMessage, fullIds, setFullIds, rejoin, setRejoin, remake, setRemake, roomList, setRoomList, isInRoom, setIsInRoom, isHost, setIsHost, roomId, setRoomId, addMessage }) {
    const [openCreateRoom, setOpenCreateRoom] = useState(false);
    const [openSort, setOpenSort] = useState(false);
    const [sortBy, setSortBy] = useState('start');
    const [sortLoc, setSortLoc] = useState(() => { return { latitude: 0, longitude: 0 } });
    const [openCreateButton, setOpenCreateButton] = useState(true);
    const [openSortButton, setOpenSortButton] = useState(true);

    const [start, setStart] = useState("");
    const [startLoc, setStartLoc] = useState({ latitude: 0, longitude: 0 });
    const [end, setEnd] = useState("");
    const [endLoc, setEndLoc] = useState({ latitude: 0, longitude: 0 });

    const getSortedList = (roomList) => {
        return [...roomList.filter(room => room.id === roomId), ...roomList.filter(room => room.id !== roomId).sort((a, b) => {
            if (sortBy === 'start') {
                return getDistance(a.startLoc.latitude, a.startLoc.longitude, sortLoc.latitude, sortLoc.longitude) - getDistance(b.startLoc.latitude, b.startLoc.longitude, sortLoc.latitude, sortLoc.longitude)
            } else if (sortBy === 'end') {
                return getDistance(a.endLoc.latitude, a.endLoc.longitude, sortLoc.latitude, sortLoc.longitude) - getDistance(b.endLoc.latitude, b.endLoc.longitude, sortLoc.latitude, sortLoc.longitude)
            } else {
                return 0;
            }
        })]
    }

    const addRoom = (room) => {
        setRoomList((prev) => getSortedList([...prev, room]))
    }

    const deleteRoom = (id) => {
        setRoomList((prev) => prev.filter((r) => r.id !== id))
    }

    const sortRoomClickHandler = (e) => {
        e.preventDefault();
        if (startLoc.latitude === 0 && endLoc === 0) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setStartLoc({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
                setEndLoc({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
                setSortLoc({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
                setOpenCreateButton(false);
                setOpenSortButton(false);
                setOpenSort(true);
            }, (e) => {
                alert('위치 권한을 설정해주세요')
            })
        } else {
            setOpenCreateButton(false);
            setOpenSortButton(false);
            setOpenSort(true);
        }
    }

    const createRoomClickHandler = (e) => {
        e.preventDefault();
        if (startLoc.latitude === 0 && endLoc === 0) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setStartLoc({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
                setEndLoc({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
                setSortLoc({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
                setOpenCreateButton(false);
                setOpenSortButton(false);
                setOpenCreateRoom(true);
            }, (e) => {
                alert('위치 권한을 설정해주세요')
            })
        } else {
            setOpenCreateButton(false);
            setOpenSortButton(false);
            setOpenCreateRoom(true);
        }
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                if (startLoc.latitude === 0 && startLoc.longitude === 0) {
                    setStartLoc({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
                }
                if (endLoc.latitude === 0 && endLoc.longitude === 0) {
                    setEndLoc({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
                }
                if (sortLoc.latitude === 0 && sortLoc.longitude === 0) {
                    setSortLoc({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
                }
            }, (e) => { });
        }
    }, [])

    useEffect(() => {
        setRoomList(getSortedList(roomList))
    }, [sortLoc, sortBy])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        getSocket().removeAllListeners('roomCreated');
        getSocket().on('roomCreated', (room) => {
            addRoom({
                id: parseInt(room.id),
                start: room.SrcText,
                end: room.DestText,
                startLoc: { latitude: parseFloat(room.SrcLatitude), longitude: parseFloat(room.SrcLongitude) },
                endLoc: { latitude: parseFloat(room.DestLatitude), longitude: parseFloat(room.DestLongitude) },
                date: dayjs(room.date),
                time: dayjs('2020-01-01 ' + room.time)
            })
        });
        setRoomList((prev) => getSortedList(prev))
    }, [roomId])

    useEffect(() => {
        const soc = getSocket();

        soc.on('roomListRes', (rooms) => {
            setRoomList(getSortedList(rooms.map((room) => ({
                id: parseInt(room.id),
                start: room.SrcText,
                end: room.DestText,
                startLoc: { latitude: parseFloat(room.SrcLatitude), longitude: parseFloat(room.SrcLongitude) },
                endLoc: { latitude: parseFloat(room.DestLatitude), longitude: parseFloat(room.DestLongitude) },
                date: dayjs(room.date),
                time: dayjs('2020-01-01 ' + room.time)
            }))));
        })
        soc.emit('roomListReq');

        soc.on('fullRoomRes', (ids) => {
            setFullIds(new Set(ids.map(id => parseInt(id))));
        })
        soc.emit('fullRoomReq');

        soc.on('roomFulled', (id) => {
            setFullIds((prev) => new Set(prev.add(parseInt(id))));
        })

        soc.on('roomEmptied', (id) => {
            setFullIds((prev) => {
                prev.delete(id);
                return new Set(prev);
            });
        })

        getSocket().on('joinRoomRes', (res) => {
            if (res.ok) {
                clearMessage();
                setRoomId(parseInt(res.id));
                setIsInRoom(true);
                setIsHost(false);
                addMessage({ type: 'system', text: "입장" });
            } else {
                alert(res.reason);
            }
        })

        getSocket().on('roomJoined', (res) => {
            addMessage({ type: 'system', text: "상대 입장" })
        })
    }, [])

    const isPC = useMediaQuery({ query: "(min-width: 700px)" });
    const roomListStyle = css`
        flex-grow: 1;

        height: calc(var(--vh, 1vh) * 100 - 87px${isPC ? '' : ' - 12px'});
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

    const noRoomStyle = css`
        display: flex;
        justify-content: center;
        align-items: center;

        flex-grow: 1;

        height: calc(var(--vh, 1vh) * 100 - 90px${isPC ? '' : ' - 12px'});

        font-size: 4em;
    `;

    return (
        <>
            {roomList.length === 0
                ? <div css={noRoomStyle}><img src={birdImg} alt='noRoom' css={css`position:relative;bottom:30px;width:128px;height:auto`} /><pre> . . .</pre></div>
                : <List
                    css={roomListStyle}
                >
                    {roomList.filter((room) => room.id === roomId || !fullIds.has(room.id)).map((data) => {
                        return (
                            <ListItem key={data.id} css={listItemStyle} >
                                {data.id === roomId
                                    ? <MyRoom setRejoin={setRejoin} roomData={data} isInRoom={isInRoom} setIsInRoom={setIsInRoom} isHost={isHost} setIsHost={setIsHost} roomId={roomId} setRoomId={setRoomId} />
                                    : <Room setRejoin={setRejoin} roomData={data} isInRoom={isInRoom} setIsInRoom={setIsInRoom} isHost={isHost} setIsHost={setIsHost} roomId={roomId} setRoomId={setRoomId} />
                                }
                            </ListItem>
                        )
                    })}
                </List>
            }
            {openSortButton
                ? <Fab style={openSortButtonStyle} onClick={sortRoomClickHandler}>
                    <SearchIcon />
                </Fab>
                : <></>
            }
            <SortRoom setOpenCreateButton={setOpenCreateButton} setOpenSortButton={setOpenSortButton} open={openSort} setOpen={setOpenSort} sortBy={sortBy} setSortBy={setSortBy} sortLoc={sortLoc} setSortLoc={setSortLoc} />
            {openCreateButton
                ? <Fab style={createRoomButtonStyle} onClick={createRoomClickHandler}>
                    <AddIcon />
                </Fab>
                : <></>
            }
            <CreateRoom start={start} setStart={setStart} end={end} setEnd={setEnd} startLoc={startLoc} setStartLoc={setStartLoc} endLoc={endLoc} setEndLoc={setEndLoc} setOpenCreateButton={setOpenCreateButton} setOpenSortButton={setOpenSortButton} clearMessage={clearMessage} rejoin={rejoin} setRejoin={setRejoin} setRoomList={setRoomList} remake={remake} setRemake={setRemake} open={openCreateRoom} setOpen={setOpenCreateRoom} addRoom={addRoom} isInRoom={isInRoom} setIsInRoom={setIsInRoom} isHost={isHost} setIsHost={setIsHost} roomId={roomId} setRoomId={setRoomId} deleteRoom={deleteRoom} addMessage={addMessage} />
        </>
    )
}

export default RoomList