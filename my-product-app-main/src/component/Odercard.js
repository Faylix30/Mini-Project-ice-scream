import { Card, Row, Col, Button } from 'react-bootstrap';

function Odercard(props) {

  const deleteOrder = async () => {
    if (window.confirm("ยืนยันการยกเลิกออเดอร์") == true) {
      const response = await fetch(
        "http://localhost:8080/api/order/delete",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            order_id: props.data.order_id
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
            <Col style={{ paddingTop: '3em' }}><h4>จำนวน : {props.data.amount} ลูก</h4></Col>
            <Col style={{ paddingTop: '3em' }}><h4>ราคารวม : {props.data.total_price} บาท</h4></Col>
            <Col style={{ paddingTop: '3em', maxWidth: '8em' }}>{props.data.status == "pending" ? <h4 style={{ color: '#ff6c3b' }}>รอชำระเงิน</h4> : <h4 style={{ color: 'green' }}>ชำระเงินเรียบร้อย</h4>}</Col>
            <Col style={{ paddingTop: '1.5em', textAlign: 'center' }}>
              <p style={{ margin: '0' }}>หมายเลขคำสั่งซื้อ <br></br> {props.data.order_id}</p>
              <Button variant="outline-danger" onClick={deleteOrder}>ยกเลิกคำสั่งซื้อ</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default Odercard;