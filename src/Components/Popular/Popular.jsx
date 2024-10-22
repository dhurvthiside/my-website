import React, { useState } from 'react';
import './Popular.css';
import data_product from '../Assets/data';
import Item from '../Item/Item';

const Popular = () => {
  const [offset, setOffset] = useState(0);

  const slideLeft = () => {
    if (offset > -1) setOffset(offset - 1);
  };

  const slideRight = () => {
    if (offset < data_product.length - 2) setOffset(offset + 1);
  };

  const centerIndex = offset + 1;

  return (
    <div className='popular'>
      <h1>THE INFLUENCER SPOTLIGHT</h1>
      <div className="slider-container">
        <button className="slider-btn left-btn" onClick={slideLeft}>‹</button>
        <div className="slider">
          <div className="popular-items" style={{ transform: `translateX(${offset * -33.3333}%)` }}>
            {data_product.map((item, i) => (
              <div
                key={i}
                className={`popular-item-wrapper ${i === centerIndex ? 'center-item' : ''}`}
              >
                <Item
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              </div>
            ))}
          </div>
        </div>
        <button className="slider-btn right-btn" onClick={slideRight}>›</button>
      </div>
    </div>
  );
};

export default Popular;
