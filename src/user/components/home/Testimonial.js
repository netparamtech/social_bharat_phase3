import { useEffect, useState } from "react";
import { fetchBannerWithPageAndSection } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();

  const fetchBanners = async () => {
    try {
      const response = await fetchBannerWithPageAndSection(
        "Home",
        "Testimonial"
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

  return (
    <section
      id="testimonials"
      className="wow animate__animated animate__zoomIn"
    >
      <div
        id="carouselExampleInterval"
        className="carousel slide text-center"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
         
              <div
                
                className="active"
              >
                <img
                  className="rounded-circle shadow-1-strong mb-4"
                  src="/user/images/user-1.jpg"
                  
                  
                />
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-8">
                    <h3 className="mb-3">Maria Kate</h3>
                    <h4>Photographer</h4>
                    <p>
                      <i className="fa fa-quote-left pe-2"></i>
                      I'm looking forward to seeing platforms that not only help
                      people find love but also foster a supportive community
                      where users can learn from each other's experiences and
                      share valuable advice.
                      <i className="fa fa-quote-right ps-2"></i>
                    </p>
                  </div>
                </div>
                <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="far fa-star fa-sm"></i>
                  </li>
                </ul>
              </div>
            
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon "
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
