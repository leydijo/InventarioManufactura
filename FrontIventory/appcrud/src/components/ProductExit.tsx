import { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";
import Swal from "sweetalert2";
import { appsettings } from "../settings/appsettings";
import { IProduct } from "../Interfaces/IProduct";
import { Header } from '../components/Header';
import { useNavigate } from "react-router-dom";

export function ProductExit() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [newState, setNewState] = useState<string>("");
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem('username') || 'Usuario';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/');
    }
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${appsettings.urlApi}Product/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudo obtener los productos",
          icon: "error",
        });
      }
    };

    fetchProducts();
  }, [token]);

  const handleUpdateState = async () => {
    if (!selectedProduct) {
      Swal.fire({
        title: "Error",
        text: "Por favor selecciona un producto",
        icon: "warning",
      });
      return;
    }

    if (!newState) {
      Swal.fire({
        title: "Error",
        text: "El campo estado no puede estar vacío",
        icon: "warning",
      });
      return;
    }

    try {
      const response = await fetch(`${appsettings.urlApi}Product/${selectedProduct.idProduct}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...selectedProduct,
          state: newState,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }

      Swal.fire({
        title: "Éxito",
        text: "Estado del producto actualizado correctamente",
        icon: "success",
      });
      const updatedProducts = products.map((product) =>
        product.idProduct === selectedProduct.idProduct
          ? { ...product, state: newState }
          : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar el producto",
        icon: "error",
      });
    }
  };

  return (
    <>
    <Header userName={userName} onLogout={handleLogout} />
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4>Gestión de Productos</h4>
          <hr />
          <Form>
            <FormGroup>
              <Label for="productSelect">Selecciona un Producto</Label>
              <Input
                type="select"
                id="productSelect"
                value={selectedProduct?.idProduct || ""}
                onChange={(e) => {
                  const productId = parseInt(e.target.value, 10);
                  const product = products.find((p) => p.idProduct === productId) || null;
                  setSelectedProduct(product);
                  setNewState(product?.state || "");
                }}
              >
                <option value="" disabled>
                  -- Selecciona un producto --
                </option>
                {products.map((product) => (
                  <option key={product.idProduct} value={product.idProduct}>
                    {product.name}
                  </option>
                ))}
              </Input>
            </FormGroup>

            {selectedProduct && (
              <>
                <FormGroup>
                  <Label for="newState">Nuevo Estado</Label>
                  <Input
                    type="text"
                    id="newState"
                    placeholder="Ingrese el nuevo estado"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                  />
                </FormGroup>

                <Button color="primary" onClick={handleUpdateState}>
                  Actualizar Estado
                </Button>
              </>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
}
