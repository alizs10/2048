import { configureStore } from "@reduxjs/toolkit";
import squaresReducer from './slices/squaresSlice'
import rulesReducer from './slices/rulesSlice'
import infoReducer from './slices/infoSlice'

export const store = configureStore({
    reducer: {
        rules: rulesReducer,
        squares: squaresReducer,
        info: infoReducer,
    },
    
},window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
