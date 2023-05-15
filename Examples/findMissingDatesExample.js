const dateFormat = require("../main");






console.log("==========================================================")
// Find Missing Dates Array


const findMissingDatesArray = [
	'2019-01-01', '2019-01-02',
	'2019-01-05', '2019-01-07',
	'2019-01-09'
];
const findMissingDatesOutput = dateFormat.findMissingDatesInsideArray(findMissingDatesArray, 'yyyy-mm-dd');
console.log(findMissingDatesOutput);


console.log("==========================================================")
// Find Missing Dates Object


const findMissingDatesInsideObject = [
	{ date: '2019-01-01', name: 'Event 1' },
	{ date: '2019-01-02', name: 'Event 2' },
	{ date: '2019-01-04', name: 'Event 3' },
	{ date: '2019-01-05', name: 'Event 4' },
	{ date: '2019-01-07', name: 'Event 5' },
	{ date: '2019-01-09', name: 'Event 6' },
];
const findMissingDatesInsideObjectOutput = dateFormat.findMissingDatesInsideObject(findMissingDatesInsideObject, 'date', 'yyyy-mm-dd');
console.log(findMissingDatesInsideObjectOutput);


console.log("==========================================================")
// Find Dates Outside Range Array


const findDatesOutsideRangeArray = [
	'2019-01-01', '2019-01-02',
	'2019-01-03', '2019-01-04',
	'2019-01-05', '2019-01-06',
	'2019-01-07', '2019-01-08',
	'2019-01-09', '2019-01-10',
	'2019-01-11', '2019-01-12',
	'2019-01-13', '2019-01-14',
	'2019-01-15', '2019-01-16',
	'2019-01-17', '2019-01-18',
	'2019-01-19', '2019-01-20',
	'2019-01-21', '2019-01-22',
	'2019-01-23', '2019-01-24',
	'2019-01-25', '2019-01-26',
	'2019-01-27', '2019-01-28',
	'2019-01-29', '2019-01-30',
	'2019-01-31', '2019-02-01',
];
console.log(dateFormat.findDatesOutsideRangeArray(findDatesOutsideRangeArray, "2019-01-10", "2019-01-25", 'yyyy-mm-dd'));


console.log("==========================================================")
// Find Dates Outside Range Object


const dateArray = [
	{ date: '2019-01-01', name: 'Event 1' },
	{ date: '2019-01-02', name: 'Event 2' },
	{ date: '2019-01-03', name: 'Event 3' },
	{ date: '2019-01-04', name: 'Event 4' },
	{ date: '2019-01-05', name: 'Event 5' },
	{ date: '2019-01-06', name: 'Event 6' },
	{ date: '2019-01-07', name: 'Event 7' },
	{ date: '2019-01-08', name: 'Event 8' },
	{ date: '2019-01-09', name: 'Event 9' },
	{ date: '2019-01-10', name: 'Event 10' }
];

const startDate = '2019-01-03';
const endDate = '2019-01-11';
const datesOutsideRange = dateFormat.findDatesOutsideRangeObject(dateArray, 'date', startDate, endDate, 'yyyy-mm-dd');
console.log(datesOutsideRange);


console.log("==========================================================")
