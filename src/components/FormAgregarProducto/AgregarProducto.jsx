import { useState } from "react";
import "./AgregarProducto.css";
import axios from "axios";

const AgregarProducto = () => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState([]);

  const handleCodigoChange = (event) => {
    setCodigo(event.target.value);
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleDireccionChange = (event) => {
    setDireccion(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleImagenesChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 5) {
      alert("Solo se pueden seleccionar un máximo de 5 imágenes.");
      return;
    }
    setImagenes(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Crear un objeto con los datos del producto
    const nuevoProducto = {
      codigo,
      nombre,
      direccion,
      precio,
      categoria,
      descripcion,
      imagenes,
    };

    try {
      // Enviar los datos del producto al servidor
      const response = await axios.post("URL_DEL_ENDPOINT", nuevoProducto);

      // Manejar la respuesta del servidor
      console.log("Producto guardado:", response.data);

      // Limpiar el formulario después de guardar el producto
      setCodigo("");
      setNombre("");
      setDireccion("");
      setPrecio("");
      setCategoria("");
      setDescripcion("");
      setImagenes([]);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="contenedor-formulario">
      <form onSubmit={handleSubmit}>
        <div className="fila-formulario">
          <div className="input-container">
            <label htmlFor="codigo">Código del Paquete:</label>
            <input
              type="text"
              id="codigo"
              value={codigo}
              onChange={handleCodigoChange}
              required
            />
            <p className="supporting-text">
              Ingrese el código único asignado al paquete.
            </p>
          </div>
          <div className="input-container">
            <label htmlFor="nombre">Nombre del Paquete:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={handleNombreChange}
              required
            />
            <p className="supporting-text">
              Escriba el nombre descriptivo del paquete.
            </p>
          </div>
        </div>
        <div className="fila-formulario">
          <div className="input-container">
            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              value={direccion}
              onChange={handleDireccionChange}
              required
            />
            <p className="supporting-text">
              Ingrese la dirección de la estadía del paquete.
            </p>
          </div>
          <div className="input-container">
            <label htmlFor="precio">Precio del Paquete:</label>
            <input
              type="text"
              id="precio"
              value={precio}
              onChange={handlePrecioChange}
              required
            />
            <p className="supporting-text">
              Ingrese el precio total del paquete.
            </p>
          </div>
        </div>
        <div className="fila-formulario">
          <div className="input-container">
            <label htmlFor="categoria">Categoría:</label>
            <input
              type="text"
              id="categoria"
              value={categoria}
              onChange={handleCategoriaChange}
              required
            />
            <p className="supporting-text">Ingrese la categoria del paquete.</p>
          </div>
        </div>
        <div className="fila-formulario">
          <div className="input-container">
            <label htmlFor="descripcion">Descripción del Paquete:</label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={handleDescripcionChange}
              required
            ></textarea>
            <p className="supporting-text">
              Ingrese una descripción detallada del paquete con las
              características correspondientes de lo que ofrece el paquete.
            </p>
          </div>
        </div>
        <div className="fila-formulario-imagenes">
          <div className="imagen-entrada">
            <input
              type="file"
              id="imagenes"
              accept="image/*"
              multiple
              onChange={handleImagenesChange}
              max="5"
              style={{ display: "none" }}
            />
            <label htmlFor="imagenes" className="boton-imagenes">
              Cargar Imágenes
            </label>
          </div>
        </div>
        <div className="fila-formulario boton-enviar">
          <div className="datos-entrada" style={{ marginLeft: "auto" }}>
            <input type="submit" value="cargar producto" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgregarProducto;
