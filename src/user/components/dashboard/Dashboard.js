import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div id="dashboard">
      <div className="container pt-5 mb-5">
        <div className="row">

        <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card shadow bg-peal text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Profile</div>
                    <div className="text-lg fw-bold">Manage Profile <br/>प्रोफ़ाइल प्रबंधित करें </div>
                  </div>
                  <img src="/user/images/activities.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a
                  className="text-white hover-pointer"
                  onClick={() => navigate("/profile")}
                >
                  View{" "}
                </a>
                <a
                  className="text-white hover-pointer"
                  onClick={() => navigate("/user/update-basic-profile")}
                >
                  Edit{" "}
                </a>
                
              </div>
            </div>
          </div>

        <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card bg-lightgreen text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Become Social</div>
                    <div className="text-lg fw-bold">Find People <br />लोग खोजें</div>
                  </div>
                  <img src="/user/images/searchPeople.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small " >
                <a
                  className="text-white hover-pointer stretched-link" 
                  onClick={() => navigate("/user/search")}
                >
                  Search{" "}
                </a>
                <i className="fa-solid fa-arrow-right "></i>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card bg-lightorange text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Matrimonial</div>
                    <div className="text-lg fw-bold">Search Life Partner <br/>जीवन साथी खोजें</div>
                  </div>
                  <img src="/user/images/wedding.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a
                  className="text-white hover-pointer stretched-link"
                  onClick={() => navigate("/user/search/partner")}
                >
                  Search
                </a>
                
                <i className="fa-solid fa-arrow-right"></i>
                
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card bg-classicbrown text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Business</div>
                    <div className="text-lg fw-bold">Promote Business  <br/> व्यवसाय खोजें</div>
                  </div>
                  <img src="/user/images/financial-profit.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a
                  className="text-white hover-pointer"
                  onClick={() => navigate("/user/search/business")}
                >
                  Search{" "}
                </a>
                <a
                  className="text-white hover-pointer"
                  onClick={() => navigate("/user/businesses/view")}
                >
                  Post Your Ad{" "}
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card shadow bg-soil text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Event</div>
                    <div className="text-lg fw-bold">Manage Event(s) <br/>कार्यक्रम जोड़ें  </div>
                  </div>
                  <img src="/user/images/placard.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                
              <a
                className="text-white hover-pointer"
                onClick={() => navigate("/events/search")}
              >
             Search Events{" "}
             </a>

                <a
                  className="text-white hover-pointer"
                  onClick={() => navigate("/event")}
                >
                 Create Event{" "}
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card shadow bg-darkyellow text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Job Hiring</div>
                    <div className="text-lg fw-bold">Manage Jobs <br/>कार्य जोड़ें</div>
                  </div>
                  <img src="/user/images/job-offer.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a
                  className="text-white hover-pointer"
                  onClick={() => navigate("/user/jobs/view")}
                >
                  Search Jobs
                </a>
                <a
                  className="text-white hover-pointer"
                  onClick={() => navigate("/user/update-job-profile")}
                >
                  Post New Job
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
