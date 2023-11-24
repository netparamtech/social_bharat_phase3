import React, { useEffect, useState } from "react";
import { fetchBannerWithPageAndSection, fetchTestimonialsOnHomePage } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import { Carousel } from "antd";

const Testimonials = () => {
  const [data, setData] = useState([]);
  const [statsBg, setStatsBg] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backgroundImage = '/user/images/pexels-photo-18409047.webp';

  const user = useSelector((state) => state.userAuth);
  const isAuthenticUser = user && user.isAuthenticated;

  const handleReviewClick = (e) => {
    e.preventDefault();
   isAuthenticUser? navigate('/user/rating'): navigate('/login');
  }


  const fetchBanners = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchBannerWithPageAndSection(
        "Home",
        "Stats Bg"
      );
      const activeBanners = response.data.data.filter(
        (banner) => banner.status === "Active"
      );

      if (!Array.isArray(activeBanners[0].banner_urls)) {
        const updatedBannerUrls = [activeBanners[0].banner_urls];
        activeBanners[0].banner_urls = updatedBannerUrls;
      }
      setStatsBg(activeBanners);
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
      }
    }
  };

  const fetchTestimonials = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchTestimonialsOnHomePage();
      if (response && response.status === 200) {
        setData(response.data.data);
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
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

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <section id="testimonials" className="wow animate__animated animate__zoomIn" style={{ backgroundImage: `url(${statsBg[0] && statsBg[0].banner_urls[0]})` }}>
      <div id="carouselExampleInterval" className="text-center">
        <div className="">
          <Carousel autoplay>
            {data.map((item, index) => (
              <div key={index}>
                <div className="text-center">
                  <img
                    className="rounded-circle shadow-1-strong mb-3 mx-auto"
                    src={item.photo || "/user/images/OIP.jpg"} // Use default image if imageUrl is not available
                    alt={`User ${index + 1}`}
                  />
                  <div className="mb-2 h5 text-muted comment-text mx-auto">{item.name}</div>
                  <div className="mb-2 comment-text mx-auto">{item.message}</div>
                  <div className="mb-3 mx-auto">{generateRatingStars(item.rating)}</div>
                </div>
              </div>
            ))}
          </Carousel>

        </div>
       
        <a className="btn btn-primary hover-pointer fw-bold" onClick={handleReviewClick}>Share Your Review</a>

      </div>
    </section>
  );
};

export default Testimonials;
