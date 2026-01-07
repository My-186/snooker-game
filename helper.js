
const BODY_STOP_THRESHOLD = 0.01;

function allBodiesStopped(bodies) {
    for (let i = 0; i < bodies.length; i++) {
        if (isMoving(bodies[i])) {
            return false;
        }
    }
    return true;
}

function isMoving(body) {
    // check linear speed
    if (body.speed > BODY_STOP_THRESHOLD) {
        return true;
    }
    // check rotational speed
    if (body.angularSpeed > BODY_STOP_THRESHOLD) {
        return true;
    }
    return false;
}