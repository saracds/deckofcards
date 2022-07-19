import { useContext, useState } from 'react'
import { playerContext } from '../context/PlayerContext'
import { Button, Row, Col} from 'react-bootstrap';
import useDeck from '../hooks/useDeck';
import {BsFillPlayCircleFill} from 'react-icons/bs';
import { IconContext } from "react-icons/lib";

const Play = () => {

    const { player, partida } = useContext(playerContext);



    return (
        <div className='text-center'>
                <Row className='text-center mt-4'>
                    <Col className='border border-4 p-3' lg={6}>
                        <h3>{player.player1}</h3>
                    </Col>
                    <Col className='border border-4 p-3' lg={6}>
                        <h3>{player.player2}</h3>
                    </Col>
                    <Button variant="none" className='float'>
                        <IconContext.Provider value={{ color: "464649", size: "50" }}>
                            <BsFillPlayCircleFill/>
                        </IconContext.Provider>    
                    </Button>
                </Row>
                
                <br/>
                {partida}
        </div>
    )
}

export default Play;