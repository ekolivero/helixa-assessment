import { useEffect, useState } from "react"
import { useAppState } from "@hooks"
import { getPlayersList } from "@state/players/actions"
import { getListPlayers } from "@state/players/selectors"
import { Input, Divider } from "antd"
import { ListItem } from "./ListItem"
import InfiniteScroll from "react-infinite-scroll-component"

const PlayersMaster = ({ props }) => {

  console.log(props)

  const [search, setSearch] = useState('')

  const [
    {
      players: {
        isLoading,
        hasMore,
        next_page,
        players,
        isSearch
      }
    },
    actions, 
  ] = useAppState(state => state, { getPlayersList })

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
    actions.getPlayersList({
      page: 1,
      per_page: 50,
      search: e.target.value,
      isSearch: true
    })
  }

  console.log(hasMore)

  return (
    <div className="container">
      <div className="container__search">
        <Input value={search} onChange={handleSearch} />
      </div>
      <div className="container__title">

      </div>
      
      <div className="container__scroller" id="scrollableDiv">
        <table className="players-list">
          <thead>
            <tr>
              <th>
                Player
              </th>
              <th>
                Team
              </th>
              <th>
                Position
              </th>
              <th>
                Weight
              </th>
              <th>
                Country
              </th>
            </tr>
          </thead>
        </table>
        <InfiniteScroll
            dataLength={players.length}
            next={() => actions.getPlayersList({ 
              page: next_page, 
              per_page: 50, 
              search: search, 
              isSearch: !!search ? true : false ,
              keepSearching: isSearch && !!search
            })}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
          { 
            players.map(player => 
              <ListItem 
                firstName={player.first_name}
                lastName={player.last_name}
                position={player.position}
                city={player.team.city}
                division={player.team.division}
                teamFullName={player.team.full_name}
              />
            )
          }
          </InfiniteScroll>
        </div>
    </div>
  )
}

export default PlayersMaster;