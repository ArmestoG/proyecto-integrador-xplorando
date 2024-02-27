  import { Link } from 'react-router-dom';

  const ListaProductos = () => {
    return (
      <div>
        <h2>Lista de Productos</h2>
        <p>¡Lo sentimos! Esta página está en construcción.</p>
        <Link to="/admin/agregar-producto">Agregar Producto</Link>
      </div>
    );
  }

  export default ListaProductos;