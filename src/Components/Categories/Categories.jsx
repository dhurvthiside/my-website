import React from 'react';
import './Categories.css';
import earringsImg from '../Assets/earrings1.png';
import ringsImg from '../Assets/rings.png';
import necklaceImg from '../Assets/necklace.png';
import braceletImg from '../Assets/bracelet.png';
import accessoriesImg from '../Assets/accessories.png';

const categories = [
  { name: 'Earrings', image: earringsImg },
  { name: 'Rings', image: ringsImg },
  { name: 'Necklace', image: necklaceImg },
  { name: 'Bracelet', image: braceletImg },
  { name: 'Accessories', image: accessoriesImg }
];

const Categories = () => {
  return (
    <div className='categories'>
      <h2>Categories</h2>
      <div className='categories-container'>
        {categories.map((category, index) => (
          <a key={index} href={`/${category.name.toLowerCase()}`} className='category-item'>
            <img src={category.image} alt={category.name} />
            <span>{category.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Categories;
