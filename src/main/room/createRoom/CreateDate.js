import { TextField } from '@mui/material';
import { DesktopDatePicker, PickersDay } from '@mui/x-date-pickers'
import dayjs from 'dayjs';
import React, { useState } from 'react'
import { checkDate } from './ValidCheck';

const renderDay = (date, selectedDates, pickersDayProps) => {
    if (dayjs(date).format("YYYYMMDD") === dayjs(selectedDates).format("YYYYMMDD"))
        return <PickersDay {...pickersDayProps} sx={{ backgroundColor: "#2BAE66 !important" }} />;
    return <PickersDay {...pickersDayProps} />;
}

const validColor = "#2BAE66";

const getValidStyle = (d) => {
    let colorr = 'none';

    if (checkDate(d))
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

function CreateDate({ day, setDay, textStyle}) {
    const [validStyle, setValidStyle] = useState(() => {
        return getValidStyle(day);
    })

    const changeHandler = (v) => {
        setDay(v);
        setValidStyle(getValidStyle(v));
    }

    return (
        <DesktopDatePicker
            minDate={dayjs()}
            renderDay={renderDay}
            label="출발일"
            inputFormat="YYYY년 MM월 DD일"
            value={day}
            onChange={changeHandler}
            renderInput={(params) => <TextField sx={[textStyle, validStyle]} {...params} />}
            mask="____년 __월 __일"
            InputProps={{sx:validStyle}}
        />
    )
}

export default CreateDate