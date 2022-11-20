import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  color: 0
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    update: (state, action) => {
      state.color = action.payload.color
    }
  }
})

export const {update} = themeSlice.actions;

export default themeSlice.reducer;