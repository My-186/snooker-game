//Task/steps
//1. Define your variables for the table, balls and the cue. Store the balls in appropriate array

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,// 必要？
    World = Matter. World, 
    Bodies = Matter.Bodies;

var engine;

var whiteBall;

const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = 800;

// center table in canvas
const tablePosX = (CANVAS_WIDTH - TABLE_WIDTH) / 2;
const tablePosY = (CANVAS_HEIGHT - TABLE_HEIGHT) / 2;
var table = new Table(tablePosX, tablePosY);

var balls = createBalls();
var cue = new Cue();

var allowNextShot = false;

function setup() {
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    // position canvas at center
    const canvasPosX = (windowWidth - CANVAS_WIDTH) / 2;
    const canvasPosY = (windowHeight - CANVAS_HEIGHT) / 2;
    canvas.position(canvasPosX, canvasPosY); 

    engine = Engine.create();// create an engine
    engine.gravity.scale = 0;
    World.add(engine.world, [
        ...table.cushions,
        ...balls.map((ball)=> ball.body)
    ]);
}

function draw() {
    background(255);
    table.draw();
    balls.forEach((ball) => ball.draw());
    cue.draw(whiteBall.posX, whiteBall.posY);

    checkBallsInPocket();
    checkBallsStopped();

    if (allowNextShot) {
        checkCuePowerChange();
        cue.draw(whiteBall.posX(), whiteBall.posY());
    }

    Engine.update(engine);
}

function mouseClicked() {
    if (allowNextShot) {
        let power = cue.power * (-1) / 50;
        let vector = { x: mouseX - whiteBall.posX() , y: mouseY - whiteBall.posY() }; // ball-to-mouse vector
        let vectorLength = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
        let movementVector = {x: (vector.x / vectorLength) * power, y: (vector.y / vectorLength) * power}; // normalized vector * speed
        console.log(movementVector);
        Matter.Body.applyForce(whiteBall.body, whiteBall.body.position, movementVector); 
    }
}

function checkCuePowerChange() {
    let distanceToWhite = dist(mouseX, mouseY, whiteBall.posX(), whiteBall.posY());
    let normalizedPower = (distanceToWhite / POWER_MAX_THRESHOLD)
    cue.setPower(normalizedPower);
}

function checkBallsInPocket() {
    for (let i = 0; i < balls.length; i++) {
        if (table.isBallInPocket(balls[i])) {
            World.remove(engine.world, balls[i]); // delete the ball that falled into a hole
            balls.splice(i, 1);            // remove that ball out of all the balls
        }
    }
} 

function checkBallsStopped() {
    const bodies = balls.map((ball) => ball.body);
    allowNextShot = allBodiesStopped(bodies)
}

function createBalls() {
    const ballPositions = table.getBallPositions();
    whiteBall = new Ball(ballPositions.white.x, ballPositions.white.y, '#f5f5dbff');
    const blackBall = new Ball(ballPositions.black.x, ballPositions.black.y, '#0a0a0aff');
    const pinkBall = new Ball(ballPositions.pink.x, ballPositions.pink.y, '#ff76adff');
    const blueBall = new Ball(ballPositions.blue.x, ballPositions.blue.y, '#0e53a8ff');
    const yellowBall = new Ball(ballPositions.yellow.x, ballPositions.yellow.y, '#fdb043ff');
    const browBall = new Ball(ballPositions.brown.x, ballPositions.brown.y, '#764314ff');
    const greenBall = new Ball(ballPositions.green.x, ballPositions.green.y, '#054c1eff');

    const balls = [
        blackBall,
        pinkBall,
        blueBall,
        yellowBall,
        browBall,
        greenBall,
        whiteBall
    ];

    const redBallColor = '#b81337ff';
    for (let i = 0; i < ballPositions.reds.length; i++) {
        let ballPos = ballPositions.reds[i];
        balls.push(new Ball(ballPos.x, ballPos.y, redBallColor));
    }

    return balls;
}
