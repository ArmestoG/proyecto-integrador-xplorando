import React, { useState } from 'react';
import Card from '../CardCategorias/Card';
import sliderStyles from './Slider.module.css';
import { categoria } from '../data';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categoria.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + categoria.length) % categoria.length);
  };

  // Obtén las tres categorías a mostrar
  const visibleCategories = [
    categoria[currentIndex],
    categoria[(currentIndex + 1) % categoria.length],
    categoria[(currentIndex + 2) % categoria.length]
  ];

  return (
    <div className={sliderStyles.container}>
      <div className={`${sliderStyles.leftArrow} ${sliderStyles.arrow}`}>
        <button onClick={handlePrev}>Anterior</button>
      </div>
      <div className={sliderStyles.grid}>
        {/* Mapea las categorías visibles */}
        {visibleCategories.map((category) => (
          <Card categoria={category} key={category.id} />
        ))}
      </div>
      <div className={`${sliderStyles.rightArrow} ${sliderStyles.arrow}`}>
        <button onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  );
};

export default Slider;