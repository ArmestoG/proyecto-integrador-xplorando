import { useState, useEffect } from "react";
import axios from "axios";
import "./FormAgregarProducto.css";

const AgregarProducto = () => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState([]);

  useEffect(() => {
    obtenerCategorias();
    obtenerCaracteristicas();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categorias");
      setCategorias(response.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const obtenerCaracteristicas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/caracteristicas");
      setCaracteristicas(response.data);
    } catch (error) {
      console.error("Error al obtener las características:", error);
    }
  };

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
    setImagenes([event.target.value]);
  };

  const handleCaracteristicaChange = (caracteristicaId) => {
    const isSelected = selectedCaracteristicas.includes(caracteristicaId);
    setSelectedCaracteristicas((prevSelected) =>
      isSelected
        ? prevSelected.filter((id) => id !== caracteristicaId)
        : [...prevSelected, caracteristicaId]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    crearProducto();
  };

  const crearProducto = async () => {
    const nuevoProducto = {
      codigoProducto: codigo,
      nombreProducto: nombre,
      descripcionProducto: descripcion,
      precioProducto: precio,
      direccion: direccion,
      imagenes: imagenes,
      categoriaId: categoria,
      caracteristicas: selectedCaracteristicas,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/productos/registrar",
        nuevoProducto
      );
      console.log("Producto guardado:", response.data);
      alert("Paquete registrado");
      setCodigo("");
      setNombre("");
      setDireccion("");
      setPrecio("");
      setCategoria("");
      setDescripcion("");
      setImagenes([]);
      setSelectedCaracteristicas([]);
    } catch (error) {
      console.error("Error al guardar el paquete:", error);
      alert("No se ha podido registrar el paquete");
    }
  };

  return (
    <div className="contenedor-formulario">
      <div className="mobile-message">
        Esta página solo está disponible en la versión web. Por favor, acceda
        desde un dispositivo de escritorio o amplíe la ventana de su navegador.
      </div>
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
            <select
              id="categoria"
              value={categoria}
              onChange={handleCategoriaChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombreCategoria}
                </option>
              ))}
            </select>
            <p className="supporting-text">
              Seleccione la categoría del paquete.
            </p>
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
        {/*  <div className="fila-formulario-imagenes">
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
  </div> */}

        <div className="fila-formulario">
          <div className="input-container">
            <label htmlFor="imagenes">urlImagen:</label>
            <input
              type="text"
              id="imagenes"
              value={imagenes}
              onChange={handleImagenesChange}
              required
            ></input>
            <p className="supporting-text">Ingrese una url de imagen</p>
          </div>
        </div>
        <div className="fila-formulario">
          <p>Características:</p>
          {caracteristicas.map((caracteristica) => (
            <label key={caracteristica.id}>
              <input
                type="checkbox"
                value={caracteristica.id}
                checked={selectedCaracteristicas.includes(caracteristica.id)}
                onChange={() => handleCaracteristicaChange(caracteristica.id)}
              />
              {caracteristica.nombreCaracteristica}
            </label>
          ))}
        </div>

        <div className="fila-formulario boton-enviar">
          <div className="datos-entrada" style={{ marginLeft: "auto" }}>
            <input type="submit" value="Registrar Paquete" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgregarProducto;
