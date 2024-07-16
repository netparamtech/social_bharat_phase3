import React, { useEffect, useState } from "react";
import { enquiry, fetchAllSiteSettings } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";
import { errorOptions, successOptions } from "../../../toastOption";
import TextAreaField from "../custom/TextAreaField";
import MobileInput from "../custom/MobileInput";
import InputField from "../custom/InputField";

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
        <form
            className="user-auth-form-contact"
            onSubmit={handleSubmit}
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
            <div className="form-group mb-4">
                <InputField handleChange={(e) => setName(e.target.value)} isRequired={true} type="text"
                    errorServer={errors.name} isAutoFocused={true} placeholder="Enter Your Name"
                    maxLength={50} value={name} fieldName="Name" />
            </div>
            <div className="form-group mb-4">
                <InputField handleChange={(e) => setEmail(e.target.value)} isRequired={false} boxFor="email"
                    errorServer={errors.email} isAutoFocused={false} placeholder="Enter Your Email (Optional)"
                    maxLength={100} value={email} fieldName="Email" />
            </div>
            <div className="form-group mb-4">
                <MobileInput handleMobileChange={(e) => setMobile(e.target.value)} isRequired={true}
                    errorServer={errors.mobile} isAutoFocused={false} placeholder="Enter Your Mobile"
                    value={mobile} fieldName="Mobile" />
            </div>
            <div className="form-group mb-4 ">
                <TextAreaField handleChange={(e) => setUserQuery(e.target.value)} isRequired={true}
                    errorServer={errors.message} isAutoFocused={false} placeholder="Please provide a comprehensive description of the 
                    community you intend to add, including any sub-community, if applicable."
                    maxLength={255} value={userQuery} fieldName="Message" />
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
    );
}

export default CommunityEnquiry;
