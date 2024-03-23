import React, { useState } from 'react';
import Card from '../CardCategorias/Card';
import sliderStyles from './Slider.module.css';
import { categoria } from '../data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';


const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categoria.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + categoria.length) % categoria.length);
  };

  // categorías a mostrar
  const visibleCategories = [
    categoria[currentIndex],
    categoria[(currentIndex + 1) % categoria.length],
    categoria[(currentIndex + 2) % categoria.length]
  ];

  return (
    <div className={sliderStyles.container}>
      <div className={`${sliderStyles.leftArrow} ${sliderStyles.arrow}`}>
        <FontAwesomeIcon onClick={handlePrev} icon={faAngleLeft} />
      </div>

      <div className={sliderStyles.grid}>
        {/* Map categorías*/}
        {visibleCategories.map((category, index) => (
          <Card categoria={category} key={index} />
        ))}
      </div>
      <div className={`${sliderStyles.rightArrow} ${sliderStyles.arrow}`}>
        <FontAwesomeIcon onClick={handleNext} icon={faAngleRight} />
      </div>
    </div>
  );
};

export default Slider;