import React, { useEffect, useState } from "react";
import { enquiry, fetchAllSiteSettings } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";
import { errorOptions, successOptions } from "../../../toastOption";

function CommunityEnquiry(props) {
    // State variables to store form input values
    const { handleClose } = props;
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

    //fetch site setting 
    const fetchSettings = async () => {
        dispatch(setLoader(true));
        try {
            const response = await fetchAllSiteSettings();
            setSettings(response.data.data);
            dispatch(setLoader(false));
        } catch (error) {
            dispatch(setLoader(false));
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
            }
        }
    };

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
                handleClose()
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return (
        <div>
            {/* Address Banner */}


            {/* Contact */}
            <div id="user-auth-section">
                <div className="container">
                    <div className="user-auth-panel">
                        <div className="user-auth-form-container">
                            <div className={`card shadow ${errors ? 'border-danger' : ''}`}>
                                <div className="card-body p-4">
                                    <form
                                        className="user-auth-form-contact"
                                        onSubmit={handleSubmit}
                                    >

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
                                                style={{ height: '200px' }}
                                                placeholder="Please provide a comprehensive description of the community you intend to add, including any sub-communities, if applicable"
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
                                                className="form-control w-100 btn-primary"
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityEnquiry;
