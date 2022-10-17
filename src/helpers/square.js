export const whichPositionIsAvailable = (squares, possibleMoves) => {

    if (possibleMoves.length == 0) return false;
    let shouldBreak = false;
    let isTaken = [];
    let availablePosition;
    possibleMoves.map(move => {
        if (!shouldBreak) {
            isTaken = squares.filter(square => {
                // console.log(square.position, move);
                return square.position === move
            })
        }

    
        if (isTaken.length == 0) {
            shouldBreak = true
            availablePosition = move;
        }
    })

    
    return availablePosition;
}