import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';

function Navbarhome() {
  let navigate = useNavigate();
  const logout = () => {
    if (window.confirm("ยืนยันการ Logout") == true) {
      localStorage.clear();
      navigate("/", { replace: false });
    }
  }

  return (
    <>
      <Navbar style={{ backgroundColor: '#f5e2ae', fontWeight: 'bold', boxShadow: '1px 1px 20px 1px grey' }} sticky='top'>
        <Container>
          <Navbar.Brand href="home" style={{ color: '#c77f3e' }}><img src='/logo1.png' style={{ width: '8em' }} /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="product" style={{ color: '#c77f3e' }}>ไอศครีม</Nav.Link>
            <Nav.Link href="info" style={{ color: '#c77f3e' }}>รายการสั่งซื้อ</Nav.Link>
            <Nav.Link href="payment" style={{ color: '#c77f3e' }}>ชำระเงิน</Nav.Link>
          {localStorage.getItem('role_id')== 1 ? <Nav.Link href="admin" style={{ color: '#c77f3e' }}>แก้ไขข้อมูล</Nav.Link>:<></>}
          </Nav>
          <a style={{ marginRight: '1em' }}> User : {localStorage.getItem("user_name")}</a>
          <a onClick={logout} style={{ color: '#c77f3e' }}>LOGOUT</a>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarhome;