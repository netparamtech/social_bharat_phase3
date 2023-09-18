import React from "react";

const Services = () => {
  return (
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
                  Social Bharat's matrimonial feature simplifies the search for
                  a life partner by allowing users to create detailed profiles,
                  express their preferences, and find compatible matches within
                  a secure and private environment, making the journey to
                  finding a life partner efficient and personalized.
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
                  presence, and effectively promote their products and services,
                  ensuring increased visibility and growth opportunities in the
                  digital landscape.
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
                Social Bharat's job posting feature enables employers to effortlessly connect with potential candidates, facilitating seamless recruitment. It streamlines the hiring process, making it efficient for businesses to find the right talent and for job seekers to discover promising opportunities within our platform.

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
  );
};

export default Services;
