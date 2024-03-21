import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SlHome, SlLogin, SlUserFollow, SlLogout, SlUser } from "react-icons/sl";
import Logout from "../Auth/Logout"; // Importar el componente Logout
import "./Header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";

    setIsLoggedIn(!!token);
    setUserName(`${firstName} ${lastName}`);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    setIsLoggedIn(false);
    setUserName("");
  };

  const toggleAccountDropdown = () => {
    setShowAccountDropdown(!showAccountDropdown);
  };

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
        {!isLoggedIn && (
          <>
            <Link to="/">{isSmallScreen ? <SlHome /> : "Home"}</Link>
            <Link to="/login">
              {isSmallScreen ? <SlLogin /> : "Iniciar sesión"}
            </Link>
            <Link to="/registro" className="header__register-button">
              {isSmallScreen ? <SlUserFollow /> : "Registrarse"}
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
          <div className='admin-title'>Mis reservas</div>
          <span className="header__user-name">{userName}</span>
          <div className="header__account-dropdown">
            <button
              className="header__account-button"
              onClick={toggleAccountDropdown}
            >
              <SlUser />
              <span className="arrow-icon">&#9660;</span> {/* Flecha hacia abajo */}
            </button>
            {showAccountDropdown && (
              <div className="header__account-dropdown-menu">
                <ul>
                <li><Link to={"/profile"} className="header__account-dropdown-item"></Link></li>
                <li><Logout /> {/* Renderizar el componente Logout */}</li>
                </ul>
              </div>
            )}
          </div>
        </>
        )}
      </div>
    </header>
  );
};

export default Header;