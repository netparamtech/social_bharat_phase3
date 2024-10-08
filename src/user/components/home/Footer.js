import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchAllSiteSettings } from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../actions/loaderAction";

const Footer = (props) => {
  const { data } = props;
  const [serverError, setServerError] = useState("");

  const user = useSelector((state) => state.userAuth);
  const isAuthenticUser = user && user.isAuthenticated;
  const isPasswordSet = user && user.user && user.user.is_password_set;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    if (isAuthenticUser) {
      isPasswordSet ? navigate("/") : navigate("/set-password");
    } else {
      navigate("/");
    }
  };

  const handleEventClick = () => {
    if (isAuthenticUser) {
      isPasswordSet ? navigate("/user/search/events") : navigate("/set-password");
    } else {
      navigate("/login");
    }
  };

  const handleSearchClick = () => {
    if (isAuthenticUser) {
      isPasswordSet ? navigate("/user/search") : navigate("/set-password");
    } else {
      navigate("/login");
    }
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleBusinessClick = () => {
    if (isAuthenticUser) {
      isPasswordSet
        ? navigate("/user/search/business")
        : navigate("/set-password");
    } else {
      navigate("/login");
    }
  };

  const handleCommunityConnect = () => {
    if (isAuthenticUser) {
      window.scrollTo(0, 0);
      isPasswordSet
        ? navigate("/dashboard")
        : navigate("/set-password");
    } else {
      window.scrollTo(0, 0);
      navigate("/register");

    }
  }

  const handlePartnerClick = () => {
    if (isAuthenticUser) {
      isPasswordSet
        ? navigate("/user/search/partner")
        : navigate("/set-password");
    } else {
      navigate("/login");
    }
  };

  const handleFeedbackClick = (e) => {
    e.preventDefault();
    isAuthenticUser ? navigate('/user/rating') : navigate('/login');
  }


  return (
    <footer
      id="footer"
      className=" text-start lh-lg wow animate_animated animate_fadeInUp"
    >
      {
        ((window.location.pathname !== "/user/search/job")&&(window.location.pathname!=="/users/activities"))&& (
          <div className="container ">
            <div className="row pt-4 pb-3  wow animate__animated animate__zoomIn">
              <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                <h3>Social Bharat</h3>
                <div className="ms-2">
                  The platform prioritizes privacy, ensuring that personal
                  information remains protected from strangers.
                </div>
                <div className=" social-links  ms-2">
                  <a
                    // href={data && data.social_twitter_link && data.social_twitter_link}
                    onClick={() => navigate('/page-not-exist/404')}
                    className="twitter"
                    target="_blank"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a
                    // href={data && data.social_facebook_link && data.social_facebook_link}
                    onClick={() => navigate('/page-not-exist/404')}
                    className="facebook"
                    target="_blank"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a
                    // href={data && data.social_insta_link && data.social_insta_link}
                    onClick={() => navigate('/page-not-exist/404')}
                    className="instagram"
                    target="_blank"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a
                    // href={data && data.social_linkedin_link && data.social_linkedin_link}
                    onClick={() => navigate('/page-not-exist/404')}
                    className="linkedin"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a
                    // href={data && data.social_youtube_link && data.social_youtube_link}
                    onClick={() => navigate('/page-not-exist/404')}
                    className="youtube"
                    target="_blank"
                  >
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12 mb-md-5  ps-sm-0 ps-xs-0 ps-lg-5 ps-md-5">
                <h4>Useful Links</h4>
                <ul className="list-inline ms-2">
                  <li className="green-ever-hover useful-links ">
                    {" "}
                    <a
                      className="text-decoration-none gray-color hover-pointer"
                      onClick={handleHomeClick}
                    >
                      <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                      Home
                    </a>{" "}
                  </li>
                  <li className="green-ever-hover useful-links">
                    <a
                      className="text-decoration-none gray-color hover-pointer"
                      onClick={handleEventClick}
                    >
                      <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                      Events
                    </a>
                  </li>
                  <li className="green-ever-hover useful-links">
                    <a
                      className="text-decoration-none gray-color hover-pointer"
                      onClick={handleSearchClick}
                    >
                      <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                      Search
                    </a>
                  </li>
                  <li className="green-ever-hover useful-links">
                    <a
                      className="text-decoration-none gray-color hover-pointer"
                      onClick={handleContactClick}
                    >
                      <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                      Contact
                    </a>
                  </li>
                  <li className="green-ever-hover useful-links">
                    <a
                      className="text-decoration-none gray-color hover-pointer"
                      onClick={handleFeedbackClick}
                    >
                      <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                      Feedback
                    </a>
                  </li>
                </ul>
              </div>

              <div className="our-services  col-lg-3 col-md-6 col-sm-12  mb-md-5  ps-lg-5">
                <h4>Our Services</h4>
                <ul className="list-inline  ms-2">
                  <li className="green-ever-hover useful-links">
                    {" "}
                    <a
                      className="text-decoration-none gray-color hover-pointer"
                      onClick={handleSearchClick}
                    >
                      <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                      Search People/Chat
                    </a>{" "}
                  </li>
                  <li className="green-ever-hover useful-links">
                    {" "}
                    <a
                      className="text-decoration-none gray-color hover-pointer"
                      onClick={handleBusinessClick}
                    >
                      <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                      Business Promotion
                    </a>{" "}
                  </li>
                  <li className="green-ever-hover useful-links">
                    {" "}
                    <a
                      className="text-decoration-none gray-color hover-pointer"
                      onClick={handlePartnerClick}
                    >
                      <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                      Find Life Partner/Chat
                    </a>
                  </li>
                  <li className="green-ever-hover useful-links">
                    {" "}
                    <a
                      className="text-decoration-none gray-color hover-pointer"
                      onClick={handleEventClick}
                    >
                      <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                      Create Event/Search
                    </a>
                  </li>
                  <li className="green-ever-hover useful-links">
                    {" "}
                    <a
                      className="text-decoration-none gray-color hover-pointer"
                      onClick={handleCommunityConnect}
                    >
                      <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                      Connect To Community
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12  ">
                <h3 className="hover-pointer hover-pointer-green" onClick={() => navigate('/contact')}>Contact Us</h3>
                <div className="ms-2">
                  {data && data.address}
                  <br />
                  <div className="row">
                    <div className="col-1">
                      {data && data.phone1 && (<a className="text-dark text-line-none box-custom" href={`tel:${data && data.phone1}`}>
                        <i className="fa-solid fa-phone-volume text-primary "></i>
                      </a>)}

                    </div>
                    {
                      data && data.phone1 && (
                        <div className="col-10">
                          <a className="text-dark text-line-none" href={`tel:${data && data.phone1}`}>
                            +91-{data && data.phone1}
                          </a>
                        </div>
                      )
                    }
                  </div>
                  <div className="row">
                    <div className="col-1">
                      {data && data.phone2 && (<a className="text-dark text-line-none" href={`tel:${data && data.phone2}`}>
                        <i className="fa-solid fa-phone-volume text-primary"></i>
                      </a>)}

                    </div>
                    {
                      data && data.phone2 && (
                        <div className="col-10">
                          +91-{data && data.phone2}
                        </div>
                      )
                    }
                  </div>

                  <div className="row">
                    <div className="col-1">
                      {data && data.email1 && (
                        <a className="text-dark text-line-none box-custom" href={`mailto:${data && data.email1}`}> <i className="fa-solid fa-envelope text-primary"></i></a>
                      )}

                    </div>
                    <div className="col-10">
                      <a className="text-dark text-line-none" href={`mailto:${data && data.email1}`}> {data && data.email1}</a>

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-1">
                      {
                        data && data.email2 && (
                          <a className="text-dark text-line-none" href={`mailto:${data && data.email2}`}> <i className="fa-solid fa-envelope text-primary"></i></a>
                        )
                      }
                    </div>
                    <div className="col-10">
                      <a className="text-dark text-line-none" href={`mailto:${data && data.email2}`}>  {data && data.email2 && (
                        data.email2
                      )}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      <div id="footer-end">
        <div className="container">
          <div className="row">
            <div className="col text-center ">
              <div className="copyright ">
                © Copyright{" "}
                <strong>
                  <span>Social Bharat</span>
                </strong>
                . All Rights Reserved
              </div>
              <div className="credits">
                Designed by{" "}
                <a
                  href="https://netparam.in/"
                  target="_blank"
                  className="text-decoration-none text-primary"
                >
                  NetParam
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
