import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Banner = () => {
  const typedRefs = useRef([]);
  const imageUrls = [
    "/user/images/matrimonial-1.jpg",
    "/user/images/matrimonial-2.jpg",
    "/user/images/matrimonial-3.jpg",
    // Add more image URLs as needed
  ];

  useEffect(() => {
    // Initialize Typed instances for each carousel item
    const typedInstances = imageUrls.map((imageUrl, index) => {
      return new Typed(typedRefs.current[index], {
        strings: ["Society", "Community", "Social Bharat"],
        typeSpeed: 150,
        backSpeed: 150,
        loop: true,
      });
    });

    // Clean up the Typed instances when the component unmounts
    return () => {
      typedInstances.forEach((typed) => typed.destroy());
    };
  }, []);

  return (
    <div id="banners-section">
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        {/* Indicators */}
        <div className="carousel-indicators">
          {imageUrls.map((_, index) => (
            <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current={index === 0 ? "true" : "false"} aria-label={`Slide ${index + 1}`}></button>
          ))}
        </div>

        {/* Wrapper for slides */}
        <div className="carousel-inner" role="listbox">
          {imageUrls.map((imageUrl, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img className="banner-area d-block w-100" src={imageUrl} alt={`Slide ${index + 1}`} />
              <div className="overlay">
                <div className="carousel-caption d-none d-md-block">
                  <div className="container">
                    <h2>Connect with <span ref={(el) => (typedRefs.current[index] = el)} className="typed"></span></h2>
                  </div>
                  <div className="banner-button">
                    <a className="hero-btn" href = '/register'>Get started</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left and right controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Banner;
