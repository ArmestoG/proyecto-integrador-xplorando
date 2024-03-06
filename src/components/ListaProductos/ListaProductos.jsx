import { useState } from 'react';
import { Link } from 'react-router-dom';

const ListaProductos = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // Función para manejar cambios en la búsqueda
  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  // Función para manejar cambios en la selección de categoría
  const handleCategoriaChange = (event) => {
    setCategoriaSeleccionada(event.target.value);
  };

  return (
    <div>
      <h3>Lista de Productos</h3>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={handleBusquedaChange}
      />

      {/* Menú desplegable para seleccionar categoría */}
      <select value={categoriaSeleccionada} onChange={handleCategoriaChange}>
        <option value="">Todas las categorías</option>
        {/* Aquí irían las opciones de categorías */}
      </select>

      {/* Lista de productos */}
      {/* Aquí iría la lógica para mostrar los productos */}

      {/* Botón para agregar nuevo producto */}
      <Link to="/admin/agregar-producto">Agregar Producto</Link>
    </div>
  );
}

export default ListaProductos;