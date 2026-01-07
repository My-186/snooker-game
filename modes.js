function getBallPositions(table, mode) {
    const tableCenterPosY = table.posY + table.tableHeight / 2;

    switch (mode) {
        case MODE_ONE:
            return calculateMode1(table);
        case MODE_TWO:
            return {
                green: { x: table.linePosX, y: table.posY + table.border + table.fieldHeight / 3 },
                brown: { x: table.linePosX, y: table.posY + table.border + table.fieldHeight / 2 },
                yellow: { x: table.linePosX, y: table.posY + table.border + table.fieldHeight * 2 / 3 },
                blue: { x: table.posX + table.tableWidth / 2, y: tableCenterPosY },
                pink: { x: table.posX + table.tableWidth * 3 / 4, y: tableCenterPosY },
                black: { x: table.posX + table.tableWidth * 7 / 8, y: tableCenterPosY },
                white: { x: table.linePosX - table.tableHeight / 6, y: tableCenterPosY },
                reds: []
            }
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

