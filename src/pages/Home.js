import React,{ useContext, useState }  from 'react';
import {GiCardAceSpades, GiCardAceHearts, GiCardAceDiamonds, GiCardAceClubs} from 'react-icons/gi';
import { IconContext } from "react-icons/lib";
import {AiFillPlayCircle} from 'react-icons/ai';
import Play from './Play';
import { Row, Col, Container } from 'react-bootstrap';
import FormPlayer from './FormPlayer';

const Home = () => {
    return (
        <Container fluid="lg mt-5" >
            <Row>
                <Col md={7}>
                    <FormPlayer />
                </Col>
                <Col md={5} className="text-center">
                    <h1>
                        Deck Of Cards
                    </h1>
                    <IconContext.Provider value={{ color: "464649", size: "50" }}>
                        <GiCardAceSpades />
                    </IconContext.Provider>
                    <IconContext.Provider value={{ color: "E52626", size: "50" }}>
                        <GiCardAceHearts />
                    </IconContext.Provider>
                    <IconContext.Provider value={{ color: "2537FD", size: "50" }}>
                        <GiCardAceDiamonds />
                    </IconContext.Provider>
                    <IconContext.Provider value={{ color: "3EA52A", size: "50" }}>
                        <GiCardAceClubs />
                    </IconContext.Provider>
                </Col>
            </Row>
            <hr />
            {/* <Play /> */}
            <hr />
        </Container>
    )
}

export default Home;