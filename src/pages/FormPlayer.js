import { useContext, useState } from "react";
import axios from "axios";
import { playerContext } from "../context/PlayerContext";
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const FormPlayer = () => {

    const { player, setPlayer, setPartida } = useContext(playerContext);
    const [clic, setClic] = useState(false);
    const navigate = useNavigate();

    const [validated, setValidated] = useState(true);

    const handleMovimiento = (name, value) => {
        setPlayer({ ...player, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            await consultarAPI();
            navigate("/play", { replace: false });
        }
        setValidated(true);

    };
    
    const consultarAPI = async () => {

        const { data } = await axios("http://deckofcardsapi.com/api/deck/new/");
        setPartida(data.deck_id);
    };

    return (
        <>
            <Form className="text-center" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="col" >
                    <Row>
                        <Col md=''>
                            <Form.Label>Nombre Jugador 1</Form.Label>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <FormControl
                                    type='text'
                                    placeholder='Nombre'
                                    name="player1"
                                    onChange={e => handleMovimiento("player1", e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingrese el nombre
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                    </Row>
                </Form.Group>
                <br />
                <Form.Group className="col" >
                    <Row>
                        <Col md=''>
                            <Form.Label>Nombre Jugador 2</Form.Label>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <FormControl
                                    type='text'
                                    placeholder='Nombre'
                                    name="player2"
                                    onChange={e => handleMovimiento("player2", e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingrese el nombre
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                    </Row>
                </Form.Group>
                <br />
                <Col md="6">
                    <Button variant="primary" type="submit">Empezar</Button>
                </Col>
            </Form>
        </>
    );
};

export default FormPlayer;
