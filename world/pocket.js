class Pocket {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.diameter = 30;
    }

    radius() {
        return this.diameter / 2;
    }

    draw(){
        fill(0); // black
        ellipse(this.posX, this.posY, this.diameter);
    }

}






