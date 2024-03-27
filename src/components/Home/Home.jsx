import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";2
import "react-multi-carousel/lib/styles.css";
import Category from "./Category";
import { responsive } from "../../components/data";
import "./Home.css";
import ProductHome from "./ProductHome";
import axios from "axios";
import Busqueda from "../Busqueda/Busqueda";



export default function Body() {
  {/* Para cuando estás logueado */}

  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());



  const [categorias, setCategorias] = useState([]);



 

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/categorias/listar"
        );
        console.log("Categorias obtenidas:", response.data);
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

 //Esto es para el carrusel
  const cats = categorias.map((item) => (
    <Category
      key={item.id}
      name={item.nombreCategoria}
      url={item.imagenCategoria}
    />
  ));

  
  return (
    <div className="body-container">
      {/* Para cuando estás logueado */}
      <h1>Próximo destino</h1>
       {/* Barra de búsqueda con icono de lupa */}
       <Busqueda/>
      {/* Carrusel de categorías */}
      <div className="carousel-card">
        <h2 style={{justifyContent:"center", color:"#273662", fontWeight:"500"}}>Categorias para elegir</h2>
        <Carousel  showDots={false} responsive={responsive} ssr={true} infinite={true} containerClass="carousel-container" >
        {cats}
      </Carousel>
      </div>
      <ProductHome/>
    </div>
  );
}