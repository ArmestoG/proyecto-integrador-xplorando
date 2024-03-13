import React, { useState } from 'react';
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';
import styles from './Registro.module.css';

export default class Registro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: { campo: '', error: null },
        lastName: { campo: '', error: null },
        email: { campo: '', error: null },
        password: { campo: '', error: null },
        confirmPassword: { campo: '', error: null },
    };
}

//cambios para recordar
onChangeHandler = (event) => {
  let name = event.target.name;
  let value = event.target.value;
  this.setState({ [name]: value });
};

onSubmitRegister = (e) => {
  e.preventDefault();
  const { name, lastName, email, password, confirmPassword } = this.state;

  // Aquí puedes realizar las validaciones necesarias antes de enviar los datos
  // Por ejemplo, verificar si los campos están vacíos o si las contraseñas coinciden

  if (!name.campo) {
      this.setState({ name: { ...name, error: "El nombre es requerido" } });
      return;
  }

  if (!lastName.campo) {
      this.setState({ lastName: { ...lastName, error: "El apellido es requerido" } });
      return;
  }

  if (!email.campo) {
      this.setState({ email: { ...email, error: "El correo electrónico es requerido" } });
      return;
  }

  // Validar el formato del correo electrónico usando una expresión regular
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.campo)) {
      this.setState({ email: { ...email, error: "Formato de correo electrónico inválido" } });
      return;
  }

  if (!password.campo) {
      this.setState({ password: { ...password, error: "La contraseña es requerida" } });
      return;
  }

  if (password.campo.length < 6) {
      this.setState({ password: { ...password, error: "La contraseña debe tener al menos 6 caracteres" } });
      return;
  }

  if (!confirmPassword.campo) {
      this.setState({ confirmPassword: { ...confirmPassword, error: "Confirma tu contraseña" } });
      return;
  }

  if (password.campo !== confirmPassword.campo) {
      this.setState({ confirmPassword: { ...confirmPassword, error: "Las contraseñas no coinciden" } });
      return;
  }

  // Llamar a la función proporcionada en las props para manejar el registro
  this.props.onRegister({ name: name.campo, lastName: lastName.campo, email: email.campo, password: password.campo });
};


render() {
  const { name, lastName, email, password, confirmPassword } = this.state;
    return (
      <div className={styles.registerContainer}>
                <div className={styles.imageContainerRegister}>
                    <h1 className={styles.imageTextRegister}>Te ayudamos a buscar tu próximo destino.</h1>
                </div>

                <div className={styles.formContainerRegister}>
                    <form onSubmit={this.onSubmitRegister}>
                        <h3 className="text-center">Registrarse</h3>
                        <div className={`mb-2 ${name.error ? 'hasError' : 'noError'}`}>
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" placeholder='Ingresa tu nombre' className="form-control"
                                name="name"
                                value={name.campo}
                                onChange={this.onChangeHandler}
                            />
                            {name.error && <div className='error'><small>{name.error}</small></div>}
                        </div>
                        <div className={`mb-2 ${lastName.error ? 'hasError' : 'noError'}`}>
                            <label htmlFor="apellido">Apellido</label>
                            <input type="text" placeholder='Ingresa tu apellido' className="form-control"
                                name="lastName"
                                value={lastName.campo}
                                onChange={this.onChangeHandler}
                            />
                            {lastName.error && <div className='error'><small>{lastName.error}</small></div>}
                        </div>
                        <div className={`mb-2 ${email.error ? 'hasError' : 'noError'}`}>
                            <label htmlFor="email">Correo electrónico</label>
                            <input type="email" placeholder="Ingresa tu correo" className="form-control"
                                name="email"
                                value={email.campo}
                                onChange={this.onChangeHandler}
                            />
                            {email.error && <div className='error'><small>{email.error}</small></div>}
                        </div>
                        <div className={`mb-2 ${password.error ? 'hasError' : 'noError'}`}>
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" placeholder="Ingresa tu contraseña" className="form-control"
                                name="password"
                                value={password.campo}
                                onChange={this.onChangeHandler}
                            />
                            {password.error && <div className='error'><small>{password.error}</small></div>}
                        </div>
                        <div className={`mb-2 ${confirmPassword.error ? 'hasError' : 'noError'}`}>
                            <label htmlFor="confirmPassword">Confirmar contraseña</label>
                            <input type="password" placeholder='Repetir tu contraseña' className="form-control"
                                name="confirmPassword"
                                value={confirmPassword.campo}
                                onChange={this.onChangeHandler}
                            />
                            {confirmPassword.error && <div className='error'><small>{confirmPassword.error}</small></div>}
                        </div>

                        <div className="d-grid">
                            <button className={styles.primaryButton}>Registrarse</button>
                        </div>
                        <p className='text-end mt-2'>
                            ¿Ya estás registrado?<Link to="/Login" className='ms-2'>Inicia sesión</Link>
                        </p>
                    </form>
                </div>
            </div>
    );
  };
}
