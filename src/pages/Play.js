import { useContext } from 'react'
import { useState } from "react";
import { playerContext } from '../context/PlayerContext'
import { Button, Row, Col} from 'react-bootstrap';
import axios from "axios";
import useDeck from '../hooks/useDeck';
import { IconContext } from "react-icons/lib";
import { BsFillPlayCircleFill } from "react-icons/bs";

const Play = () => {

    const { player, partida } = useContext(playerContext);
    const [deck1, setDeck1] = useState({});
    const [deck2, setDeck2] = useState({});

    const handleSetDeck = () =>{
        const consultaAPI = async () => {
            const { data } = await axios(`http://deckofcardsapi.com/api/deck/${partida}/draw/?count=2`);
            console.log(data[0]);
            setDeck1(data.cards[0]);
            setDeck1(data.cards[1]);
            console.log(data);
        };
        consultaAPI();
        console.log(partida)
        
    };
    
    return (
        <div>
                <Row className='text-center mt-4'>
                    <Col className='border border-4 p-3' lg={6}>
                        <h3>{player.player1}</h3>
                    </Col>

                    <Button variant="none" style={{position : "absolute", width : "6%", left : "47%", top : "2em", hover : "none"}} onClick={handleSetDeck}>
                        <IconContext.Provider value={{ color: "464649", size: "50" }}>
                            <BsFillPlayCircleFill/>
                        </IconContext.Provider>    
                    </Button>

                    <Col className='border border-4 p-3' lg={6}>
                        <h3>{player.player2}</h3>
                    </Col>
                    
                </Row>

                <br/>
                {/* {partida} */}
        </div>
    )
}

export default Play;