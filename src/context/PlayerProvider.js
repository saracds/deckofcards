import { useState } from "react";
import {playerContext} from "./PlayerContext";


const PlayerProvider = ({children}) => {

    const [player, setPlayer] = useState({});
    const [partida, setPartida] = useState(null);

    return (
        <playerContext.Provider value={{player, setPlayer, partida, setPartida}}>
            {children}
        </playerContext.Provider>
    );
};

export default PlayerProvider;