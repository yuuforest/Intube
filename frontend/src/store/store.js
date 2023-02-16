import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import micReducer from './counter/micSlice'

export const store = configureStore({
  reducer: { 
    counter: counterReducer,
    mic: micReducer,
    },
})