class Cue {

    constructor() {
        this.length = 100;
    }

    draw(targetX, targetY) {
        fill(255, 0, 0); 
        line(mouseX, mouseY, targetX, targetY); 
    }

}


