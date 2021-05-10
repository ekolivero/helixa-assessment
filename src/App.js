import { useEffect, useState } from "react"
import './App.scss'
import { useAppState } from "@hooks"
import { useWindowSize } from "@hooks"
import { getPlayersList } from "@state/players/actions"
import { Layout, Col, Row, Typography } from "antd"
import Header from "@components/Header/index"
import PlayersList from "@pages/PlayersList"
import PlayerDetail from "@pages/PlayerDetail"
import { Route, useHistory } from "react-router-dom"
import { Empty } from "@components/Empty"

const { Title } = Typography

window.console.log('%c%s','color: green; background: yellow; font-size: 24px;','Helixa Assessment, Erik Olivero!')

const App = () => {

  const [serachValue, setSearchValue] = useState('')
  const history = useHistory()
  const size = useWindowSize()

  const [
    {
      players: {
        players,
        per_page,
      }
    },
    actions
  ] = useAppState(state => state, { getPlayersList })

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value)
    actions.getPlayersList({
      page: 1,
      per_page: per_page,
      search: e.target.value,
      isSearch: true
    })
  }

  useEffect(() => {
    history.replace('/')
    const getPlayers = async () => {
      await actions.getPlayersList({
        page: 1,
        per_page: per_page,
        isSearch: false
      })
    }

    getPlayers()

    // eslint-disable-next-line
  }, [])

  if (size.width < 1000) {
    return <Title level={3}> Try again on wider screens </Title>
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Header handleChange={handleSearch}/>
      <Row>
        <Col md={9} style={{ height: 'calc(100vh - 92px)'}}>
          <PlayersList players={players} search={serachValue} />
        </Col>
        <Col md={15}>
          <Route path="/player/:id">
            <PlayerDetail />
          </Route>
          <Route path="/" exact>
            <Empty />
          </Route>
        </Col>
      </Row>
    </Layout>
  )
}

export default App;