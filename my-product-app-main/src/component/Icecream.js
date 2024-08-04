import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';

function MyModal(props) {
  const [amount, setAmount] = useState(1);
  const [topping, setTopping] = useState('');
  const [ware, setWare] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState(0);

  const handleTopping = (value) => {
    setTopping(value);
    console.log(value);
  }

  const handleWare = (value) => {
    setWare(value);
    console.log(value);
  }

  const handleAddress = (value) => {
    setAddress(value);
    console.log(value);
  }

  const handleNumber = (value) => {
    setNumber(value);
    console.log(value);
  }

  const addOrder = async () => {
    const response = await fetch(
      "http://localhost:8080/api/order/add",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          product_name: props.data.product_name,
          topping: topping,
          amount: amount,
          total_price: amount * props.data.price,
          address: address,
          number: number,
          ware: ware,
          image_url:props.data.image_url
        })
      }
    );
    props.onHide()
    alert("คำสั่งซื้อ สำเร็จ");
  }
  
  const addAmount = () => {
    if (amount < 50) {
      setAmount(amount + 1)
    }
  }

  const delAmount = () => {
    if (amount > 0) {
      setAmount(amount - 1)
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ fontFamily: 'customFont' }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.data.product_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: 'center' }}>
        <img src={`http://localhost:8080/images/${props.data.image_url}`} />
        <h4>ราคา : {props.data.price} บาท</h4>
        <Modal.Title style={{ textAlign: 'left' }}>
          <h5>ท็อปปิ้ง</h5>
        </Modal.Title>
        <Form.Select onChange={(event) => handleTopping(event.target.value)}>
          <option>กรุณาเลือกท็อปปิ้ง 1 อย่าง</option>
          <option value="คอนเฟลก">คอนเฟลก</option>
          <option value="มาร์ชเมลโล่">มาร์ชเมลโล่</option>
          <option value="ถั่วแดงกวน">ถั่วแดงกวน</option>
          <option value="ผงไมโล">ผงไมโล</option>
          <option value="ไข่มุก">ไข่มุก</option>
          <option value="ข้าวเหนียวมูน">ข้าวเหนียวมูน</option>
          <option value="ช็อกโกแลตชิพ">ช็อกโกแลตชิพ</option>
        </Form.Select>
        <Modal.Title style={{ textAlign: 'left' }}>
          <h5>ภาชนะ</h5>
        </Modal.Title>
        <Form.Select onChange={(event) => handleWare(event.target.value)}>
          <option>กรุณาเลือกภาชนะที่ต้องการ</option>
          <option value="โคนวาฟเฟิล">โคนวาฟเฟิล</option>
          <option value="ถ้วย">ถ้วย</option>
        </Form.Select>
        <Row>
          <h4>เลือกจำนวน</h4>
        </Row>
        <Row>
          <Col>
            <Button variant="outline-danger" onClick={delAmount} style={{ width: '80%' }}>-</Button>
          </Col>
          <Col>
            <h3>{amount}</h3>
          </Col>
          <Col>
            <Button variant="outline-success" onClick={addAmount} style={{ width: '80%' }}>+</Button>
          </Col>
        </Row>
        <Row>
          <h4 style={{ marginTop: '3em' }}>ที่อยู่และเบอร์โทรติดต่อ</h4>
          <Form.Label ><h5>ที่อยู่</h5></Form.Label>
          <Form.Control 
            onChange={(event) => handleAddress(event.target.value)}
            as="textarea"
            style={{ height: '10em' }}
          />
          <Form.Group>
            <Form.Label><h5>เบอร์โทรศัพท์</h5></Form.Label>
            <Form.Control
              onChange={(event) => handleNumber(event.target.value)}
              placeholder="เบอร์โทรศัพท์"
              style={{ height: '50px' }} />
          </Form.Group>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <h4 style={{ marginRight: '2em' }}>ราคารวม {amount * props.data.price} บาท</h4>
        <Button onClick={props.onHide}>Cancel</Button>
        <Button onClick={addOrder} >Order</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Icecream(props) {
  const [modalShow, setModalShow] = useState(false);
  console.log(props.data)

  return (
    <>
      <Card style={{ width: "18rem", minWidth: "10em", margin: "2em" }}>
        <Card.Img variant="top" src={`http://localhost:8080/images/${props.data.image_url}`} style={{ maxHeight: "15em" }} />
        <Card.Body>
          <Card.Title>{props.data.product_name}</Card.Title>
        </Card.Body>
        <a href="#" onClick={() => setModalShow(true)} class="stretched-link"></a>
      </Card>

      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={props.data}
      />
    </>
  );
}

export default Icecream;