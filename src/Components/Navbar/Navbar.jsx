import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo1.png';
import cart_icon from '../Assets/cart_icon.png';
import search_icon from '../Assets/search.png'; // Import search icon
import nav_dropdown from '../Assets/nav_dropdown.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import all_product from '../Assets/all_product.js'; // Import your products

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
    // Filter products based on the search term
    const filtered = all_product.filter(product => 
      product.name.toLowerCase().includes(value)
    );
    
    setFilteredProducts(filtered);
  };

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <Link to='/' onClick={() => setMenu("shop")}>
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className='nav-bottom'>
        <div className='nav-left'>
          <ul ref={menuRef} className='nav-menu'>
            <li 
              className="nav-item"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link to='/' className='nav-link'>Shop</Link>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li><Link to='/necklace' className="dropdown-item">Necklace</Link></li>
                  <li><Link to='/earrings' className="dropdown-item">Earrings</Link></li>
                  <li><Link to='/bracelet' className="dropdown-item">Bracelet</Link></li>
                  <li><Link to='/rings' className="dropdown-item">Rings</Link></li>
                  <li><Link to='/accessories' className="dropdown-item">Accessories</Link></li>
                  <li><Link to='/under-5k' className="dropdown-item">Under 5k</Link></li>
                  <li><Link to='/style' className="dropdown-item">Style</Link></li>
                </ul>
              )}
            </li>
            <li onClick={() => setMenu("about")}>
              <Link to='/about' className='nav-link'>About Us</Link>
            </li>
          </ul>
        </div>
        <div className="nav-right">
          <div className="nav-search">
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm} 
              onChange={handleSearch} 
            />
            <button><img src={search_icon} alt="Search" /></button>
          </div>
          <Link to='/cart'><img src={cart_icon} className='nav-cart' alt="Cart" /></Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="Dropdown" />
      
      {/* Search Results */}
      {searchTerm && (
        <div className="search-results">
          {filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map(product => (
                <li key={product.id}>
                  <Link to={`/product/${product.id}`}>
                    {product.name} - ₹{product.new_price}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
