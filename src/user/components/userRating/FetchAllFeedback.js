import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOldTestimonials } from "../../services/userService";
import { Card, Row, Col } from "antd"; // Importing Card, Row, and Col components from Ant Design

const FetchAllFeedback = () => {
  const [data, setData] = useState([]);
  const [rating, setRating] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetchOldTestimonials();

      setData(response.data.data);
      setRating(response.data.data.rating);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        navigate("/login");
      }
    }
  };

  const generateRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i} className="fas fa-star text-warning me-2"></span>
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const calculateTimeDifference = (updatedDate) => {
    const currentDate = new Date();
    const updatedDateObj = new Date(updatedDate);
    const differenceInSeconds = Math.floor(
      (currentDate - updatedDateObj) / 1000
    );

    if (differenceInSeconds < 1) {
      return "now";
    } else if (differenceInSeconds < 60) {
      return `${differenceInSeconds} sec ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} min ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hour ago`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      if (!days) {
        return "";
      }
      return `${days} day ago`;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="rating-Comments">
      <section>
        <div className="container my-3 py-5 text-dark">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-6">
              {data &&
                data.map((item, index) => (
                  <div className="card mb-3" key={index}>
                    <div className="card-body">
                      <div className="d-flex flex-start">
                        {item && item.photo ? (
                          <img
                            className="rounded-circle shadow-1-strong me-3"
                            src={item.photo && item.photo}
                            alt="avatar"
                            width="40"
                            height="40"
                          />
                        ) : (
                          <button
                            type="button"
                            className="dropdown-user-img-letter m-2"
                          >
                            {item.name.charAt(0).toUpperCase()}
                          </button>
                        )}
                        <div className="w-100">
                          <div className="d-flex justify-content-between align-items-center ">
                            <h6 className="text-primary mb-0">
                              <span className="fw-bold">
                                {item.name && item.name}
                              </span>
                              <p className="text-dark ">
                                {item.message && item.message}
                              </p>
                            </h6>
                          </div>
                          <p className="link-grey">
                            {calculateTimeDifference(item.updated_at)}
                          </p>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="small mb-0" style={{ color: "#aaa" }}>
                              <a href="" className="link-grey me-2">
                                Remove
                              </a>{" "}
                              <a href="" className="link-grey me-2">
                                Reply
                              </a>{" "}
                              <a href="" className="link-grey">
                                Edit
                              </a>
                            </p>
                            <div className="d-flex flex-row">
                              {generateRatingStars(item.rating)}
                              <i
                                className="far fa-check-circle"
                                style={{ color: "#aaa" }}
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FetchAllFeedback;
