import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Registro from "./Routes/Registro";
import Admin from "./Routes/Admin/Admin";
import AgregarProducto from "./Routes/Admin/AgregarProducto";
import Categoria from "./Routes/Categoria";

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
      </Routes>
      <Footer />
    </Router>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="agregar-producto" element={<AgregarProducto />} />
    </Routes>
  );
};

export default App;