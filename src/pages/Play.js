import { useContext } from 'react'
import { playerContext } from '../context/PlayerContext'

const Play = () => {

    const { player, partida } = useContext(playerContext);
    
    console.log(player)
    return (
        <div>
            play
        </div>
    )
}

export default Play;