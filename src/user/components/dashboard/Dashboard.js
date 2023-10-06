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
                  className="text-white "
                  onClick={() => navigate("/profile")}
                >
                  View{" "}
                </a>
                <a
                  className="text-white "
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
                    <div className="text-white-75 small">Connection</div>
                    <div className="text-lg fw-bold">Search People <br />लोग खोजें</div>
                  </div>
                  <img src="/user/images/searchPeople.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a
                  className="text-white "
                  onClick={() => navigate("/user/search")}
                >
                  View{" "}
                </a>
                <a
                  className="text-white "
                  onClick={() => navigate("/user/update-basic-profile")}
                >
                  Edit{" "}
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card bg-lightorange text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Matrimonial</div>
                    <div className="text-lg fw-bold">Search Partner <br/>शादी हेतु साथी खोजें</div>
                  </div>
                  <img src="/user/images/wedding.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a
                  className="text-white"
                  onClick={() => navigate("/user/search/partner")}
                >
                  View
                </a>
                <a
                  className="text-white "
                  onClick={() => navigate("/user/update-matrimonial-profile")}
                >
                  Edit{" "}
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card bg-classicbrown text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Making Money</div>
                    <div className="text-lg fw-bold">Search Business  <br/> व्यवसाय खोजें</div>
                  </div>
                  <img src="/user/images/financial-profit.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a
                  className="text-white"
                  onClick={() => navigate("/user/search/business")}
                >
                  View{" "}
                </a>
                <a
                  className="text-white "
                  onClick={() => navigate("/user/search")}
                >
                  Edit{" "}
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card bg-darkyellow text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Matrimonial</div>
                    <div className="text-lg fw-bold">
                      Create Matrimonial Profile < br/>वैवाहिक प्रोफ़ाइल बनाएं
                    </div>
                  </div>
                  <img src="/user/images/diamond-ring.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a
                  className="text-white"
                  onClick={() => navigate("/user/update-matrimonial-profile")}
                >
                  View{" "}
                </a>
                <a
                  className="text-white "
                  onClick={() => navigate("/user/search")}
                >
                  Edit{" "}
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card shadow bg-bluegray text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Events</div>
                    <div className="text-lg fw-bold">
                      Update Contact Information <br/>पता अपडेट करें
                    </div>
                  </div>
                  <img src="/user/images/contactUpdate.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a
                  className="text-white"
                  onClick={() => navigate("/user/update-contact")}
                >
                  View
                </a>
                <a
                  className="text-white "
                  onClick={() => navigate("/user/search")}
                >
                  Edit{" "}
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card shadow bg-lightvoilet text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Business</div>
                    <div className="text-lg fw-bold">Add Your Business<br/>बिजनेस जोडे </div>
                  </div>
                  <img src="/user/images/account.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a
                  className="text-white"
                  onClick={() => navigate("/user/update-business-profile")}
                >
                  View
                </a>
                <a
                  className="text-white "
                  onClick={() => navigate("/user/search")}
                >
                  Edit{" "}
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card shadow bg-classicblue text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Feedback</div>
                    <div className="text-lg fw-bold">Add Feedback <br/>प्रतिक्रिया जोड़ें</div>
                  </div>
                  <img src="/user/images/review.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a
                  className="text-white"
                  onClick={() => navigate("/user/rating")}
                >
                  View
                </a>
                <a
                  className="text-white "
                  onClick={() => navigate("/user/search")}
                >
                  Edit{" "}
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
                    <div className="text-lg fw-bold">Add Event <br/>कार्यक्रम जोड़ें</div>
                  </div>
                  <img src="/user/images/placard.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a
                  className="text-white "
                  onClick={() => navigate("/event")}
                >
                  View
                </a>
                <a
                  className="text-white "
                  onClick={() => navigate("/user/search")}
                >
                  Edit{" "}
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
