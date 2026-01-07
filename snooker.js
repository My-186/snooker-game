//Task/steps
//1. Define your variables for the table, balls and the cue. Store the balls in appropriate array

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,// 必要？
    World = Matter. World, 
    Bodies = Matter.Bodies;

var engine;

const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = 800;

// center table in canvas
const tablePosX = (CANVAS_WIDTH - TABLE_WIDTH) / 2;
const tablePosY = (CANVAS_HEIGHT - TABLE_HEIGHT) / 2;
const table = new Table(tablePosX, tablePosY);

const ballPositions = table.getBallPositions();
const whiteBall = new Ball(ballPositions.white.x, ballPositions.white.y, '#f5f5dbff');
const blackBall = new Ball(ballPositions.black.x, ballPositions.black.y, '#0a0a0aff');
const pinkBall = new Ball(ballPositions.pink.x, ballPositions.pink.y, '#ff76adff');
const blueBall = new Ball(ballPositions.blue.x, ballPositions.blue.y, '#0e53a8ff');
const yellowBall = new Ball(ballPositions.yellow.x, ballPositions.yellow.y, '#fdb043ff');
const browBall = new Ball(ballPositions.brown.x, ballPositions.brown.y, '#764314ff');
const greenBall = new Ball(ballPositions.green.x, ballPositions.green.y, '#054c1eff');
const redBallColor = '#b81337ff';

const balls = [
    new Ball(ballPositions.reds[0].x, ballPositions.reds[0].y, redBallColor),
    new Ball(ballPositions.reds[1].x, ballPositions.reds[1].y, redBallColor),
    new Ball(ballPositions.reds[2].x, ballPositions.reds[2].y, redBallColor),
    new Ball(ballPositions.reds[3].x, ballPositions.reds[3].y, redBallColor),
    new Ball(ballPositions.reds[4].x, ballPositions.reds[4].y, redBallColor),
    new Ball(ballPositions.reds[5].x, ballPositions.reds[5].y, redBallColor),
    new Ball(ballPositions.reds[6].x, ballPositions.reds[6].y, redBallColor),
    new Ball(ballPositions.reds[7].x, ballPositions.reds[7].y, redBallColor),
    new Ball(ballPositions.reds[8].x, ballPositions.reds[8].y, redBallColor),
    new Ball(ballPositions.reds[9].x, ballPositions.reds[9].y, redBallColor),
    new Ball(ballPositions.reds[10].x, ballPositions.reds[10].y, redBallColor),
    new Ball(ballPositions.reds[11].x, ballPositions.reds[11].y, redBallColor),
    new Ball(ballPositions.reds[12].x, ballPositions.reds[12].y, redBallColor),
    new Ball(ballPositions.reds[13].x, ballPositions.reds[13].y, redBallColor),
    new Ball(ballPositions.reds[14].x, ballPositions.reds[14].y, redBallColor),
    blackBall,
    pinkBall,
    blueBall,
    yellowBall,
    browBall,
    greenBall,
    whiteBall
];
const cue = new Cue();

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
        cue.draw(whiteBall.posX(), whiteBall.posY());
    }

    Engine.update(engine);
}

function mouseClicked() {
    if (allowNextShot) {
        let speed = 0.007 * (-1);
        let vector = { x: mouseX - whiteBall.posX() , y: mouseY - whiteBall.posY() }; // ball-to-mouse vector
        let vectorLength = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
        let movementVector = {x: (vector.x / vectorLength) * speed, y: (vector.y / vectorLength) * speed}; // normalized vector * speed
        Matter.Body.applyForce(whiteBall.body, whiteBall.body.position, movementVector); 
    }
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
