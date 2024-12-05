import { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Table } from 'reactstrap';
import { appsettings } from '../settings/appsettings';
import { IProduct } from "../Interfaces/IProduct";
import { useNavigate } from "react-router-dom";
import { Header } from '../components/Header';

export function Category() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const userName = localStorage.getItem('username') || 'Usuario';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/');
    }
    const GetProduct = async () => {
        const response = await fetch(`${appsettings.urlApi}Product/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            setProducts(data);
        }
    };

    const createProduct = () => {
        navigate("/nuevoProducto")
    }
    const BulkProduct = () => {
        navigate("/cargaMasiva")
    }
    useEffect(() => {
        GetProduct();
    }, []);

    const handleViewProducts = (category: string) => {
        navigate(`/products/${category}`);
    };

    return (
        <>
            <Header userName={userName} onLogout={handleLogout} />
            <Container className="mt-5">
                <Row>
                    <Col sm={{ size: 8, offset: 2 }}>
                        <h4> Lista de Categorías</h4>
                        <hr />
                        <Button
                            color="secondary"
                            onClick={createProduct}
                        >
                            Crear producto
                        </Button>
                        <Button
                            color="secondary"
                            onClick={BulkProduct}
                        >
                            Crear producto de forma masiva
                        </Button>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Categoría</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from(new Set(products.map(item => item.category))).map((category, index) => (
                                    <tr key={index}>
                                        <td>{category}</td>
                                        <td>
                                            <Button
                                                color="primary"
                                                onClick={() => handleViewProducts(category)}
                                                className="me-2"
                                            >
                                                Ver
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>



                    </Col>

                </Row>
            </Container>
        </>
    );
}
