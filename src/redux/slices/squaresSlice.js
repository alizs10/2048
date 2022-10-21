import { createSlice, current } from '@reduxjs/toolkit'
import { generateUniqueCoordinate, getNewIndex, getRandomIndex, getTwoRandomNumber, upAvailableIndexes } from '../../helpers/helpers'
import { v4 as uuidv4 } from 'uuid';
const initialState = {
  rows: 4,
  placeHolders: [],
  squares: [],
  moveEvent: false,
}

export const squaresSlice = createSlice({
  name: 'squares',
  initialState,
  reducers: {
    initial: (state) => {
      // state.user = action.payload
      let id = 0;
      while (state.placeHolders.length < state.rows * state.rows) {
        state.placeHolders.push({ id })
        id++;
      }
    },
    start: (state) => {
      let squaresInstance = [...current(state).squares]
      // let firstCoordinate = generateUniqueCoordinate(squaresInstance, state.rows)
      let firstCoordinate = [0, 0];
      let firstSquare = { id: uuidv4(), value: 4, position: firstCoordinate, canMerged: true }
      squaresInstance = [...squaresInstance, firstSquare]

      // let secondCoordinate = generateUniqueCoordinate(squaresInstance, state.rows)
      let secondCoordinate = [1, 0];
      let secondSquare = { id: uuidv4(), value: 2, position: secondCoordinate, canMerged: true }
      squaresInstance = [...squaresInstance, secondSquare]

      let thirdCoordinate = [2, 0];
      let thirdSquare = { id: uuidv4(), value: 2, position: thirdCoordinate, canMerged: true }
      squaresInstance = [...squaresInstance, thirdSquare]

      state.squares = squaresInstance;

    },
    createNewSquare: state => {
      state.moveEvent = false;
      let newCoordinate = generateUniqueCoordinate(state.squares, state.rows)
      let newSquare = { id: uuidv4(), value: 2, position: newCoordinate, canMerged: true }
      state.squares = [...state.squares, newSquare]
      
    },
    moveSquare: (state, action) => {

      /**
       * * 1. find next move for square
       * * 2. move square
       * * 3. find out if merging should happen
       * * 4. merge if we should
       */

      let squareId = action.payload.squareId
      let dir = action.payload.dir
      let isFirst = action.payload.isFirst
      let squaresInstance = [...state.squares];
      let mergeEvent = false;
      let nextMoveCoordinate = null;
      if (isFirst) {
        state.moveEvent = false;
      }

      if (dir === "right") {
        let squareIndex = squaresInstance.findIndex(sq => sq.id === squareId)
        let square = state.squares[squareIndex];

        // find next move for it


        let positionX = square.position[0];
        let positionY = square.position[1];
        let possibleMoves = [];
        while (positionX < state.rows - 1) {
          possibleMoves.push([positionX + 1, positionY])
          positionX++;
        }
        if (possibleMoves.length > 0) {
          possibleMoves.reverse()

          function canMove(possibleMove) {
          
            let possibleSquareIndex = state.squares.findIndex(sq => sq.position[0] == possibleMove[0] && sq.position[1] == possibleMove[1])
            let possibleSquare = state.squares[possibleSquareIndex];

            if (possibleSquare && possibleSquare.value == square.value && possibleSquare.canMerged && square.canMerged) {
              // its available and merging should happen
              nextMoveCoordinate = possibleMove;
              mergeEvent = true;
              state.moveEvent = true;

              return false;
            }

            if (!possibleSquare) {
              // its available and is the next move
              nextMoveCoordinate = possibleMove;
              state.moveEvent = true;
              return false;
            }
            return true;
          }

          possibleMoves.every(possibleMove => canMove(possibleMove))

        }

        if (state.moveEvent && nextMoveCoordinate) {
          
          square.position = nextMoveCoordinate;
          if (mergeEvent) {
            //delete square and double the value of merged square
            let filteredSquares = state.squares.filter(sq => sq.id !== squareId);
            state.squares = [...filteredSquares];

            //find merged square
            let mergedSquareIndex = state.squares.findIndex(sq => sq.position[0] == nextMoveCoordinate[0] && sq.position[1] == nextMoveCoordinate[1])
            let mergedSquare = state.squares[mergedSquareIndex]
            mergedSquare.value *= 2;
            mergedSquare.canMerged = false;

          }
        }

      }

    },
    prepareSquaresForMerge: state => {
      state.squares.map(sq => { sq.canMerged = true })
    }
  }
})

// Action creators are generated for each case reducer function
export const { initial, start, updatePositions, merge, createNewSquare, moveSquare, prepareSquaresForMerge } = squaresSlice.actions

export default squaresSlice.reducer