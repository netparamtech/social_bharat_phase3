import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { fetchBannerWithPageAndSection } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const BannerCarousel = () => {
  const typedRefs = useRef([]);
  const [imageUrls, setImageUrls] = useState([]);

  const navigate = useNavigate();

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
    <div id="banners-section">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          {imageUrls.length > 0 &&
            imageUrls[0]?.banner_urls?.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
        </div>

        {/* Wrapper for slides */}
        <div className="carousel-inner" role="listbox">
          {imageUrls.length > 0 &&
            imageUrls[0]?.banner_urls?.map((imageUrl, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  className="banner-area d-block w-100"
                  style={{
                    backgroundImage: `url(${imageUrl.replace(/\\/g, "/")})`,
                    width: "100%", // Set the width to 100% for full-width images
                    height: "450px", // Set the desired height for your carousel images
                  }}
                />
                <div className="overlay">
                  <div className="carousel-caption d-none d-md-block">
                    <div className="container">
                      <h2>
                        Connect with{" "}
                        <span
                          ref={(el) => (typedRefs.current[index] = el)}
                          className="typed"
                        ></span>
                      </h2>
                    </div>
                    <div className="banner-button">
                      <a
                        className="hero-btn"
                        href=""
                        onClick={() => navigate("/register")}
                      >
                        Get started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Left and right controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default BannerCarousel;
