import ListaUsuarios from "../../components/ListaUsuarios/ListaUsuarios";
import ListaProductos from "../../components/ListaProductos/ListaProductos";
import ListaCategorias from "../../components/ListaCategorias/ListaCategorias"



const Admin = () => {
  return (
    <div>
      <h2>Panel de Administración</h2>
      <div className="tabs">
        <div className="tab">
          <input type="radio" id="tab1" name="tab-group" defaultChecked />
          <label htmlFor="tab1">Usuarios</label>
          <div className="content">
            <ListaUsuarios />
          </div>
        </div>
        <div className="tab">
          <input type="radio" id="tab2" name="tab-group" />
          <label htmlFor="tab2">Productos</label>
          <div className="content">
            <ListaProductos />
          </div>
        </div>
        <div className="tab">
          <input type="radio" id="tab3" name="tab-group" />
          <label htmlFor="tab3">Categorías</label>
          <div className="content">
            <ListaCategorias />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;