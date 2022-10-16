import { rightAvailableIndexes, upAvailableIndexes } from "./helpers";

export const setPossibleMoves = (squares, rows, dir) => {

    let squaresInstance = [...squares];
    function setUpMoves(squaresInstance) {
        squaresInstance.map((square, index) => {
            if (square.number === null) {
                squaresInstance[index] = { ...square, upMoves: [] };
            } else {

                let availableIndexes = upAvailableIndexes(index, rows)
                if (availableIndexes.length > 0) {
                    availableIndexes.map((availableIndex, index) => {
                        if (squaresInstance[availableIndex].number !== null) {
                            availableIndexes.splice(index, 1)
                        }
                    })

                    squaresInstance[index] = { ...square, upMoves: availableIndexes };
                } else {
                    squaresInstance[index] = { ...square, upMoves: [] };
                }
            }
        })

        
    }

    function setRightMoves(squaresInstance)
    {
        squaresInstance.map((square, index) => {
            
            if (square.number === null) {
                squaresInstance[index] = { ...square, rightMoves: [] };
            } else {

                let availableIndexes = rightAvailableIndexes(index, rows)
                
                if (availableIndexes.length > 0) {
                    availableIndexes.map((availableIndex, index) => {
                        if (squaresInstance[availableIndex].number !== null && squaresInstance[availableIndex].number != square.number) {
                            availableIndexes.splice(index, 1)
                        }
                    })

                    squaresInstance[index] = { ...square, rightMoves: availableIndexes };
                } else {
                    squaresInstance[index] = { ...square, rightMoves: [] };
                }
            }
        })
    }

    
    switch (dir) {
        case "up":
            setUpMoves(squaresInstance)
            break;
        case "right":
            setRightMoves(squaresInstance)
            break;
    
        default:
            break;
    }

    return squaresInstance;
}