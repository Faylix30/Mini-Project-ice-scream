import { Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useState } from "react";

function UpdateProduct(props) {


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

  const updateProduct = async () => {

    var formData = new FormData();
    formData.append('product_id', props.data.product_id);
    formData.append('product_name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('image_url', imagename);
    formData.append('image', image);

    let response = await fetch(
      "http://localhost:8080/api/product/update",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data);
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
          แก้ไขข้อมูล
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>ชื่อสินค้า</h5>
        <Form.Control
          onChange={(event) => handleName(event.target.value)}
          type="input" placeholder={props.data.product_name}></Form.Control>
        <h5>ราคา</h5>
        <Form.Control
          onChange={(event) => handlePrice(event.target.value)}
          type="number" placeholder={props.data.price} />
        <h5>จำนวนสินค้า</h5>
        <Form.Control
          onChange={(event) => handleStock(event.target.value)}
          type="number" placeholder={props.data.stock} />
        <h5>อัพโหลดรูปสินค้า</h5>
        <Form.Control
          onChange={(event) => handleImage(event.target.files[0])}
          type="file" />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={updateProduct}>Edit</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Admincard(props) {

  const [modalShow, setModalShow] = useState(false);
  const deleteProduct = async () => {
    if (window.confirm("ยืนยันการลบสินค้า") == true) {
      const response = await fetch(
        "http://localhost:8080/api/product/delete",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            product_id: props.data.product_id
          })
        }
      );
      window.location.reload();
    }
  }

  return (
    <>
      <Card style={{ width: '100%', borderColor: '#c77f3e', marginTop: '0.5em' }}>
        <Card.Body>
          <Row>
            <Col> <img src={`http://localhost:8080/images/${props.data.image_url}`} style={{ width: '10em' }} /></Col>
            <Col style={{ paddingTop: '3em' }}><h4>{props.data.product_name}</h4></Col>
            <Col style={{ paddingTop: '3em' }}><h4>ราคา : {props.data.price} บาท</h4></Col>
            <Col style={{ paddingTop: '3em' }}><h4>จำนวนสินค้า : {props.data.stock}</h4></Col>
            <Col style={{ paddingTop: '1.5em', textAlign: 'center' }}>
              <Button variant="outline-primary" onClick={() => setModalShow(true)}>แก้ไขข้อมูล</Button>
              <Button variant="outline-danger" onClick={deleteProduct}>ลบสินค้า</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <UpdateProduct
        data={props.data}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Admincard;