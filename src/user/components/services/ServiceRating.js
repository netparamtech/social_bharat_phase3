import React, { useEffect, useState } from "react";
import { fetchOldTestimonials, userFeedback } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ServiceRating = (props) => {
    const { handleFeedbackFlag } = props;
    const user = useSelector((state) => state.userAuth);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");

    const [errors, setErrors] = useState("");
    const [message, setMessage] = useState("");
    const [alertClass, setAlertClass] = useState("");

    const [userProfile, setUserProfile] = useState("");
    const [fetchUserRating, setFetchUserRating] = useState(true);

    const defaultPhoto = "/user/images/OIP.jpg";

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

    const toggleFetchRating = () => {
        setFetchUserRating(!fetchUserRating);
    }

    useEffect(() => {
        if (message) {
            setComment("");
        }
    }, [message]);

    useEffect(() => {
        if (window.location.pathname === '/dashboard') {
            setFetchUserRating(false);
        }
    }, []);

    useEffect(() => {
        if (user && user.user) {
            const { photo } = user.user;
            setUserProfile(photo || defaultPhoto);
        }
    }, [user]);

    return (
        <div>
            <span onClick={() => handleFeedbackFlag(false)} className="position-absolute top-0 end-0 mt-2 me-2">
                <button className="hover-pointer-red round-button-delete"><i className="fa fa-remove"></i></button>
            </span>
            <form onSubmit={handleSubmit}>
                {message && (
                    <div className={`alert ${alertClass}`}>
                        {alertClass === "alert-success" ? (
                            <i className="fas fa-check-circle"></i>
                        ) : (
                            <i className="fas fa-exclamation-triangle"></i>
                        )}
                        {" " + message}
                    </div>
                )}
                <div className="d-flex flex-start w-100">
                    <img
                        className="rounded-circle shadow-1-strong me-3"
                        src={userProfile ? userProfile : defaultPhoto}
                        alt="avatar"
                        width="65"
                        height="65"
                    />
                    <div className="w-100">
                        <h5>Add a comment</h5>
                        <div className="rating mb-3">
                            <input
                                value="5"
                                name="rating"
                                id="star5"
                                type="radio"
                                onChange={handleRatingChange}
                            />
                            <label htmlFor="star5"></label>
                            <input
                                value="4"
                                name="rating"
                                id="star4"
                                type="radio"
                                onChange={handleRatingChange}
                            />
                            <label htmlFor="star4"></label>
                            <input
                                value="3"
                                name="rating"
                                id="star3"
                                type="radio"
                                onChange={handleRatingChange}
                            />
                            <label htmlFor="star3"></label>
                            <input
                                value="2"
                                name="rating"
                                id="star2"
                                type="radio"
                                onChange={handleRatingChange}
                            />
                            <label htmlFor="star2"></label>
                            <input
                                value="1"
                                name="rating"
                                id="star1"
                                type="radio"
                                onChange={handleRatingChange}
                            />
                            <label htmlFor="star1"></label>
                        </div>
                        <div className="form-outline">
                            <textarea
                                className="form-control"
                                placeholder="What is your view?"
                                id="textAreaExample"
                                rows="4"
                                value={comment}
                                onChange={handleMessageChange}
                            ></textarea>
                            {errors.message && (
                                <span className="error">{errors.message}</span>
                            )}
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <button type="submit" className="btn btn-primary">
                                Send{" "}
                                <i className="fas fa-long-arrow-alt-right ms-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ServiceRating;
