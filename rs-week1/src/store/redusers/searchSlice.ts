import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const stateSearch = {
  stateSearch: '',
};

export const stateSlice = createSlice({
  name: 'search',
  initialState: stateSearch,
  reducers: {
    changeSearch: (state, action: PayloadAction<string>) => {
      state.stateSearch = action.payload;
    },
  },
});

export const { actions, reducer } = stateSlice;
