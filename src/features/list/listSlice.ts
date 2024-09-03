import type {ListItem} from './types';
import {createAppSlice} from '../../app/createAppSlice';
import {getGeneratedRandomColor} from '../../utils';

export type ListSliceState = {
  items: ListItem[]
}

const initialState: ListSliceState = {
  items: [],
};

export const listSlice = createAppSlice({
  name: 'list',
  initialState,
  reducers: {
    addItem: (state: ListSliceState) => {
      const newItem: ListItem = {
        id: Date.now(),
        color: getGeneratedRandomColor(),
      };

      state.items = [newItem, ...state.items];
    },
    removeItem: state => {
      state.items = state.items.slice(0, -1);
    },
  },
  selectors: {
    selectItems: state => state.items,
  },
});

export const {addItem, removeItem} = listSlice.actions;
export const {selectItems} = listSlice.selectors;
