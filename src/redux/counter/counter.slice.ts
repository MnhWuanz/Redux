import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
  name: string;
}

const initialState: CounterState = {
  value: 0,
  name: 'Quan',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrease: (state) => {
      state.value -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrease } = counterSlice.actions;

export default counterSlice.reducer;
