import dayjs from "dayjs";

export const checkText = (s) => {
    if (s === '' || s.length > 10) {
        return false;
    }

    return true;
}

export const checkDate = (d) => {
    if (dayjs(d.format('YYYY-MM-DD')) >= dayjs((dayjs().format('YYYY-MM-DD')))) {
        return true;
    } else {
        return false;
    }
}

export const checkTime = (d, t) => {
    if (d.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')) {
        if (dayjs('2020-01-01 ' + t.format('HH:mm')) < dayjs('2020-01-01 ' + dayjs().format('HH:mm'))) {
            return false;
        }
    }
    return true;
} 