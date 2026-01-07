const POCKET_DIAMETER = 30;
const TABLE_WIDTH = 1200;
const TABLE_HEIGHT = 600;
const TABLE_CORNER_RADIUS = 25;
const TABLE_BORDER_WIDTH = 25

const CUSHION_WIDTH = 13;
const CUSHION_OFFSET = 21;

const FIELD_COLOR = '#3a8a32';
const BORDER_COLOR = '#3b2b1f';

class Table {
    constructor(x, y) {
        this.posX = x;
        this.posY = y;
        this.tableWidth = TABLE_WIDTH;
        this.tableHeight = TABLE_HEIGHT;
        this.border = TABLE_BORDER_WIDTH;
        this.fieldWidth = TABLE_WIDTH - 2 * this.border;
        this.fieldHeight = TABLE_HEIGHT - 2 * this.border;

        const pocketOffset = 5;
        this.pockets = [
            new Pocket(this.posX + this.border + pocketOffset, this.posY + this.border + pocketOffset), // upper left
            new Pocket((this.posX + this.tableWidth) - this.border - pocketOffset, this.posY + this.border + pocketOffset), // upper right
            new Pocket(this.posX + this.border + pocketOffset, (this.posY + this.tableHeight) - this.border - pocketOffset), // lower left
            new Pocket((this.posX + this.tableWidth) - this.border - pocketOffset, (this.posY + this.tableHeight) - this.border - pocketOffset), // lower right 
            new Pocket(this.posX + this.fieldWidth / 2 + this.border, this.posY + this.border), // upper middle
            new Pocket(this.posX +  this.fieldWidth / 2 + this.border, (this.posY + this.tableHeight) - this.border) // lower middle
        ]

        this.upperLeftWallPos = {x: this.posX + this.border + this.fieldWidth/4 + pocketOffset/2, y: this.posY + this.border + CUSHION_WIDTH/2};
        this.upperRightWallPos = {x: this.posX + this.tableWidth - (this.fieldWidth/4 + this.border + pocketOffset/2), y: this.posY + this.border + CUSHION_WIDTH/2};
        this.lowerLeftWallPos = {x: this.posX + this.border + this.fieldWidth/4 + pocketOffset/2, y: (this.posY + this.border + this.fieldHeight) - CUSHION_WIDTH/2};
        this.lowerRightWallPos = {x: this.posX + this.tableWidth - (this.fieldWidth/4 + this.border + pocketOffset/2), y: (this.posY + this.border + this.fieldHeight) - CUSHION_WIDTH/2};
        this.leftWallPos = {x: this.posX + this.border + CUSHION_WIDTH/2, y: this.posY + this.border + this.fieldHeight/2};
        this.rightWallPos = {x: this.posX + this.tableWidth - (this.border + CUSHION_WIDTH/2), y: this.posY + this.border + this.fieldHeight/2};

        this.cushionLengthHorizontal = (this.fieldWidth/2) - (POCKET_DIAMETER + pocketOffset);
        this.cushionLengthVertical = this.fieldHeight - (POCKET_DIAMETER + 2*pocketOffset);

        this.cushions = [
            Bodies.trapezoid(this.upperLeftWallPos.x, this.upperLeftWallPos.y, this.cushionLengthHorizontal, CUSHION_WIDTH, 0.04, 
                { isStatic: true, angle: Math.PI, restitution: 0.8, friction: 0.1 }),
            Bodies.trapezoid(this.upperRightWallPos.x, this.upperRightWallPos.y, this.cushionLengthHorizontal, CUSHION_WIDTH, 0.04, 
                { isStatic: true, angle: Math.PI, restitution: 0.8, friction: 0.1 }),
            Bodies.trapezoid(this.lowerLeftWallPos.x, this.lowerLeftWallPos.y, this.cushionLengthHorizontal, CUSHION_WIDTH, 0.04, 
                { isStatic: true, restitution: 0.8, friction: 0.1 }),
            Bodies.trapezoid(this.lowerRightWallPos.x, this.lowerRightWallPos.y, this.cushionLengthHorizontal, CUSHION_WIDTH, 0.04, 
                { isStatic: true, restitution: 0.8, friction: 0.1 }),
            Bodies.trapezoid(this.leftWallPos.x, this.leftWallPos.y, this.cushionLengthVertical, CUSHION_WIDTH, 0.04, 
                { isStatic: true, angle: Math.PI/2, restitution: 0.8, friction: 0.1 }),
            Bodies.trapezoid(this.rightWallPos.x, this.rightWallPos.y, this.cushionLengthVertical, CUSHION_WIDTH, 0.04, 
                { isStatic: true, angle: -Math.PI/2, restitution: 0.8, friction: 0.1 }),
        ];

        this.linePosX = this.posX + this.border + this.fieldWidth/4;
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
        fill(color(BORDER_COLOR));
        rect(this.posX, this.posY, this.tableWidth, this.tableHeight, TABLE_CORNER_RADIUS);

        // draw ornaments
        const ornamentWidth = this.border * 1.5;
        fill(color('#cfa146'));
        rect(this.posX, this.posY, ornamentWidth, ornamentWidth, TABLE_CORNER_RADIUS, 0, 0, 0);
        rect((this.posX + this.tableWidth) - ornamentWidth, this.posY, ornamentWidth, ornamentWidth, 0, TABLE_CORNER_RADIUS, 0, 0);
        rect(this.posX, (this.posY + this.tableHeight) - ornamentWidth, ornamentWidth, ornamentWidth, 0, 0, 0, TABLE_CORNER_RADIUS);
        rect((this.posX + this.tableWidth) - ornamentWidth, (this.posY + this.tableHeight) - ornamentWidth, ornamentWidth, ornamentWidth, 0, 0, TABLE_CORNER_RADIUS, 0);
        rect((this.posX + this.tableWidth/2) - ornamentWidth/2, this.posY, ornamentWidth, this.border);
        rect((this.posX + this.tableWidth/2) - ornamentWidth/2, (this.posY + this.tableHeight) - this.border, ornamentWidth, this.border);

        // draw field
        fill(color(FIELD_COLOR));
        rect(fieldPosX, fieldPosY, this.fieldWidth, this.fieldHeight);

        // draw field lines
        noFill();
        stroke(255);
        strokeWeight(2);
        line(this.linePosX, fieldPosY + 1, this.linePosX, fieldPosY + this.fieldHeight - 1);
        ellipse(this.linePosX, fieldPosY + this.fieldHeight/2, this.fieldWidth/6);
        fill(color(FIELD_COLOR));
        noStroke();
        rect(this.linePosX + 1, fieldPosY + 1, this.fieldWidth/6, this.fieldHeight - 2)
        pop();

        // draw each pocket
        this.pockets.forEach((pocket) => pocket.draw());

        // draw cushions
        push();
        stroke(0);
        fill(color('#337c2cff'));
        const angleOffset = 14;
        quad(
            this.upperLeftWallPos.x - this.cushionLengthHorizontal/2, this.upperLeftWallPos.y - CUSHION_WIDTH/2,
            this.upperLeftWallPos.x - this.cushionLengthHorizontal/2 + angleOffset, this.upperLeftWallPos.y + CUSHION_WIDTH/2,
            this.upperLeftWallPos.x + this.cushionLengthHorizontal/2 - angleOffset, this.upperLeftWallPos.y + CUSHION_WIDTH/2,
            this.upperLeftWallPos.x + this.cushionLengthHorizontal/2, this.upperLeftWallPos.y - CUSHION_WIDTH/2,
        );
        quad(
            this.upperRightWallPos.x - this.cushionLengthHorizontal/2, this.upperRightWallPos.y - CUSHION_WIDTH/2,
            this.upperRightWallPos.x - this.cushionLengthHorizontal/2 + angleOffset, this.upperRightWallPos.y + CUSHION_WIDTH/2,
            this.upperRightWallPos.x + this.cushionLengthHorizontal/2 - angleOffset, this.upperRightWallPos.y + CUSHION_WIDTH/2,
            this.upperRightWallPos.x + this.cushionLengthHorizontal/2, this.upperRightWallPos.y - CUSHION_WIDTH/2,
        );
        quad(
            this.lowerLeftWallPos.x - this.cushionLengthHorizontal/2 + angleOffset, this.lowerLeftWallPos.y - CUSHION_WIDTH/2,
            this.lowerLeftWallPos.x - this.cushionLengthHorizontal/2, this.lowerLeftWallPos.y + CUSHION_WIDTH/2,
            this.lowerLeftWallPos.x + this.cushionLengthHorizontal/2, this.lowerLeftWallPos.y + CUSHION_WIDTH/2,
            this.lowerLeftWallPos.x + this.cushionLengthHorizontal/2 - angleOffset, this.lowerLeftWallPos.y - CUSHION_WIDTH/2,
        );
        quad(
            this.lowerRightWallPos.x - this.cushionLengthHorizontal/2 + angleOffset, this.lowerRightWallPos.y - CUSHION_WIDTH/2,
            this.lowerRightWallPos.x - this.cushionLengthHorizontal/2, this.lowerRightWallPos.y + CUSHION_WIDTH/2,
            this.lowerRightWallPos.x + this.cushionLengthHorizontal/2, this.lowerRightWallPos.y + CUSHION_WIDTH/2,
            this.lowerRightWallPos.x + this.cushionLengthHorizontal/2 - angleOffset, this.lowerRightWallPos.y - CUSHION_WIDTH/2,
        );
        quad(
            this.leftWallPos.x - CUSHION_WIDTH/2, this.leftWallPos.y - this.cushionLengthVertical/2,
            this.leftWallPos.x - CUSHION_WIDTH/2, this.leftWallPos.y + this.cushionLengthVertical/2,
            this.leftWallPos.x + CUSHION_WIDTH/2, this.leftWallPos.y + this.cushionLengthVertical/2 - angleOffset,
            this.leftWallPos.x + CUSHION_WIDTH/2, this.leftWallPos.y - this.cushionLengthVertical/2 + angleOffset,
        );
        quad(
            this.rightWallPos.x - CUSHION_WIDTH/2, this.rightWallPos.y - this.cushionLengthVertical/2 + angleOffset,
            this.rightWallPos.x - CUSHION_WIDTH/2, this.rightWallPos.y + this.cushionLengthVertical/2 - angleOffset,
            this.rightWallPos.x + CUSHION_WIDTH/2, this.rightWallPos.y + this.cushionLengthVertical/2,
            this.rightWallPos.x + CUSHION_WIDTH/2, this.rightWallPos.y - this.cushionLengthVertical/2,
        )

        pop();
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