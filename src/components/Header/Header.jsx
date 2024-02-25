import { Link } from 'react-router-dom'; 
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src="src\assets\logofinalexplorando\logoxplorandohorizontal\logoexplorandohorizontal.png" alt="Logo Xplorando" />
        </Link>
      </div>
      <div className="header__links">
        <Link to="/">Home</Link>
        <Link to="/">Iniciar sesión</Link>
        <Link to="/registro" className="header__register-button">Registrarse</Link>
      </div>
    </header>
  );
}

export default Header;