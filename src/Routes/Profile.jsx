import React, { useEffect, useState } from "react"
import { getUser } from "../components/Utils/ApiFunctions";
import { useNavigate } from "react-router-dom"
import "./Profile.css";


const Profile = () => {
	const [user, setUser] = useState({
		id: "",
		email: "",
		firstName: "",
		lastName: "",
		roles: [{ id: "", name: "" }]
	})

	
	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()

	const userId = localStorage.getItem("userId")
	const token = localStorage.getItem("token")

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser(userId, token)
				setUser(userData)
			} catch (error) {
				console.error(error)
			}
		}

		fetchUser()
	}, [userId])

	

	

	return (
		<div className="profileContainer">
			<div className="imageContainerProfile">
				<h1 className="imageTextLogin"></h1>
			  </div>
			{errorMessage && <p className="text-danger">{errorMessage}</p>}
			{message && <p className="text-danger">{message}</p>}
			{user ? (
				
				<div className="card formContainerProfile" style={{ backgroundColor: "whitesmoke" }}>
					<h4 className="card-title text-center">Información del usuario</h4>
					<div className="card-body">
						<div className="col-md-14 mx-auto">
							<div className="card mb-3 shadow">
								<div className="row g-0">
									<div className="col-md-10">
										<div className="d-flex justify-content-center align-items-center mb-4">
											<img
												src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
												alt="Profile"
												className="rounded-circle"
												style={{ width: "150px", height: "150px", objectFit: "cover" }}
											/>
										</div>
									</div>

									<div className="col-md-10">
										<div className="card-body">
											<div className="form-group">
												<label className="col-md-10">ID: 3</label>
												<div className="col-md-12">
													<p className="card-text">{user.id}</p>
												</div>
											</div>
											<hr />

											<div className="form-group">
												<label className="col-md-10">Nombre: Javier</label>
												<div className="col-md-12">
													<p className="card-text">{user.firstName}</p>
												</div>
											</div>
											<hr />

											<div className="form-group">
												<label className="col-md-10">Apellido:Ospina</label>
												<div className="col-md-12">
													<p className="card-text">{user.lastName}</p>
												</div>
											</div>
											<hr />

											<div className="form-group">
												<label className="col-md-10">Correo:javierospina@gmail.com</label>
												<div className="col-md-12">
													<p className="card-text">{user.email}</p>
												</div>
											</div>
											<hr />

											<div className="form-group">
												<label className="col-md-10">Rol:admin</label>
												<div className="col-md-12">
													<ul className="list-unstyled">
														{user.roles.map((role) => (
															<li key={role.id} className="card-text">
																{role.name}
															</li>
														))}
													</ul>
												</div>
											</div>
							
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			) : (
				<p>Cargando datos de usuario...</p>
			)}
			
		</div>
		
	)
}

export default Profile