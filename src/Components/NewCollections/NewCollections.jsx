import React from 'react';
import './NewCollections.css';

const newCollections = [
  { name: 'Faux Polki', image: 'path_to_image1' },
  { name: 'Faux Diamond', image: 'path_to_image2' },
  { name: 'Temple', image: 'path_to_image3' },
  { name: 'Oxidised Silver', image: 'path_to_image4' },
];

const NewCollections = () => {
  return (
    <div className='new-collections'>
      <h1>COLLECTIONS</h1>
      <div className='new-collections-container'>
        {newCollections.map((collection, index) => (
          <div key={index} className='new-collection-item'>
            <img src={collection.image} alt={collection.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewCollections;
