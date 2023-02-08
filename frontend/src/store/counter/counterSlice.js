import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { emailCheck: false, nicknameCheck: false },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    Check: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setUser } = counterSlice.actions;
export default counterSlice.reducer;
