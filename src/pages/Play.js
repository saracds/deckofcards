import { useContext, useState, useEffect } from 'react'
import { playerContext } from '../context/PlayerContext'
import { Button, Row, Col, Container, ThemeProvider } from 'react-bootstrap';
import axios from "axios";
import useDeck from '../hooks/useDeck';
import Cartas from './Cartas.js'
import { IconContext } from "react-icons/lib";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../style.css";

const Play = () => {

    const { player, partida } = useContext(playerContext);
    const [deck1, setDeck1] = useState([]);
    const [deck2, setDeck2] = useState([]);
    const [card1, setCard1] = useState([]);
    const [card2, setCard2] = useState([]);
    const [estado, setEstado] = useState(false);
    const [temporal, setTemporal] = useState([]);
    const [winer, setWiner] = useState("");
    const navigate = useNavigate();

    const handleSetDeck = async () => {

        const consultaAPI = async () => {
            const { data } = await axios(`https://deckofcardsapi.com/api/deck/${partida}/draw/?count=2`);
            
            if (data.cards.length > 0) {
                setDeck1(deck1.concat(data?.cards[0]));
                setDeck2(deck2.concat(data?.cards[1]));
                setTemporal(data?.cards);
            } else {
                alert(data.error)
            }
        };
        consultaAPI();
    };
    
    useEffect(() => {

        handleSetWiner();

    }, [deck1, deck2]);

    useEffect(() => {
        let contadorPl1 = 0;
        let contadorPl2 = 0;

        if( (card1.length === card2.length) && (card1.length > 0) ){
            card1.forEach(card => {
                contadorPl1 = contadorPl1 + switchSuit(card.suit);
            });

            card2.forEach(card => {
                contadorPl2 = contadorPl2 + switchSuit(card.suit);
            });

            if(contadorPl1 > contadorPl2){
                setWiner("P1");
            }else{
                setWiner("P2");
            }
        }

    }, [estado]);

    const switchSuit = (suit) =>{
        let contador = 0;

        switch (suit){
            case "SPADES":
                contador = contador + 3;
                break;
            case "DIAMONDS":
                contador = contador + 2;
                break;
            case "CLUBS":
                contador = contador + 1;
                break;
            case "HEARTS":
                contador = contador + 4;
                break;
            default:
                contador = 0;
        };
        return contador;
    };

    const handleSetWiner = () => {
        if(deck1.length > 1){

            deck1.forEach(card => {
                if((card.value === temporal[0].value) && (card.code !== temporal[0].code)){
                    let temp = [temporal[0], card]
                    setCard1(temp);
                    setEstado(true);
                    setWiner("P1")
                }  
            });
            
            
            deck2.forEach(card => {
                if((card.value === temporal[1].value) && (card.code !== temporal[1].code)){
                    let temp = [temporal[1], card]
                    setCard2(temp);
                    setEstado(true);
                    setWiner("P2")
                }  
            });
            
        }


    };

    return (
        <Container className='text-center'>
            <Row className='text-center mt-4'>
                <Col className='border' lg={6} sm={6} style={{background : winer === "P1" ? "rgb(0, 228, 110)" : ""}}>
                    <h3>{player.player1}</h3>
                </Col>

                <Button disabled={estado === true ? "disable" : ""} variant="none" className='boton' onClick={handleSetDeck}>
                    <IconContext.Provider value={{ color: "464649", size: "50" }}>
                        <BsFillPlayCircleFill />
                    </IconContext.Provider>
                </Button>

                <Col className='border' lg={6} sm={6} style={{background : winer === "P2" ? "rgb(0, 228, 110)" : ""}}>
                    <h3>{player.player2}</h3>
                </Col>

            </Row>
            <Row>
                <Col className='border text-center p-2' style={{height : "150px"}} lg={6} sm={6}>
                    {
                        winer === "P1" ? 
                            card1.map((card, index) => (
                            <Cartas key={index} source={card?.images?.png} />))
                        :
                            ""
                    }
                </Col>
                <Col className='border text-center p-2' style={{height : "150px"}} lg={6} sm={6}>
                {
                        winer === "P2" ? 
                            card2.map((card, index) => (
                            <Cartas key={index} source={card?.images?.png} />))
                        :
                            ""
                    }
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
            <Button variant='primary' className='p-3' onClick={() => navigate(-1)}>
                <h4>Jugar de nuevo</h4>
            </Button>
        </Container>
    )
}

export default Play;