import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <h2>Admin</h2>
      <p>¡Lo sentimos! Esta página está en construcción.</p>
      <Link to="/admin/lista-productos">Lista de Productos</Link>
      <Link to="/admin/agregar-producto">Agregar Producto</Link>
    </div>
  );
}

export default Admin;