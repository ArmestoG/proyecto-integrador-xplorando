import React, { useState } from 'react';
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';
import styles from './Registro.module.css';

const Registro = () => {
  const navigate = useNavigate()

  const [errorPost, setErrorPost] = useState(null)
  const [formSent, setFormSent] = useState(false)

  const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegExp = /^.{6,30}$/;
  const nameRegExp = /^[a-zA-Zа-яА-ЯёЁ]{2,30}$/;
  const lastNameRegExp = /^[a-zA-Zа-яА-ЯёЁ]{1,30}$/;


  const [email, setEmail] = useState({ campo: "", error: null, mensajeError: "Ingrese un correo válido." });
  const [password, setPassword] = useState({ campo: "", error: null, mensajeError: "La contraseña debe tener más de 6 caracteres." });
  const [password2, setPassword2] = useState({ campo: "", error: null, mensajeError: "Las contraseñas deben coincidir." });
  const [name, setName] = useState({ campo: "", error: null, mensajeError: "Ingrese un nombre válido." });
  const [lastName, setLastName] = useState({ campo: "", error: null, mensajeError: "Ingrese un apellido válido." });
  const [errorCuentaYaExiste, setErrorCuentaYaExiste] = useState(null)

  const onChangeEmail = (e) => { setEmail({ ...email, campo: e.target.value }) }
  const onChangePassword = (e) => { setPassword({ ...password, campo: e.target.value }) }
  const onChangePassword2 = (e) => { setPassword2({ ...password2, campo: e.target.value }) }
  const onChangeName = (e) => { setName({ ...name, campo: e.target.value }) }
  const onChangeLastName = (e) => { setLastName({ ...lastName, campo: e.target.value }) }

  const validacionName = () => {
    return (name.campo === "" || name.campo === null || !nameRegExp.test(name.campo))  
      ? setName({ ...name, error: true })
      : setName({ ...name, error: false })
  }

  const validacionLastName = () => {
    return (lastName.campo === "" || lastName.campo === null || !lastNameRegExp.test(lastName.campo)) 
      ? setLastName({ ...lastName, error: true })
      : setLastName({ ...lastName, error: false })
  }

  const validacionEmail = () => {
    return (emailRegExp.test(email.campo))
      ? setEmail({ ...email, error: false })
      : setEmail({ ...email, error: true })
  }

  const validacionContra = () => {
    return (passwordRegExp.test(password.campo))
      ? setPassword({ ...password, error: false })
      : setPassword({ ...password, error: true })
  }

  const validacionContra2 = () => {
    return (password.campo !== password2.campo || password2.campo === "" || password2.campo === null)
      ? setPassword2({ ...password2, error: true })
      : setPassword2({ ...password2, error: false })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
  
    // Validar todos los campos
    validacionEmail();
    validacionContra();
    validacionContra2();
    validacionName();
    validacionLastName();
  
    try {
      // Check for empty fields 
      if (!name.campo || !lastName.campo || !email.campo || !password.campo || !password2.campo) {
        setErrorPost('Por favor complete todos los campos.');
        return;
      }
  
      if (password.campo !== password2.campo) {
        throw new Error("Las contraseñas no coinciden");
      }
  
      const response = await axios.post('http://localhost:8081/auth/signup', { 
        nombre: name.campo,
        apellido: lastName.campo,
        email: email.campo,
        contraseña: password.campo
      }); 
  
      // Handle successful signup 
      console.log(response.data); 
      navigate('/dashboard'); 
    } catch (error) { 
      // Handle signup error 
      console.error('Error en el registro:', error.response ? error.response.data : error.message); 
      setErrorPost(error.response ? error.response.data : error.message); 
    }
  }



    return (
      <div className={styles.registerContainer}>
      <div className={styles.imageContainerRegister}>
        <h1 className={styles.imageTextRegister}>Te ayudamos a buscar tu próximo destino.</h1>
      </div>

      <div className={styles.formContainerRegister}>
        <form onSubmit={onSubmit}>
          <h3 className="text-center">Registrarse</h3>
          {formSent ? <div className='form-sent' style={{ justifyContent: 'center' }}><small>📫 ¡Revise su correo para validar su cuenta!</small></div> : null}
            {errorPost && <div className='error' style={{ justifyContent: 'center' }}><small>Lamentablemente no ha podido registrarse. Por favor intente más tarde.</small></div>}
            {errorCuentaYaExiste && <div className='error' style={{ justifyContent: 'center' }}><small>Este email ya esta asociado a una cuenta existente.</small></div>}
          <div className='mb-2'>
            <label htmlFor="nombre">Nombre</label>
            <input type="text" placeholder='Ingresa tu nombre' className={`${name.error ? 'hasError' : 'noError'} form-control`}
            name="nombre"
            value={name.campo}
            onChange={onChangeName}
            onBlur={validacionName}
            autoComplete="username"
            />
            {name.error && <div className='error'><small>{name.mensajeError}</small></div>}
          </div>
          <div className='mb-2'>
            <label htmlFor="apellido">Apellido</label>
            <input type="text" placeholder='Ingresa tu apellido' className={`${lastName.error ? 'hasError' : 'noError'} form-control`} 
            name="apellido"
            value={lastName.campo}
            onChange={onChangeLastName}
            onBlur={validacionLastName}
            />
            {lastName.error && <div className='error'><small>{lastName.mensajeError}</small></div>}
          </div>
          <div className="mb-2">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" placeholder="Ingresa tu correo" className={`${email.error ? 'hasError' : 'noError'} form-control`} 
            name="email"
            value={email.campo}
            onChange={onChangeEmail}
            onBlur={validacionEmail}
            autoComplete="email"
            />
            {email.error && <div className='error'><small>{email.mensajeError}</small></div>}
          </div>
          <div className="mb-2">
            <label htmlFor="contraseña">Contraseña</label>
            <input type="password" placeholder="Ingresa tu contraseña" className={`${password.error ? 'hasError' : 'noError'} form-control`}
            name="contraseña"
            value={password.campo}
            onChange={onChangePassword}
            onBlur={validacionContra}
            autoComplete="current-password"
            />
            {password.error && <div className='error'><small>{password.mensajeError}</small></div>}
          </div>
          <div className='mb-2'>
            <label htmlFor="contraseña2">Confirmar contraseña</label>
            <input type="password" placeholder='Repetir tu contraseña' className={`${password2.error ? 'hasError' : 'noError'} form-control`} 
            name="contraseña2"
            value={password2.campo}
            onChange={onChangePassword2}
            onBlur={validacionContra2}
            autoComplete="current-password"
            />
            {password2.error && <div className='error'><small>{password2.mensajeError}</small></div>}
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
  }
  
  export default Registro;