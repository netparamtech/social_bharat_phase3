import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const typedRef = useRef(null); // Use a single ref for Typed instance
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      strings: ["Society", "Community", "Social Bharat"],
      typeSpeed: 150,
      backSpeed: 150,
      loop: true,
    };

    if (typedRef.current) {
      const typedInstance = new Typed(typedRef.current, options);
      return () => {
        typedInstance.destroy(); // Clean up the Typed instance on unmount
      };
    }
  }, []); // Empty dependency array to run this effect only once

  return (
    <div id="banners-section" className="bg-white">
      <div className="container">
        <div className="jumbotron navbar-scroll">
          <div className="hero-section">
            <div className="">
              <h2>
                Connect with <span className="typed" ref={typedRef}></span>
              </h2>
            </div>
            <div className="banner-button">
              <a className="hero-btn" href="#" onClick={() => navigate('/register')}>Get started</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
