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

const whiteBall = new Ball(500, 300, '#ffffff');
const balls = [
    new Ball(500, 120, '#a00b2bff'),
    new Ball(500, 150, '#a00b2bff'),
    new Ball(500, 180, '#a00b2bff'),
    new Ball(500, 210, '#a00b2bff'),
    new Ball(500, 240, '#a00b2bff'),
    new Ball(500, 270, '#a00b2bff'),
    new Ball(500, 300, '#a00b2bff'),
    new Ball(500, 330, '#a00b2bff'),
    new Ball(500, 360, '#a00b2bff'),
    new Ball(500, 390, '#a00b2bff'),
    new Ball(500, 420, '#a00b2bff'),
    new Ball(500, 450, '#a00b2bff'),
    new Ball(500, 480, '#a00b2bff'),
    new Ball(500, 510, '#a00b2bff'),
    new Ball(500, 540, '#a00b2bff'),
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
    // cue.draw(whiteBall.posX, whiteBall.posY);

    // checkBallsInPocket();
    checkBallsStopped();

    if (allowNextShot) {
        cue.draw(whiteBall.posX(), whiteBall.posY());
    }

    Engine.update(engine);
}

function mouseClicked() {
    if (true) {
        // let speed = 0.007 * (-1);
        let speed = 0.002;
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
