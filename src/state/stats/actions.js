import { createAsyncThunk } from "@reduxjs/toolkit"
import * as statsAPI from "@api/stats"

export const getPlayerStats = createAsyncThunk(
  'state/stats/GET_SEASON_STATS',
  async ({ lastFiveYearsArray, _, playerId }, thunkAPI) => {
    try {
      const response = await Promise.all(
        lastFiveYearsArray.map(async (season) => {
          const { data: { data }} = await statsAPI.getSeasonStatsForPlayer(season, playerId)
          return data[0]
        })
      )

      return response 
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  }
) 