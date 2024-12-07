import { createSlice } from "@reduxjs/toolkit";

const idSlice = createSlice({
  name: "id",
  initialState: {
    value: null,
  },
  reducers: {
    setId(state, action) {
      state.value = action.payload; // Update the ID
    },
  },
});

// Export actions and reducer
export const { setId } = idSlice.actions;
export default idSlice.reducer;
