import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Registro from "./Routes/Registro";
import Admin from "./Routes/Admin/Admin";
import ListaProductos from "./Routes/Admin/ListaProductos";
import AgregarProducto from "./Routes/Admin/AgregarProducto";
import Categoria from "./Routes/Categoria";
import ProductoDetalle from "./Routes/ProductoDetalle";
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/categorias/:categoria" element={<Categoria />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/producto/undefined" element={<Categoria />} />
        
      </Routes>
      <Footer />
    </Router>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route index element={<ListaProductos />} />
      <Route path="lista-productos" element={<ListaProductos />} />
      <Route path="agregar-producto" element={<AgregarProducto />} />
    </Routes>
  );
};

export default App;