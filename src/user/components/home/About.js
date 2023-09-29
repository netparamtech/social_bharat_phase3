import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate('/');
  }

  return (
    <>
      <div id="banners-section" className="bg-white">
        <div className="container">
          <div className="about-img navbar-scroll "></div>
        </div>
      </div>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container pt-2">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="" onClick={handleHomeClick}>Home</a></li>
            
            <li class="breadcrumb-item active" aria-current="page">About</li>
          </ol>
        </nav>
      </div>
    </nav>

      <div className="accordion container mt-3" id="accordionExample">
        <div className="accordion-item mb-3 form-control">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Social Bharat
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show "
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Everyone dreams about the best place to live in. It is our planet
              inhabited by many people. Just think for a minute of the current
              world population – 7+ billions of people. There must be those who
              are in need of help, be it financial, moral or medical. For that
              reason, there is a community <strong>Social Bharat</strong> which
              you can join to help others. Many centers rely entirely on
              voluntary help. <code></code>
            </div>
          </div>
        </div>
        <div className="accordion-item mb-3">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Matrimonial
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong></strong> Social Bharat's matrimonial feature simplifies
              the search for a life partner by allowing users to create detailed
              profiles, express their preferences, and find compatible matches
              within a secure and private environment, making the journey to
              finding a life partner efficient and personalized. <code></code>
            </div>
          </div>
        </div>
        <div className="accordion-item mb-3">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Job
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong></strong> Search Job <code></code>.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Event
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong></strong> Event Organizer
              <code></code>
            </div>
          </div>
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
