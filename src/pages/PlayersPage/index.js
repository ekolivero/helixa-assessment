import PlayersMaster from "./PlayersMaster"
import { Layout } from "@containers"

export default function PlayersPage() {
  return (
    <Layout
      id="PlayersPage"
      master={PlayersMaster}
    />
  )
}