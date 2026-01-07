const POWER_MAX_THRESHOLD = 200; // determines after what distance max power is reached
const POWER_REDUCTION = 50; // used to reduce force that is applied to the vector
const MAX_POWER = 0.8;
const CUE_LENGTH = 200;
const CUE_GAP = 20; // distance to the whiteball

class Cue {
    constructor() {
        this.power = 0.5; // 50% power
    }

    draw(targetX, targetY) {
        // draw cue
        push();
        const vector = { x: targetX - mouseX, y: targetY - mouseY };
        // normalize vector
        const length = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
        const normVector = { x: vector.x / length, y: vector.y / length };
        // calculate cue start and end
        const cueTip = { 
            x: targetX - normVector.x * CUE_GAP, 
            y: targetY - normVector.y * CUE_GAP 
        };
        const cueGripStart = {
            x: targetX - normVector.x * (CUE_GAP + CUE_LENGTH), 
            y: targetY - normVector.y * (CUE_GAP + CUE_LENGTH) 
        }

        stroke(color('#ffc67bff'));
        strokeWeight(5);
        line(cueGripStart.x, cueGripStart.y, cueTip.x, cueTip.y);
        const cueGripEnd = { 
            x: cueTip.x - normVector.x * CUE_LENGTH*3/4, 
            y: cueTip.y - normVector.y * CUE_LENGTH*3/4 
        };
        stroke(color('#fafafaff'));
        point(cueTip.x, cueTip.y);
        stroke(color('#2e1a00ff'));
        line(cueGripStart.x, cueGripStart.y, cueGripEnd.x, cueGripEnd.y);
        
        // draw current cue power level
        let powerBarX = targetX - 50;
        let powerBarY = targetY - 30;
        let powerBarThickness = 4;
        let powerInPercent = this.power / MAX_POWER * 100
        stroke(255, 255, 255, 150);
        strokeWeight(2);
        noFill();
        rect(powerBarX, powerBarY, 100, powerBarThickness, 20);
        noStroke();
        fill(color('#f83e00ff'));
        rect(powerBarX, powerBarY, powerInPercent, powerBarThickness, 20);
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
        // normalize and multiply by power
        let vectorLength = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2)); 
        let shootVector = {x: (vector.x / vectorLength) * power, y: (vector.y / vectorLength) * power};
        // apply vector to the target
        Matter.Body.applyForce(targetBall.body, targetBall.body.position, shootVector); 
    }
}


