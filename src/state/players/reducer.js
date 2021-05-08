import { createSlice } from "@reduxjs/toolkit"
import { getPlayersList } from "./actions"

const initialState = {
  isLoading: false,
  hasMore: true,
  next_page: null,
  players: []
}

const playersReducer = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: {
    [getPlayersList.pending]: (state) => {
      state.isLoading = true
    },
    [getPlayersList.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.hasMore = payload.hasMore
      state.next_page = payload.next_page
      state.players = payload.players
    }
  }
})

const { reducer } = playersReducer

export default reducer;