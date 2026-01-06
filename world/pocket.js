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

        // this.holes = [
        //     [this.posX + this.borderWidth, this.posY + this.borderWidth], // upper left
        //     [(this.posX + this.tableWidth) - this.borderWidth, this.posY + this.borderWidth], // upper right
        //     [this.posX + this.fieldWidth / 2 + this.borderWidth, this.posY + this.borderWidth], // upper middle
        //     [this.posX + this.borderWidth, (this.posY + this.tableHeight) - this.borderWidth], // lower left
        //     [(this.posX + this.tableWidth) - this.borderWidth, (this.posY + this.tableHeight) - this.borderWidth], // lower right
        //     [this.posX +  this.fieldWidth / 2 + this.borderWidth, (this.posY + this.tableHeight) - this.borderWidth] // lower middle
        // ];






