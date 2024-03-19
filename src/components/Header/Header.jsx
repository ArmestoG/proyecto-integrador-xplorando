import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SlHome, SlLogin, SlUserFollow } from "react-icons/sl";
import "./Header.css";

const Header = () => {
  {/* Para cuando estás logueado */}
  const [showAccount, setShowAccount] = useState(false)

	const handleAccountClick = () => {
		setShowAccount(!showAccount)
	}

	const isLoggedIn = localStorage.getItem("token")
	const userRole = localStorage.getItem("userRole")


  {/* Para cuando está logueado */}
  
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
    <>
    {/* Para cuando estás logueado 
    {isLoggedIn && (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                {isLoggedIn && userRole === "ROLE_ADMIN" && (
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                      Admin
                    </NavLink>
                  </li>
                )}
              </ul>

              <ul className="d-flex navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={handleAccountClick}
                  >
                    Account
                  </a>

                  <ul className={`dropdown-menu ${showAccount ? "show" : ""}`} aria-labelledby="navbarDropdown">
                    {isLoggedIn ? (
                      <Logout />
                    ) : (
                      <li>
                        <Link className="dropdown-item" to={"/login"}>
                          Login
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      */}

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
    </>
  );
};

export default Header;
