function Ball() {
	
	this.x = 300;
	this.y = 300;
	this.diameter = 20;
	this.xSpeed = Math.floor(Math.random()*5);
	this.ySpeed = Math.floor(Math.random()*5);

	this.display = function () {
		fill(255,0,0);
		ellipseMode(CENTER);
		circle(this.x, this.y, this.diameter);
	}

	this.move = function () {
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	}

	this.handleBoundaryCollision = function () {
		if (this.y < 0 || this.y > height) {
			this.ySpeed *= -1;
		}
		if (this.x < 0 || this.x > width) {
			this.xSpeed *= -1;
		}
	}

	this.checkForCollision = function (obstacle) {
		let horizontalDist = Math.abs(this.x - obstacle.x);
		let verticalDist = Math.abs(this.y - obstacle.y);
		if (horizontalDist <= 30) {
			if (this.y > (obstacle.y - obstacle.dimensions/2)
				&& this.y < (obstacle.y + obstacle.dimensions/2)) {
				this.xSpeed = -(Math.floor(Math.random()*5));
				this.ySpeed += Math.floor(Math.random()*5);
			}
		}
		if (verticalDist <= 30) {
			if (this.x > (obstacle.x - obstacle.dimensions/2)
				&& this.x < (obstacle.x + obstacle.dimensions/2)) {
				this.ySpeed = -(Math.floor(Math.random()*5));
				this.xSpeed += Math.floor(Math.random()*5);
			}
		}
	}
}

function Obstacle(x, y, shape) {
	
	this.dimensions = 70;
	this.x = x;
	this.y = y;
	this.shape = shape;

	this.display = function () {
		fill(0,0,255);
		if (shape === "circle") {
			ellipseMode(CENTER);
			circle(this.x, this.y, this.dimensions);
		} else {
			rectMode(CENTER);
			square(this.x, this.y, this.dimensions);
		}
	}
}

const ball = new Ball();
let obstacles = [];

function setup() {
	createCanvas(600, 600);
	for(let i = 0; i < 3; i++){
		obstacles.push(
			new Obstacle(randomCoord(), randomCoord(), "square")
		);
	}
	for(let i = 0; i < 2; i++){
		obstacles.push(
			new Obstacle(randomCoord(), randomCoord(), "circle")
		);
	}
}

function draw() {
	background(255);
	for (let obstacle of obstacles) {
		obstacle.display();
		ball.checkForCollision(obstacle);
	}
	ball.handleBoundaryCollision();
	ball.display();
	ball.move();
}

const randomCoord = () => {
	return Math.floor((Math.random() * 600) + 1);
}