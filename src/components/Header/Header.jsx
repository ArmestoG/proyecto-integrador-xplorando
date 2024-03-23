import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SlHome, SlLogin, SlUserFollow, SlLogout, SlUser } from "react-icons/sl";
import { useLocation } from "react-router-dom";
import Logout from "../Auth/Logout"; // Importar el componente Logout
import "./Header.css";

const Header = () => {
  const [initialName, setInitialName] = useState("");
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if(sessionStorage.getItem("token") !== null)
      setData();
    else
      handleLogout();

  }, [location.state]);

// esto es una mala practica pero es lo que hay asi funciona :c
  useEffect(() =>{
    toggleAccountDropdown();
  },[location.state])


  const setData = () => {
    const token = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("userRole");
    const firstName = sessionStorage.getItem("firstName") || "";
    const lastName = sessionStorage.getItem("lastName") || "";
    console.log(firstName, lastName);
    setIsLoggedIn(token);
    setIsAdmin(userRole === "ROLE_ADMIN");
    setUserName(`${firstName} ${lastName}`);
    setFirstName(firstName);
    setLastName(lastName);
    setInitialName(getInitials(firstName, lastName));
  }

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName("");
    setFirstName("");
    setLastName("");
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

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) {
      return '';
    }
  
    let initials = firstName[0] + lastName[0];
    console.log('initials:', initials);
    return initials.toUpperCase();
  }

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
          <div className='admin-title'>Mis reservas - {initialName}</div>
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