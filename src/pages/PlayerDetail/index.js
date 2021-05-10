import { useEffect, useState } from "react" 
import { useParams } from "react-router-dom"
import { useAppState } from "@hooks"
import { getPlayerStats } from "@state/stats/actions"
import { selectPlayerById } from "@state/players/selectors"
import * as imageAPI from "@api/images"
import { Image } from "antd"
import { Empty } from "@components/Empty"

//Make utils folder /src/utils/getLastFiveSeasonArray
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

const PlayerDetail = () => {
  
  const { id: playerId } = useParams()
  const [playerImage, setPlayerImage] = useState(null)

  const [
    player,
    actions
  ] = useAppState(selectPlayerById(parseInt(playerId)), { getPlayerStats })

  const [
    stats,
  ] = useAppState(state => state.stats.stats, {})
 
  const currentYear = (new Date().getFullYear())

  const lastFiveYearsArray = range(currentYear -1, currentYear - 5, -1)

  useEffect(() => {
    //WRAP inside HOA (fullfillment)
    const getSeasonStats = async () => {
      await actions.getPlayerStats({ lastFiveYearsArray, playerId })
    }

    const getPlayerImage = async () => {
      imageAPI.getPlayerImage(player?.last_name, player?.first_name)
        .then((resp) => {
          if (resp.status === 200) {
            if (resp.data.type !== 'text/html') {
              setPlayerImage(URL.createObjectURL(resp.data))
            } else {
              setPlayerImage(null)
            }
          }
        })
    }

    getSeasonStats()
    getPlayerImage()
  }, [playerId, actions, lastFiveYearsArray, player?.last_name, player?.first_name])

  if (!player) return <Empty />

  return (
    <div className="container__detail">
      <div className="container__detail--description">
        <div className="container__detail--image">
          {!!playerImage ? (
            <Image 
              src={playerImage} 
              height={'100%'}
              width={'100%'}
              alt={`${player?.first_name} photo`}
            />
          ) : (
            <div className="container__detail--no-image">
              There's no image :( 
            </div>
          )}
        </div>
        <div className="container__detail--player">
          <div className="container__detail--player--name">
            { player?.first_name }
          </div>
          <div className="container__detail--player--last-name">
            { player?.last_name }
          </div>

        </div>
      </div>
      {/* TODO create component <SeasonList props={season} /> */}
      <div className="container__detail--last-games">
        <div className="container__detail__table">
          <table className="stats--table">
            <thead>
              <tr>
                <th>
                  By year
                </th>
                <th>
                  GP
                </th>
                <th>
                  Min
                </th>
                <th>
                  FGM
                </th>
                <th>
                  FGA
                </th>
                <th>
                  FG3M
                </th>
                <th>
                  FG3A
                </th>
                <th>
                  FTM
                </th>
                <th>
                  FTA
                </th>
                <th>
                  OREB
                </th>
                <th>
                  DREB
                </th>
                <th>
                  REB
                </th>
                <th>
                  AST
                </th>
                <th>
                  STL
                </th>
                <th>
                  BLK
                </th>
                <th>
                  TURNOV
                </th>
                <th>
                  PF
                </th>
                <th>
                  PTS
                </th>
                <th>
                  FG/PCT
                </th>
                <th>
                  FG3/PCT
                </th>
                <th>
                  FG/PCT
                </th>
              </tr>
            </thead>
            <tbody>
              {
                stats.map((el, id) => (
                  <tr key={id}>
                    <td>
                      { el?.season ?? '-' }
                    </td>
                    <td>
                      { el?.games_played ?? '-' }
                    </td>
                    <td>
                      { el?.min ?? '-' }
                    </td>
                    <td>
                      { el?.fgm ?? '-' }
                    </td>
                    <td>
                      { el?.fga ?? '-'}
                    </td>
                    <td>
                      { el?.fg3m ?? '-'}
                    </td>
                    <td>
                      { el?.fg3a ?? '-' }
                    </td>
                    <td>
                      { el?.ftm ?? '-' }
                    </td>
                    <td>
                      { el?.fta ?? '-' }
                    </td>
                    <td>
                      { el?.oreb ?? '-' }
                    </td>
                    <td>
                      { el?.dreb ?? '-' }
                    </td>
                    <td>
                      { el?.reb ?? '-' }
                    </td>
                    <td>
                      { el?.ast ?? '-' }
                    </td>
                    <td>
                      { el?.stl ?? '-' }
                    </td>
                    <td>
                      { el?.blk ?? '-' }
                    </td>
                    <td>
                      { el?.turnover ?? '-' }
                    </td>
                    <td>
                      { el?.pf ?? '-' }
                    </td>
                    <td>
                      { el?.pts ?? '-' }
                    </td>
                    <td>
                      { el?.fg_pct ?? '-' }
                    </td>
                    <td>
                      { el?.fg3_pct ?? '-' }
                    </td>
                    <td>
                      { el?.ft_pct ?? '-' }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PlayerDetail