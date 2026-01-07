const POWER_ADJUSTMENT_STEP = 0.01;
const POWER_MAX_THRESHOLD = 300;

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

        stroke(0);
        strokeWeight(2);
        noFill();
        rect(powerBarX, powerBarY, 100, powerBarThickness);
        noStroke();
        fill(220, 0, 0);
        rect(powerBarX, powerBarY, this.power*100, powerBarThickness);
        pop();
    }

    setPower(power) {
        if (power > 1) {
            this.power = 1;
        } else if (power < 0) {
            this.power = 0;
        } else {
            this.power = power;
        }
    }

    increasePower() {
        if (this.power + POWER_ADJUSTMENT_STEP <= 1) {
            this.power += POWER_ADJUSTMENT_STEP;
        }
    }

    decreasePower() {
        if (this.power - POWER_ADJUSTMENT_STEP >= 0) {
            this.power -= POWER_ADJUSTMENT_STEP;
        }
    }
}


