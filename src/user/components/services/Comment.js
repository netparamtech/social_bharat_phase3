import React, { useEffect, useState } from "react";
import { serviceRating } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Comment(props) {
    const { handleFeedbackFlag, data } = props;
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);
    const [serviceId, setServiceId] = useState('');

    const [errors, setErrors] = useState("");
    const [message, setMessage] = useState("");
    const [alertClass, setAlertClass] = useState("");

    const [userProfile, setUserProfile] = useState("");
    const [fetchUserRating, setFetchUserRating] = useState(true);
    const [serverError, setServerError] = useState("");
    const [commentClicked, setCommentClicked] = useState(false);

    const defaultPhoto = "/user/images/OIP.jpg";

    const navigate = useNavigate();

    const handleMessageChange = (e) => {
        setComment(e.target.value);
    };

    const handleStarClick = (index) => {
        setRating(index);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            comment,
            rating,
            service_id: serviceId,
        };

        try {
            const response = await serviceRating(data);
            if (response && response.status === 200) {
                setErrors("");
                toast.success('Successfully Saved Your Review');
                handleFeedbackFlag(false);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
                toast.error('Error to send your review');
            } else if (error.response && error.response.status === 401) {
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
                toast.info('Oops! Something went wrong on our server.');
                setServerError("Oops! Something went wrong on our server.");
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
        if (data) {
            const { photo, service_id } = data;
            setUserProfile(photo || defaultPhoto);
            setServiceId(service_id);
        }
    }, [data]);

    return (
        <div >
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card  border-secondary">
                        <div className="card-header form-control  d-flex bg-success justify-content-between align-items-center mb-0 p-5" style={{height:'70px'}}>
                            <span onClick={() => handleFeedbackFlag(false)} className="position-absolute top-0 end-0 mt-3 me-2">
                                <button className="hover-pointer-red round-button-delete-small"><i className="fa fa-remove"></i></button>
                            </span>
                        </div>
                        <div className="card-body">
                            <div className="text-center">
                                <img src={userProfile} alt="Profile snap" className="rounded-circle mb-3 border" style={{ width: "100px", height: "100px" }} />
                                <h2>Add a Comment</h2>
                                <div className="rating-stars mb-3 fs-1">
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <span
                                            key={index}
                                            className="star text-warning hover-pointer"
                                            onClick={() => handleStarClick(index)}>
                                            {index <= rating ? '★' : '☆'}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <textarea
                                className={`form-control mb-3 ${commentClicked ? 'comment-border' : ''}`}
                                placeholder="Enter your comment here"
                                rows={4}
                                value={comment}
                                onChange={handleMessageChange}
                            />
                            {errors.comment && (
                                <span className="error">{errors.comment}</span>
                            )}
                            <div className="d-flex justify-content-between mt-3">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                                Send{" "}
                                <i className="fas fa-long-arrow-alt-right ms-1"></i>
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
