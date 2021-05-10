import { createSelector } from "reselect"

export const getListPlayers = state => state.players.players

export const selectPlayerById = playerId => {
  return createSelector(
    getListPlayers,
    players => players.find(el => el.id === playerId)
  )
}