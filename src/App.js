/* import { useEffect } from "react"
import logo from './logo.svg';
import './App.scss';
import { useAppState } from "@hooks"
import { getPlayersList } from "@state/players/actions"
import PlayersPage from "@pages/PlayersPage"
import { Layout, Header } from "antd"

const App = () => {

  const [
    ,
    actions
  ] = useAppState(state => state, { getPlayersList })

  useEffect(() => {

    const getPlayers = async () => {
      await actions.getPlayersList({
        page: 1,
        per_page: 50,
        isSearch: false,
      })
    }

    getPlayers() 
  }, [actions])

  return (
    <Layout style={{ maxHeight: "100vh"}}>
      <PlayersPage />
    </Layout>
  );
}

export default App; */

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

  }, [])

  if (size.width < 1000) {
    return <Title level={3}> Try again on wider screens </Title>
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Header handleChange={handleSearch}/>
      <Row>
        <Col md={12} style={{ height: 'calc(100vh - 92px)'}}>
          <PlayersList players={players} serach={serachValue} />
        </Col>
        <Col md={12}>
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