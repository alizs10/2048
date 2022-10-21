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
            return {status: true, position: nextPosition};
    }

    return {status: true}
}

/**
 * ! NOTE
 * ? STEP ONE:
 *    * 1.check the next position:
 *      ! 1 => its available => check the next position => 
 *              ? 1- its taken
 *              ? 2- its available => check next
 *       ! 2 => its taken
 */