import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SlHome, SlLogin, SlUserFollow } from "react-icons/sl";
import "./Header.css";

const Header = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          {isSmallScreen ? (
            <img
              src="/src/assets/logofinalexplorando/logoxplorando/logoxplorando.png"
              alt="Isologotipo Xplorando"
            />
          ) : (
            <img
              src="/src/assets/logofinalexplorando/logoxplorandohorizontal/logoexplorandohorizontal.png"
              alt="Logo Xplorando"
            />
          )}
        </Link>
      </div>
      <div className="header__links">
        <Link to="/">{isSmallScreen ? <SlHome /> : "Home"}</Link>
        <Link to="/login">
          {isSmallScreen ? <SlLogin /> : "Iniciar sesión"}
        </Link>
        <Link to="/registro" className="header__register-button">
          {isSmallScreen ? <SlUserFollow /> : "Registrarse"}
        </Link>
      </div>
    </header>
  );
};

export default Header;
