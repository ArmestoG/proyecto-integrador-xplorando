import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  
  const [email, setEmail] = React.useState({ campo: "", error: null });
  const [password, setPassword] = React.useState({ campo: "", error: null });

  // Escucha cambios de los inputs
  const onChangeEmail = (e) => { setEmail({ ...email, campo: e.target.value }); }
  const onChangePassword = (e) => { setPassword({ ...password, campo: e.target.value }); }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageContainerLogin}>
        <h1 className={styles.imageTextLogin}>Te ayudamos a buscar tu próximo destino.</h1>
      </div>

      <div className={styles.formContainerLogin}>
        <form>
          <h3 className="text-center">Iniciar sesión</h3>
          <div className="mb-2">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" placeholder="Ingresa tu correo" className={`${email.error ? 'hasError' : ''} form-control`} 
             name="email"
             value={email.campo}
             onChange={onChangeEmail}
             autoComplete="current-email"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Contraseña</label>
            <input type="password" placeholder="Ingresa tu contraseña" className={`${password.error ? 'hasError' : ''} form-control`} 
            name="password"
            value={password.campo}
            onChange={onChangePassword}
            autoComplete="current-password"
            />
            {(email.error || password.error) && <div className='error'><small>Por favor vuelva a intentarlo, sus credenciales son inválidas</small></div>}
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
  
  export default Login;