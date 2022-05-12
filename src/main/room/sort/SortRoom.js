/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Modal from 'react-modal/lib/components/Modal'
import SelectLoc from './SelectLoc';

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        borderRadius: "5px",
        border: "1px solid #2BAE66",
        transform: 'translate(-50%, -50%)',
    }
}

const searchRoomDivStyle = css`
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const buttonStyle = {
    borderColor: '#2BAE66',
    color: '#2BAE66',
    '&.Mui-selected': {
        color: '#2BAE66'
    }
};

const submitStyle = css`
    color: #2BAE66;
    border: 1px solid #2BAE66;

    &:hover {
        color: #2BAE66;
        border: 1px solid #2BAE66;
    }
`;

function SearchRoom({ open, setOpen, sortBy, setSortBy, sortLoc, setSortLoc }) {
    const sortByChangeHandler = (event, newValue) => {
        setSortBy(newValue);
    }

    return (
        <Modal
            style={modalStyle}
            isOpen={open}
            onRequestClose={() => setOpen(false)}
            ariaHideApp={false}
        >
            <div css={searchRoomDivStyle}>
                <ToggleButtonGroup value={sortBy} onChange={sortByChangeHandler} exclusive orientation="vertical">
                    <ToggleButton value='start' sx={buttonStyle}>
                        출발지
                    </ToggleButton>
                    <ToggleButton value='end' sx={buttonStyle}>
                        도착지
                    </ToggleButton>
                </ToggleButtonGroup>
                <SelectLoc loc={sortLoc} setLoc={setSortLoc} />
                <br />
                <Button css={submitStyle} onClick={()=>setOpen(false)} variant="outlined">확인</Button>
            </div>
        </Modal>
    )
}

export default SearchRoom