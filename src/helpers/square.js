export const whichPositionIsAvailable = (squares, possibleMoves, square) => {

    let Square = {...square};
    let shouldCheckNext = true;
    let availablePositions = [];
    function checkPosition(position, isLast = false) {
        
        let nextSquare = squares.find(square => square.position[0] == position[0] && square.position[1] == position[1])
        if (nextSquare) {
            console.log("its taken");

            if (nextSquare.value == Square.value) {
            console.log("its taken and equal");
            shouldCheckNext = false;
                availablePositions.push(position);
            } else {
                console.log("res", nextSquare.value , Square.value);
                if (!isLast) {
                    console.log("its taken and its not equal and its not last");
                    shouldCheckNext = true;
                } else {
                    console.log("its taken and its not equal and its last");
                    console.log(availablePositions);
                }
            }

        } else {
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



/**
 * ! NOTE
 * ? STEP ONE:
 *    * 1.remember the last position
 *    * 2.check the next position:
 *      ! 1 => its null => check the next position =>
 *              ? 1- its taken and its equal 
 *              ? 2- its taken and its not equal
 *              ? 3- its not taken
 *       ! 2 => its taken =>
 *              ? 1- its equal to square value
 *              ? 2- its not equal
 */