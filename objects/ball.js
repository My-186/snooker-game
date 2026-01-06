class Ball {
    constructor(posX, posY, color) {
        this.color = color;
        this.diameter = 17;
        this.body = Bodies.circle(posX, posY, this.diameter/2, {
            density: 0.001,
            friction: 0.05,
            frictionStatic: 0,
            frictionAir: 0.015, // Adjust this to make the table "faster" or "slower"
            restitution: 0.96   // High bounciness for realistic collisions
        });
    }

    posX() {
        return this.body.position.x;
    }
    
    posY() {
        return this.body.position.y;
    }

    draw() {
        let position = this.body.position;
        push(); 
        fill(color(this.color));
        ellipse(position.x, position.y, this.diameter);
        fill(255, 255, 255, 150);
        noStroke();
        ellipse(position.x + 3, position.y - 4, 4, 4);
        fill(255, 255, 255, 40);
        ellipse(position.x + 1, position.y - 2, 12, 12)
        pop();
    }
}