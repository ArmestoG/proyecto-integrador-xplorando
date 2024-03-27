import React, { useEffect, useState, createContext } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([
    // Ejemplo de productos
    { id: 1, name: "Producto 1" },
    { id: 2, name: "Producto 2" },
    { id: 3, name: "Producto 3" },
  ]);
  const [categories, setCategories] = useState([
    // Ejemplo de categorías
    { id: 1, name: "Categoría 1" },
    { id: 2, name: "Categoría 2" },
    { id: 3, name: "Categoría 3" },
  ]);
  const [cities, setCities] = useState([
    // Ejemplo de ciudades
    { id: 1, name: "Ciudad 1" },
    { id: 2, name: "Ciudad 2" },
    { id: 3, name: "Ciudad 3" },
  ]);
  const [dataReady, setDataReady] = useState(true); // Cambiado a true para simplificar la visualización
  const [filter, setFilter] = useState(""); // Filtro simulado
  const [gallery, setGallery] = useState([
    // Ejemplo de galería
    { id: 1, image: "imagen1.jpg" },
    { id: 2, image: "imagen2.jpg" },
    { id: 3, image: "imagen3.jpg" },
  ]);
  const [booking, setBooking] = useState([
    // Ejemplo de reservas
    { id: 1, fechaInicio: "2024-03-20", fechaFinal: "2024-03-25" },
    { id: 2, fechaInicio: "2024-04-05", fechaFinal: "2024-04-10" },
  ]);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDates, setStartDates] = useState([]);
  const [endDates, setEndDates] = useState([]);

  useEffect(() => {
    // Simulación de llamadas a la API
    setStartDates(booking.map((p) => new Date(p.fechaInicio)));
    setEndDates(booking.map((p) => new Date(p.fechaFinal)));
  }, [booking]);

  return (
    <DataContext.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,
        cities,
        setCities,
        dataReady,
        setDataReady,
        gallery,
        setGallery,
        dateRange,
        setDateRange,
        startDates,
        setStartDates,
        endDates,
        setEndDates,
        booking,
        setBooking,
        filter,
        setFilter,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
