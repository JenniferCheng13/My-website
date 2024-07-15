import React from 'react';

const Card = ({ id, content, flipped, onClick }) => (
  <div className={`card ${flipped ? 'flipped' : ''}`} onClick={onClick}>
    {flipped ? content : 'X'}
  </div>
);

export default Card;
