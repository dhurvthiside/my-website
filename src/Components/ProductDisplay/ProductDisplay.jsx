import React, { useState, useContext } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    // State to track the current image index
    const [index, setIndex] = useState(0);

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {/* Thumbnail images */}
                    {product.images.map((image, i) => (
                        <img
                            key={i}
                            src={image}
                            alt={`Thumbnail ${i}`}
                            className={i === index ? 'small-image selected-image' : 'small-image'}
                            onMouseEnter={() => setIndex(i)} // Update index on hover
                        />
                    ))}
                </div>
                <div className="productdisplay-img">
                    {/* Main image */}
                    <img className='productdisplay-main-img' src={product.images[index]} alt="Main product" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        ₹{product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        ₹{product.new_price}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    These exquisite earrings offer a perfect blend of elegance and versatility. 
                    Crafted from high-quality materials, they are lightweight and comfortable for all-day wear. 
                    Their timeless design makes them an ideal accessory for both casual outings and formal events. 
                    Available in a variety of styles and colors to match any outfit and occasion.
                </div>
                <div className="productdisplay-right-size">
                    {/* <h1>Select Size</h1> */}
                    <div className="productdisplay-right-sizes">
                        {/* <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                        <div>Deshpande</div> */}
                    </div>
                </div>
                <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
                <p className="productdisplay-right-category"><span>Category:</span> Earrings</p>
                <p className="productdisplay-right-category"><span>Tags:</span> Modern, Latest</p>
            </div>
        </div>
    );
}

export default ProductDisplay;
