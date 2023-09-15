import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Banner = () => {
  const typedRefs = useRef([]);
  const [imageUrls, setImageUrls] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Typed instances for each carousel item
    const typedInstances =
      imageUrls.length > 0 &&
      imageUrls[0]?.banner_urls?.map((imageUrl, index) => {
        return new Typed(typedRefs.current[index], {
          strings: ["Society", "Community", "Social Bharat"],
          typeSpeed: 150,
          backSpeed: 150,
          loop: true,
        });
      });
  }, [imageUrls]);

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
              <a className="hero-btn" href="#" onClick={()=>navigate('/register')}>Get started</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
