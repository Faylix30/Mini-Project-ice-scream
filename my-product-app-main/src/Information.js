import { Container } from "react-bootstrap";
import Navbarhome from "./component/Navbarhome";
import Odercard from "./component/Odercard";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Information() {
    let navigate = useNavigate();
    const [order, setOrder] = useState([])

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            navigate("/");
        }
        const getOrder = async () => {
            const res = await fetch(
                "http://localhost:8080/api/order",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: localStorage.getItem("user_id"),
                    })
                }
            );
            const json = await res.json()
            setOrder(json.data)
            console.log(json.data)
        }
        getOrder()
    }, [])

    return (
        <>
            <Navbarhome></Navbarhome>
            <h1 style={{ textAlign: 'center', marginTop: '0.5em', color: '#c77f3e' }} >รายการสั่งซื้อ</h1>
            <Container style={{ backgroundColor: '#f5e2ae', width: '70em', height: '50em', marginTop: '2em', overflowY: 'scroll' }}>
                {order.map((item) => {
                    return (
                        <Odercard data={item}></Odercard>
                    )
                })}
            </Container>
        </>
    )
}