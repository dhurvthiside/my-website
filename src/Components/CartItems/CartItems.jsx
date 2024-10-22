import React, { useContext, useState, useRef, useEffect } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import qr_code from '../Assets/payment_qr_code.png';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, clearCart } = useContext(ShopContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const checkoutRef = useRef(null);
  const paymentRef = useRef(null);
  
  // State to manage form fields
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    altPhone: '',
    address1: '',
    address2: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (showCheckout && checkoutRef.current) {
      checkoutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showCheckout]);

  useEffect(() => {
    if (showPayment && paymentRef.current) {
      paymentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showPayment]);

  const handleProceedToCheckout = () => {
    if (Object.keys(cartItems).some(key => cartItems[key] > 0)) {
      setShowCheckout(true);
    }
  };

  const handleProceedToPayment = () => {
    // Check if all required fields are filled
    const requiredFields = ['name', 'phone', 'address1', 'city', 'state', 'pincode'];
    const allFieldsFilled = requiredFields.every(field => formData[field].trim() !== '');

    if (allFieldsFilled) {
      setShowPayment(true);
    } else {
      alert("Please fill all required fields before proceeding to payment.");
    }
  };

  const handlePaymentCompleted = () => {
    clearCart();
    setShowCheckout(false);
    setShowPayment(false);
    window.location.href = '/'; // Replace '/shop' with the actual route to your shop page
};


  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.images[0]} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>₹{e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>₹{e.new_price * cartItems[e.id]}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
              </div>
              <hr />
            </div>
          );
        } 
          return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className='cartitems-total-item'>
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>

      {showCheckout && (
        <div ref={checkoutRef} className="checkout-form">
          <h2>Shipping Details</h2>
          <form>
            <div className="form-group">
              <label>Name <span>*</span></label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number <span>*</span></label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Alternate Phone Number</label>
              <input type="tel" name="altPhone" value={formData.altPhone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Address Line 1 <span>*</span></label>
              <input type="text" name="address1" value={formData.address1} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Address Line 2</label>
              <input type="text" name="address2" value={formData.address2} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Apartment/Block</label>
              <input type="text" name="apartment" value={formData.apartment} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>City <span>*</span></label>
              <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>State <span>*</span></label>
              <input type="text" name="state" value={formData.state} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>PinCode <span>*</span></label>
              <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
            </div>
          </form>
          <button onClick={handleProceedToPayment}>PROCEED TO PAYMENT</button>
        </div>
      )}

      {showPayment && (
        <div ref={paymentRef} className="payment-section">
          <h2>Payment</h2>
          <p>Scan the QR code below to complete the payment.</p>
          <img src={qr_code} alt="QR Code" className='payment-qr-code' />
          <p>Please pay the required amount. We will match the payment details for order confirmation.</p>
          <button onClick={handlePaymentCompleted}>PAYMENT COMPLETED</button>
        </div>
      )}
    </div>
  );
};

export default CartItems;
