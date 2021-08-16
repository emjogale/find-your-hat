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
	constructor(rows, columns, percentage) {
		this.field = Field.generateField(rows, columns, percentage);
		this.rows = rows;
		this.columns = columns;
		this.percentage = percentage;
		this.currentX = 0;
		this.currentY = 0;
		this.field[this.currentX][this.currentY] = pathCharacter;
	}

	// generates a blank field with the number of rows and columns the user has requested
	static generateField(rows, columns, percentage) {
		console.log(`the percentage inputted is ${percentage}`);
		let fieldArea = [];
		let percent = percentage / 100;
		for (let i = 0; i < rows; i++) {
			let col = [];
			for (let j = 0; j < columns; j++) {
				col.push(fieldCharacter);
			}
			fieldArea.push(col);
		}
		// a function to select a random spot for the hat
		const hatSpot = {
			x: Math.floor(Math.random() * columns),
			y: Math.floor(Math.random() * rows),
		};
		// make sure hat location isn't at [0,0] ie the starting position
		while (hatSpot.x === 0 && hatSpot.y === 0) {
			hatSpot.x = Math.floor(Math.random() * rows);
			hatSpot.y = Math.floor(Math.random() * columns);
		}
		fieldArea[hatSpot.y][hatSpot.x] = hat;

		// work out number of holes required
		let numberOfHoles = Math.floor((rows * columns * percentage) / 100);
		console.log(`there will be ${numberOfHoles} holes`);
		// a function to replace field characters randomly with the correct no. of holes
		while (numberOfHoles > 0) {
			let holeSpot = {
				x: Math.floor(Math.random() * rows),
				y: Math.floor(Math.random() * columns),
			};
			while (fieldArea[holeSpot.x][holeSpot.y] === hole) {
				holeSpot.x = Math.floor(Math.random() * rows);
				holeSpot.y = Math.floor(Math.random() * columns);
			}
			fieldArea[holeSpot.x][holeSpot.y] = hole;
			numberOfHoles--;
		}

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
	// TODO get the user input on direction
	getDirection() {}

	// TODO check if the move keeps it in the playing field
	outOfBoundsCheck() {}
}

// get the input from the user
let myRows = prompt("How many rows do you want?: ");
let myColumns = prompt("How many columns do you want?: ");
let myPercentage = prompt("What percent of holes?(suggest between 10-20): ");

const myField = new Field(myRows, myColumns, myPercentage);
console.log(myField.printField());
console.log(
	`Great - lets make a field which has ${myRows} rows and ${myColumns} columns and ${Math.floor(
		(myRows * myRows * myPercentage) / 100
	)} holes`
);
