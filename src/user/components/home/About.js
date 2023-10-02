import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate("/");
  };

  return (
    <>
      <div id="banners-section" className="bg-white">
        <div className="container">
          <div className="about-img navbar-scroll "></div>
        </div>
      </div>


      <div id="why-social-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 mt-5  what-social-bharat wow animate__animated animate__fadeInUp">
              <h1>What social Bharat Do?</h1>
              <p>
                Connecting Communities with Privacy & Matrimonial Excellence.
              </p>
              <ul>
                <li>
                  <i className="fa-sharp fa-regular fa-circle-check me-2"></i>
                  Discover and participate in communities you love.
                </li>
                <li>
                  <i className="fa-sharp fa-regular fa-circle-check me-2"></i>
                  Trustworthy profiles for a secure matrimonial experience.
                </li>
                <li>
                  <i className="fa-sharp fa-regular fa-circle-check me-2"></i>
                  Private Sharing in Chosen Communities.
                </li>
                <li>
                  <i className="fa-sharp fa-regular fa-circle-check me-2"></i>
                  Find Life Partners with Privacy.
                </li>
                <li>
                  <i className="fa-sharp fa-regular fa-circle-check me-2"></i>
                  Elevate your business to new heights.{" "}
                </li>
                <li>
                  <i className="fa-sharp fa-regular fa-circle-check me-2"></i>
                  Plan and attend events with friends and like-minded
                  individuals.{" "}
                </li>
              </ul>
            </div>
            <div className="col-lg-6 col-md-6 float-end mt-0 mt-lg-5 wow animate__animated animate__zoomIn">
              <div className="image-zoom-containerm fade-in-image">
                <img
                  src="/user/images/banner-3.jpg"
                  className="img-fluid image-zoom"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="services">
        <h1 className="fs-2 lh-base text-center pt-5">Services</h1>
        <div className="container mt-5 pb-5">
          <div className="row gy-4">
            <div className="col-lg-6">
              <div className="d-flex mb-4">
                <div className="small-hr"></div>
                <div className="big-hr"></div>
              </div>
              <div className="service-item d-flex wow animate__animated animate__fadeInUp">
                <div className="icon mt-4">
                  <i className="fa-solid fa-handshake-simple"></i>
                </div>
                <div className="ms-5">
                  <h4 className="title">Community Connect</h4>
                  <p className="description">
                    Social Bharat's Community Connection feature facilitates
                    interaction and engagement among individuals from various
                    backgrounds, promoting a sense of unity and mutual
                    understanding between different communities.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-flex mb-4">
                <div className="small-hr"></div>
                <div className="big-hr"></div>
              </div>
              <div className="service-item d-flex wow animate__animated animate__fadeInUp">
                <div className="icon mt-4">
                  <i className="fa-solid fa-ring"></i>
                </div>
                <div className="ms-5">
                  <h4 className="title">Matrimonial</h4>
                  <p className="description">
                    Social Bharat's matrimonial feature simplifies the search
                    for a life partner by allowing users to create detailed
                    profiles, express their preferences, and find compatible
                    matches within a secure and private environment, making the
                    journey to finding a life partner efficient and
                    personalized.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-flex mb-4">
                <div className="small-hr"></div>
                <div className="big-hr"></div>
              </div>
              <div className="service-item d-flex wow animate__animated animate__fadeInUp">
                <div className="icon mt-4">
                  <i className="fa-sharp fa-solid fa-briefcase fa-2xl"></i>
                </div>
                <div className="ms-5">
                  <h4 className="title">Business Promotion</h4>
                  <p className="description">
                    Social Bharat provides a powerful platform for businesses to
                    connect with their target audience, enhance their online
                    presence, and effectively promote their products and
                    services, ensuring increased visibility and growth
                    opportunities in the digital landscape.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className=" d-flex mb-4">
                <div className="small-hr"></div>
                <div className="big-hr"></div>
              </div>
              <div className="service-item d-flex wow animate__animated animate__fadeInUp">
                <div className="icon mt-4">
                  <i className="fa-solid fa-list"></i>
                </div>
                <div className="ms-5">
                  <h4 className="title">Job Posting</h4>
                  <p className="description">
                    Social Bharat's job posting feature enables employers to
                    effortlessly connect with potential candidates, facilitating
                    seamless recruitment. It streamlines the hiring process,
                    making it efficient for businesses to find the right talent
                    and for job seekers to discover promising opportunities
                    within our platform.
                  </p>
                </div>
              </div>
              <div className="d-lg-none d-flex  mb-4 ">
                <div className="small-hr"></div>
                <div className="big-hr"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
