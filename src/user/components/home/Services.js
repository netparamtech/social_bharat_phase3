import '../../css/bootstrap.min.css';
import '../../css/style.css';
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Services = (props) => {
  const { servicesCMS } = props;
  return (
    <div id="services">
      <h1 className="fs-2 lh-base text-center pt-5">{servicesCMS && servicesCMS.section_title}</h1>
      <div className="container mt-5 pb-5">
        <div className="row gy-4">
          {
            servicesCMS && servicesCMS.items && servicesCMS.items.map((item, index) => (
              <div className="col-lg-6" key={index}>
                <div className="d-flex mb-4">
                  <div className="small-hr"></div>
                  <div className="big-hr"></div>
                </div>

                <div className="service-item d-flex wow animate__animated animate__fadeInUp">
                  <div className="icon mt-4">
                    <i className={item.icon}></i>
                  </div>
                  <div className="ms-5">
                    <h4 className="title">{item.title}</h4>
                    <p className="description" 
                     dangerouslySetInnerHTML={{
                      __html:item.content,
                    }}
                    />
                  </div>
                </div>
              </div>
            ))
          }



        </div>
        


      </div>
    </div>
    
  );
};

export default Services;
