import { ChangeEvent, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { IUser } from "../Interfaces/IUser"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

const initialUser = {
    userName:"",
    fullName:"",
    email:"",
    password:"",
    Role:"",
    dateCreation: new Date().toISOString().split('T')[0],
    lastSession:new Date().toISOString().split('T')[0]
}
export function CreateNewUser() {
    const [userData, setUserData] = useState<IUser>(initialUser);
    const navigate = useNavigate();

    const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setUserData({ ...userData, [inputName]: inputValue });
    };


    const createUser = async () => {
        const response = await fetch(`${appsettings.urlApi}User`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            Swal.fire({
                title: "Éxito",
                text: "Usuario creado exitosamente",
                icon: "success",
            });
            navigate("/");
        } else {
            Swal.fire({
                title: "Error",
                text: "No se pudo crear el usuario",
                icon: "error",
            });
        }
    };
    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{ size: 8, offset: 2 }}>
                    <h4>Crear Nuevo Usuario</h4>
                    <hr />
                    <Form>
                        <FormGroup>
                            <Label>Nombre de Usuario</Label>
                            <Input type="text" name="userName" onChange={inputChangeValue} value={userData.userName} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Nombres completos</Label>
                            <Input type="text" name="fullName" onChange={inputChangeValue} value={userData.fullName} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input type="email" name="email" onChange={inputChangeValue} value={userData.email} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Contraseña</Label>
                            <Input type="password" name="password" onChange={inputChangeValue} value={userData.password} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Rol</Label>
                            <Input type="select" name="Role" onChange={inputChangeValue} value={userData.Role}>
                                <option value="usuario">Operador</option>
                                <option value="admin">Administrador</option>
                            </Input>
                        </FormGroup>
                    </Form>
                    <Button color="primary" className="me-4" onClick={createUser}>
                        Crear Usuario
                    </Button>
                    <Button color="secondary" onClick={() => navigate("/")}>
                        Volver
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}