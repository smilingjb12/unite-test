import { createSlice } from "@reduxjs/toolkit";

export interface StatsState {
  sourceItemsModalIsVisible: boolean;
}

const initialState: StatsState = {
  sourceItemsModalIsVisible: false
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    showSourceStatsModal: state => {
      state.sourceItemsModalIsVisible = true;
    },
    closeSourceStatsModal: state => {
      state.sourceItemsModalIsVisible = false;
    }
  }
});

export const actions = statsSlice.actions;

export default statsSlice.reducer;
