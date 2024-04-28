import React, { useEffect, useState } from "react";
import { enquiry, fetchAllSiteSettings } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";
import { errorOptions, successOptions } from "../../../toastOption";

function ContactUsPage(props) {
    const { handleIsContactUs } = props;
    // State variables to store form input values
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [userQuery, setUserQuery] = useState("");

    const [settings, setSettings] = useState({});

    const [errors, setErrors] = useState("");
    const [message, setMessage] = useState("");
    const [alertClass, setAlertClass] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();


    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoader(true));
        const data = {
            name,
            email,
            mobile,
            message: userQuery,
        };

        try {
            const response = await enquiry(data);
            if (response && response.status === 200) {
                setErrors("");
                setMessage(response.data.message);
                setAlertClass("alert-success");
                toast.success("Enquiry successfully sent.", successOptions);
                setName('');
                setEmail('');
                setMobile('');
                setUserQuery('');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage("");
                setErrors(error.response.data.errors);
                setAlertClass("alert-danger");
                toast.error("Failed to send enquiry. Please try again later.", errorOptions);
            } else if (error.response && error.response.status === 401) {
                setMessage(error.response.data.message);
                setAlertClass("alert-danger");
            } else if (error.response && error.response.status === 500) {
                setMessage(error.response.data.message);
                setAlertClass("alert-danger");
            }
        } finally {
            dispatch(setLoader(false));
        }
    };


    return (
        <div className="card mx-auto" style={{ borderRadius: '30px', backgroundColor: '#12abf6' }}>
            <div
                className="mx-auto"
            >
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
                <h4 className="mb-4 ">Send message for enquiry</h4>
                <div>(All fields are required to fill.)</div>
                <span
                    onClick={()=>handleIsContactUs()}
                    className="position-absolute top-0 end-0 me-2 mt-3">
                    {/* <i class="fs-1 fw-bold hover-pointer hover-pointer-red remove-btn-custom fa fa-remove"></i> */}
                    <button className="hover-pointer-red round-button-delete"><i className="fa fa-remove"></i></button>
                </span>
                <div className="form-group mb-4">
                    <input
                        type="text"
                        placeholder="Enter Name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                        <span className="error">{errors.name}</span>
                    )}
                </div>
                <div className="form-group mb-4">
                    <input
                        type="email"
                        placeholder="Enter Email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                        <span className="error">{errors.email}</span>
                    )}
                </div>
                <div className="form-group mb-4">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                    {errors.mobile && (
                        <span className="error">{errors.mobile}</span>
                    )}
                </div>
                <div className="form-group mb-4 ">
                    <textarea
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea"
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                    ></textarea>
                    {errors.message && (
                        <span className="error">{errors.message}</span>
                    )}
                </div>
                <div className="form-group">
                    <button
                        className="mx-auto over-pointer-g-effect bg-success text-light"
                        type="button"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ContactUsPage;
