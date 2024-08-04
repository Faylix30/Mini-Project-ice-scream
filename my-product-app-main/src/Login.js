import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

var md5 = require("md5");
export default function Login() {

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    const onLogin = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            doLogin();
        }

        setValidated(true);
    }

    const doLogin = async () => {
        const user_data = { username: username, password: password }
        console.log(user_data)
        const response = await fetch(
            "http://localhost:8080/login",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        );

        const data = await response.json();

        if (data.result) {

            const data1 = await getAuthenToken();
            const authToken = data1.data.auth_token;
            const data2 = await getAccessToken(authToken);
            localStorage.setItem("access_token", data2.data.access_token);
            localStorage.setItem("user_id", data2.data.account_info.user_id);
            localStorage.setItem("user_name", username);
            localStorage.setItem("first_name", data2.data.account_info.first_name);
            localStorage.setItem("last_name", data2.data.account_info.last_name);
            localStorage.setItem("email", data2.data.account_info.email);
            localStorage.setItem("role_id", data2.data.account_info.role_id);

            navigate("home", { replace: false });
        }
    }

    const getAuthenToken = async () => {
        const response = await fetch(
            "http://localhost:8080/api/authen_request",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username
                })
            }
        );

        const data = await response.json();        return data;
    }

    const getAccessToken = async (authToken) => {
        var baseString = username + "&" + md5(password);
        var authenSignature = md5(baseString);

        const response = await fetch(
            "http://localhost:8080/api/access_request",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    auth_signature: authenSignature,
                    auth_token: authToken
                })
            }
        );

        const data = await response.json();
        return data;

    }

    return (
        <div className='container m-auto'>
            <Container style={{width: '40em', backgroundColor: '#faebd7', height: '30em', marginTop: '5em', borderRadius: '10px'}}>
            <Container style={{textAlign: 'center'}}>
                <img src="logoice.png" style={{width: '15em' , marginTop: '1em'}}/></Container>
            <Form noValidate validated={validated} onSubmit={onLogin}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="validateUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            กรุณากรอก Username
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="validatePassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            กรุณากรอก Password
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row style={{paddingLeft: '12em'}}>
                        <Button type="submit" style={{width: '58%' , fontSize: '1.3em' , backgroundColor: '#c77f3e' , border: 'none'}}>Login</Button>
                </Row>
            </Form>
            </Container>
        </div>
    );
}

