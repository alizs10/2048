import { upAvailableIndexes } from "./helpers";

export const setPossibleMoves = (squares, rows) => {

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

    setUpMoves(squaresInstance)
    console.log(squaresInstance);

    return squaresInstance;
}