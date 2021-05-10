import { client } from "../index"

export const getSeasonStatsForPlayer = (season, playerId) => {
  return client.get(`/api/v1/season_averages?season=${season}&player_ids[]=${playerId}`)
}
