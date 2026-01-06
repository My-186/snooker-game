class Table {
    constructor(width, height) {
        this.fieldWidth = width;
        this.fieldHeight = height;
        this.borderWidth = 40;
        this.tableWidth = this.fieldWidth + this.borderWidth * 2;
        this.tableHeight = this.fieldHeight + this.borderWidth * 2;
        this.posX = 50;
        this.posY = 50;
    
        this.pockets = [
    　　    new Pocket(this.posX + this.borderWidth + 10.6, this.posY + this.borderWidth + 10.6),// upper left
      　　  new Pocket((this.posX + this.tableWidth) - this.borderWidth - 10.6, this.posY + this.borderWidth + 10.6),// upper right4
            //     [this.posX + this.fieldWidth / 2 + this.borderWidth, this.posY + this.borderWidth], // upper middle
            new Pocket(this.posX + this.borderWidth + 10.6, (this.posY + this.tableHeight) - this.borderWidth - 10.6),// lower left
            new Pocket((this.posX + this.tableWidth) - this.borderWidth - 10.6, (this.posY + this.tableHeight) - this.borderWidth - 10.6),// lower right 
        　　//     [this.posX +  this.fieldWidth / 2 + this.borderWidth, (this.posY + this.tableHeight) - this.borderWidth] // lower middle
　　　　]

        this.upperWallPos = {x: this.posX + this.borderWidth + this.fieldWidth / 2, y: this.posY + this.borderWidth / 2};
        this.lowerWallPos = {x: this.posX + this.borderWidth + this.fieldWidth / 2, y: this.posY + this.fieldHeight + this.borderWidth * 1.5};
        this.leftWallPos = {x: this.posX + this.borderWidth / 2, y: this.posY + this.borderWidth + this.fieldHeight / 2};
        this.rightWallPos = {x: this.posX + this.fieldWidth + this.borderWidth * 1.5, y: this.posY + this.borderWidth + this.fieldHeight / 2};

        this.walls = [
            Bodies.rectangle(this.upperWallPos.x, this.upperWallPos.y, this.fieldWidth - 42,  this.borderWidth, {isStatic: true}),
            Bodies.rectangle(this.lowerWallPos.x, this.lowerWallPos.y, this.fieldWidth - 42,  this.borderWidth, {isStatic: true}),
            Bodies.rectangle(this.leftWallPos.x, this.leftWallPos.y, this.borderWidth,  this.fieldHeight - 42, {isStatic: true}),
            Bodies.rectangle(this.rightWallPos.x, this.rightWallPos.y, this.borderWidth,  this.fieldHeight - 42, {isStatic: true}),
        ];
    }

    isBallInPocket(ball) {
        for (let pocket of this.pockets) {
            let d = dist(ball.posX(), ball.posY(), pocket.posX, pocket.posY);

            if (d < pocket.radius()) {
                return true;
            }
        }
        return false;
    }

    draw() {
        fill(137, 81, 41); // brown
        rect(this.posX, this.posY, this.tableWidth, this.tableHeight, 25);
        fill(0, 128, 0); // green
        rect(this.posX + this.borderWidth, this.posY + this.borderWidth, this.fieldWidth, this.fieldHeight);
        push();
        noFill();
        stroke(255);
        strokeWeight(2);
        line(this.fieldWidth/3,this.posY + this.borderWidth, this.fieldWidth/3, this.posY+this.borderWidth+this.fieldHeight);
        ellipse(this.fieldWidth/3,this.posY + this.borderWidth + this.fieldHeight/2, 200);
        fill(0, 128, 0); // green
        noStroke();
        rect(this.fieldWidth/3 + 1, this.posY + this.fieldHeight/4, 100, this.fieldHeight /2)
        pop();
        this.pockets.forEach((pocket) => pocket.draw());
    }

}
　　