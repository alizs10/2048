export const whichPositionIsAvailable = (squares, possibleMoves, square) => {

    let shouldCheckNext = true;
    let availablePositions = [];

    function checkPosition(position, isLast = false) {

        let nextSquare = squares.find(sq => sq.position[0] == position[0] && sq.position[1] == position[1])
        if (!nextSquare) {
            if (!isLast) {
                console.log("its not last and its available");
                shouldCheckNext = true;
                availablePositions.push(position)
            } else {
                console.log("its last and its available");
                // its last and its available
                availablePositions.push(position)
            }
        }

    }

    possibleMoves.map((move, index) => {

        if (index == possibleMoves.length - 1) {
            shouldCheckNext = false;
            checkPosition(move, true)
        }

        if (shouldCheckNext) {
            checkPosition(move)
        }

    })

    return availablePositions;
}

export const canMerge = (squares, nextPosition, square) => {

    let nextSquare = squares.find(sq => sq.position[0] == nextPosition[0] && sq.position[1] == nextPosition[1])
    if (nextSquare && nextSquare.value == square.value) {
        return { status: true, position: nextPosition };
    }

    return { status: true }
}


export const findNextMove = (squares, possibleMoves, square, dir) => {

    let nextPositions = [];
    let nextMoveCoordinate = null;
    let moveEvent = false;
    let mergeEvent = false;

    if (dir === "right") {
        possibleMoves.sort(function (a, b) {
            return a[0] - b[0];
        })
    }

    if (dir === "left") {
        possibleMoves.sort(function (a, b) {
            return b[0] - a[0];
        })
    }

    if (dir === "up") {
        possibleMoves.sort(function (a, b) {
            return b[1] - a[1];
        })
    }
    if (dir === "down") {
        possibleMoves.sort(function (a, b) {
            return a[1] - b[1];
        })
    }

    console.log(possibleMoves, square.value);
    possibleMoves.every(possibleMove => {

        let possibleSquare = squares.find(sq => sq.position[0] == possibleMove[0] && sq.position[1] == possibleMove[1])
        if (possibleSquare && possibleSquare.value == square.value && possibleSquare.canMerged) {
            
            nextPositions.push(possibleMove)
            moveEvent = true;
            mergeEvent = true;
        }

        if (!possibleSquare) {
            nextPositions.push(possibleMove)
            moveEvent = true;
        }

        if (possibleSquare && possibleSquare.value != square.value) {
            return false;
        }

        return true;
    })

    if (nextPositions.length > 0) {
        nextMoveCoordinate = nextPositions[nextPositions.length - 1]
    }

    console.log(nextPositions);
    return { nextMoveCoo: nextMoveCoordinate, moveStatus: moveEvent, mergeStatus: mergeEvent }
}