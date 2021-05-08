import { combineReducers } from "redux"
import playerReducer from "./players/reducer"

export default combineReducers({
  players: playerReducer
})