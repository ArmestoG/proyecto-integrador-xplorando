import { Link, Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <h2>Admin</h2>
      <p>¡Lo sentimos! Esta página está en construcción.</p>
      <Link to="/admin/lista-productos">Lista de Productos</Link>
      <Link to="/admin/agregar-producto">Agregar Producto</Link>
      <div>
        <Outlet /> {/* Este Outlet renderizará los componentes de las rutas secundarias */}
      </div>
    </div>
  );
}

export default Admin;