const MODE_ONE = 1;
const MODE_TWO = 2;
const MODE_THREE = 3;

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

function setup() {
    // create canvas as big as the current window
    const canvas = createCanvas(windowWidth, windowHeight);
    // position canvas at the corner of the screen
    canvas.position(0, 0);

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

    // center table in the middle of the canvas
    const tablePosX = (windowWidth - TABLE_WIDTH) / 2;
    const tablePosY = (windowHeight - TABLE_HEIGHT) / 2;
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
            // delete the ball that falled into a hole
            World.remove(engine.world, balls[i]); 
            // remove that ball out of all the balls
            balls.splice(i, 1);            
        }
    }
} 

function checkBallsStopped() {
    const bodies = balls.map((ball) => ball.body);
    allowNextShot = allBodiesStopped(bodies)
}
