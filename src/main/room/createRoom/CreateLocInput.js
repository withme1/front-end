import { TextField } from '@mui/material'
import React, { useState } from 'react'
import SelectLoc from './SelectLoc'
import { checkText } from './ValidCheck';

const validColor = "#2BAE66";

const getColorStyle = (c) => {
    return {
        ".MuiInputLabel-root": {
            color: c
        },
        ".MuiOutlinedInput-root fieldset": {
            borderColor: c
        }
    };
}

function CreateLocInput({ label, color, setColor, textStyle, text, setText, loc, setLoc, activate, setActivate }) {

    const changeHandler = (e) => {
        const value = e.target.value.trim();
        setText(value);
        setColor(checkText(value) ? validColor : 'red');
    }

    return (
        <>
            <TextField sx={[textStyle, getColorStyle(color)]} value={text} onChange={changeHandler} id="outlined-basic" label={label} variant="outlined" />
            <SelectLoc loc={loc} setLoc={setLoc} text={label} activate={activate} setActivate={setActivate}/>
        </>
    )
}

export default CreateLocInput