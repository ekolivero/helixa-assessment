import { useEffect } from "react"
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

export default App;
