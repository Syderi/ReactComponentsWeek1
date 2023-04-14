import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormCard } from '../../types/interface';

const stateFormProducts: IFormCard[] = [];

export const formSlice = createSlice({
  name: 'form',
  initialState: stateFormProducts,
  reducers: {
    addToStateFormProducts: (state, { payload }: PayloadAction<IFormCard>) => {
      state.push(payload);
    },
  },
});

export const { actions, reducer } = formSlice;
