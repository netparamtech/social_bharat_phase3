import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div id="banners-section" className="bg-white">
      <div className="container">
        <div className="jumbotron navbar-scroll">
          <div className="hero-section">
            <div className="">
              <h2>
                Connect with <span class="typed"></span>
              </h2>
            </div>
            <div className="banner-button">
              <a
                className="hero-btn"
                href="#"
                onClick={() => navigate("/register")}
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
