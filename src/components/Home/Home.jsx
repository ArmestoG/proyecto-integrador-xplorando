import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";2
import "react-multi-carousel/lib/styles.css";
import Category from "./Category";
import { responsive, producto } from "../../components/data";
import "./Home.css";
import ProductHome from "./ProductHome";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import Busqueda from "../Busqueda/Busqueda";



export default function Body() {
  {/* Para cuando estás logueado */}
  const location = useLocation()

	const message = location.state && location.state.message
	const currentUser = localStorage.getItem("userId")
  {/* Para cuando estás logueado */}

  const [randomProducts, setRandomProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Obtener una lista aleatoria de imágenes
    const shuffledImages = producto.sort(() => Math.random() - 0.5).slice(0, 10);

    // Crear productos aleatorios utilizando las imágenes
    const randomProductsList = shuffledImages.map((image) => ({
      id: image.id, // Usa un id diferente para evitar conflictos con categoria
      name: image.name,
      imageurl: image.imageurl1,
      price: image.price,
      description: image.description,
    }));

    setRandomProducts(randomProductsList);
  }, []);

 

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
  const products = categorias.map((item) => (
    <Category
      key={item.id}
      name={item.nombreCategoria}
      url={item.imagenCategoria}
    />
  ));

  return (
    <div className="body-container">
      {/* Para cuando estás logueado */}
      {message && <p className="text-warning px-5">{message}</p>}
			{currentUser && (
				<h6 className="text-success text-center"> You are logged-In as {currentUser}</h6>
			)}
      {/* Para cuando estás logueado */}
      <h1>Próximo destino</h1>
       {/* Barra de búsqueda con icono de lupa */}
       <Busqueda/>
      {/* Carrusel de categorías */}
      <div className="carousel-card">
      <Carousel showDots={true} responsive={responsive}>
        {products}
      </Carousel>
      </div>
      {/* Sección de productos aleatorios 
       <div className="random-products">
        <h2>¡Se viene el finde XL!</h2>
        {/*<div className="row">
          {randomProducts.map((item) => (
            <Product
              key={item.id}
              name={item.name}
              url={item.imageurl}
              price={item.price}
              description={item.description}
              id={item.id}
            />
          ))}
        </div>
      </div>*/}
      <ProductHome/>
    </div>
  );
}