const prompt = require("prompt-sync")({ sigint: true });
console.log("Here we go a giving this a try");
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
	constructor(rows, columns) {
		this.rows = rows;
		this.columns = columns;
	}
}

let myRows = prompt("How many rows do you want?: ");
let myColumns = prompt("How many columns do you want?: ");
let percentage = prompt("What percent of holes?(suggest between 10-20): ");

const myField = new Field(myRows, myColumns);
console.log(
	`Great - lets make a field which has ${myRows} rows and ${myColumns} columns with ${percentage}% holes`
);
