const prompt = require("prompt-sync")({ sigint: true });
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
let playing = true;
// the field class will set up the game according to the users input
// and then start the game functionality
class Field {
	constructor(rows, columns, percentage) {
		this.field = Field.generateField(rows, columns, percentage);
		this.rows = rows;
		this.columns = columns;
		this.percentage = percentage;
		this.currentX = 0;
		this.currentY = 0;
		this.field[0][0] = pathCharacter;
	}

	// generates a blank field with the number of rows and columns the user has requested
	static generateField(rows, columns, percentage) {
		let fieldArea = [];
		let percent = percentage / 100;
		for (let i = 0; i < rows; i++) {
			let col = [];
			for (let j = 0; j < columns; j++) {
				col.push(fieldCharacter);
			}
			fieldArea.push(col);
		}
		// select a random spot for the hat
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
		// replace field characters randomly with the correct no. of holes
		// and check that they don't cover the hat or the starting position
		while (numberOfHoles > 0) {
			let holeSpot = {
				x: Math.floor(Math.random() * rows),
				y: Math.floor(Math.random() * columns),
			};
			while (
				(holeSpot.x === 0 && holeSpot.y === 0) ||
				fieldArea[holeSpot.x][holeSpot.y] === hole ||
				fieldArea[holeSpot.x][holeSpot.y] === hat ||
				fieldArea[holeSpot.x === 0]
			) {
				holeSpot.x = Math.floor(Math.random() * rows);
				holeSpot.y = Math.floor(Math.random() * columns);
			}
			fieldArea[holeSpot.x][holeSpot.y] = hole;
			numberOfHoles--;
		}
		return fieldArea;
	}
	// print the field so the user can interact with it
	printField() {
		const fieldString = this.field.map((row) => {
			return row.join("");
		});
		const fieldArea = fieldString.join("\n");
		console.log(fieldArea);
	}
	// start the game
	play() {
		let playing = true;
		while (playing) {
			this.printField();
			this.getDirection();
			if (!this.onFieldCheck()) {
				console.log("oops we're off the field!!");
				playing = false;
			}
			if (this.field[this.currentY][this.currentX] === hat) {
				console.log("Congrats -you've found your hat!!");
				playing = false;
			}
			if (this.field[this.currentY][this.currentX] === hole) {
				console.log("Arrggh you've fallen down a hole!! Game over");
				playing = false;
			}
			// update players position
			this.field[this.currentY][this.currentX] = pathCharacter;
		}
	}
	//TODO give the user some instructions
	getDirection() {
		let direction = prompt(
			"Would you like to go up(u), down(d), left(l) or right(r) ?"
		).toUpperCase();
		switch (direction) {
			case "U":
				this.currentY -= 1;
				break;
			case "D":
				this.currentY += 1;
				break;
			case "L":
				this.currentX -= 1;
				break;
			case "R":
				this.currentX += 1;
				break;
			default:
				console.log("Enter U, D, L or R.");
				this.getDirection();
				break;
		}
	}
	// TODO check if the move keeps it in the playing field
	onFieldCheck() {
		return (
			this.currentX >= 0 &&
			this.currentY >= 0 &&
			this.currentX <= this.rows &&
			this.currentY <= this.columns
		);
	}
}
// get the input from the user
let myRows = prompt("How many rows do you want?: ");
let myColumns = prompt("How many columns do you want?: ");
let myPercentage = prompt("What percent of holes?(suggest between 10-20): ");
const myField = new Field(myRows, myColumns, myPercentage);

console.log(
	`Great - lets make a field which has ${myRows} rows and ${myColumns} columns and ${Math.floor(
		(myRows * myColumns * myPercentage) / 100
	)} holes`
);
myField.play();
