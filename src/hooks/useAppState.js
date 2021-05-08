import { useSelector } from "react-redux"
import useActions from "./useActions"

export default function useAppState(stateSelector, actions) {
  const selectedState = useSelector(stateSelector)
  const dispatchableActions = useActions(actions)

  return [
    selectedState,
    dispatchableActions
  ]
}