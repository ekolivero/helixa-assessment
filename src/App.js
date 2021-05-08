import { useEffect } from "react"
import logo from './logo.svg';
import './App.scss';
import { useAppState } from "@hooks"
import { getPlayersList } from "./state/players/actions"

const App = () => {

  const [
    ,
    actions
  ] = useAppState(state => state, { getPlayersList })

  useEffect(() => {

    const getPlayers = async () => {
      await actions.getPlayersList({
        page: 1,
        per_page: 20,
      })
    }

    getPlayers() 
  }, [actions])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
