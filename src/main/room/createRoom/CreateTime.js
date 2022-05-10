import { TextField } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import { checkTime } from './ValidCheck';

const validColor = "#2BAE66";

const getValidStyle = (d, t) => {
    let colorr = 'none';

    if (checkTime(d, t))
        colorr = validColor
    else
        colorr = 'red'

    return {
        ".MuiInputLabel-root": {
            color: colorr
        },
        ".MuiOutlinedInput-root fieldset": {
            borderColor: colorr
        },
        "svg.MuiSvgIcon-root": {
            color: colorr
        }
    };
}

function CreateTime({ day, time, setTime, textStyle}) {
    const [validStyle, setValidStyle] = useState(() => {
        return getValidStyle(day, time);
    })

    const changeHandler = (t) => {
        console.log(t)
        setTime(t);
        setValidStyle(getValidStyle(day, t));
    }

    return (
        <TimePicker
            inputFormat="A hh시 mm분"
            mask="__:__:__"
            label="출발 시간"
            value={time}
            onChange={changeHandler}
            renderInput={(params) => <TextField sx={[textStyle, validStyle]} {...params} />}
            InputProps={{sx:validStyle}}
        />
    )
}

export default CreateTime