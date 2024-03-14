import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Category from "./Category";
import { categoria, responsive, producto } from "../../components/data";
import "./Home.css";
import { FaSearch } from "react-icons/fa";
import ProductHome from "./ProductHome";

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
    <Category
      key={item.id}
      name={item.name}
      url={item.imageurl}
      price={item.price}
      description={item.description}
    />
  ));

  return (
    <div className="body-container">
      <h1>Próximo destino</h1>
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
      <h2>¡Se viene el finde XL!</h2>
       <div className="random-products">
        <div className="row">
          {randomProducts.map((item) => (
            <ProductHome
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
