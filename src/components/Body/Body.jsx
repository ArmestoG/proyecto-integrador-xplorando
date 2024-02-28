import './Body.css'; // Estilos CSS


const Body = () => {
  return (
    <div>
      {/* Barra de Búsqueda */}
      <div className="container">
        <input type="text" placeholder="Buscar" />
        <div className="btn">
          <i className="Barra busqueda"></i>
        </div>
      </div>

      {/* Responsive Cards */}
      <div className="slide-container">
        <div className="slide-content">
          <div className="card-wrapper">
            <div className="card">
              <div className="image-content">
                <span className="overlay"></span>
                <div className="card-image">
                  <img 
                  src="src\assets\cards\esquiando.png" alt="" className="card-img" />
                </div>
              </div>
              <div className="card-content">
                <h2 className="name">Turismo aventura</h2>
                <h3 className="price">$1.000.000 precio del paquete</h3>
                <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                <button className="button">Ver más información</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;