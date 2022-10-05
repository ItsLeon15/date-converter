'use strict'

function getDate(type, sep, date) {
    date = new Date()
    let characters = [
        '-', '/', ':', ' ', '.', ',', ';', '|', '_', '+', '*', '#',
        '@', '$', '%', '^', '&', '(', ')', '[', ']', '{', '}', '<',
         '>', '?', '`', '~', '=', '!',
    ]
    switch (type) {
        case 'date':
            if (characters.includes(sep)) {
                let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
                return `${day}${sep}${date.getMonth() + 1}${sep}${date.getFullYear()}`
            } else {
                throw new Error('Invalid separator')
            }
        case 'time':
            if (characters.includes(sep)) {
                return `${date.getHours()}${sep}${date.getMinutes()}${sep}${date.getSeconds()}`
            } else {
                throw new Error('Invalid separator')
            }
        case 'datetime':
            if (characters.includes(sep)) {
                let seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
                let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
                return `${day}${sep}${date.getMonth() + 1}${sep}${date.getFullYear()} ${date.getHours()}${sep}${date.getMinutes()}${sep}${seconds}`
            } else {
                throw new Error('Invalid separator')
            }
        case 'timestamp':
            return date.getTime()
        default:
            if (characters.includes(sep)) {
                return `${date.getDate()}${sep}${date.getMonth() + 1}${sep}${date.getFullYear()} ${date.getHours()}${sep}${date.getMinutes()}${sep}${date.getSeconds()}`   
            } else {
                throw new Error('Invalid separator')
            }
    }
}

function formatDate(date, format) {
    date = new Date(date)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let milliseconds = date.getMilliseconds()    
    
    let getMonthName = (month) => {
        switch (month) {
            case 1:
                return 'January'
            case 2:
                return 'February'
            case 3:
                return 'March'
            case 4:
                return 'April'
            case 5:
                return 'May'
            case 6:
                return 'June'
            case 7:
                return 'July'
            case 8:
                return 'August'
            case 9:
                return 'September'
            case 10:
                return 'October'
            case 11:
                return 'November'
            case 12:
                return 'December'
        }
    }

    let getDayName = (day) => {
        switch (day) {
            case 1:
                return 'Sunday'
            case 2:
                return 'Monday'
            case 3:
                return 'Tuesday'
            case 4:
                return 'Wednesday'
            case 5:
                return 'Thursday'
            case 6:
                return 'Friday'
            case 7:
                return 'Saturday'
        }
    }

    let time = {
        y: year,
        yy: year.toString().slice(2),
        yyy: year.toString().slice(1),
        yyyy: year,
        M: month,
        MM: month < 10 ? `0${month}` : month,
        MMM: getMonthName(month, 'short'),
        MMMM: getMonthName(month, 'long'),
        d: day,
        dd: day < 10 ? `0${day}` : day,
        ddd: getDayName(day, 'short'),
        dddd: getDayName(day, 'long'),
        h: hours,
        hh: hours < 10 ? `0${hours}` : hours,
        m: minutes,
        mm: minutes < 10 ? `0${minutes}` : minutes,
        s: seconds,
        ss: seconds < 10 ? `0${seconds}` : seconds,
        ms: milliseconds,
        t: hours < 12 ? 'AM' : 'PM',
        tt: hours < 12 ? 'am' : 'pm',
        T: hours < 12 ? 'A' : 'P',
        TT: hours < 12 ? 'a' : 'p',
    }

    return format.replace(/(y+|M+|d+|h+|m+|s+|t+|T+|ms)/g, (match, key) => {
        return time[key]
    })
}

function transformDate(date, format, newFormat) {
    let newDate = formatDate(date, format)
    return formatDate(newDate, newFormat)
}

function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
}

function getDaysInYear(year) {
    return isLeapYear(year) ? 366 : 365
}

function isLeapYear(year) {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0
}

function getWeekNumber(date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        date = formatDate(date, 'yyyy-MM-dd')
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        throw new Error('Invalid date format')
    }
    date = new Date(date)
    let firstDay = new Date(date.getFullYear(), 0, 1)
    let firstDayWeek = firstDay.getDay()
    let dayOfYear = Math.floor((date.getTime() - firstDay.getTime()) / 86400000)
    let weekNumber = Math.ceil((dayOfYear + (firstDayWeek + 6) % 7) / 7)
    return weekNumber
}

function convertDateTo(date, type) {
    date = new Date(date)
    switch (type) {
        case 'months':
            return date.getMonth()
        case 'days':
            return date.getDate()
        case 'hours':
            return date.getHours()
        case 'minutes':
            return date.getMinutes()
        default:
            throw new Error('Invalid or no type specified')
    }
}

module.exports = {
    getDate,
    formatDate,
    transformDate,
    getDaysInMonth,
    getDaysInYear,
    getWeekNumber,
    convertDateTo
}