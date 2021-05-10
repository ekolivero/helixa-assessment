import { rest } from 'msw'
import playersData from "./players"
const basePath = 'https://www.balldontlie.io'
const numberPlayers = 100

export const handlers = [
  // Get All Players
  //Will return the pagination with params page, per_page and search.
  //Using mocked data there is a cap on players MAX === 100
  rest.get(`${basePath}/api/v1/players`, (req, res, ctx) => {
    let data

    const per_page = parseInt(req.url.searchParams.get('per_page'))
    const page = parseInt(req.url.searchParams.get('page'))
    const search = req.url.searchParams.get('search')
    
    const { data: listPlayers } = playersData

    const isFirstPage = page === 1 ? true : false 

    let filteredPlayers = listPlayers.filter(player =>
      player.first_name.toLowerCase().includes(search) || player.last_name.toLowerCase().includes(search)
    )

    if (!!search) {
      data = filteredPlayers.slice(
        isFirstPage ? 0 : (page * per_page), 
        isFirstPage ? per_page : (page * per_page + per_page)
      )
    } else {
      data = listPlayers.slice(
        isFirstPage ? 0 : ((page * per_page) - per_page), 
        isFirstPage ? per_page : ((page * per_page))
      )
    }

    const total_pages = !!search 
      ? Math.ceil(filteredPlayers.length / per_page) // Math.ceil --> next page
      : Math.ceil(numberPlayers / per_page)
      
    const total_count = !!search
      ? filteredPlayers.length
      : numberPlayers

    return res(
      ctx.status(200),
      ctx.json({
        data,
        "meta": {
            "total_pages": total_pages,
            "current_page": page,
            "next_page": page + 1,
            "per_page": per_page,
            "total_count": total_count
        }
      })
    )
  }),

  // Season Averages
  //Will return the seson averages for a specific player.
  // In this case for the development I'll keep just one mocked data
  rest.get(`${basePath}/api/v1/season_averages`, (req, res, ctx) => {

    const season = req.url.searchParams.get('season')
    const player_id = req.url.searchParams.get('player_ids[]')

    return res(
      ctx.status(200),
      ctx.json({
        "data": [
          {
            "games_played": 31,
            "player_id": player_id,
            "season": season,
            "min": "18:50",
            "fgm": 1.74,
            "fga": 5.0,
            "fg3m": 1.26,
            "fg3a": 4.03,
            "ftm": 0.39,
            "fta": 0.42,
            "oreb": 0.16,
            "dreb": 1.39,
            "reb": 1.55,
            "ast": 0.65,
            "stl": 0.55,
            "blk": 0.19,
            "turnover": 0.45,
            "pf": 1.68,
            "pts": 5.13,
            "fg_pct": 0.348,
            "fg3_pct": 0.312,
            "ft_pct": 0.923
          }
        ]
      })
    )
  })

]