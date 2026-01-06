class Ball {
    constructor(posX, posY, color) {
        this.color = color;
        this.diameter = 17;
        this.body = Bodies.circle(posX, posY, this.diameter/2, {restitution : .8});
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
        pop();
    }
}