import { useContext } from 'react'
import { useState } from "react";
import { playerContext } from '../context/PlayerContext'
import { Button, Row, Col, Container } from 'react-bootstrap';
import axios from "axios";
import useDeck from '../hooks/useDeck';
import Cartas from './Cartas.js'
import { IconContext } from "react-icons/lib";
import { BsFillPlayCircleFill } from "react-icons/bs";

const Play = () => {

    const { player, partida } = useContext(playerContext);
    const [deck1, setDeck1] = useState([]);
    const [deck2, setDeck2] = useState([]);

    const handleSetDeck = async () => {

        const consultaAPI = async () => {
            const { data } = await axios(`http://deckofcardsapi.com/api/deck/${partida}/draw/?count=2`);
            
            if (data.cards.length > 0) {
                setDeck1(deck1.concat(data?.cards[0]));
                setDeck2(deck2.concat(data?.cards[1]));
            } else {
                alert(data.error)
            }
        };
        consultaAPI();

    };

    return (
        <Container>
            <Row className='text-center mt-4'>
                <Col className='border' lg={6}>
                    <h3>{player.player1}</h3>
                </Col>

                <Button variant="none" style={{ position: "absolute", width: "6%", left: "47%", top: "2em", hover: "none" }} onClick={handleSetDeck}>
                    <IconContext.Provider value={{ color: "464649", size: "50" }}>
                        <BsFillPlayCircleFill />
                    </IconContext.Provider>
                </Button>

                <Col className='border' lg={6}>
                    <h3>{player.player2}</h3>
                </Col>

            </Row>
            <Row>
                <Col className='border p-2' lg={6}>
                    {deck1.map((card, index) => (
                        <Cartas key={index} source={card?.images?.png} />
                    ))}
                </Col>
                <Col className='border p-2' lg={6}>
                    {deck2.map((card, index) => (
                        <Cartas key={index} source={card?.images?.png} />
                    ))}
                </Col>
            </Row>
            <br />
        </Container>
    )
}

export default Play;