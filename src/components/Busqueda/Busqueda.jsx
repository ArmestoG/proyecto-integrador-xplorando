import { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import CarruselBuscador from "./Components/CarruselBuscador";
import axios from "axios";
import "./Busqueda.css";
import "react-multi-carousel/lib/styles.css";
import { addDays, isWithinInterval } from "date-fns";

export default function Search() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(startDate, 3));
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [arrayBusqueda, setArrayBusqueda] = useState([]);
  const [elUsuarioAFiltrado, setelUsuarioAFiltrado] = useState(false);

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

  const productoFiltrados = useMemo(() => {
    const textoMinusculas = textoBusqueda.toLowerCase();
    const fechaInicio = startDate;
    const fechaFin = endDate;

    return arrayBusqueda.filter((producto) => {
      const nombreProductoEnMinusculas = producto.nombreProducto.toLowerCase();
      const ubicacionEnMinusculas = producto.ubicacion?.toLowerCase();
      const fechasReservadas = producto.fechasReservadas || [];

      // Filtrar por texto de búsqueda
      const cumpleConTextoBusqueda =
        nombreProductoEnMinusculas.includes(textoMinusculas) ||
        ubicacionEnMinusculas?.includes(textoMinusculas);

      // Si el producto no tiene fechas reservadas, se considera disponible
      const estaDisponibleEnFecha =
        fechasReservadas.length === 0 ||
        fechasReservadas.every((fechaReservada) => {
          const fechaReservadaFormato = new Date(fechaReservada);
          return !isWithinInterval(fechaReservadaFormato, {
            start: fechaInicio,
            end: fechaFin,
          });
        });

      return cumpleConTextoBusqueda && estaDisponibleEnFecha;
    });
  }, [textoBusqueda, arrayBusqueda, startDate, endDate]);

  const ubicacionesUnicas = useMemo(() => {
    const ubicacionesSet = new Set();
    arrayBusqueda.forEach((producto) => {
      ubicacionesSet.add(producto.ubicacion);
    });
    return Array.from(ubicacionesSet);
  }, [arrayBusqueda]);

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
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          minDate={new Date()}
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={addDays(startDate, 3)}
          dateFormat="dd/MM/yyyy"
        />
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
