import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
import { categoria, responsive, producto } from "../../components/data";
import "./Home.css";
import { FaSearch } from "react-icons/fa";

export default function Body() {

  const [randomProducts, setRandomProducts] = useState([]);

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

 //Esto es para el carrusel
  const products = categoria.map((item) => (
    <Product
      key={item.id}
      name={item.name}
      url={item.imageurl}
      price={item.price}
      description={item.description}
    />
  ));

  return (
    <div className="body-container">
      <h1>React multi carousel</h1>
       {/* Barra de búsqueda con icono de lupa */}
       <div className="search-bar">
        <input type="text" placeholder="Buscar productos..." />
        <FaSearch className="search-icon" />
      </div>
      {/* Carrusel de categorías */}
      <div className="carousel-card">
      <Carousel showDots={true} responsive={responsive}>
        {products}
      </Carousel>
      </div>
      {/* Sección de productos aleatorios */}
       <div className="random-products">
        <h2>Productos Aleatorios</h2>
        <div className="row">
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
      </div>
    
    </div>
  );
}
