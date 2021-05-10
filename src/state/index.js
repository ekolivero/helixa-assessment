import { combineReducers } from "redux"
import playerReducer from "./players/reducer"
import playerStatsReducer from "./stats/reducer"

export default combineReducers({
  players: playerReducer,
  stats: playerStatsReducer
})