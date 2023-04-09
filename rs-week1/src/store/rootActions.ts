import { actions } from './redusers/formSlice';
import { actions as searchActions } from './redusers/searchSlice';

export const rootActions = {
  ...actions,
  ...searchActions,
};
