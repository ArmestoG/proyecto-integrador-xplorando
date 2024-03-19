import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import "./Prueba.css";

const Prueba = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/editar-perfil'); 
  };
  
  return (
    <div className='profileDashContainer'> {/* Comillas de cierre agregadas */}
      <h2>MI PERFIL</h2> 
      <p>Correo electrónico: </p> 
      <p>Nombre: </p>
      <p>Apellido: </p>
      <button onClick={handleEditProfile} className="profileDashButton">Editar perfil</button> {/* Eliminada la referencia a styles.editButton */}
    </div>
  );
}

export default Prueba;
