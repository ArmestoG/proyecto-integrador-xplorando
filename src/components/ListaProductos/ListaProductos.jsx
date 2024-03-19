import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { SlOptionsVertical } from "react-icons/sl";
import "./ListaProductos.css"; // Importar estilos CSS

const ListaProductos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [products, setProducts] = useState([]);
  const [openMenus, setOpenMenus] = useState(Array(8).fill(false)); // Estado para controlar la visibilidad de los menús desplegables
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Función para obtener la lista de productos desde la base de datos
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/productos/listar");
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para obtener la lista de categorías desde la base de datos
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/categorias/listar");
      if (!response.ok) {
        throw new Error("Error al cargar las categorías");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Lógica para obtener los productos paginados
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Generar números de página
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para manejar el toggle del menú desplegable
  const toggleMenu = (index) => {
    const updatedMenus = [...openMenus];
    updatedMenus[index] = !updatedMenus[index];
    setOpenMenus(updatedMenus);
  };

  // Función para manejar la eliminación de un producto
  const handleDelete = async (productId) => {
    const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8080/productos/${productId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Error al eliminar el producto");
        }
        setProducts(products.filter((product) => product.id !== productId));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Función para manejar el cambio de categoría de un producto
  const handleCategoryChange = async (categoryId, productId) => {
    setSelectedCategoryId(categoryId);
    setSelectedProductId(productId);
  };

  // Función para confirmar el cambio de categoría de un producto
  const confirmCategoryChange = async () => {
    const isConfirmed = window.confirm("¿Estás seguro de que deseas cambiar la categoría de este producto?");
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8080/editar`, {
          method: "PUT",
        });
        if (!response.ok) {
          throw new Error("Error al cambiar la categoría del producto");
        }
        // Actualizar el estado de productos después de cambiar la categoría
        fetchProducts();
        // Reiniciar los estados de categoría y producto seleccionados
        setSelectedCategoryId(null);
        setSelectedProductId(null);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // Reiniciar los estados de categoría y producto seleccionados si se cancela la acción
      setSelectedCategoryId(null);
      setSelectedProductId(null);
    }
  };

  return (
    <div className="productos">
      <h3>Lista de Productos</h3>

      {/* Lista de productos */}
      <div className="row">
        {currentProducts.map((product, index) => (
          <div key={index} className="col-md-6">
            <Card>
              <Card.Img variant="top" src={"src/assets/logofinalexplorando/logoxplorandovertical/logoxplorandovertical.png"} />
              <Card.Body>
                <div>
                  <Card.Title>{product.nombreProducto}</Card.Title>
                  <Card.Text>{product.descripcionProducto}</Card.Text>
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
                      <Link to={`/admin/editarProducto/${product.id}`}>Editar</Link>
                      <li onClick={() => handleDelete(product.id)}>Eliminar</li>
                      <li>
                        {/* Submenú para seleccionar categoría */}
                        <div className="sub-menu">
                          <ul>
                            {categories.map((category) => (
                              <li key={category.id} onClick={() => handleCategoryChange(category.id, product.id)}>
                                {category.nombreCategoria}
                              </li>
                            ))}
                          </ul>
                          {/* Confirmación de cambio de categoría */}
                          {selectedProductId === product.id && (
                            <div className="confirmacion-cambio">
                              <button onClick={confirmCategoryChange}>Confirmar</button>
                              <button onClick={() => setSelectedProductId(null)}>Cancelar</button>
                            </div>
                          )}
                        </div>
                      </li>
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