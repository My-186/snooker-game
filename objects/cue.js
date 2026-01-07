const POWER_MAX_THRESHOLD = 200; // determines after what distance max power is reached
const POWER_REDUCTION = 50; // used to reduce force that is applied to the vector
const MAX_POWER = 0.8;

class Cue {
    constructor() {
        this.power = 0.5; // 50% power
    }

    draw(targetX, targetY) {
        push();
        fill(255, 0, 0); 
        line(mouseX, mouseY, targetX, targetY);
        // draw current cue power level
        let powerBarX = targetX - 50;
        let powerBarY = targetY - 30;
        let powerBarThickness = 5;
        let powerInPercent = this.power / MAX_POWER * 100
        stroke(0);
        strokeWeight(2);
        noFill();
        rect(powerBarX, powerBarY, 100, powerBarThickness);
        noStroke();
        fill(220, 0, 0);
        rect(powerBarX, powerBarY, powerInPercent, powerBarThickness);
        pop();
    }

    setPower(power) {
        // only allow power between 0 and MAX_POWER
        if (power > MAX_POWER) {
            this.power = MAX_POWER;
        } else if (power < 0) {
            this.power = 0;
        } else {
            this.power = power;
        }
    }

    shoot(targetBall) {
        let power = cue.power / POWER_REDUCTION;
        // calculate ball-to-mouse vector
        let vector = { x: targetBall.posX() - mouseX , y: targetBall.posY() - mouseY };
        // normalizatie and multiply by power
        let vectorLength = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2)); 
        let shootVector = {x: (vector.x / vectorLength) * power, y: (vector.y / vectorLength) * power};
        // apply vector to the target
        Matter.Body.applyForce(targetBall.body, targetBall.body.position, shootVector); 
    }
}


