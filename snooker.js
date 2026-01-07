//Task/steps
//1. Define your variables for the table, balls and the cue. Store the balls in appropriate array

const MODE_ONE = 1;
const MODE_TWO = 2;
const MODE_THREE = 3;
const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = 800;

// module aliases
var Engine = Matter.Engine,
    World = Matter.World, 
    Bodies = Matter.Bodies;

var engine;

var balls;
var whiteBall;
var table;
var cue;
var allowNextShot = false;

// center table in canvas
const tablePosX = (CANVAS_WIDTH - TABLE_WIDTH) / 2;
const tablePosY = (CANVAS_HEIGHT - TABLE_HEIGHT) / 2;

function setup() {
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    // position canvas at center
    const canvasPosX = (windowWidth - CANVAS_WIDTH) / 2;
    const canvasPosY = (windowHeight - CANVAS_HEIGHT) / 2;
    canvas.position(canvasPosX, canvasPosY);

    initGame(MODE_ONE);
}

function mouseClicked() {
    if (allowNextShot) {
        cue.shoot(whiteBall);
    }
}

function keyPressed() {
    if (keyCode === 49) {
        initGame(MODE_ONE);
    } else if (keyCode === 50) {
        initGame(MODE_TWO);
    } else if (keyCode === 51) {
        initGame(MODE_THREE);
    }
}

function initGame(mode) {
    // init engine
    engine = Engine.create();// create an engine
    engine.gravity.scale = 0;

    table = new Table(tablePosX, tablePosY);
    cue = new Cue();

    balls = createBalls(mode);
    World.add(engine.world, [
        ...table.cushions,
        ...balls.map((ball)=> ball.body)
    ]);
}

function createBalls(mode) {
    const ballPositions = getBallPositions(table, mode);
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

function draw() {
    background(255);
    table.draw();
    balls.forEach((ball) => ball.draw());
    cue.draw(whiteBall.posX, whiteBall.posY);

    checkBallsInPocket();
    checkBallsStopped();

    if (allowNextShot) {
        updateCuePower();
        cue.draw(whiteBall.posX(), whiteBall.posY());
    }

    Engine.update(engine);
}

function updateCuePower() {
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
