import React from 'react';
import cardStyles from './Card.module.css';

const Card = ({ categoria }) => {
  return (
    <div className={cardStyles.cardContainer}>
      <div className={cardStyles.imageContainer}>
        <img src={categoria.imageurl} alt={categoria.name} />
      </div>

      <div className={cardStyles.cardContent}>
        <div className={cardStyles.cardTitle}>
          <h2>{categoria.name}</h2>
        </div>
        <div className={cardStyles.cardBody}>
          <p>{categoria.description}</p>
        </div>
      </div>

      <div className={cardStyles.btn}>
        <button>
          <a href="#">Ver más información</a>
        </button>
      </div>
    </div>
  );
};

export default Card;