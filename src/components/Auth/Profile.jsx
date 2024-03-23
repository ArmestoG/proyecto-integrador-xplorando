import React, { useEffect, useState } from "react"
import { getUser } from "../Utils/ApiFunctions";
import { useNavigate } from "react-router-dom"
import styles from "./Profile.module.css";
import { FaPencilAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";


const Profile = () => {
  const location = useLocation();
	const [user, setUser] = useState({
		id: "",
		email: "",
		firstName: "",
		lastName: "",
		roles: [{ id: "", name: "" }]
	})

  console.log("xxxxxxxxxx");

	
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
    <div className={styles.profileContainer}>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {user && (
        <div className={styles.userInfo}>
          <h2>User Information</h2>
          <div className={styles.fieldContainer}>
            <div className={styles.field}>
              <p className={styles.label}>First Name:</p>
              <p className={styles.value}>{user.firstName}</p>
              <FaPencilAlt className={styles.icon} />
            </div>
            <div className={styles.field}>
              <p className={styles.label}>Last Name:</p>
              <p className={styles.value}>{user.lastName}</p>
              <FaPencilAlt className={styles.icon} />
            </div>
            <div className={styles.field}>
              <p className={styles.label}>Email:</p>
              <p className={styles.value}>{user.email}</p>
              <FaPencilAlt className={styles.icon} />
            </div>
            <div className={styles.field}>
              <p className={styles.label}>Roles:</p>
              <ul className={styles.rolesList}>
                {user.roles && user.roles.length > 0 ? (
                  user.roles.map((role) => (
                    <li key={role.id} className="card-text">
                      {role.name}
                    </li>
                  ))
                ) : (
                  <li>No roles assigned</li>
                )}
              </ul>
              <FaPencilAlt className={styles.icon} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile