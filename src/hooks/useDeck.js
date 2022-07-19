import { useContext } from "react"
import { playerContext } from "../context/PlayerContext";

const useDeck = () => {
  return useContext(playerContext);
}

export default useDeck