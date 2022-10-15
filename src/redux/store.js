import { configureStore } from "@reduxjs/toolkit";
import squaresReducer from './slices/squaresSlice'
import rulesReducer from './slices/rulesSlice'

export const store = configureStore({
    reducer: {
        rules: rulesReducer,
        squares: squaresReducer,
    },
    
},window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
