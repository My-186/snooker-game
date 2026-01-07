const BALL_DIAMETER = 17;

class Ball {
    constructor(posX, posY, color) {
        this.color = color;
        this.diameter = BALL_DIAMETER;
        this.body = Bodies.circle(posX, posY, this.diameter/2, {
            density: 0.001,
            friction: 0.05,
            frictionStatic: 0,
            frictionAir: 0.015, // friction on the table
            restitution: 0.96 // bouncyness
        });
    }

    posX() {
        return this.body.position.x;
    }
    
    posY() {
        return this.body.position.y;
    }

    draw() {
        push(); 
        fill(color(this.color));
        ellipse(this.posX(), this.posY(), this.diameter);
        // draw reflections
        fill(255, 255, 255, 150);
        noStroke();
        ellipse(this.posX() + 3, this.posY() - 4, 4, 4);
        fill(255, 255, 255, 40);
        ellipse(this.posX() + 1, this.posY() - 2, 12, 12)
        pop();
    }
}