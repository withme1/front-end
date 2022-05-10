import { TextField } from '@mui/material'
import React, { useState } from 'react'
import SelectLoc from './SelectLoc'
import { checkText } from './ValidCheck';

const validColor = "#2BAE66";

const getValidStyle = (s) => {
    let colorr = 'none';

    if (s.length === "")
        colorr = 'none';
    else if (checkText(s))
        colorr = validColor
    else
        colorr = 'red'

    return {
        ".MuiInputLabel-root": {
            color: colorr
        },
        ".MuiOutlinedInput-root fieldset": {
            borderColor: colorr
        }
    };
}

function CreateLocInput({ label, textStyle, text, setText, loc, setLoc }) {
    const [textValidStyle, setTextValidStyle] = useState(() => {
        return getValidStyle(text);
    });

    const changeHandler = (e) => {
        const value = e.target.value;
        setText(value);
        setTextValidStyle(getValidStyle(value))
    }

    return (
        <>
            <TextField sx={[textStyle, textValidStyle]} value={text} onChange={changeHandler} id="outlined-basic" label={label} variant="outlined" />
            <SelectLoc loc={loc} setLoc={setLoc} />
        </>
    )
}

export default CreateLocInput