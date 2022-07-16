import { useContext, useState } from "react";
import { playerContext } from "../context/PlayerContext";
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';


const FormPlayer = () => {
    const {player, setPlayer} = useContext(playerContext);
    const [clic, setClic] = useState(false);

    const [validated, setValidated] = useState(true);

    const handleMovimiento = (name, value) => {
        setPlayer({ ...player, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true)
    };

    const handleClic = () =>{
        setClic(!clic);
        console.log(clic);
    };

    return (
        <>
        <div>
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
                <br/>
                <Col md="6">
                    <Button variant="primary" type="submit" onClick={handleClic}>Empezar</Button>
                </Col>
            </Form>
            <hr />
            <Col md="6">
                <Button variant="primary" type="submit" onClick={handleClic}>Otra Vez</Button>
            </Col>
        </div>
        </>
    );
};

export default FormPlayer;
