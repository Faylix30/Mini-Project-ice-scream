import { Container, Button, Modal, Form } from "react-bootstrap";
import Navbarhome from "./component/Navbarhome";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Admincard from "./component/Admincard";


function AddProduct(props) {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState('');
    const [imagename, setImagename] = useState('');

    const handleName = (value) => {
        setName(value);
    }

    const handlePrice = (value) => {
        setPrice(value);
    }

    const handleStock = (value) => {
        setStock(value);
    }

    const handleImage = (value) => {
        setImage(value);
        setImagename(value.name);

    }

    const addProduct = async () => {

        var formData = new FormData();
        formData.append('product_name', name);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('image_url', imagename);
        formData.append('image', image);

        let response = await fetch(
            "http://localhost:8080/api/product/create",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            }
        );
        alert("แก้ไขสำเร็จ");
        window.location.reload();

    }

    return (
        <Modal
            {...props}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    เพิ่มสินค้า
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>ชื่อสินค้า</h5>
                <Form.Control
                    onChange={(event) => handleName(event.target.value)}
                    type="input"></Form.Control>
                <h5>ราคา</h5>
                <Form.Control
                    onChange={(event) => handlePrice(event.target.value)}
                    type="number" placeholder="ใส่จำนวนเงิน" />
                <h5>จำนวนสินค้า</h5>
                <Form.Control
                    onChange={(event) => handleStock(event.target.value)}
                    type="number" placeholder="ใส่จำนวนเงิน" />
                <h5>อัพโหลดรูปสินค้า</h5>
                <Form.Control
                    onChange={(event) => handleImage(event.target.files[0])}
                    type="file" />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={addProduct}>เพิ่มสินค้า</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default function Information() {
    const [product, setProduct] = useState([])
    let navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {

        if (!localStorage.getItem("access_token")) {
            navigate("/");
        }else if (localStorage.getItem("role_id")!=1){
            navigate("/home");
        }

        const getProduct = async () => {
            const res = await fetch(
                "http://localhost:8080/api/product",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        'Content-Type': 'application/json'
                    },
                }
            );
            const json = await res.json()
            setProduct(json.data)
            console.log(json.data)
        }
        getProduct()
    }, [])


    return (
        <>
            <Navbarhome></Navbarhome>
            <h1 style={{ textAlign: 'center', marginTop: '0.5em', color: '#c77f3e' }} >แก้ไขข้อมูล</h1>
            <Container style={{ backgroundColor: '#f5e2ae', width: '70em', height: '50em', marginTop: '2em', overflowY: 'scroll' }}>
                <Button variant="primary" style={{ width: '100%', fontSize: '28px' }} onClick={() => setModalShow(true)}>เพิ่มสินค้า</Button>
                {product.map((item) => {
                    return (
                        <Admincard data={item}></Admincard>
                    )
                })}
            </Container>
            <AddProduct
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}