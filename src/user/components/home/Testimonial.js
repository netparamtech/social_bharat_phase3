import React, { useEffect, useState } from "react";
import { fetchBannerWithPageAndSection } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();

  const fetchBanners = async () => {
    try {
      const response = await fetchBannerWithPageAndSection("Home", "Testimonial");
      const activeBanners = response.data.data.filter(banner => banner.status === "Active");

      if (!Array.isArray(activeBanners[0].banner_urls)) {
        const updatedBannerUrls = [activeBanners[0].banner_urls];
        activeBanners[0].banner_urls = updatedBannerUrls;
      }

      setImageUrls(activeBanners[0].banner_urls); // Set image URLs
    } catch (error) {
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

  return (
    <section id="testimonials" className="wow animate__animated animate__zoomIn">
      <div id="carouselExampleInterval" className="carousel slide text-center" data-bs-ride="carousel">
        <div className="carousel-inner">
          {imageUrls.map((imageUrl, index) => (
            <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"}>
              <img
                className="rounded-circle shadow-1-strong mb-4"
                src={imageUrl || "/user/images/user-1.jpg"} // Use default image if imageUrl is not available
                alt={`User ${index + 1}`}
              />
              {/* Include other content for each carousel item here */}
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
