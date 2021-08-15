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
        this.field[0][0] = pathCharacter // the home position
    }
    
    play() {
        let playing = true;
        while(playing)
    }

	static generateField(rows, columns) {
		let fieldArea = [];
		for (let i = 0; i < rows; i++) {
			let col = [];
			for (let j = 0; j < columns; j++) {
				col.push("x");
			}
			row.push(col);
		}
		return fieldArea;
	}

	printField() {
		console.log("here we are trying to print the field");
	}
}

// get the input from the user
let myRows = prompt("How many rows do you want?: ");
let myColumns = prompt("How many columns do you want?: ");
let percentage = prompt("What percent of holes?(suggest between 10-20): ");

const myField = new Field(myRows, myColumns);
console.log(myField.printField());
console.log(
	`Great - lets make a field which has ${myRows} rows and ${myColumns} columns with ${percentage}% holes`
);
