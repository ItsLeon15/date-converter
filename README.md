# Date Converter

> Date Converter is a simple package which is meant for changing dates into a new format. It supports different date seperators as well as timestamps.

## Prerequisites

This project requires NodeJS (version 6 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Installation
Run the following command to get the latest version package
```
npm install --save date-utils-format
```
### Import the package
```
import converter from 'date-utils-format';
```
## Usage
### Transform Date
Use the transformDate function to quickly transform a given date to another format such as below where it is being changed to ``'dd/MM/yyyy'`` from ``'YYYY-MM-DD'``. Please note that it doesn't matter if the ``'YYYY-MM-DD'`` is upper or lowcase.
```
converter.transformDate('2022-10-05', 'YYYY-MM-DD, 'dd/MM/yyyy')
```
### Get Date
To get the current date you can use the following command. You have the option to choose either ``date``, ``time``, ``datetime`` or ``timestamp``. Examples of all of the following are below.
```
const date = converter.getDate('date', '-');
const time = converter.getDate('time', ':');
const datetime = converter.getDate('datetime', '-');
const timestamp = converter.getDate('timestamp');
```
The result will be the following from ``date``, ``time``, ``datetime`` and then ``timestamp`` in that order.
```
05-10-2022
15:12:52
05-10-2022 15-12-52
1664979172769
```