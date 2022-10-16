import { createSlice, current } from '@reduxjs/toolkit'
import { getNewIndex, getRandomIndex, getTwoRandomNumber, upAvailableIndexes } from '../../helpers/helpers'
import { setPossibleMoves } from '../../helpers/square'

const initialState = {
  rows: 4,
  squares: []
}

export const squaresSlice = createSlice({
  name: 'squares',
  initialState,
  reducers: {
    initial: (state) => {
      // state.user = action.payload
      let id = 0;
      while (state.squares.length < state.rows * state.rows) {
        state.squares.push({ id, number: null })
        id++;
      }
    },
    start: (state, action) => {
      let { rand1, rand2 } = getTwoRandomNumber(0, state.rows * state.rows - 1)

      state.squares.map((square, index) => {

        if (index == rand1 || index == rand2) {
          square.number = 2;
        }
      })
    },
    up: state => {

      let moveableSquares = []
      let availableSquares = []
      let currentState = current(state)

      let squaresInstance = setPossibleMoves(currentState.squares, currentState.rows, 'up')
      let newMove = false;
      squaresInstance.map(square => {
        if (square.upMoves.length > 0) {
          newMove = true;
        }
      })

      currentState.squares.map((square, index) => {
        if (square.number !== null) {
          let possibleAvailableIndexes = upAvailableIndexes(index, state.rows)
          if (possibleAvailableIndexes.length > 0) {
            moveableSquares.push(index)
          }
        }
      })


      state.squares.map((square, index) => {
        if (moveableSquares.includes(index)) {
          let possibleAvailableIndexes = upAvailableIndexes(index, state.rows)
          if (possibleAvailableIndexes.length > 0 && square.number !== null) {
            possibleAvailableIndexes.map(newIndex => {
              if (state.squares[newIndex].number == square.number && state.squares[newIndex].number !== null) {

                state.squares[newIndex].number *= 2;
                state.squares[index].number = null;
              }
              if (state.squares[newIndex].number === null) {

                state.squares[newIndex].number = square.number
                state.squares[index].number = null
              }

            })
          }
        }
      })

      // CREATE NEW SQUARE
      currentState = current(state)
      currentState.squares.map((square, index) => {
        if (square.number === null) {
          availableSquares.push(index)
        }
      })

      if (newMove) {
        let newSquareIndex = getRandomIndex(availableSquares)
        state.squares[newSquareIndex].number = 2;
      }


    },
    right: state => {

      let availableSquares = []
      let currentState = current(state)
      let squaresInstance = setPossibleMoves(currentState.squares, currentState.rows, 'right')
      console.log(squaresInstance);
      let newMove = false;
      squaresInstance.map(square => {
        if (square.rightMoves.length > 0) {
          newMove = true;
        }
      })

      // REVERSE SQUARES
      squaresInstance.sort((a, b) => {
        return b.id-a.id;
      })

      // MOVE SQUARES
      squaresInstance.map((square, index) => {
        let rightMoves = square.rightMoves;
        rightMoves.reverse()
        let moved = false;

        if (rightMoves.length > 0) {
          rightMoves.map(moveIndex => {
            if (state.squares[moveIndex].number === null && !moved) {
              
              state.squares[moveIndex].number = square.number;
              state.squares[square.id].number = null;
              moved = true
            }
            if (state.squares[moveIndex].number == square.number && !moved) {
              state.squares[moveIndex].number *= 2;
              state.squares[square.id].number = null;
              moved = true
            }

          })

        }
      })

      // CREATE NEW SQUARE
      currentState = current(state)
      currentState.squares.map((square, index) => {
        if (square.number === null) {
          availableSquares.push(index)
        }
      })

      if (newMove) {
        let newSquareIndex = getRandomIndex(availableSquares)
        state.squares[newSquareIndex].number = 2;
      }

    },
    down: state => {

    },
    left: state => {

    },
  },
})

// Action creators are generated for each case reducer function
export const { initial, start, up, right, down, left } = squaresSlice.actions

export default squaresSlice.reducer