import { useNavigate } from "react-router-dom";
import FeedbackModel from "../home/FeedbackModel";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const user = useSelector((state) => state.userAuth);
  const isFeedback = useSelector((state) => state.loader.isShowSet);
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isFeedback)
    if (user) {
      if (user.user.count % 5 === 0 && user.user.count !== 0) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    } else {
      setIsShow(false);
    }
  }, [user])

  return (

    <div id="dashboard">

      {isShow && isFeedback && <FeedbackModel />}
      <div className="container pt-5 mb-5">
        <div className="text-light mb-2 fw-bold fs-6">
          <marquee className="marquee-dashboard">"Building Bridges, Creating Bonds: Social Bharat is your gateway to community connections,
            meaningful relationships, and professional growth. Discover a platform where community thrives,
            love blossoms, careers take flight, and services unite. Explore Matrimonial Bliss, Career Opportunities,
            Business Networking, and more. Join us on the journey of empowerment and shared prosperity.
            Your community, your connection, your Social Bharat. #CommunityConnections #Matrimony #JobSearch #ServiceSearch #SocialBharat 🌐💑👔🛠️"
          </marquee>
        </div>
        <div className="row">
          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card shadow bg-peal text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Profile</div>
                    <div className="text-lg ">
                      Manage Profile <br />
                      प्रोफ़ाइल प्रबंधित करें{" "}
                    </div>
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
                    <div className="text-lg ">
                      Find People <br />
                      लोग खोजें
                    </div>
                  </div>
                  <img src="/user/images/searchPeople.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small ">
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
                    <div className="text-lg ">
                      Search Life Partner <br />
                      जीवन साथी खोजें
                    </div>
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
                    <div className="text-lg">
                      Promote Business <br /> व्यवसाय खोजें
                    </div>
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
                    <div className="text-lg ">
                      Manage Event(s) <br />
                      कार्यक्रम जोड़ें{" "}
                    </div>
                  </div>
                  <img src="/user/images/placard.png" width="40px" />
                </div>
              </div>

              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a
                  className="text-white hover-pointer"
                  onClick={() => navigate("/user/search/events")}
                >
                  Search{" "}
                </a>
                <a
                  className="text-white hover-pointer"
                  onClick={() => navigate("/event")}
                >
                  Post Job{" "}
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
                    <div className="text-lg ">
                      Manage Jobs <br />
                      कार्य जोड़ें
                    </div>
                  </div>
                  <img src="/user/images/job-offer.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a
                  className="text-white hover-pointer stretched-link"
                  onClick={() => navigate("/user/update-job-profile")}
                >
                  Post Your New Job
                </a>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card bg-classicpink text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Services</div>
                    <div className="text-lg ">
                      Search Services <br /> सेवाएँ खोजें
                    </div>
                  </div>
                  <img src="/user/images/service3.jpg" width="40px" />
                </div>
              </div>

              <div className="card-footer d-flex align-items-center justify-content-between small ">
                <a
                  className="text-white hover-pointer stretched-link"
                  onClick={() => navigate("/user/search/service")}
                >
                  Search{" "}
                </a>
                <i className="fa-solid fa-arrow-right "></i>
              </div>

            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card bg-secondary text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Jobs</div>
                    <div className="text-lg">
                      Search Jobs <br /> नौकरी खोजें
                    </div>
                  </div>
                  <img src="/user/images/jobs.jpg" width="40px" />
                </div>
              </div>

              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a
                  className="text-white hover-pointer"
                  onClick={() => navigate("/user/search/jobs")}
                >
                  Search{" "}
                </a>
                <a
                  className="text-white hover-pointer"
                  onClick={() => navigate("/user/job/create")}
                >
                  Post Job{" "}
                </a>
              </div>

            </div>
          </div>


          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card shadow bg-navyblue  text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Share Your Feedback</div>
                    <div className="text-lg ">
                      Feedback <br />
                      फ़ीड बैक
                    </div>
                  </div>
                  <img src="/user/images/fe.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">
                <a
                  className="text-white hover-pointer stretched-link"
                  onClick={() => navigate("/user/rating")}
                >
                  Give Feedback
                </a>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Dashboard;
