import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ListProducts } from "./components/ListProducts"
import { Login } from "./components/Login"
import { NewProduct } from "./components/NewProduct"
import { CreateNewUser } from "./components/CreateUser"
import { ProductExit } from "./components/ProductExit"
import { Category } from "./components/Category"
import { BulkProductUpload } from "./components/BulkProductUpload"


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/products/:category" element={<ListProducts/>}/>
        <Route path="/createUsuario" element={<CreateNewUser/>}/>
        <Route path="/salidaProducto" element={<ProductExit/>}/>
        <Route path="/nuevoProducto" element={<NewProduct/>}/>
        <Route path="/listaCategorias" element={<Category/>}/>
        <Route path="/cargaMasiva" element={<BulkProductUpload/>}/>
      </Routes>
    </BrowserRouter>
  )
    
}

export default App
