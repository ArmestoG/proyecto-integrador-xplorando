import { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import ListaUsuarios from "../../components/ListaUsuarios/ListaUsuarios";
import ListaProductos from "../../components/ListaProductos/ListaProductos";
import ListaCategorias from "../../components/ListaCategorias/ListaCategorias";
import ListaCaracteristicas from "../../components/ListaCaracteristicas/ListaCaracteristicas";
import "./Admin.css";

const Admin = () => {
  const [tab, setTab] = useState("productos");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleTabChange = (tabName) => {
    setTab(tabName);
  };

  // Verificar si el usuario está autenticado y tiene el rol adecuado
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  const userRole = sessionStorage.getItem("userRole");
  console.log(!isAuthenticated || userRole !== "ROLE_ADMIN");



  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (windowWidth < 768) {
    return (
      <div className="mobile-message">
        Esta página solo está disponible en la versión web. Por favor, acceda
        desde un dispositivo de escritorio o amplíe la ventana de su navegador.
      </div>
    );
  }

  return (
    <div className="panel-administracion">
      <h2 style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"25px"}}>Panel de Administración</h2>

      <Nav justify variant="tabs" defaultActiveKey="productos">
        <Nav.Item>
          <Nav.Link
            eventKey="productos"
            active={tab === "productos"}
            onClick={() => handleTabChange("productos")}
          >
            Productos
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            disabled
            eventKey="usuarios"
            active={tab === "usuarios"}
            onClick={() => handleTabChange("usuarios")}
          >
            Usuarios
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            disabled
            eventKey="categorias"
            active={tab === "categorias"}
            onClick={() => handleTabChange("categorias")}
          >
            Categorías
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            disabled
            eventKey="caracteristicas"
            active={tab === "caracteristicas"}
            onClick={() => handleTabChange("caracteristicas")}
          >
            Características
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {tab === "usuarios" && <ListaUsuarios />}
      {tab === "productos" && <ListaProductos />}
      {tab === "categorias" && <ListaCategorias />}
      {tab === "caracteristicas" && <ListaCaracteristicas />}
    </div>
  );
};

export default Admin;
