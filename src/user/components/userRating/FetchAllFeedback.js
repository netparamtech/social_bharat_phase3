import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOldTestimonials } from '../../services/userService';
import { Card, Row, Col } from 'antd'; // Importing Card, Row, and Col components from Ant Design

const FetchAllFeedback = () => {
  const [data, setData] = useState([]);
  const [rating, setRating] = useState('');
  const [loggedUserFirstLatter, setLoggedUserFirstLatter] = useState('');
  const navigate = useNavigate();
  const [defaultImage, setDefaultImage] = useState('https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg');

  const fetchData = async () => {
    try {
      const response = await fetchOldTestimonials();

      console.log(response.data.data)

      setData(response.data.data);
      setRating(response.data.data.rating);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else if (error.response && error.response.status === 500) {
        navigate('/login');
      }
    }
  };

  const generateRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i} className="fas fa-star text-warning me-2"></span>);
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const calculateTimeDifference = (updatedDate) => {
    const currentDate = new Date();
    const updatedDateObj = new Date(updatedDate);
    const differenceInSeconds = Math.floor((currentDate - updatedDateObj) / 1000);

    if (differenceInSeconds < 1) {
      return 'now';
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
        return '';
      }
      return `${days} day ago`;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="rating-authpage">
      <section>
        <div className="container my-5 py-5 text-dark">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-6">
              {
                data && data.map((item, index) => (
                  <div className="card mb-3" key={index}>
                    <div className="card-body">
                      <div class="d-flex flex-start">
                       {
                        item&&item.photo?(
                          <img
                          class="rounded-circle shadow-1-strong me-3"
                          src={item.photo&&item.photo}
                          alt="avatar"
                          width="40"
                          height="40"
                        />
                        ):
                        (
                          <button type='button' className='dropdown-user-img-letter m-2'>{item.name.charAt(0).toUpperCase()}</button>
                        )
                       }
                        <div class="w-100">
                          <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="text-primary fw-bold mb-0">
                              {item.name && item.name}
                              <p class="text-dark ">
                                {item.message && item.message}
                              </p>
                            </h6>
                          </div>
                          <p>{calculateTimeDifference(item.updated_at)}</p>
                          <div class="d-flex justify-content-between align-items-center">
                            <p class="small mb-0" style={{ color: "#aaa" }}>
                              <a href="#!" class="link-grey">
                                Remove
                              </a>{" "}
                              •
                              <a href="#!" class="link-grey">
                                Reply
                              </a>{" "}
                              •
                              <a href="#!" class="link-grey">
                                Translate
                              </a>
                            </p>
                            <div class="d-flex flex-row">
                              {generateRatingStars(item.rating)}
                              <i
                                class="far fa-check-circle"
                                style={{ color: "#aaa" }}
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                ))
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FetchAllFeedback;
