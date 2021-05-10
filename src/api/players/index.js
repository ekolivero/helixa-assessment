import { client } from "../index"

export const getPlayersList = (page, per_page, search = "") => {
  return client.get(`/api/v1/players?per_page=${per_page}&page=${page}${!!search ? '&search=' + search : '' }`)
}

export const getPlayerSeasonAverages = (season, player_id) => {
  return client.get(`api/v1/season_averages?season=${season}&player_ids[]=${player_id}`)
}