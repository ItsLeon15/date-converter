'use strict'

/**
 * Finds the difference between two dates in days.
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {Number} The difference between the two dates in days.
 */
function findDatesOutsideRangeArray(dateArray, startDate, endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const datesOutsideRange = [];

    for (let i = 0; i < dateArray.length; i++) {
        const date = new Date(dateArray[i]);
        if (date < startDate || date > endDate) {
            datesOutsideRange.push(dateArray[i]);
        }
    }

    return datesOutsideRange;
}

/**
 * Finds any missing dates from a range of dates in an object.
 * @param {Array} dateArray - An array of objects with a date property [{date: 'yyyy-mm-dd', ...}, {date: 'yyyy-mm-dd', ...}, ...]
 * @param {String} dateProperty - The name of the date property in the object (default: 'date')
 * @param {String} dateFormat - The format of the dates in the array (default: 'dd-mm-yyyy')
 * @returns {Array} An array of missing dates between the range.
*/
function findDatesOutsideRangeObject(dateArray, dateProperty = 'date', startDate, endDate, dateFormat = 'dd-mm-yyyy') {

    const formatDate = (date, format) => {
        const year = new Date(date).getFullYear();
        let month = (new Date(date).getMonth() + 1).toString().padStart(2, '0');
        let day = new Date(date).getDate().toString().padStart(2, '0');

        if (format === 'mm-dd-yyyy') {
            return `${month}-${day}-${year}`;
        } else if (format === 'dd-mm-yyyy') {
            return `${day}-${month}-${year}`;
        } else if (format === 'yyyy-mm-dd') {
            return `${year}-${month}-${day}`;
        } else {
            throw new Error('Invalid date format');
        }
    };

    const formattedStartDate = formatDate(startDate, dateFormat);
    const formattedEndDate = formatDate(endDate, dateFormat);

    const datesOutsideRange = dateArray.filter(obj => {
        const formattedDate = formatDate(obj[dateProperty], dateFormat);
        return formattedDate < formattedStartDate || formattedDate > formattedEndDate;
    });

    return datesOutsideRange;
}




/**
 * Finds any missing dates from a range of dates in an array.
 * @param {Array} dateArray - An array of dates ['yyyy-mm-dd', 'yyyy-mm-dd', ...]
 * @param {String} dateFormat - The format of the dates in the array (default: 'dd-mm-yyyy')
 * @returns {Array} An array of missing dates between the range.
 */
function findMissingDatesInsideArray(dateArray, dateFormat = 'mm-dd-yyyy') {
    const startDate = new Date(dateArray[0]);
    const endDate = new Date(dateArray[dateArray.length - 1]);

    const missingDates = [];
    let currentDate = new Date(startDate);

    const formatDate = (date) => {
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        if (dateFormat === 'mm-dd-yyyy') {
            return `${month}-${day}-${year}`;
        } else if (dateFormat === 'dd-mm-yyyy') {
            return `${day}-${month}-${year}`;
        } else if (dateFormat === 'yyyy-mm-dd') {
            return `${year}-${month}-${day}`;
        } else {
            throw new Error('Invalid date format');
        }
    };

    while (currentDate <= endDate) {
        const formattedDate = formatDate(currentDate);

        if (!dateArray.includes(formattedDate)) {
            missingDates.push(formattedDate);
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return missingDates;
}

function findMissingDatesInsideObject(dateArray, dateProperty, dateFormat = 'mm-dd-yyyy') {
    const startDate = new Date(dateArray[0][dateProperty]);
    const endDate = new Date(dateArray[dateArray.length - 1][dateProperty]);

    const missingDates = [];
    let currentDate = new Date(startDate);

    const formatDate = (date) => {
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        if (dateFormat === 'mm-dd-yyyy') {
            return `${month}-${day}-${year}`;
        } else if (dateFormat === 'dd-mm-yyyy') {
            return `${day}-${month}-${year}`;
        } else if (dateFormat === 'yyyy-mm-dd') {
            return `${year}-${month}-${day}`;
        } else {
            throw new Error('Invalid date format');
        }
    };

    while (currentDate <= endDate) {
        const formattedDate = formatDate(currentDate);

        const dateExists = dateArray.some((obj) => {
            const objDate = new Date(obj[dateProperty]);
            const formattedObjDate = formatDate(objDate);
            return formattedObjDate === formattedDate;
        });

        if (!dateExists) {
            missingDates.push(formattedDate);
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return missingDates;
}

/**
 * 
 * @param {String} type The type of the date ('date', 'time', 'datetime')
 * @param {String} sep The separator between the date parts '/' or '-'
 * @returns {String} The date in the format specified
 */
function getDate(type, sep) {
    let date = new Date()
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
            return date.getTime()``
        default:
            if (characters.includes(sep)) {
                return `${date.getDate()}${sep}${date.getMonth() + 1}${sep}${date.getFullYear()} ${date.getHours()}${sep}${date.getMinutes()}${sep}${date.getSeconds()}`
            } else {
                throw new Error('Invalid separator')
            }
    }
}

/**
 * 
 * @param {String} date A date in any format which include day, month and year
 * @param {String} format The format of the date ('yyyy-MM-dd' or 'dd/MM/yyyy') 
 * @param {String} type The type of the date Date() or String()
 * @returns {String} The date in the format specified
 */
function formatDate(date, format, type, sep) {
    if (type === 'String') {
        if (date == Date()) {
            throw new Error('Use the Date type instead of String')
        }
        if (sep) {
            var parts = date.split(sep);
            let test = date.split();
            let seperator = test[0].replace(parts[0], '').replace(parts[1], '').replace(parts[2], '')
            seperator = seperator[0]

            var date = new Date(parts[2], parts[1], parts[0]);

            let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
            let month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
            let year = date.getFullYear()

            switch (format) {
                case `yyyy${seperator}MM${seperator}dd`:
                    return `${year}${sep}${month}${sep}${day}`
                case `dd${seperator}MM${seperator}yyyy`:
                    return `${day}${sep}${month}${sep}${year}`
                case `MM${seperator}dd${seperator}yyyy`:
                    return `${month}${sep}${day}${sep}${year}`
                case `yyyy${seperator}dd${seperator}MM`:
                    return `${year}${sep}${day}${sep}${month}`
                default:
                    return `${day}${sep}${month}${sep}${year}`
            }
        } else {
            let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
            let month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
            let year = date.getFullYear()
            switch (format) {
                case 'yyyy/MM/dd':
                    return `${year}/${month}/${day}`
                case 'dd/MM/yyyy':
                    return `${day}/${month}/${year}`
                case 'MM/dd/yyyy':
                    return `${month}/${day}/${year}`
                case 'yyyy/dd/MM':
                    return `${year}/${day}/${month}`
                default:
                    return `${day}/${month}/${year}`
            }
        }
    } else if (type === 'Date') {
        date = new Date(date)

        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        let milliseconds = date.getMilliseconds()

        let getMonthName = (month) => {
            let months = date.toLocaleString('en-US');
            return months[month - 1]
        }

        let getDayName = (day) => {
            let days = date.toLocaleString('en-US');
            return days[day - 1]
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

        format = format.replace(/Y/g, 'y')
            .replace(/D/g, 'd')
            .replace(/H/g, 'h')
            .replace(/S/g, 's')

        return format.replace(/(y+|M+|d+|h+|m+|s+|t+|T+|ms)/g, (match, key) => {
            return time[key]
        })
    }
}

/**
 * 
 * @param {String} date A date in any format which include day, month and year
 * @param {String} format The format of the date ('yyyy-MM-dd' or 'dd/MM/yyyy')
 * @param {String} newFormat The new format of the date ('yyyy-MM-dd' or 'dd/MM/yyyy')
 * @returns {String} The date in the new format specified
 */
function transformDate(date, format, newFormat) {
    let newDate = formatDate(date, format)
    return formatDate(newDate, newFormat)
}

/**
 * 
 * @param {String} month A month in a string format to check how many days it has
 * @returns 
 */
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
}

/**
 * 
 * @param {String} year A year in a string format to check how many days it has if it is a leap year
 * @returns {Number} The number of days in the year if it is a leap year
 */
function getDaysInYear(year) {
    return isLeapYear(year) ? 366 : 365
}

/**
 * 
 * @param {String} year A year in a string format to check if it is a leap year
 * @returns {Boolean} If the year is a leap year or not
 */
function isLeapYear(year) {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0
}

/**
 * 
 * @param {String} date A date in any format which include day, month and year 
 * @returns {Number} The number of week since the beginning of the year
 */
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

/**
 * 
 * @param {String} date A date in any format which include day, month and year.
 * @param {String} type The type of the data to return (months, days, hours, minutes)
 * @param {String} format The format of the date ('yyyy-MM-dd' or 'dd/MM/yyyy')
 * @returns {Number} The date in the specified type (months, days, hours, minutes)
 * 
 */
function convertDateTo(date, type, format) {
    date = new Date(date)
    switch (type) {
        case 'months':
            let monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            if (format == 'MM-dd-yyyy') {
                let dateArray = date.toString().slice(4, 15)
                for (let i = 0; i < monthArr.length; i++) {
                    if (dateArray.includes(monthArr[i])) {
                        return `0${i + 1}`
                    }
                }
            }
            if (format == 'dd-MM-yyyy') {
                let dateArray = date.toString().slice(3, 5)
                for (let i = 0; i < monthArr.length; i++) {
                    if (dateArray.includes(monthArr[i])) {
                        return `0${i + 1}`
                    }
                }
            }
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
    convertDateTo,
    findMissingDatesInsideArray,
    findMissingDatesInsideObject,
    findDatesOutsideRangeArray,
    findDatesOutsideRangeObject,
}