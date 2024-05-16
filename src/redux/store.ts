import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from './tasksSlice'

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']