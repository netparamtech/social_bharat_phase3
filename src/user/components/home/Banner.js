import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { useNavigate } from "react-router-dom";
import { fetchBannerWithPageAndSection } from "../../services/userService";
import { useSelector } from "react-redux";

const Banner = () => {
  const user = useSelector((state) => state.userAuth);
  const isAuthenticUser = user && user.isAuthenticated;
  const [imageUrls, setImageUrls] = useState([]);
  const typedRef = useRef(null); // Use a single ref for Typed instance
  const navigate = useNavigate();

  const defaultImageUrl = '/user/images/banner-1.jpg'

  const handleBecomeMemberClick = () => {
    navigate('/register');
  };

  const fetchBanners = async () => {
    try {
      const response = await fetchBannerWithPageAndSection(
        "Home",
        "Main Banners"
      );
      const activeBanners = response.data.data.filter(
        (banner) => banner.status === "Active"
      );

      // Check if activeBanner.banner_urls is not an array
      if (!Array.isArray(activeBanners[0].banner_urls)) {
        // Convert it into an array
        const updatedBannerUrls = [activeBanners[0].banner_urls];
        // Update activeBanners with the updated banner URLs
        activeBanners[0].banner_urls = updatedBannerUrls;
      }

      setImageUrls(activeBanners);
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    const options = {
      strings: ["Growing Community ", "Business Growth ", "Search Partner"],
      typeSpeed: 80,
      backSpeed: 80,
      loop: true,
    };

    if (typedRef.current) {
      const typedInstance = new Typed(typedRef.current, options);
      return () => {
        typedInstance.destroy(); // Clean up the Typed instance on unmount
      };
    }
  }, []); // Empty dependency array to run this effect only once

  const backgroundImageUrl = imageUrls.length > 0 && imageUrls[0]?.banner_urls[0]
    ? imageUrls[0].banner_urls[0].replace(/\\/g, "/")
    : defaultImageUrl;

  return (
    <div id="banners-section" className="bg-white">
      <div className="container">
      <div className="jumbotron navbar-scroll" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
          <div className="hero-section">
            <div className="">
              <h2>
                Social Bharat Helps <br /> <span className="typed" ref={typedRef}></span>
              </h2>
            </div>
           {
            isAuthenticUser?'':(
              <div className="fixed-button-container">
              <a className="btn btn-banner" href="" onClick={handleBecomeMemberClick}>
                Become a member
              </a>
            </div>
            )
           }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
