import { createSlice } from "@reduxjs/toolkit"
import { getPlayerStats } from "./actions"

const initialState = {
  isLoading: false,
  stats: [],
}

const playerStatsReducer = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: {
    [getPlayerStats.pending]: (state) => {
      state.isLoading = true
    },
    [getPlayerStats.fulfilled]: (state, { payload }) => {
      state.stats = payload
    }
  }
})

const { reducer } = playerStatsReducer

export default reducer;