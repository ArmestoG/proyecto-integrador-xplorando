import React, { useState } from 'react';
import './CounterButton.css';


const Counter = () => {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount(prevCount => (prevCount > 1 ? prevCount - 1 : prevCount));
  };

  return (
    <div className="counter">
      <button onClick={handleDecrement} className="button">-</button>
      <span className="count">{count}</span>
      <button onClick={handleIncrement} className="button">+</button>
    </div>
  );
};

export default Counter;