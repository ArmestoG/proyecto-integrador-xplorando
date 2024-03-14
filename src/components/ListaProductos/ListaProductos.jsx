import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { SlOptionsVertical } from "react-icons/sl";
import "./ListaProductos.css"; // Importar estilos CSS

const ListaProductos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [openMenus, setOpenMenus] = useState(Array(8).fill(false));
  const [products, setProducts] = useState([]); // Estado para almacenar los productos obtenidos de la base de datos
  const [categories, setCategories] = useState([]); // Estado para almacenar las categorías obtenidas de la base de datos
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para almacenar la categoría seleccionada

  // Obtener productos de la base de datos
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:8080/productos");
        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchProducts();
  }, []);

  // Obtener categorías de la base de datos
  useEffect(() => {
    async function fetchCategories() {
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
    }

    fetchCategories();
  }, []);

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

  const handleDelete = async (productId) => {
    const isConfirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:8080/productos/${productId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Error al eliminar el producto");
        }
        // Eliminar el producto del estado local
        setProducts(products.filter((product) => product.id !== productId));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleAssignCategory = async (productId, categoryId) => {
    const isConfirmed = window.confirm(
      "¿Estás seguro de que deseas asignar esta categoría al producto?"
    );
    if (isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:8080/productos/${productId}/asignarCategoria/${categoryId}`,
          {
            method: "PUT",
          }
        );
        if (!response.ok) {
          throw new Error("Error al asignar la categoría al producto");
        }
        // Actualizar el estado local de productos después de asignar la categoría
        const updatedProducts = products.map((product) => {
          if (product.id === productId) {
            return { ...product, categoryId: categoryId }; // Actualizar la categoría del producto
          }
          return product;
        });
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error:", error);
      }
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
                <Button
                  onClick={() => toggleMenu(index)}
                  className="options-menu-button"
                >
                  <SlOptionsVertical />
                </Button>
                {/* Menú desplegable */}
                {openMenus[index] && (
                  <div className="desplegable-menu">
                    {/* Contenido del menú desplegable */}
                    <ul>
                      <li>
                        <Link to={`/admin/editarProducto/${product.id}`}>
                          Editar
                        </Link>
                      </li>
                      <li onClick={() => handleDelete(product.id)}>Eliminar</li>
                      <li>
                        Asignar Categoría
                        {/* Submenú de categorías */}
                        <ul>
                          {categories.map((category) => (
                            <li
                              key={category.id}
                              onClick={() =>
                                handleAssignCategory(product.id, category.id)
                              }
                            >
                              {category.nombreCategoria}
                            </li>
                          ))}
                        </ul>
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
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
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
