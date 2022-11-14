import { createSlice, current } from '@reduxjs/toolkit'
import { generateUniqueCoordinate, getRandomValue } from '../../helpers/helpers'
import { v4 as uuidv4 } from 'uuid';
import { findNextMove } from '../../helpers/square';

const initialState = {
  rows: 4,
  placeHolders: [],
  gameId: null,
  squares: [],
  lastSquares: [],
  holdSquares: [],
  moveEvent: false,
  scoreCount: 0,
  moveScores: 0,
  listenForMove: true,
  moveCount: 0
}

export const squaresSlice = createSlice({
  name: 'squares',
  initialState,
  reducers: {
    initial: (state) => {
      let id = 0;
      while (state.placeHolders.length < state.rows * state.rows) {
        state.placeHolders.push({ id })
        id++;
      }
    },
    start: (state) => {
      let squaresInstance = []
      let firstCoordinate = generateUniqueCoordinate(squaresInstance, state.rows)
      let firstSquare = { id: uuidv4(), value: 512, position: firstCoordinate, canMerged: true }
      squaresInstance = [...squaresInstance, firstSquare]

      let secondCoordinate = generateUniqueCoordinate(squaresInstance, state.rows)
      let secondSquare = { id: uuidv4(), value: 512, position: secondCoordinate, canMerged: true }
      squaresInstance = [...squaresInstance, secondSquare]

      state.gameId = uuidv4();
      state.squares = squaresInstance;

    },
    createNewSquare: state => {
      if (state.squares.length >= 16) return

      state.moveEvent = false;
      let newCoordinate = generateUniqueCoordinate(state.squares, state.rows)
      let newSquare = { id: uuidv4(), value: getRandomValue(), position: newCoordinate, canMerged: true }
      state.squares = [...state.squares, newSquare]
    },
    moveSquare: (state, action) => {

      let squareId = action.payload.squareId
      let dir = action.payload.dir
      let isFirst = action.payload.isFirst
      let isLast = action.payload.isLast
      let squaresInstance = [...state.squares];
      let mergeEvent = false;
      let nextMoveCoordinate = null;
      
      if (isFirst) {
        state.moveEvent = false;
        state.listenForMove = false;
        state.holdSquares = state.squares;
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



        const { nextMoveCoo, mergeStatus, moveStatus } = findNextMove(current(state).squares, possibleMoves, square, dir)

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
          state.moveScores += mergedSquare.value;


        }
      }

      if (isLast) {
        state.scoreCount = state.moveScores;
        state.moveScores = 0;

        // new square
        if (state.moveEvent && state.squares.length < 16) {
          //prepare squares
          state.squares.map(sq => { sq.canMerged = true })
          //create new square
          let newCoordinate = generateUniqueCoordinate(state.squares, state.rows)
          let newSquare = { id: uuidv4(), value: getRandomValue(), position: newCoordinate, canMerged: true }
          state.squares = [...state.squares, newSquare]
        }

        state.listenForMove = true;

        if(state.moveEvent)
        {
          // backup squares
          state.lastSquares = state.holdSquares
          state.holdSquares = []
          state.moveCount = 1;
          state.moveEvent = false;
        }
      }
    },
    setUndo: (state, action) => {
      state.undo = action.payload
    },
    undo: state => {
      if (state.lastSquares.length > 0) {
        state.squares = state.lastSquares
      }
    },
    resetScoreCount: state => {
      state.scoreCount = 0;
    },
    resetMoveCount: state => {
      state.moveCount = 0;
    },
    setSquares: (state, action) => {
      state.squares = action.payload
    },
    setMoveListener: (state, action) => {
      state.listenForMove = action.payload;
    },
    setMoveEvent: (state, action) => {
      state.moveEvent = action.payload;
    },
    setGameId: (state, action) => {
      state.gameId = action.payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const { initial, start, updatePositions, merge, moveSquare, createNewSquare, setUndo, undo, resetScoreCount, resetMoveCount, setSquares, setMoveListener, setMoveEvent, setGameId } = squaresSlice.actions

export default squaresSlice.reducer