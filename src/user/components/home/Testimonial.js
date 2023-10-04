import React, { useEffect, useState } from "react";
import { fetchTestimonialsOnHomePage } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleReviewClick = (e) => {
    e.preventDefault();
    navigate('/user/rating');
  }

  const fetchTestimonials = async () => {
    try {
      const response = await fetchTestimonialsOnHomePage();
      if(response && response.status === 200){
        setData(response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        
      }
    }
  };

  const generateRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i} className="fas fa-star text-warning me-2"></span>
      );
    }
    return stars;
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="wow animate__animated animate__zoomIn">
      <div id="carouselExampleInterval" className="carousel slide text-center" data-bs-ride="carousel">
        <div className="carousel-inner">
          {data.map((item, index) => (
            <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"}>
              <img
                className="rounded-circle shadow-1-strong mb-3"
                src={item.photo || "/user/images/user-1.jpg"} // Use default image if imageUrl is not available
                alt={`User ${index + 1}`}
              />
              {/* Include other content for each carousel item here */}
              <div className="mb-2 comment-text mx-auto">{item.name}</div>
              <div className="mb-2 comment-text mx-auto">{item.message}</div>
              <div className="mb-3 mx-auto">{generateRatingStars(item.rating)}</div>
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
        <a className="btn btn-primary hover-pointer" onClick={handleReviewClick}>Share Your Review</a>

      </div>
    </section>
  );
};

export default Testimonials;
