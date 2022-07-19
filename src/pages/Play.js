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
    const [winer1, setWiner1] = useState([]);
    const [winer2, setWiner2] = useState([]);
    const [estado, setEstado] = useState(false);

    const handleSetDeck = async () => {

        const consultaAPI = async () => {
            const { data } = await axios(`http://deckofcardsapi.com/api/deck/${partida}/draw/?count=2`);
            
            if (data.cards.length > 0) {
                setDeck1(deck1.concat(data?.cards[0]));
                setDeck2(deck2.concat(data?.cards[1]));
                setWiner1(data?.cards[0]);
                setWiner2(data?.cards[1]);
            } else {
                alert(data.error)
            }
        };
        consultaAPI();
        handleWiner();
    };
    
    const handleWiner = () =>{

        deck1.forEach(card => {
            if(card.value === winer1.value){
                setWiner1(winer1.concat(card));
                console.log("funciona");
                setEstado(true);
            }  
        });

        if(estado === false){
            
            setWiner1([]);
            setWiner2([]);
            
        }
        console.log(winer1);
    }

    return (
        <Container>
            <Row className='text-center mt-4'>
                <Col className='border' lg={6} sm={6}>
                    <h3>{player.player1}</h3>
                </Col>

                <Button disabled={estado == true ? "disable" : ""} variant="none" style={{ position: "absolute", width: "4%", left: "47.8%", top: "1%", hover: "none" }} onClick={handleSetDeck}>
                    <IconContext.Provider value={{ color: "464649", size: "50" }}>
                        <BsFillPlayCircleFill />
                    </IconContext.Provider>
                </Button>

                <Col className='border' lg={6} sm={6}>
                    <h3>{player.player2}</h3>
                </Col>

            </Row>
            <Row>
                <Col className='border text-center p-2' style={{height : "200px"}} lg={6} sm={6}>
               
                </Col>
                <Col className='border text-center p-2' style={{height : "200px"}} lg={6} sm={6}>

                </Col>
            </Row>
            <Row>
                <Col className='border p-2' lg={6} sm={6}>
                    {deck1.map((card, index) => (
                        <Cartas key={index} source={card?.images?.png} />
                    ))}
                </Col>
                <Col className='border p-2' lg={6} sm={6}>
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