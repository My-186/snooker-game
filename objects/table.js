const POCKET_DIAMETER = 30;
const TABLE_WIDTH = 1200;
const TABLE_HEIGHT = 600;

class Table {
    constructor(x, y) {
        this.tableWidth = TABLE_WIDTH;
        this.tableHeight = TABLE_HEIGHT;
        this.border = 40;
        this.fieldWidth = TABLE_WIDTH - 2 * this.border;
        this.fieldHeight = TABLE_HEIGHT - 2 * this.border;

        this.posX = x;
        this.posY = y;

        let pocketOffset = 10.6;
        this.pockets = [
            new Pocket(this.posX + this.border + pocketOffset, this.posY + this.border + pocketOffset),// upper left
            new Pocket((this.posX + this.tableWidth) - this.border - pocketOffset, this.posY + this.border + pocketOffset),// upper right4
            //     [this.posX + this.fieldWidth / 2 + this.borderWidth, this.posY + this.borderWidth], // upper middle
            new Pocket(this.posX + this.border + pocketOffset, (this.posY + this.tableHeight) - this.border - pocketOffset),// lower left
            new Pocket((this.posX + this.tableWidth) - this.border - pocketOffset, (this.posY + this.tableHeight) - this.border - pocketOffset),// lower right 
            //     [this.posX +  this.fieldWidth / 2 + this.borderWidth, (this.posY + this.tableHeight) - this.borderWidth] // lower middle
        ]

        this.upperWallPos = {x: this.posX + this.border + this.fieldWidth / 2, y: this.posY + this.border / 2};
        this.lowerWallPos = {x: this.posX + this.border + this.fieldWidth / 2, y: this.posY + this.fieldHeight + this.border * 1.5};
        this.leftWallPos = {x: this.posX + this.border / 2, y: this.posY + this.border + this.fieldHeight / 2};
        this.rightWallPos = {x: this.posX + this.fieldWidth + this.border * 1.5, y: this.posY + this.border + this.fieldHeight / 2};

        const wallGap = 42 // calculated from the pocket diameter (30)
        this.walls = [
            Bodies.rectangle(this.upperWallPos.x, this.upperWallPos.y, this.fieldWidth - wallGap,  this.border, {isStatic: true}),
            Bodies.rectangle(this.lowerWallPos.x, this.lowerWallPos.y, this.fieldWidth - wallGap,  this.border, {isStatic: true}),
            Bodies.rectangle(this.leftWallPos.x, this.leftWallPos.y, this.border,  this.fieldHeight - wallGap, {isStatic: true}),
            Bodies.rectangle(this.rightWallPos.x, this.rightWallPos.y, this.border,  this.fieldHeight - wallGap, {isStatic: true}),
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
        const fieldPosX = this.posX + this.border;
        const fieldPosY = this.posY + this.border;

        push();
        fill(137, 81, 41); // brown
        rect(this.posX, this.posY, this.tableWidth, this.tableHeight, 25);
        fill(0, 128, 0); // green
        rect(fieldPosX, fieldPosY, this.fieldWidth, this.fieldHeight);

        // draw field lines
        noFill();
        stroke(255);
        strokeWeight(2);
        line(this.fieldWidth/3, fieldPosY + 1, this.fieldWidth/3, fieldPosY + this.fieldHeight - 1);
        ellipse(this.fieldWidth/3, fieldPosY + this.fieldHeight/2, this.fieldWidth/6);
        fill(0, 128, 0); // green
        noStroke();
        rect(this.fieldWidth/3 + 1, fieldPosY + 1, this.fieldWidth/6, this.fieldHeight - 2)
        pop();

        // draw each pocket
        this.pockets.forEach((pocket) => pocket.draw());
    }

}

class Pocket {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.diameter = POCKET_DIAMETER;
    }

    radius() {
        return this.diameter / 2;
    }

    draw(){
        fill(0); // black
        ellipse(this.posX, this.posY, this.diameter);
    }
}