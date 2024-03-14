import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { SlOptionsVertical } from "react-icons/sl";
import "./ListaProductos.css"; // Importar estilos CSS

const ListaProductos = () => {
  // const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  // const [busqueda, setBusqueda] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [openMenus, setOpenMenus] = useState(Array(8).fill(false)); // Estado para controlar la visibilidad de los menús desplegables


  // Array de productos hardcodeados
  const products = [
    { id: 1, name: "Producto 1", description: "Descripción del Producto 1" },
    { id: 2, name: "Producto 2", description: "Descripción del Producto 2" },
    { id: 3, name: "Producto 3", description: "Descripción del Producto 3" },
    { id: 4, name: "Producto 4", description: "Descripción del Producto 4" },
    { id: 5, name: "Producto 5", description: "Descripción del Producto 5" },
    { id: 6, name: "Producto 6", description: "Descripción del Producto 6" },
    { id: 7, name: "Producto 7", description: "Descripción del Producto 7" },
    { id: 8, name: "Producto 8", description: "Descripción del Producto 8" },
    { id: 9, name: "Producto 9", description: "Descripción del Producto 9" },
    { id: 10, name: "Producto 10", description: "Descripción del Producto 10" },
    { id: 11, name: "Producto 11", description: "Descripción del Producto 11" },
    { id: 12, name: "Producto 12", description: "Descripción del Producto 12" },
    { id: 13, name: "Producto 13", description: "Descripción del Producto 13" },
    { id: 14, name: "Producto 14", description: "Descripción del Producto 14" },
    { id: 15, name: "Producto 15", description: "Descripción del Producto 15" },
    { id: 16, name: "Producto 16", description: "Descripción del Producto 16" },
    { id: 17, name: "Producto 17", description: "Descripción del Producto 17" },
    { id: 18, name: "Producto 18", description: "Descripción del Producto 18" },
    { id: 19, name: "Producto 19", description: "Descripción del Producto 19" },
    { id: 20, name: "Producto 20", description: "Descripción del Producto 20" },
  ];

  // // Función para manejar cambios en la búsqueda
  // const handleBusquedaChange = (event) => {
  //   setBusqueda(event.target.value);
  // };

  // // Función para manejar cambios en la selección de categoría
  // const handleCategoriaChange = (event) => {
  //   setCategoriaSeleccionada(event.target.value);
  // };

  // Lógica para obtener los productos paginados
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Generar números de página
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleMenu = (index) => {
    const updatedMenus = [...openMenus];
    updatedMenus[index] = !updatedMenus[index];
    setOpenMenus(updatedMenus);
  };

  
  return (
    <div className="productos">
      <h3>Lista de Productos</h3>

      {/* Barra de búsqueda
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={handleBusquedaChange}
      />

      {Menú desplegable para seleccionar categoría }
      <select value={categoriaSeleccionada} onChange={handleCategoriaChange}>
        <option value="">Todas las categorías</option>
        {/* Aquí irían las opciones de categorías }
      </select> */}

      {/* Lista de productos */}
      <div className="row">
        {currentProducts.map((product, index) => (
          <div key={index} className="col-md-6">
            <Card>
              <Card.Img
                variant="top"
                src={
                  "src/assets/logofinalexplorando/logoxplorandovertical/logoxplorandovertical.png"
                }
              />
              <Card.Body>
                <div>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                </div>
              </Card.Body>
              <div className="options-menu">
                {/* Botón para mostrar/ocultar el menú desplegable */}
              <Button onClick={() => toggleMenu(index)} className="options-menu-button">
                <SlOptionsVertical />
              </Button>
              {/* Menú desplegable */}
              {openMenus[index] && (
                <div className="desplegable-menu">
                  {/* Contenido del menú desplegable */}
                  <ul>
                    <li>Editar</li>
                    <li>Eliminar</li>
                    <li>Asignar Categoría</li>
                  </ul>
                </div>
              )}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>

      {/* Botón para agregar nuevo producto */}
      <Link to="/admin/agregar-producto">
        <Button
          style={{
            backgroundColor: "#f38164",
            borderRadius: "25px",
            borderColor: "transparent",
          }}
          className="mt-3"
        >
          Agregar Producto
        </Button>
      </Link>
    </div>
  );
};

export default ListaProductos;
