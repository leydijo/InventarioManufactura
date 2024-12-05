import { ChangeEvent, useState } from "react";
import { appsettings } from "../settings/appsettings";
import { useNavigate,useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { IProduct } from "../Interfaces/IProduct";
import { Header } from '../components/Header';

const initialProduct = {
     idProduct:0,
     name: "",
     typeProcessing: "",
     state: "",
     category:"",
     stock:"Disponible",
     DateRegister: new Date().toISOString().split('T')[0]
}

export function NewProduct() {

     const [product, setProduct] = useState<IProduct>(initialProduct);
     const navigate = useNavigate();
     const { productId } = useParams();
     const userName = localStorage.getItem('username') || 'Usuario';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/');
     }
     const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
          const inputName = event.target.name;
          const inputValue = event.target.value;

          setProduct({ ...product, [inputName]: inputValue })

     }
     const back = () => {
          navigate("/listaCategorias")
     }

     const save = async () => {
          const response = await fetch(`${appsettings.urlApi}Product`, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(product)
          })
          if (response.ok) {
               navigate("/listaCategorias")
          } else {
               Swal.fire({
                    title: "Error",
                    text: "No se pudo guardar el producto",
                    icon: "warning"
               });
          }
     }
     
     const fetchProduct = async () => {
          const response = await fetch(`${appsettings.urlApi}Product/${productId}`);
          const data = await response.json();
          setProduct(data);
     };

     if (productId) {
          fetchProduct();
     }
     return (
          <>
        <Header userName={userName} onLogout={handleLogout} />
          <Container className="mt-5">
               <Row>
                    <Col sm={{ size: 8, offset: 2 }}>
                         <h4>Nuevo Producto</h4>
                         <hr />
                         <Form>
                              <FormGroup>
                                   <Label>Nombre</Label>
                                   <Input type="text" name="name" onChange={inputChangeValue} value={product.name} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>Tipo de Elaboracion</Label>
                                   <Input type="text" name="typeProcessing" onChange={inputChangeValue} value={product.typeProcessing} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>Estado</Label>
                                   <Input type="text" name="state" onChange={inputChangeValue} value={product.state} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>Categoria</Label>
                                   <Input type="text" name="category" onChange={inputChangeValue} value={product.category} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>Stock</Label>
                                   <Input type="text" name="stock" onChange={inputChangeValue} value={product.stock} />
                              </FormGroup>
                         </Form>
                         <Button color="primary" className="me-4" onClick={save}>Crear</Button>
                         <Button color="secondary" onClick={back}>Volver</Button>
                    </Col>
               </Row>
          </Container>
          </>
     );
}