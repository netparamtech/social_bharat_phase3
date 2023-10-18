import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchAllSiteSettings } from "../../services/userService";
import { useSelector } from "react-redux";

const Footer = () => {
  const [data, setData] = useState({});
  const [serverError, setServerError] = useState("");

  const user = useSelector((state) => state.userAuth);
  const isAuthenticUser = user && user.isAuthenticated;
  const isPasswordSet = user && user.user && user.user.is_password_set;

  const navigate = useNavigate();

  const handleHomeClick = () => {
    if (isAuthenticUser) {
      isPasswordSet ? navigate("/dashboard") : navigate("/set-password");
    } else {
      navigate("/");
    }
  };

  const handleEventClick = () => {
    if (isAuthenticUser) {
      isPasswordSet ? navigate("/event") : navigate("/set-password");
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

  const handlePartnerClick = () => {
    if (isAuthenticUser) {
      isPasswordSet
        ? navigate("/user/search/partner")
        : navigate("/set-password");
    } else {
      navigate("/login");
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetchAllSiteSettings();
      setData(response.data.data);
      console.log(response.data.data.social_twitter_link);
      setServerError("");
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <footer
      id="footer"
      className=" text-start lh-lg wow animate_animated animate_fadeInUp"
    >
      <div className="container ">
        <div className="row pt-4 pb-3  ">
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
            <h3>Social Bharat</h3>
            <p className="ms-2">
              The platform prioritizes privacy, ensuring that personal
              information remains protected from strangers.
            </p>
            <div className=" social-links  ms-2">
              <a
                href={data.social_twitter_link}
                className="twitter"
                target="_blank"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a
                href={data.social_facebook_link}
                className="facebook"
                target="_blank"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href={data.social_insta_link}
                className="instagram"
                target="_blank"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href={data.social_linkedin_link}
                className="linkedin"
                target="_blank"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href={data.social_youtube_link}
                className="youtube"
                target="_blank"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 useful-links mb-md-5  ps-sm-0 ps-xs-0 ps-lg-5 ps-md-5">
            <h4>Useful Links</h4>
            <ul className="list-inline ms-2">
              <li className="green-ever-hover">
                {" "}
                <a
                  className="text-decoration-none gray-color hover-pointer"
                  onClick={handleHomeClick}
                >
                  <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                  Home
                </a>{" "}
              </li>
              <li className="green-ever-hover">
                <a
                  className="text-decoration-none gray-color hover-pointer"
                  onClick={handleEventClick}
                >
                  <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                  Events
                </a>
              </li>
              <li className="green-ever-hover">
                <a
                  className="text-decoration-none gray-color hover-pointer"
                  onClick={handleSearchClick}
                >
                  <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                  Search
                </a>
              </li>
              <li className="green-ever-hover">
                <a
                  className="text-decoration-none gray-color hover-pointer"
                  onClick={handleContactClick}
                >
                  <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                  Contact
                </a>
              </li>
              <li className="green-ever-hover">
                <a
                  className="text-decoration-none gray-color hover-pointer"
                  onClick={() => navigate("/user/rating")}
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
              <li>
                {" "}
                <a
                  className="text-decoration-none gray-color hover-pointer"
                  onClick={handleSearchClick}
                >
                  <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                  Search People
                </a>{" "}
              </li>
              <li>
                {" "}
                <a
                  className="text-decoration-none gray-color hover-pointer"
                  onClick={handleBusinessClick}
                >
                  <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                  Business Promotion
                </a>{" "}
              </li>
              <li>
                {" "}
                <a
                  className="text-decoration-none gray-color hover-pointer"
                  onClick={handlePartnerClick}
                >
                  <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                  Find Life Partner
                </a>
              </li>
              <li>
                {" "}
                <a
                  className="text-decoration-none gray-color hover-pointer"
                  onClick={handleEventClick}
                >
                  <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                  Create Event/Search
                </a>
              </li>
              <li>
                {" "}
                <a
                  className="text-decoration-none gray-color hover-pointer"
                  onClick={() => navigate("/register")}
                >
                  <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                  Connect To Cmmunity
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12  ">
            <h3>Contact Us</h3>
            <p className="ms-2">
              {data.address}
              <br />
              <strong>phone: </strong> +91-{data.phone1}
              <br />
              <strong>phone: </strong> +91-{data.phone2}
              <br />
              <strong>Email: </strong> {data.email1} <br />
              <div className="ms-5">
                {data && data.email2 ? `${data.email2}` : ""}
              </div>
            </p>
          </div>
        </div>
      </div>
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
