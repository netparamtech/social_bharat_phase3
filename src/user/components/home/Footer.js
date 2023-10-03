import React from "react";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  return (
  
    <div id="footer">
      <div className="container text-start lh-lg wow animate__animated animate__fadeInUp">
        <div className="row pt-5 pb-3">
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
            <h3>Social Bharat</h3>
            <p className="ms-2">
              The platform prioritizes privacy, ensuring that personal
              information remains protected from strangers.
            </p>
            <div className="social-links ms-2">
              <a href="" className="twitter">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="" className="facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="" className="instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="" className="linkedin">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="" className="skype">
                <i className="fa-brands fa-skype "></i>
              </a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 useful-links mb-md-5 ps-sm-0 ps-xs-0 ps-lg-5 ps-md-5">
            <h4>Useful Links</h4>
            <ul className="list-inline ms-2">
              <li>
                {" "}
                <a
                  className="text-decoration-none gray-color"
                  onClick={() => navigate("/")}
                >
                  <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a className="text-decoration-none gray-color">
                  <i className="fa-solid fa-chevron-right text-primary  me-2"></i>
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#why-social-section"
                  className="text-decoration-none gray-color"
                >
                  <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                  About
                </a>
              </li>
              <li>
                <a
                  className="text-decoration-none gray-color"
                  onClick={() => navigate("/contact")}
                >
                  <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="our-services col-lg-3 col-md-6 col-sm-12 mb-md-5 ps-lg-5">
            <h4>Our Services</h4>
            <ul className="list-inline ms-2">
              <li>
                {" "}
                <a href="" className="text-decoration-none gray-color">
                  <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                  Business Promotion
                </a>{" "}
              </li>
              <li>
                {" "}
                <a href="" className="text-decoration-none gray-color">
                  <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                  Find Life Partner
                </a>
              </li>
              <li>
                {" "}
                <a href="" className="text-decoration-none gray-color">
                  <i className="fa-solid fa-chevron-right text-primary me-2"></i>
                  Connect To Cmmunity
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12">
            <h3>Contact Us</h3>

            <p className="ms-2">
              747, Janpath,Rani sathi nagar,
              <br /> Nirman nagar, jaipur-302019
              <br />
              Rajasthan
              <br />
              <strong>phone:</strong>
                +91-96492-72709
              <br />
              <strong>phone:</strong>
                +91-76650-10205
              <br />
              <strong>Email:</strong>
              placement@netparam.in
            </p>
          </div>
        </div>
        
      </div>
      {/* Footer End */}
      <div id="footer-end">
      <div className="container wow animate__animated animate__fadeInUp">
        <div className="row pt-2 pb-2">
          <div className="col text-center">
            <div className="copyright">
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
                className="text-decoration-none text-primary"
              >
                NetParam
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
      {/* arrow */}
      {/* <button onClick={topFunction} id="scrollToTopBtn" title="Go to top">
                <i className="fa-solid fa-arrow-up-long justify-content-center"></i>
            </button> */}
    </div>
  );
};

export default Footer;
