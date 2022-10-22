import { createSlice, current } from '@reduxjs/toolkit'
import { generateUniqueCoordinate, getNewIndex, getRandomIndex, getTwoRandomNumber, upAvailableIndexes } from '../../helpers/helpers'
import { v4 as uuidv4 } from 'uuid';
import { findNextMove } from '../../helpers/square';
const initialState = {
  rows: 4,
  placeHolders: [],
  squares: [],
  moveEvent: false,
  lastSquares: [],
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
      let squaresInstance = []
      let firstCoordinate = generateUniqueCoordinate(squaresInstance, state.rows)

      let firstSquare = { id: uuidv4(), value: 2, position: firstCoordinate, canMerged: true }
      squaresInstance = [...squaresInstance, firstSquare]

      let secondCoordinate = generateUniqueCoordinate(squaresInstance, state.rows)

      let secondSquare = { id: uuidv4(), value: 2, position: secondCoordinate, canMerged: true }
      squaresInstance = [...squaresInstance, secondSquare]

      state.squares = squaresInstance;

    },
    createNewSquare: state => {
      state.moveEvent = false;
      let newCoordinate = generateUniqueCoordinate(state.squares, state.rows)
      let newSquare = { id: uuidv4(), value: 2, position: newCoordinate, canMerged: true }
      state.squares = [...state.squares, newSquare]

    },
    moveSquare: (state, action) => {

      let squareId = action.payload.squareId
      let dir = action.payload.dir
      let isFirst = action.payload.isFirst
      let squaresInstance = [...state.squares];
      let mergeEvent = false;
      let nextMoveCoordinate = null;
      if (isFirst) {
        state.moveEvent = false;
      }

      let squareIndex = squaresInstance.findIndex(sq => sq.id === squareId)
      let square = state.squares[squareIndex];

      // find next move for it
      let positionX = square.position[0];
      let positionY = square.position[1];
      let possibleMoves = [];
      if (dir === "right") {
        while (positionX < state.rows - 1) {
          possibleMoves.push([positionX + 1, positionY])
          positionX++;
        }
      }
      if (dir === "left") {
        while (positionX > 0) {
          possibleMoves.push([positionX - 1, positionY])
          positionX--;
        }
      }
      if (dir === "up") {
        while (positionY > 0) {
          possibleMoves.push([positionX, positionY - 1])
          positionY--;
        }
      }

      if (dir === "down") {
        while (positionY < state.rows - 1) {
          possibleMoves.push([positionX, positionY + 1])
          positionY++;
        }
      }

      if (possibleMoves.length > 0) {

        const { nextMoveCoo, mergeStatus, moveStatus } = findNextMove(state.squares, possibleMoves, current(square), dir)

        nextMoveCoordinate = nextMoveCoo;
        mergeEvent = mergeStatus;
        if (moveStatus) {
          state.moveEvent = moveStatus;
        }
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

    },
    prepareSquaresForMerge: state => {
      state.squares.map(sq => { sq.canMerged = true })
    }
  }
})

// Action creators are generated for each case reducer function
export const { initial, start, updatePositions, merge, createNewSquare, moveSquare, prepareSquaresForMerge } = squaresSlice.actions

export default squaresSlice.reducer