function getBallPositions(table, mode) {
    const tableCenterPosY = table.posY + table.tableHeight / 2;

    switch (mode) {
        case MODE_ONE:
            return calculateMode1(table);
        case MODE_TWO:
            return calculateMode2(table);
        case MODE_THREE:
            return {

            }
    }
}

function calculateMode1(table) {
    const tableCenterPosY = table.posY + table.tableHeight / 2;
    const firstRedPosX = table.posX + table.tableWidth * 3 / 4 + BALL_DIAMETER;
    return {
        green: { x: table.linePosX, y: table.posY + table.border + table.fieldHeight / 3 },
        brown: { x: table.linePosX, y: table.posY + table.border + table.fieldHeight / 2 },
        yellow: { x: table.linePosX, y: table.posY + table.border + table.fieldHeight * 2 / 3 },
        blue: { x: table.posX + table.tableWidth / 2, y: tableCenterPosY },
        pink: { x: table.posX + table.tableWidth * 3 / 4, y: tableCenterPosY },
        black: { x: table.posX + table.tableWidth * 7 / 8, y: tableCenterPosY },
        white: { x: table.linePosX - table.tableHeight / 6, y: tableCenterPosY },
        reds: [
            { x: firstRedPosX, y: tableCenterPosY },
            { x: firstRedPosX + 15, y: tableCenterPosY - BALL_DIAMETER / 2 },
            { x: firstRedPosX + 15, y: tableCenterPosY + BALL_DIAMETER / 2 },
            { x: firstRedPosX + 15 + 15, y: tableCenterPosY - BALL_DIAMETER },
            { x: firstRedPosX + 15 + 15, y: tableCenterPosY },
            { x: firstRedPosX + 15 + 15, y: tableCenterPosY + BALL_DIAMETER },
            { x: firstRedPosX + 15 + 15 + 15, y: tableCenterPosY - BALL_DIAMETER * 1.5 },
            { x: firstRedPosX + 15 + 15 + 15, y: tableCenterPosY - BALL_DIAMETER / 2 },
            { x: firstRedPosX + 15 + 15 + 15, y: tableCenterPosY + BALL_DIAMETER / 2 },
            { x: firstRedPosX + 15 + 15 + 15, y: tableCenterPosY + BALL_DIAMETER * 1.5 },
            { x: firstRedPosX + 15 + 15 + 15 + 15, y: tableCenterPosY - 2 * BALL_DIAMETER },
            { x: firstRedPosX + 15 + 15 + 15 + 15, y: tableCenterPosY - BALL_DIAMETER },
            { x: firstRedPosX + 15 + 15 + 15 + 15, y: tableCenterPosY },
            { x: firstRedPosX + 15 + 15 + 15 + 15, y: tableCenterPosY + BALL_DIAMETER },
            { x: firstRedPosX + 15 + 15 + 15 + 15, y: tableCenterPosY + 2 * BALL_DIAMETER },
        ]
    }
}

function calculateMode2(table) {
    const tableCenterPosY = table.posY + table.tableHeight / 2;
    const clusteredReds = calculateRedBallClusters(table);

    return {
        green: { x: table.linePosX, y: table.posY + table.border + table.fieldHeight / 3 },
        brown: { x: table.linePosX, y: table.posY + table.border + table.fieldHeight / 2 },
        yellow: { x: table.linePosX, y: table.posY + table.border + table.fieldHeight * 2 / 3 },
        blue: { x: table.posX + table.tableWidth / 2, y: tableCenterPosY },
        pink: { x: table.posX + table.tableWidth * 3 / 4, y: tableCenterPosY },
        black: { x: table.posX + table.tableWidth * 7 / 8, y: tableCenterPosY },
        white: { x: table.linePosX - table.tableHeight / 6, y: tableCenterPosY },
        reds: clusteredReds
    }
}

function calculateRedBallClusters(table) {
    const clusterDiameter = 90;
    const clusterRadius = clusterDiameter/2;
    const reds = [];

    for (let i = 0; i < 3; i++) {
        let randomClusterPos = getRandomClusterPos(table, clusterRadius);
        console.log(randomClusterPos);
        for (let j = 0; j < 5; j++) {
            let randomBallPos = getRandomPosInCircle(randomClusterPos, clusterRadius);
            reds.push(randomBallPos);
        }
    }

    return reds;
}

function getRandomClusterPos(table, clusterRadius) {
    const minPosX = table.posX + table.border + clusterRadius;
    const maxPosX = table.posX + table.border + table.fieldWidth - clusterRadius;
    const minPosY = table.posY + table.border + clusterRadius;
    const maxPosY = table.posY + table.border + table.fieldHeight - clusterRadius;

    return {
        x: getRandomValue(minPosX, maxPosX), 
        y: getRandomValue(minPosY, maxPosY)
    } 
}

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPosInCircle(center, radius) {
    const randPosX = getRandomValue(center.x - radius, center.x + radius);
    const randPosY = getRandomValue(center.y - radius, center.y + radius);
    const vector = {x: randPosX, y: randPosY};

    // normalizatie and multiply by power
    let vectorLength = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
    let randDistance = getRandomValue(-radius, radius);
    return {
        x: center.x + (vector.x / vectorLength) * randDistance, 
        y: center.y + (vector.y / vectorLength) * randDistance
    };
}

