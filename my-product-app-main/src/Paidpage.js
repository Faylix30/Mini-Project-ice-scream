import { Button, Container, Form } from "react-bootstrap";
import Navbarhome from "./component/Navbarhome";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Paidpage() {

    let navigate = useNavigate();
    useEffect(() => {

        if (!localStorage.getItem("access_token")) {
            navigate("/");
        }
    }, [])

    const [orderid, setOrderid] = useState(0);
    const [date, setDate] = useState('');
    const [totalprice, setTotalprice] = useState(0);
    const [imagename, setImagename] = useState('');
    const [image, setImage] = useState('');

    const handleOrderid = (value) => {
        setOrderid(value);
    }

    const handleDate = (value) => {
        setDate(value);
    }

    const handleTotalprice = (value) => {
        setTotalprice(value);
    }

    const handleImage = (value) => {
        setImage(value);
        setImagename(value.name);

    }


    const addPayment = async () => {

        var formData = new FormData();
        formData.append('order_id', orderid);
        formData.append('date', date);
        formData.append('total_price', totalprice);
        formData.append('image_name', imagename);
        formData.append('image', image);

        let response = await fetch(
            "http://localhost:8080/api/payment/create",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            }
        );
        alert("ส่งหลักฐานการชำระเงินสำเร็จ");
        window.location.reload();

    }
    return (
        <>
            <Navbarhome></Navbarhome>
            <h1 style={{ textAlign: 'center', marginTop: '0.5em', color: '#c77f3e' }} >การชำระเงิน</h1>
            <Container style={{ backgroundColor: '#f5e2ae', width: '70em', height: 'auto', marginTop: '2em', padding: '3em' }}>
                <h3>แจ้งชำระเงิน</h3>
                <h5>
                    แจ้งการชำระเงินของคุณได้ที่นี่
                    <br></br>
                    "*สำหรับลูกค้าที่สั่งซื้อทางหน้า Website แบบโอนเงินเท่านั้นครับ"
                    <br></br>
                    ทางเราจะเช็คการชำระเงินใน 24 ชม.นะครับ
                    <br></br>
                    <br></br>
                    *หากมีปัญหาในการแจ้งชำระเงิน หรือสอบถามข้อมูล หรือครบ 24 ชม แล้วสถานะคำสั่งซื้อไม่เปลี่ยน ติดต่อได้ที่ 09x-xxx-xxxx
                </h5>
                <Container style={{ backgroundColor: 'white', width: '30em', height: '50em', marginTop: '2em', padding: '1em', borderRadius: '5px' }}>
                    <h4 style={{ borderBottom: '3px solid #bbb', textAlign: 'center' }}>โปรดกรอกรายละเอียดของคุณ!</h4>
                    <p style={{ textAlign: 'center' }}><img src="/qrcode.jpg" style={{ width: '20em' }} /></p>
                    <h5>หมายเลขคำสั่งซื้อ</h5>
                    <Form.Control
                        type="number" placeholder="ใส่หมายเลขคำสั่งซื้อ"
                        onChange={(event) => handleOrderid(event.target.value)}
                    />
                    <h5>วันที่และเวลาที่โอน</h5>
                    <Form.Control
                        onChange={(event) => handleDate(event.target.value)}
                        type="datetime-local"></Form.Control>
                    <h5>จำนวนเงิน</h5>
                    <Form.Control
                        onChange={(event) => handleTotalprice(event.target.value)}
                        type="number" placeholder="ใส่จำนวนเงิน" />
                    <h5>อัพโหลดสลิป</h5>
                    <Form.Control
                        onChange={(event) => handleImage(event.target.files[0])}
                        type="file" />
                    <Button
                        onClick={addPayment}
                        style={{ marginTop: '1em', width: '100%', backgroundColor: '#c77f3e', border: 'none' }}>ยืนยัน</Button>
                </Container>
            </Container>
        </>
    )
}