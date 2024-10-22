import React, { useState, useEffect, useRef } from 'react';
import './Banner.css';
import banner1 from '../Assets/banner1.png';
import banner2 from '../Assets/banner2.png';
import banner3 from '../Assets/banner3.png'; // Add more as needed

const banners = [banner1, banner2, banner3]; // Array of banner images
const ROTATION_INTERVAL = 5000; // Rotation time in milliseconds

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // Function to start the rotation interval
  const startRotation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, ROTATION_INTERVAL);
  };

  // Function to reset the rotation interval
  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startRotation();
  };

  // Start rotation on component mount
  useEffect(() => {
    startRotation();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle dot click to change banner and reset interval
  const handleDotClick = (index) => {
    setCurrentIndex(index);
    resetInterval();
  };

  return (
    <div className="banner">
      <img className="banner-image" src={banners[currentIndex]} alt="Banner" />
      <div className="banner-dots">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`banner-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
