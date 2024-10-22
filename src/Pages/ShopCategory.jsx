import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  // Debugging: Log all products and category
  console.log('All Products:', all_product);
  console.log('Current Category:', props.category);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="Category Banner" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {all_product.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="Sort" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product
          .filter(item => props.category === item.category) // Filter products by category
          .map((item, i) => {
            // console.log('Product Item:', item); // Debugging: Log each product
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.images[0]} // Use the first image from the images array
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          })
        }
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
}

export default ShopCategory;
