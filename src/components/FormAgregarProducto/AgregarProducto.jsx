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
      <div className="texto">Agregar Producto</div>
      <form onSubmit={handleSubmit}>
        <div className="fila-formulario">
          <div className="datos-entrada">
            <input
              type="text"
              id="codigo"
              value={codigo}
              onChange={handleCodigoChange}
              required
            />
            <div className="subrayado"></div>
            <label htmlFor="codigo">Código del Paquete</label>
          </div>
          <div className="datos-entrada">
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={handleNombreChange}
              required
            />
            <div className="subrayado"></div>
            <label htmlFor="nombre">Nombre del Paquete</label>
          </div>
        </div>
        <div className="fila-formulario">
          <div className="datos-entrada">
            <input
              type="text"
              id="direccion"
              value={direccion}
              onChange={handleDireccionChange}
              required
            />
            <div className="subrayado"></div>
            <label htmlFor="direccion">Dirección</label>
          </div>
          <div className="datos-entrada">
            <input
              type="text"
              id="precio"
              value={precio}
              onChange={handlePrecioChange}
              required
            />
            <div className="subrayado"></div>
            <label htmlFor="precio">Precio del Paquete</label>
          </div>
        </div>
        <div className="fila-formulario">
          <div className="datos-entrada">
            <input
              type="text"
              id="categoria"
              value={categoria}
              onChange={handleCategoriaChange}
              required
            />
            <div className="subrayado"></div>
            <label htmlFor="categoria">Categoría</label>
          </div>
        </div>
        <div className="fila-formulario textarea">
          <div className="datos-entrada">
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={handleDescripcionChange}
              required
            ></textarea>
            <br />
            <div className="subrayado"></div>
            <label htmlFor="descripcion">Descripción del Paquete</label>
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
            />
            <div className="subrayado"></div>
            <label htmlFor="imagenes">Cargar Imágenes</label>
          </div>
        </div>
        <div className="fila-formulario boton-enviar">
          <div className="datos-entrada">
            <input type="submit" value="Guardar" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgregarProducto;
