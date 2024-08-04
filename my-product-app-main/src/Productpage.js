import Navbarhome from "./component/Navbarhome";
import Icecream from "./component/Icecream";
import { Row, Col, Container } from 'react-bootstrap'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Productpage() {
    let navigate = useNavigate();
    const [product, setProduct] = useState([])
    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            navigate("/");
        }
        const getProduct = async () => {
            const res = await fetch(
                "http://localhost:8080/api/product",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        'Content-Type': 'application/json',
                    }
                }
            );
            const json = await res.json()
            setProduct(json.data)
        }

        getProduct()
    }, [])

    return (
        <>
            <Navbarhome></Navbarhome>
            <Container>
                <h1 style={{ textAlign: 'center', marginTop: '0.5em', color: '#c77f3e' }}>Our Product</h1>
                <Row md={4}>
                    {product.map((item) => {
                        return (
                            <Col><Icecream data={item}></Icecream></Col>
                        )
                    })}
                </Row>
            </Container>
        </>

    );
}