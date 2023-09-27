import React, { useEffect, useState } from "react";
import { fetchOldTestimonials, userFeedback } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const UserRating = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");

  const navigate = useNavigate();

  const handleMessageChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      message: comment,
      rating,
    };

    try {
      const response = await userFeedback(data);
      if (response && response.status === 200) {
        setErrors("");
        setMessage(response.data.message);
        setAlertClass("alert-success");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setMessage("");
        setAlertClass("alert-danger");
      } else if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (message) {
      setComment("");
    }
  }, [message]);

  return (
    <>
      <div id="rating-authpage">
        <section>
          <div className="container my-5 py-5 text-dark">
            <div className="row d-flex justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-6">
                <div className="card">
                  <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex flex-start w-100">
                        <img
                          className="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                          alt="avatar"
                          width="65"
                          height="65"
                        />
                        <div class="w-100">
                          <h5>Add a comment</h5>
                          <div class="rating mb-3">
                            <input
                              value="5"
                              name="rating"
                              id="star5"
                              type="radio"
                              onChange={handleRatingChange}
                            />
                            <label for="star5"></label>
                            <input
                              value="4"
                              name="rating"
                              id="star4"
                              type="radio"
                              onChange={handleRatingChange}
                            />
                            <label for="star4"></label>
                            <input
                              value="3"
                              name="rating"
                              id="star3"
                              type="radio"
                              onChange={handleRatingChange}
                            />
                            <label for="star3"></label>
                            <input
                              value="2"
                              name="rating"
                              id="star2"
                              type="radio"
                              onChange={handleRatingChange}
                            />
                            <label for="star2"></label>
                            <input
                              value="1"
                              name="rating"
                              id="star1"
                              type="radio"
                              onChange={handleRatingChange}
                            />
                            <label for="star1"></label>
                          </div>
                          <div className="form-outline">
                            <textarea
                              className="form-control"
                              placeholder="What is your view?"
                              id="textAreaExample"
                              rows="4"
                            ></textarea>
                          </div>
                          <div className="d-flex justify-content-between mt-3">
                            <button type="button" class="btn btn-primary">
                              Send{" "}
                              <i className="fas fa-long-arrow-alt-right ms-1"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container my-5 py-5 text-dark">
            <div className="row d-flex justify-content-center">
              <div className="col-md-12 col-lg-10 col-xl-8">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="text-dark mb-0">Comments </h4>
                  <div className="card">
                    <div className="card-body p-2 d-flex align-items-center">
                      <h6 className="text-primary fw-bold small mb-0 me-1">
                        Comments "ON"
                      </h6>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label
                          className="form-check-label"
                          for="flexSwitchCheckChecked"
                        ></label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div class="d-flex flex-start">
                      <img
                        class="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp"
                        alt="avatar"
                        width="40"
                        height="40"
                      />
                      <div class="w-100">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                          <h6 class="text-primary fw-bold mb-0">
                            Name
                            <p class="text-dark ms-2">
                              Comment nfasd ofj dfdsjoijf fjs a jfj sdaf sf s
                              fjsf dsfsd f f sdf sd f sd fsjf s fs f sd
                            </p>
                          </h6>
                        </div>
                        <p>2 day ago</p>
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
                            <i class="fas fa-star text-warning me-2"></i>
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

                <div class="card mb-3">
                  <div class="card-body">
                    <div class="d-flex flex-start">
                      <img
                        class="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                        alt="avatar"
                        width="40"
                        height="40"
                      />
                      <div class="w-100">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                          <h6 class="text-primary fw-bold mb-0">
                            the_sylvester_cat
                            <span class="text-dark ms-2">
                              Loving your work and profile!{" "}
                            </span>
                          </h6>
                          <p class="mb-0">3 days ago</p>
                        </div>
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
                            <i class="far fa-check-circle text-primary"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3">
                  <div class="card-body">
                    <div class="d-flex flex-start">
                      <img
                        class="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(20).webp"
                        alt="avatar"
                        width="40"
                        height="40"
                      />
                      <div class="w-100">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                          <h6 class="text-primary fw-bold mb-0">
                            mindyy_def
                            <span class="text-dark ms-2">
                              Really cool Which filter are you using?
                            </span>
                          </h6>
                          <p class="mb-0">3 days ago</p>
                        </div>
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
                            <i
                              class="fas fa-user-plus"
                              style={{ color: "#aaa" }}
                            ></i>
                            <i
                              class="far fa-star mx-2"
                              style={{ color: "#aaa" }}
                            ></i>
                            <i class="far fa-check-circle text-primary"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex flex-start">
                      <img
                        className="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(14).webp"
                        alt="avatar"
                        width="40"
                        height="40"
                      />
                      <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="text-primary fw-bold mb-0">
                            t_anya
                            <span className="text-dark ms-2">
                              <span class="text-primary">@macky_lones</span>
                              <span className="text-primary">
                                @rashida_jones
                              </span>{" "}
                              Thanks
                            </span>
                          </h6>
                          <p className="mb-0">4 days ago</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="small mb-0" style={{ color: "#aaa" }}>
                            <a href="#!" className="link-grey">
                              Remove
                            </a>{" "}
                            •
                            <a href="#!" className="link-grey">
                              Reply
                            </a>{" "}
                            •
                            <a href="#!" className="link-grey">
                              Translate
                            </a>
                          </p>
                          <div className="d-flex flex-row">
                            <i className="far fa-check-circle text-primary"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserRating;
