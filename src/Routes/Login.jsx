import React, { useState } from "react"
import { loginUser } from "../components/Utils/ApiFunctions"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"
import "./Login.css";

const Login = () => {
	const [errorMessage, setErrorMessage] = useState("")
	const [login, setLogin] = useState({
		email: "",
		password: ""
	})

	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()
	const redirectUrl = location.state?.path || "/"

	const handleInputChange = (e) => {
		setLogin({ ...login, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!login.email || !login.password) {
			setErrorMessage("Por favor ingrese tanto el correo electrónico como la contraseña.");
			return;
		}
		const success = await loginUser(login)
		if (success) {
			const token = success.token
			auth.handleLogin(token)
			navigate(redirectUrl, { replace: true })
		} else {
			setErrorMessage("Usuario o contraseña inválida. Porfavor, intente de nuevo.")
		}
		setTimeout(() => {
			setErrorMessage("")
		}, 4000)
	}

	return (
		<section className="loginContainer">
			{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
			<div className="imageContainerLogin">
        <h1 className="imageTextLogin">Te ayudamos a buscar tu próximo destino.</h1>
      </div>
	  <div className="formContainerLogin">
			
			<form onSubmit={handleSubmit}>
			<h2 className="text-center">Iniciar sesión</h2>
				<div className="mb-2">
					<label htmlFor="email" className="col-sm-2 col-form-label">
						Email
					</label>
					<div>
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={login.email}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-2">
					<label htmlFor="password" className="col-sm-2 col-form-label">
						Password
					</label>
					<div>
						<input
							id="password"
							name="password"
							type="password"
							className="form-control"
							value={login.password}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-2">
					<button type="submit" className="primaryButtonLogin" style={{ marginRight: "10px" }}>
						Iniciar sesión
					</button>
					<span style={{ marginLeft: "10px" }}>
						Aún no estás registrado?<Link to={"/registro"}> Registro</Link>
					</span>
				</div>
			</form>
			</div>
		</section>
	)
}

export default Login