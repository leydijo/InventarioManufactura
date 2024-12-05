import { useState, ChangeEvent, FormEvent  } from "react";
import { Button, Container, Input, FormGroup, Label } from "reactstrap";
import Swal from "sweetalert2";
import { appsettings } from "../settings/appsettings";
import { Header } from '../components/Header';
import { useNavigate } from "react-router-dom";

export function BulkProductUpload() {
    const [file, setFile] = useState<File | null>(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const userName = localStorage.getItem('username') || 'Usuario';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/');
    }
    //Función carga del archivo
    const handleFileChange = (event : ChangeEvent<HTMLInputElement>) => {

        setFile(event.target.files ? event.target.files[0] : null);
    };

    //Función procesar el archivo y enviarlo
    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!file) {
            Swal.fire({
                title: "Error",
                text: "Por favor selecciona un archivo",
                icon: "error",
            });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`${appsettings.urlApi}Product/bulk-upload`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                Swal.fire({
                    title: "Éxito",
                    text: "Productos cargados correctamente",
                    icon: "success",
                });
                navigate("/listaCategorias")
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un error al cargar los productos",
                    icon: "error",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Hubo un error en la comunicación con el servidor",
                icon: "error",
            });
        }
    };

    return (
        <>
        <Header userName={userName} onLogout={handleLogout} />
        <Container className="mt-5">
            <h4>Cargar Productos Masivamente</h4>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="file">Seleccionar archivo txt</Label>
                    <Input
                        type="file"
                        id="file"
                        accept=".txt"
                        onChange={handleFileChange}
                    />
                </FormGroup>
                <Button color="primary" type="submit">
                    Subir Productos
                </Button>
            </form>
        </Container>
        </>
    );
}
