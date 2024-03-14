import { useState } from 'react';
import ListaUsuarios from '../../components/ListaUsuarios/ListaUsuarios';
import ListaProductos from '../../components/ListaProductos/ListaProductos';
import ListaCategorias from '../../components/ListaCategorias/ListaCategorias';
import ListaCaracteristicas from '../../components/ListaCaracteristicas/ListaCaracteristicas';
import './Admin.css';

const Admin = () => {
  const [tab, setTab] = useState('usuarios');

  const handleTabChange = (tabName) => {
    setTab(tabName);
  };

  return (
    <div className="panel-administracion">
      <h2>Panel de Administración</h2>
      <div className="mobile-message">
        Esta página solo está disponible en la versión web. Por favor, acceda
        desde un dispositivo de escritorio o amplíe la ventana de su navegador.
      </div>
      <div className="tabs">
        <div className={`tab ${tab === 'usuarios' ? 'active' : ''}`} onClick={() => handleTabChange('usuarios')}>
          <label htmlFor="tab-usuarios">Usuarios</label>
          <input type="radio" id="tab-usuarios" name="tab-group" defaultChecked />
        </div>
        <div className={`tab ${tab === 'productos' ? 'active' : ''}`} onClick={() => handleTabChange('productos')}>
          <label htmlFor="tab-productos">Productos</label>
          <input type="radio" id="tab-productos" name="tab-group" />
        </div>
        <div className={`tab ${tab === 'categorias' ? 'active' : ''}`} onClick={() => handleTabChange('categorias')}>
          <label htmlFor="tab-categorias">Categorías</label>
          <input type="radio" id="tab-categorias" name="tab-group" />
        </div>
        <div className={`tab ${tab === 'caracteristicas' ? 'active' : ''}`} onClick={() => handleTabChange('caracteristicas')}>
          <label htmlFor="tab-caracteristicas">Características</label>
          <input type="radio" id="tab-caracteristicas" name="tab-group" />
        </div>
      </div>
      {tab === 'usuarios' && <ListaUsuarios />}
      {tab === 'productos' && <ListaProductos />}
      {tab === 'categorias' && <ListaCategorias />}
      {tab === 'caracteristicas' && <ListaCaracteristicas />}
    </div>
  );
};

export default Admin;