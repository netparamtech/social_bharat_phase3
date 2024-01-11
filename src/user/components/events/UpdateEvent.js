import React, { useEffect, useState, useRef } from "react";
import {
    event,
    fetchAllCitiesByStateID,
    fetchAllStatesByCountryID,
    fetchEventByID,
    updateEvent,
    uploadImage,
} from "../../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from "antd";
import Select from "react-select";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";

const UpdateEvent = () => {
    const { id } = useParams();
    // State variables to store form input values
    const [title, setTitle] = useState("");
    const [country, setCountry] = useState("India");
    const [venue, setVenue] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");
    const [description, setDescription] = useState('');

    const [thumbnailImageTempUrl, setThumbnailImageTempUrl] = useState("");
    const [bannerImageTempUrl, setBannerImageTempUrl] = useState("");

    const [selectedCountry, setSelectedCountry] = useState("India");
    const [selectedState, setSelectedState] = useState(""); // Change state to selectedState
    const [selectedCity, setSelectedCity] = useState("");
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);

    const [data, setData] = useState('');

    const thumbnailImageRef = useRef(null);
    const bannerImageRef = useRef(null);

    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState("");
    const [alertClass, setAlertClass] = useState("");
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleStartDateTimeChange = (date, dateString) => {
        setStartDateTime(dateString); // Update startDateTime with the selected date and time
    };

    const handleEndDateTimeChange = (date, dateString) => {
        setEndDateTime(dateString); // Update endDateTime with the selected date and time
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption);
        // Update selected city to null when state changes
        setSelectedCity(null);
    };

    const handleCityChange = (selectedOption) => {
        setSelectedCity(selectedOption);
    };

    const getAllStates = async () => {
        dispatch(setLoader(true));
        try {
            const response = await fetchAllStatesByCountryID(101);
            if (response && response.status === 200) {
                setStates(response.data.data);
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {

            }
        } finally {
            dispatch(setLoader(false));
        }
    };

    const getAllCities = async (stateID) => {
        dispatch(setLoader(true));
        try {
            const response = await fetchAllCitiesByStateID(stateID);
            if (response && response.status === 200) {
                setCities(response.data.data);
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {

            }
        } finally {
            dispatch(setLoader(false));
        }
    };

    const handleThumbnailImageChange = async (e) => {
        dispatch(setLoader(true));
        //setThumbnailImage(e.target.files[0]);
        const selectedFile = e.target.files[0];
        setThumbnailPreview(URL.createObjectURL(selectedFile));
        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await uploadImage(formData);
            if (response && response.status === 200) {
                setThumbnailImageTempUrl(response.data.data.image);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
            }
            // Unauthorized
            else if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            //handle internal server error
            else if (error.response && error.response.status === 500) {

            }
        } finally {
            dispatch(setLoader(false));
        }
    };

    const fetchEvent = async () => {
        try {
            const response = await fetchEventByID(id);
            if (response && response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {
            // Unauthorized
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            //handle internal server error
            else if (error.response && error.response.status === 500) {

            }
        } finally {
            dispatch(setLoader(false));
        }
    }

    useEffect(() => {
        if (id) {
            fetchEvent();
        }
    }, [id])

    useEffect(() => {
        if (data) {
            setTitle(data && data.title);
            if (data.state && data.city) {
                setSelectedState({
                    value: data.state,
                    label: data.state,
                }); // Set the selected state as an object
                setSelectedCity({
                    value: data.city,
                    label: data.city,
                });
            }
            setStartDateTime(data.start_datetime);
            setEndDateTime(data.end_datetime);
            setVenue(data.venue);
            setThumbnailImageTempUrl(data.thumb_image);
            setBannerImageTempUrl(data.banner_image);
            setThumbnailPreview(data.thumb_image);
            setBannerPreview(data.banner_image);
            setDescription(data.description);
        }
    }, [data]);

    useEffect(() => {
        if (selectedState) {
            const selectedStateObject = states.find(
                (state) => state.name === selectedState.label
            );

            if (selectedStateObject) {
                getAllCities(selectedStateObject.id);
            }
        }
    }, [selectedState])

    const handleBannerImageChange = async (e) => {
        dispatch(setLoader(true));
        const selectedFile = e.target.files[0];
        setBannerPreview(URL.createObjectURL(selectedFile));
        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await uploadImage(formData);
            if (response && response.status === 200) {
                setBannerImageTempUrl(response.data.data.image);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
            }
            // Unauthorized
            else if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            //handle internal server error
            else if (error.response && error.response.status === 500) {

            }
        } finally {
            dispatch(setLoader(false));
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoader(true));

        const formattedStartDateTime = formatDateTime(startDateTime);
        const formattedEndDateTime = formatDateTime(endDateTime);

        //Date/ Time Format
        function formatDateTime(dateTime) {
            const date = new Date(dateTime);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            const seconds = "00"; // You can set seconds to '00' if not provided in your input
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

        const data = {
            title,
            city: selectedCity && selectedCity.label,
            state: selectedState && selectedState.label, // Update to selectedState
            country,
            venue,
            start_datetime: formattedStartDateTime,
            end_datetime: formattedEndDateTime,
            banner_image: bannerImageTempUrl,
            thumb_image: thumbnailImageTempUrl,
            description,
        };

        try {
            const response = await updateEvent(data,id);

            if (response && response.status === 200) {
                setErrors("");
                setMessage(response.data.message);
                setAlertClass("alert-success");

                // Reset file inputs
                thumbnailImageRef.current.value = null;
                bannerImageRef.current.value = null;
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage("");
                setErrors(error.response.data.errors);
                setAlertClass("alert-danger");
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

    useEffect(() => {
        // Check if selectedCountry is already set
        getAllStates();
    }, []);

    return (
        <>
            <div id="auth-wrapper" className="pt-5 pb-5">
                <div className="container">
                    <div className={`card shadow ${errors ? 'border-danger' : ''}`}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12 p-4">
                                    <div className="card-title mb-5">
                                        <h3 className="mb-1">Update Event - {data && data.title} </h3>
                                        <p className="text-muted m-0 p-0">
                                            Fill the details below to post events.
                                        </p>
                                    </div>
                                    <form className="w-100 w-lg-75" onSubmit={handleSubmit}>
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
                                        <div className="row">
                                            <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                                <label className="form-label">Event Title {" "}<span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    name="eventName"
                                                    placeholder="Enter Event Name"
                                                    className="form-control"
                                                    defaultValue={title}
                                                    onChange={handleTitleChange}
                                                />

                                                {errors.title && (
                                                    <span className="error">{errors.title}</span>
                                                )}
                                            </div>
                                            <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                                <label className="form-label">Country{" "}<span className="text-danger">*</span></label>
                                                <select
                                                    id="country"
                                                    className="form-control"
                                                    value={country}
                                                    onChange={(e) => setCountry(e.target.value)}
                                                >
                                                    <option value="India">India</option>
                                                </select>
                                                {errors.country && (
                                                    <span className="error">{errors.country}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                                <label className="form-label">State{" "}<span className="text-danger">*</span></label>
                                                <Select
                                                    className=""
                                                    options={states.map((state) => ({
                                                        value: state.name,
                                                        label: state.name,
                                                    }))}
                                                    value={selectedState}
                                                    onChange={handleStateChange}
                                                    placeholder="---Select State---"
                                                />
                                                {errors.state && (
                                                    <span className="error">{errors.state}</span>
                                                )}
                                            </div>
                                            <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                                <label className="form-label">City{" "}<span className="text-danger">*</span></label>
                                                <Select
                                                    options={cities.map((city) => ({
                                                        value: city.name,
                                                        label: city.name,
                                                    }))}
                                                    value={selectedCity}
                                                    onChange={handleCityChange}
                                                    placeholder="---Select City---"
                                                />
                                                {errors.city && (
                                                    <span className="error">{errors.city}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                                <label className="form-label">
                                                    Start Event Date/Time{" "}<span className="text-danger">*</span>
                                                </label>
                                                <DatePicker
                                                    showTime
                                                    format="YYYY-MM-DD h:mm a"
                                                    onChange={handleStartDateTimeChange}
                                                    value={
                                                        startDateTime
                                                            ? moment(startDateTime, "YYYY-MM-DD h:mm a")
                                                            : null
                                                    }
                                                    className="form-control"
                                                />
                                                {errors.start_datetime && (
                                                    <span className="error">{errors.start_datetime}</span>
                                                )}
                                            </div>
                                            <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                                <label className="form-label">
                                                    End Event Date/Time{" "}<span className="text-danger">*</span>
                                                </label>
                                                <DatePicker
                                                    showTime
                                                    format="YYYY-MM-DD h:mm a"
                                                    onChange={handleEndDateTimeChange}
                                                    value={
                                                        endDateTime
                                                            ? moment(endDateTime, "YYYY-MM-DD h:mm a")
                                                            : null
                                                    }
                                                    className="form-control"
                                                />
                                                {errors.end_datetime && (
                                                    <span className="error">{errors.end_datetime}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                                <label className="form-label">Venue{" "}<span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    name="venue"
                                                    id="exampleInput3"
                                                    placeholder="Enter Venue"
                                                    className="form-control"
                                                    value={venue}
                                                    onChange={(e) => setVenue(e.target.value)}
                                                />
                                                {errors.venue && (
                                                    <span className="error">{errors.venue}</span>
                                                )}
                                            </div>
                                            <div className="mb-3 col-lg-4 col-sm-12 col-xs-12">
                                                <label htmlFor="status">Banner Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    accept="image/jpeg,image/jpg,image/png"
                                                    ref={bannerImageRef}
                                                    onChange={handleBannerImageChange}
                                                />
                                                {errors.bannerImage && (
                                                    <span className="error">{errors.bannerImage}</span>
                                                )}
                                            </div>
                                            <div className="col-lg-2 col-sm-12">
                                                {bannerPreview && (
                                                    <img
                                                        src={bannerPreview}
                                                        alt="Thumbnail"
                                                        title="Thumbnail"
                                                        className="small-img-thumbnail"
                                                        width={100}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="mb-3 col-lg-4 col-sm-12 col-xs-12">
                                                <label htmlFor="status">Thumb Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    accept="image/jpeg,image/jpg,image/png"
                                                    ref={bannerImageRef}
                                                    // Add file input handling here
                                                    onChange={handleThumbnailImageChange}
                                                />
                                                {errors.thumbImage && (
                                                    <span className="error">{errors.thumbImage}</span>
                                                )}
                                            </div>
                                            <div className="col-lg-2 col-sm-12">
                                                {thumbnailPreview && (
                                                    <img
                                                        src={thumbnailPreview}
                                                        alt="Thumbnail"
                                                        title="Thumbnail"
                                                        className="small-img-thumbnail"
                                                        width={100}
                                                    />
                                                )}
                                            </div>
                                            <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                                <label htmlFor="description">Description</label>
                                                <textarea
                                                    type="area"
                                                    placeholder="Enter Your Event Details If Any"
                                                    className="form-control mt-2"
                                                    defaultValue={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                                {errors && errors.description && (
                                                    <span className="error">{errors.description}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="row mt-4">
                                            <div className="col-lg-6 col-sm-12 col-xs-12">
                                                <button type="submit" className="btn btn-primary">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateEvent;
