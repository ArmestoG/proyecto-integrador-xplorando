import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ListaProductos() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <ListGroup>
        {products.map((product) => (
          <ListGroup key={product.id} as="li" horizontal style={{ width: "100%" }}>
            <ListGroup.Item style={{ width: "15%" }}>{product.img}</ListGroup.Item>
            <ListGroup.Item style={{ width: "25%" }}>{product.nombreProducto}</ListGroup.Item>
            <ListGroup.Item style={{ width: "50%" }}>{product.descripcionProducto}</ListGroup.Item>
            <ListGroup.Item style={{ width: "10%" }}>
              <Dropdown>
                <Dropdown.Toggle variant="success" id={`dropdown-${product.id}`}>
                  ***
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Editar</Dropdown.Item>
                  <Dropdown.Item>Eliminar</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleShowModal}>
                    Asignar Categoria
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </ListGroup>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Asignar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Acá va el menu drop para seleccionar la categoria
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary">Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ListaProductos;