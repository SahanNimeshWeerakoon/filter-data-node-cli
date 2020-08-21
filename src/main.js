import csv from 'csv-parser';
import fs from 'fs';
import chalk from 'chalk';

import inquirer from 'inquirer';

const FILE_NAME = 'App Data.csv';

export async function getTitles(options) {

	var retData = [];

	fs.createReadStream(FILE_NAME)
	  .pipe(csv())
	  .on('data', (row) => {
	  	retData.push(row);
	  })
	  .on('end', () => {
	  	if(retData) {
	  		let titleArr = Object.keys(retData[0]);

	  		options = {
	  			...options,
	  			fieldsToFilter: titleArr
	  		}

	  		getTitleFromUser(options);
	  	}

	  })
}

async function getTitleFromUser(options) {
	const questions = [];
	questions.push(
		{
			type: 'list',
			name: 'filterField',
			message: 'Please choose which field you want to filter',
			choices: options.fieldsToFilter
		}
	);

	const answers = await inquirer.prompt(questions);

	options = {
		...options,
		filterField: options.filterField || answers.filterField
	}
	getFilterValue(options)
}

async function getFilterValue(options) {
	const questions = [];
	questions.push(
		{
			type: 'input',
			name: 'filterFieldValue',
			message: `Please enter the ${options.filterField} value to filter`
		}
	);

	const answers = await inquirer.prompt(questions);

	options = {
		...options,
		filterFieldValue: options.filterFieldValue || answers.filterFieldValue
	}

	getDataFromInput(options);
}

export function getDataFromInput(options) {
	var retData = [];
	
	fs.createReadStream(FILE_NAME)
	  .pipe(csv())
	  .on('data', (row) => {
	  	retData.push(row);
	  })
	  .on('end', () => {
	  	const field = options.filterField;
	  	const value = options.filterFieldValue;
	  	// const valuesToOutput = [];
	  	if(retData) {
	  		retData.forEach(function(item, index) {
	  			let firstKey = Object.keys(item)[0];

	  			if(item[field] == value) {
	  				console.log(item[firstKey]);
	  			}
	  		});
	  	}
	  })
}



