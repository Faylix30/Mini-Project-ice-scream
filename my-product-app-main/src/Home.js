import { Form, Container, Card, Row } from "react-bootstrap";
import Navbarhome from "./component/Navbarhome";
import Homeslide from "./component/Homeslide";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export default function Home() {
    let navigate = useNavigate();
    useEffect(() => {
        
        if (!localStorage.getItem("access_token")) {
            navigate("/");
        }
    }, [])


    return (
        <>
            <Navbarhome></Navbarhome>
            <Homeslide></Homeslide>
            <Container style={{ height: '10em' }}>
                <h1 style={{ textAlign: 'center', color: '#c77f3e' }} >สมาชิก</h1>
                <Form md={4} style={{ textAlign: 'center' }}>
                    <Row>
                        <Card border="primary" style={{ width: '15rem', margin: 'auto' }}>
                            <Card.Body>
                                <Card.Title>นาย ปิยะวัฒน์ แวงโสธรณ์</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card border="primary" style={{ width: '15rem', margin: 'auto' }}>
                            <Card.Body>
                                <Card.Title>นางสาว อรณัส เย่าตัก</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card border="primary" style={{ width: '15rem', margin: 'auto' }}>
                            <Card.Body>
                                <Card.Title>นางสาว แวนูรมา แวเด็ง</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card border="primary" style={{ width: '15rem', margin: 'auto' }}>
                            <Card.Body>
                                <Card.Title>นางสาว ซูซานี หวันดะหวา</Card.Title>
                            </Card.Body>
                        </Card>
                    </Row>
                </Form>
            </Container>
        </>
    );

}