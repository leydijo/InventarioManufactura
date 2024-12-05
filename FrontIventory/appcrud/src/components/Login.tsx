import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Swal from "sweetalert2";
import { appsettings } from "../settings/appsettings";
import { ILogin } from "../Interfaces/ILogin";


const initiallogin={
    username: "",
    password: ""
}
export function Login(){

    const [loginUser, setLoginUser] = useState<ILogin>(initiallogin);
    const navigate = useNavigate();

    const inputChangeValue = (event : ChangeEvent<HTMLInputElement>)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setLoginUser({...loginUser,[inputName]: inputValue})

    }

    const login = async () => {
        const response = await fetch(`${appsettings.urlApi}Login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginUser),
        });
          
        if (response.ok) {
          const data = await response.json();
          const token = data.token; 
          const username = data.user
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          Swal.fire({
            title: "Éxito",
            text: "Inicio de sesión exitoso",
            icon: "success",
          });
          navigate("/listaCategorias");
        } else {
          Swal.fire({
            title: "Error",
            text: "Username o contraseña incorrectos",
            icon: "error",
          });
        }
      };

      const create = () => {
        navigate("/createUsuario")
    }
    return(
        <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4>Iniciar Sesión</h4>
          <hr />
          <Form>
            <FormGroup>
              <Label>Nombre de Usuario</Label>
              <Input type="text" name="username" onChange={inputChangeValue} value={loginUser.username} />
            </FormGroup>
            <FormGroup>
              <Label>Contraseña</Label>
              <Input type="password" name="password" onChange={inputChangeValue} value={loginUser.password} />
            </FormGroup>
          </Form>
          <Button color="primary" className="me-4" onClick={login}>
            Iniciar Sesión
          </Button>
          <Button color="secondary" onClick={create}>
            Crear Cuenta
          </Button>
        </Col>
      </Row>
    </Container>
    );
}
