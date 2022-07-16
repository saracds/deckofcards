import { useState } from "react";
import {playerContext} from "./PlayerContext";


const PlayerProvider = ({children}) => {

    const [player, setPlayer] = useState({});

    return (
        <playerContext.Provider value={{player, setPlayer}}>
            {children}
        </playerContext.Provider>
    );
};

export default PlayerProvider;