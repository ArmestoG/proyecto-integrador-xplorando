import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: { campo: '', error: null },
      password: { campo: '', error: null }
    };
};

onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name] : value});
};

onSubmitLogin = (e) => {
  e.preventDefault();
  const { login, password } = this.state;

  // Validación de campos vacíos
  if (!login.campo || !password.campo) {
    this.setState({
      login: { ...login, error: 'El correo electrónico y la contraseña son requeridos' },
      password: { ...password, error: 'El correo electrónico y la contraseña son requeridos' }
    });
    return;
  }

  // Validación de formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(login.campo)) {
    this.setState({ login: { ...login, error: 'Formato de correo electrónico inválido' } });
    return;
  }

  // Validación de longitud de contraseña
  if (password.campo.length < 6) {
    this.setState({ password: { ...password, error: 'La contraseña debe tener al menos 6 caracteres' } });
    return;
  }

  // Si todas las validaciones pasan, enviar el formulario
  this.props.onLogin(e, login.campo, password.campo);
};

render() {
  const { login, password } = this.state;
  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageContainerLogin}>
        <h1 className={styles.imageTextLogin}>Te ayudamos a buscar tu próximo destino.</h1>
      </div>

      <div className={styles.formContainerLogin}>
        <form onSubmit={this.onSubmitLogin}>
          <h3 className="text-center">Iniciar sesión</h3>
          <div className="mb-2">
            <label htmlFor="email">Correo electrónico</label>
            <input 
              type="email" 
              placeholder="Ingresa tu correo" 
              className={`${login.error ? styles.hasError : ''} form-control`} 
              name="login"
              value={login.campo}
              onChange={this.onChangeHandler}
              autoComplete="current-email"
            />
            {login.error && <div className='error'><small>{login.error}</small></div>}
          </div>
          <div className="mb-2">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              placeholder="Ingresa tu contraseña" 
              className={`${password.error ? styles.hasError : ''} form-control`} 
              name="password"
              value={password.campo}
              onChange={this.onChangeHandler}
              autoComplete="current-password"
            />
            {password.error && <div className='error'><small>{password.error}</small></div>}
          </div>
          <div className="mb-2">
            <input type="checkbox" className="custom-control custom-chechbox" id="check" />
            <label htmlFor="check" className="custom-input-label ms-2">
              Recordarme
            </label>
          </div>
          <div className="d-grid">
            <button className={styles.primaryButton}>Iniciar sesión</button>
          </div>
          <p className="text-end mt-2">
            Olvidaste tu<a href="">contraseña?</a>
            <Link to="/Registro" className="ms-2">
              Registrarse
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

};
  
  