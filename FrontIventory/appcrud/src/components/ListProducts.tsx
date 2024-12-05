import { useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { Container, Table, Button, Input } from "reactstrap"
import { IProduct } from "../Interfaces/IProduct";
import { Header } from '../components/Header';

export function ListProducts() {

    const { category } = useParams();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [filteredState, setFilteredState] = useState('');
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
        })

        if (response.ok) {
            const data = await response.json();
            setProducts(data.filter((product: IProduct) => product.category === category && product.stock !== "vendido"));
        }
    }

    useEffect(() => {
        GetProduct()
    }, [])

    const markAsSold = async (idProduct: number) => {
        const response = await fetch(`${appsettings.urlApi}Product/${idProduct}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idProduct: idProduct, stock: "vendido" }),
        });

        if (response.ok) {
            Swal.fire({
                title: "Éxito",
                text: "Producto marcado como vendido",
                icon: "success",
            });
            await GetProduct();
        } else {
            Swal.fire({
                title: "Error",
                text: "No se pudo actualizar el producto",
                icon: "error",
            });
        }
    };

    const markAsDefective = async (idProduct: number) => {
        const product = products.find(product => product.idProduct === idProduct);
        if (!product) {
            Swal.fire({
                title: "Error",
                text: "Producto no encontrado",
                icon: "error",
            });
            return;
        }
        const stock = product.stock || "Disponible";
        const response = await fetch(`${appsettings.urlApi}Product/${idProduct}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idProduct: idProduct, stock: stock,state: "Defectuoso" }),
        });
    
        if (response.ok) {
            Swal.fire({
                title: "Éxito",
                text: "Producto marcado como defectuoso",
                icon: "success",
            });
            
            await GetProduct();
            setProducts(prevProducts => prevProducts.filter(product => product.idProduct !== idProduct && product.state !== "Defectuoso"));
        } else {
            Swal.fire({
                title: "Error",
                text: "No se pudo actualizar el producto",
                icon: "error",
            });
        }
    };
    const back = () => {
        navigate("/listaCategorias")
    }
    const filteredProducts = filteredState
        ? products.filter(product => product.state === filteredState)
        : products;
    return (
        <>
        <Header userName={userName} onLogout={handleLogout} />
        <Container className="mt-5">
            <h4>Productos en la categoría: {category}</h4>
            <div className="mb-3">
                <Input
                    type="select"
                    onChange={(e) => setFilteredState(e.target.value)}
                    value={filteredState}
                >
                    <option value="">Filtrar por Estado</option>
                    {Array.from(new Set(products.map(product => product.state))).map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                    ))}
                </Input>
            </div>
            <Table bordered>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(productMap => (
                        <tr key={productMap.idProduct}>
                            <td>{productMap.name}</td>
                            <td>{productMap.state}</td>
                            <td>
                                <button className="btn btn-success me-2" onClick={() => markAsSold(productMap.idProduct)}>
                                    Cambiar a vendido
                                </button>
                                <button className="btn btn-success" onClick={() => markAsDefective(productMap.idProduct)}>
                                    Cambiar a Defectuoso
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button color="primary" className="me-4" onClick={back}>
                Volver
            </Button>
        </Container>
        </>
    )
}