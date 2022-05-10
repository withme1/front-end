/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import { Box, } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import 'dayjs/locale/ko';
import CreateLocInput from './CreateLocInput';
import CreateDate from './CreateDate';
import CreateTime from './CreateTime';


const dayjs = require("dayjs");
dayjs.locale('ko');

const modalStyle = {
    content: {
        top: '10vh',
        left: 'calc(50vw - 160px)',
        right: 'calc(50vw - 160px)',
        bottom: '10vh',
        borderRadius: "5px",
        border: "1px solid #2BAE66"
    }
}

const createRoomDivStyle = css`
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
`;

const inputComponentStyle = css`
    padding: 10px;
    display: flex;
    justify-content: center;
    color: #FCF6F5;
`;

const submitStyle = css`
    color: #2BAE66;
    border: 1px solid #2BAE66;

    &:hover {
        color: #2BAE66;
        border: 1px solid #2BAE66;
    }
`;

const validColor = "#2BAE66";

const textFieldStyle = {
    ".MuiInputLabel-root.Mui-focused": {
        color: validColor
    },
    ".MuiOutlinedInput-root.Mui-focused fieldset": {
        borderColor: validColor
    }
};

function CreateRoom({ open, setOpen }) {
    const [start, setStart] = useState("");
    const [startLoc, setStartLoc] = useState(null);
    const [end, setEnd] = useState("");
    const [endLoc, setEndLoc] = useState(null);
    const [startDay, setStartDay] = useState(dayjs());
    const [startTime, setStartTime] = useState(dayjs().add(1, 'hour'));

    const isValidInput = () => {
        return true;
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (isValidInput()) {

        }
    }

    return (
        <Modal
            style={modalStyle}
            isOpen={open}
            onRequestClose={() => setOpen(false)}
            ariaHideApp={false}
        >
            <div css={createRoomDivStyle}>
                <Box css={inputComponentStyle}>
                    <CreateLocInput label={"출발지"} textStyle={textFieldStyle} text={start} setText={setStart} loc={startLoc} setLoc={setStartLoc}/>
                </Box>
                <Box css={inputComponentStyle}>
                    <CreateLocInput label={"목적지"} textStyle={textFieldStyle} text={end} setText={setEnd} loc={endLoc} setLoc={setEndLoc}/>
                </Box>
                <br />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box css={inputComponentStyle}>
                        <CreateDate day={startDay} setDay={setStartDay} textStyle={textFieldStyle}/>
                    </Box>
                    <br />
                    <Box css={inputComponentStyle}>
                        <CreateTime day={startDay} time={startTime} setTime={setStartTime} textStyle={textFieldStyle}/>
                    </Box>
                </LocalizationProvider>
                <br />
                <Box css={inputComponentStyle}>
                    <Button css={submitStyle} onClick={submitHandler} variant="outlined">확인</Button>
                </Box>
            </div>
        </Modal >
    )
}

export default CreateRoom