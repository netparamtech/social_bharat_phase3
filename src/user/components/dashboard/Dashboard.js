import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllActiveCommunities } from "../../services/userService";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import Slider from "react-slick";

const Dashboard = () => {
  const [casts, setCasts] = useState([]);
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImageClick = (communityName) => {
    navigate(`/${communityName}`);
  }
  const fetchCommunities = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllActiveCommunities();
      if (response && response.status === 200) {
        const filteredFetch = response.data.data.filter((item)=>item && item.community_archive!=='');
        setCasts(filteredFetch);
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        navigate("/login");
      }
    }
  };
  const settings = {
    slidesToShow: !isAndroidUsed ? 12 : 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 1500,
  };
  useEffect(() => {
    const handleResize = () => {
      setIsAndroidUsed(window.innerWidth < 1000); // Adjust the threshold based on your design considerations
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set the correct value

    // Cleanup the event listener when component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    fetchCommunities();
  }, []);
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
                    <div className="text-lg fw-bold">
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
                    <div className="text-lg fw-bold">
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
                    <div className="text-lg fw-bold">
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
                    <div className="text-lg fw-bold">
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
                    <div className="text-lg fw-bold">
                      Manage Event(s) <br />
                      कार्यक्रम जोड़ें{" "}
                    </div>
                  </div>
                  <img src="/user/images/placard.png" width="40px" />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between small">

                <a
                  className="text-white hover-pointer stretched-link"
                  onClick={() => navigate("/event")}
                >
                  Create Event{" "}
                </a>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card shadow bg-darkyellow text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Job Hiring</div>
                    <div className="text-lg fw-bold">
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
                  Post New Job
                </a>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3 mb-4">
            <div className="card shadow bg-navyblue  text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-3">
                    <div className="text-white-75 small">Share Your Feedback</div>
                    <div className="text-lg fw-bold">
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

          <section id="partner">
            <div className="container">
              <div className="row costomer-logos">
                <div className="card shadow bg-warning  text-white h-100">
                  <Slider {...settings}>
                    {casts && casts.length > 0 &&
                      casts.map(
                        (community) =>
                          community.thumbnail_image && (
                            <div className="icon-box d-inline-flex" key={community.id}>
                              <a className="hover-pointer">
                                <img
                                  src={community.thumbnail_image}
                                  alt={community.name}
                                  onClick={() => handleImageClick(community.name)}
                                />
                              </a>
                            </div>
                          )
                      )}
                  </Slider>
                </div>
              </div>
            </div>
          </section>


        </div>
      </div>
    </div >
  );
};

export default Dashboard;
