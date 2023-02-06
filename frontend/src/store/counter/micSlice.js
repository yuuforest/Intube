import { createSlice } from '@reduxjs/toolkit'

export const micSlice = createSlice({
  name: 'micSlice',
  initialState: {
    value: false,
  },
  reducers: {
    setMic: (state) => {
      state.value = !state.value
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMic } = micSlice.actions
export default micSlice.reducer
export const micState = (state) => state.mic.value