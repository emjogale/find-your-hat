const prompt = require("prompt-sync")({ sigint: true });
console.log("Here we go a giving this a try");
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
let playing = true;

// the field class will set up the game according to the users input and then
// start the game functionality
class Field {
	constructor(rows, columns) {
		this.field = Field.generateField(rows, columns);
		this.rows = rows;
		this.columns = columns;
		this.currentX = 0;
		this.currentY = 0;
		this.field[this.currentX][this.currentY] = pathCharacter;
	}

	// generates a blank field with the number of rows and columns the user has requested
	static generateField(rows, columns, percentage) {
		let fieldArea = [];
		let percent = parseInt(percentage);
		for (let i = 0; i < rows; i++) {
			let col = [];
			for (let j = 0; j < columns; j++) {
				col.push(fieldCharacter);
			}
			fieldArea.push(col);
		}
		const numberOfHoles = Math.round((rows * columns * percentage) / 100);

		return fieldArea;
	}

	//TODO now add in holes / hat and users starting position

	//TODO set the hat position
	//TODO now change the users requested % of these to holes

	// print the field so the user can interact with it
	printField() {
		console.log("here we are trying to print the field");
		const fieldString = this.field.map((row) => {
			return row.join("");
		});
		const fieldArea = fieldString.join("\n");
		console.log(fieldArea);
		if (playing === false) {
			this.play();
		}
	}

	//TODO give the user some instructions

	// start the game
	play() {
		let playing = true;
		while (playing) {
			this.printField();
			this.getDirection();
		}
	}

	getDirection() {}

	outOfBoundsCheck() {}
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
