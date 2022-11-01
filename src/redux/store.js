import { configureStore } from "@reduxjs/toolkit";
import squaresReducer from './slices/squaresSlice'
import rulesReducer from './slices/rulesSlice'
import infoReducer from './slices/infoSlice'
import timerReducer from './slices/timerSlice'
import settingsReducer from './slices/settingsSlice'

export const store = configureStore({
    reducer: {
        rules: rulesReducer,
        squares: squaresReducer,
        info: infoReducer,
        timer: timerReducer,
        settings: settingsReducer,
    },
    
},window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
