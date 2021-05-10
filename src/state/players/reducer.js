import { createSlice } from "@reduxjs/toolkit"
import { getPlayersList } from "./actions"

const initialState = {
  isLoading: false,
  hasMore: true,
  next_page: null,
  players: [],
  isSearch: false,
  loaded: false,
  per_page: 50,
}

const playersReducer = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: {
    [getPlayersList.pending]: (state, { meta }) => {
      state.isLoading = true
      state.loaded = false
    },
    [getPlayersList.fulfilled]: (state, { payload }) => {
      const { hasMore, next_page, players, isSearch } = payload
      state.isLoading = false
      state.hasMore = hasMore
      state.next_page = next_page
      state.players = !isSearch ? state.players.concat(players) : players
      state.loaded = true
      state.isSearch = isSearch
    }
  }
})

const { reducer } = playersReducer

export default reducer;