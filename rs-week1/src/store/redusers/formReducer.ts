import { createAction } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';
import { IFormCard } from '../../components/types/interface';

const baseFormProducts: IFormCard[] = [];

const ADD_FORM_CARD = createAction<IFormCard>('ADD_FORM_CARD');

const formReducer = createReducer(baseFormProducts, (builder) => {
  builder.addCase(ADD_FORM_CARD, (state, action) => {
    state.push(action.payload);
  });
});

export { formReducer, ADD_FORM_CARD };
