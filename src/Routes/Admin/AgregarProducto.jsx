import FormAgregarProducto from '../../components/FormAgregarProducto/FormAgregarProducto.jsx';

const AgregarProducto = () => {


  // Verificar si el usuario está autenticado y tiene el rol adecuado
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  const userRole = sessionStorage.getItem("userRole");
  if (!isAuthenticated || userRole !== "ROLE_ADMIN") {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        No tienes permisos para acceder a esta página.
      </div>
    );
  }
  return (
    <div>   
      <FormAgregarProducto />
    </div>
  );
}

export default AgregarProducto;