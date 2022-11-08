import { configureStore } from "@reduxjs/toolkit";
import squaresReducer from './slices/squaresSlice'
import statisticsReducer from './slices/statisticsSlice'
import rulesReducer from './slices/rulesSlice'
import infoReducer from './slices/infoSlice'
import timerReducer from './slices/timerSlice'
import settingsReducer from './slices/settingsSlice'

export const store = configureStore({
    reducer: {
        rules: rulesReducer,
        squares: squaresReducer,
        statistics: statisticsReducer,
        info: infoReducer,
        timer: timerReducer,
        settings: settingsReducer,
    },
    
},window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
