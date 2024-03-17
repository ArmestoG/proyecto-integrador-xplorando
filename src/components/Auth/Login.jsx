import React, { useState } from "react";
import { loginUser } from "../Utils/ApiFunctions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import styles from "./Login.module.css";
console.log(styles);



const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectUrl = location.state?.from || "/";

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!login.email || !login.password) {
      setErrorMessage(
        "Por favor ingrese tanto el correo electrónico como la contraseña."
      );
      return;
    }
    const success = await loginUser(login);
    if (success) {
      const token = success.token;
      auth.handleLogin(token);
      navigate(redirectUrl, { replace: true });
    } else {
      setErrorMessage(
        "Usuario o contraseña inválida. Porfavor, intente de nuevo."
      );
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <section className={styles.loginContainer}>
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <div className={styles.imageContainerLogin}>
        <h1 className={styles.imageTextLogin}>
          Te ayudamos a buscar tu próximo destino.
        </h1>
      </div>
      <div className={styles.formContainerLogin}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.formTitleLogin}>Iniciar sesión</h2>
          <div className={styles.inputWrapperLogin}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.inputLogin}
              value={login.email}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputWrapperLogin}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className={styles.inputLogin}
              value={login.password}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.buttonWrapperLogin}>
            <button type="submit" className={styles.primaryButtonLogin}>
              Iniciar sesión
            </button>
            <span>
              Aún no estás registrado?<Link to={"/registro"} className={styles.registroLink}> Registro</Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
