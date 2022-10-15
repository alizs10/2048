import { createSlice } from '@reduxjs/toolkit'
import { getNewIndex, getTwoRandomNumber, upAvailableIndexes } from '../../helpers/helpers'

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
      while (state.squares.length < state.rows * state.rows) {
        state.squares.push({ number: null })
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
      state.squares.map((square, index) => {
        if (square.number !== null) { moveableSquares.push(index) }
      })

      console.log(moveableSquares);
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

      let newSquareIndex = getNewIndex(state.squares)
      state.squares[newSquareIndex].number = 2;


    },
    right: state => {

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