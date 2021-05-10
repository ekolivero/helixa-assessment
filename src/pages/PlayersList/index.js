import { useAppState } from "@hooks" 
import { getPlayersList } from "@state/players/actions"
import InfiniteScroll from "react-infinite-scroll-component"
import { Spin } from "antd"
import { useHistory } from "react-router-dom"

export const PlayersList = ({ search }) => {
  const [
    {
      players: {
        hasMore,
        next_page,
        players,
        per_page
      }
    },
    actions, 
  ] = useAppState(state => state, { getPlayersList })

  const history = useHistory()

  const handlePlayerClick = (playerId) => {
    history.push(`/player/${playerId}`)
  }


  //TODO Create specific component <ListItem {props}>
  return (
    <div className="container__list">
      <div className="container__list--items">
        <div className="container__list--title">
          <table className="table--title">
            <thead>
              <tr>
                <th>
                  Player
                </th>
                <th>
                  Team
                </th>
                <th>
                  Division
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="container__list--scroller" id="scrollableDiv">
          <InfiniteScroll
            dataLength={players.length}
            next={() => actions.getPlayersList({ 
              page: next_page, 
              per_page: per_page, 
              search: search, 
            })}
            hasMore={hasMore}
            loader={<Spin />}
            scrollableTarget="scrollableDiv"
          >
          <div className="container__list--title">
            <table className="table--title">
              <tbody>
              { 
                players.map(player => 
                  <tr key={player.id} onClick={() => handlePlayerClick(player.id)}>
                    <td className="blue--item">
                      { player.first_name } { player.last_name}
                    </td>
                    <td className="blue--item">
                      { player.team.name }
                    </td>
                    <td>
                      { player.team.division }
                    </td>
                  </tr>
                )
              }
            </tbody>
            </table>
          </div>
          
          </InfiniteScroll>
        </div>
      </div>
    </div>
  )
}

export default PlayersList;