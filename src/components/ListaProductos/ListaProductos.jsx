import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Stack, Image, Row, Col } from "react-bootstrap";
import { SlOptionsVertical } from "react-icons/sl";
import axios from "axios";

function ListaProductos() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

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

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (productId, categoryId) => {
    setSelectedProductId(productId);
    setCategoriaSeleccionada(categoryId);
    setShowModal(true);
  };

  const handleCategoryChange = (event) => {
    setCategoriaSeleccionada(event.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      const productToUpdate = products.find(
        (product) => product.id === selectedProductId
      );
      const response = await axios.put(
        `http://localhost:8080/productos/editar`,
        {
          id: selectedProductId,
          codigoProducto: productToUpdate.codigoProducto,
          nombreProducto: productToUpdate.nombreProducto,
          descripcionProducto: productToUpdate.descripcionProducto,
          precioProducto: productToUpdate.precioProducto,
          direccion: productToUpdate.direccion,
          imagenes: productToUpdate.imagenes,
          categoria: categoriaSeleccionada,
          caracteristicas: productToUpdate.caracteristicas,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data) {
        throw new Error("Error al guardar los cambios");
      }
      // Actualizar la lista de productos después de modificar la categoría
      await fetchProducts();
      handleCloseModal();
      console.log(
        productToUpdate.codigoProducto,
        productToUpdate.nombreProducto,
        productToUpdate.descripcionProducto,
        productToUpdate.precioProducto,
        productToUpdate.direccion,
        productToUpdate.imagenes,
        categoriaSeleccionada,
        productToUpdate.caracteristicas
      );
    } catch (error) {
      console.error("Error:", error);
      handleCloseModal();
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (windowWidth < 768) {
    return null;
  }

  return (
    <>
      <h3 style={{ textAlign: "center", margin: "4px" }}>Lista de Productos</h3>
      <ListGroup
        style={{
          height: `${88 * products.length}px`,
          overflowY: "auto",
          alignItems: "center",
        }}
      >
        {products.map((product) => (
          <ListGroup.Item
            as="li"
            key={product.id}
            style={{
              width: "80vw",
              color: "#E6E0E9",
              margin: "4px",
              backgroundColor: "#46599C",
              borderRadius: "10px",
              border: "none",
              boxShadow: "",
            }}
          >
            <Stack
              direction="horizontal"
              gap={5}
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <div style={{ display: "flex" }}>
                <div
                  className="p-2"
                  style={{ width: "25vw", maxWidth: "88px" }}
                >
                  <Image
                    src={product.imagenSalidaDtoList[0].urlImagen}
                    style={{ maxHeight: "88px", maxWidth: "100%" }}
                  />
                </div>
                <div
                  className="p-2"
                  style={{ width: "50vw", maxHeight: "88px" }}
                >
                  <Col
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Row
                      style={{
                        color: "#E6E0E9",
                        fontSize: "16px",
                        fontWeight: "500"
                        
                      }}
                    >
                      <div style={{
                        fontSize: "12px",
                        fontWeight: "300",
                      }}>{product.categoria.nombreCategoria}</div>
                      <div style={{
                        fontSize: "21px",
                        fontWeight: "500",
                      }}>
                      {product.nombreProducto}
                </div>
                    </Row>
                    <Row
                      style={{
                        color: "#CAC4D0",
                        fontSize: "14px",
                        justifyContent: "left",
                      }}
                    >
                      {product.descripcionProducto}{" "}
                    </Row>
                  </Col>
                </div>

              </div>
              <div className="p-2">
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#E6E0E9",
                    }}
                  >
                    <SlOptionsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Editar</Dropdown.Item>
                    <Dropdown.Item>Eliminar</Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleShowModal(product.id, product.categoria.id)
                      }
                    >
                      Asignar Categoría
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Stack>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Asignar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select
            value={categoriaSeleccionada}
            onChange={handleCategoryChange}
            className="form-control"
          >
            <option value="">Seleccione la categoría del producto</option>
            {categories.map((category) => (
              <option key={category.id} value={category.nombreCategoria}>
                {category.nombreCategoria}
              </option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ListaProductos;
