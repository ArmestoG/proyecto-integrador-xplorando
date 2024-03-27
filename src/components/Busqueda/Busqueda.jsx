import { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import CarruselBuscador from "./Components/CarruselBuscador";
import axios from "axios";
import "./Busqueda.css";
import "react-multi-carousel/lib/styles.css";

export default function Search() {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [arrayBusqueda, setArrayBusqueda] = useState([]);
  const [elUsuarioAFiltrado, setelUsuarioAFiltrado] = useState(false);

  const productoFiltrados = useMemo(() => {
    const textoMinusculas = textoBusqueda.toLowerCase();
    return arrayBusqueda.filter(
      (producto) =>
        producto.nombreProducto.toLowerCase().includes(textoMinusculas) ||
        producto.ubicacion.toLowerCase().includes(textoMinusculas)
    );
  }, [textoBusqueda, arrayBusqueda]);

  const ubicacionesUnicas = useMemo(() => {
    const ubicacionesSet = new Set();
    arrayBusqueda.forEach((producto) => {
      ubicacionesSet.add(producto.ubicacion);
    });
    return Array.from(ubicacionesSet);
  }, [arrayBusqueda]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/productos/listar"
        );
        console.log("Productos obtenidos:", response.data);
        setArrayBusqueda(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const handleChange = (e) => {
    setTextoBusqueda(e.target.value);
  };

  const onFilterSubmit = () => {
    setelUsuarioAFiltrado(true);
  };

  return (
    <div>
      <div className="search">
        <div>
          <input
            className="search-bar"
            type="text"
            placeholder="Buscar productos..."
            list="opciones"
            value={textoBusqueda}
            onChange={handleChange}
          />
          {productoFiltrados.length > 0 && textoBusqueda.length > 0 && (
            <datalist id="opciones">
              {productoFiltrados.map((producto, index) => (
                <option key={index} value={producto.nombreProducto}></option>
              ))}
              {ubicacionesUnicas.map((ubicacion, index) => (
                <option key={index} value={ubicacion}></option>
              ))}
            </datalist>
          )}
        </div>
        <div className="init-date">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="done-date">
          <DatePicker
            selected={startDate1}
            onChange={(date) => setStartDate1(date)}
          />
        </div>
      </div>
      <div className="divSearch-btn">
        <button className="btn-search" onClick={onFilterSubmit}>
          REALIZAR BUSQUEDA
        </button>{" "}
      </div>
      <div className="resultados-obtenidos">
        <h2>Resultados de la búsqueda</h2>
      </div>
      {elUsuarioAFiltrado ? (
        productoFiltrados.length ? (
          <CarruselBuscador arrayBusqueda={productoFiltrados} />
        ) : (
          <div>
            {" "}
            <img src="public/Images/imgError.png"></img>{" "}
          </div>
        )
      ) : null}
    </div>
  );
}
