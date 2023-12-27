import { useEffect, useState } from "react";
import Select from "react-select";
import React from 'react';
import { Space } from 'antd';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import Modal from 'react-bootstrap/Modal';
import { yyyyMmDdFormat } from "../../util/DateConvertor";
import dayjs from 'dayjs';
import { fetchAllCitiesByStateID, fetchAllStatesByCountryID, fetchSingleJobPosted, updateUserJobPosted, uploadImage, uploadPdf } from "../../services/userService";

const UpdateJobPosted = (props) => {
    const { changeUpdateClickedFlag, jobId } = props;
    const [jobTitle, setJobTitle] = useState('');
    const [jobSector, setJobSector] = useState('');
    const [jobType, setJobType] = useState("");
    const [subHeading, setSubHeading] = useState('');
    const [location, setLocation] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [previewSelectedFile, setPreviewSelectedFile] = useState('');
    const [selectedFileTempUrl, setSelectedFileTempUrl] = useState('');
    const [logo, setLogo] = useState("");
    const [logoPreview, setLogoPreview] = useState("");
    const [selectedLogoTempUrl, setSelectedLogoiTempUrl] = useState('');
    const [applyLink, setApplyLink] = useState('');
    const [description, setDescription] = useState('');
    const [jobStartDate, setJobStartDate] = useState(dayjs().add(0, 'day'));
    const [jobEndDate, setJobEndDate] = useState(dayjs().add(0, 'day'));
    const [application_fee_details, setApplication_fee_details] = useState('');
    const [isActive, setIsActive] = useState('Inactive');
    const [isApplyForm, setIsApplyForm] = useState('Inactive');

    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    const [serverError, setServerError] = useState("");
    const [alertClass, setAlertClass] = useState("");
    const [messageAttachment, setMessageAttachment] = useState('');
    const [messageLogo, setMessageLogo] = useState('');

    const [selectedCountry, setSelectedCountry] = useState("India");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countryID, setCountryID] = useState(101);

    const [jobDetails, setJobDetails] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false)
        changeUpdateClickedFlag(false);
    };
    const handleShow = () => setShow(true);

    const jobTypeOption = [
        { value: "Part Time", label: "Part Time" },
        { value: "Full Time", label: "Full Time" },
        { value: "Freelance", label: "Freelance" },
        { value: "Other", label: "Other" },
    ];

    const jobSectorOption = [
        { value: "Private Jobs", label: "Private Jobs" },
        { value: "Government Jobs", label: "Government Jobs" },
        { value: "Other", label: "Other" },
    ];

    const handleActiveChange = (event) => {
        setIsActive(event.target.value);
    };


    const handleJobTypeChange = (selectedOption) => {
        setJobType(selectedOption);
    }
    const handleJobSectorChange = (selectedOption) => {
        setJobSector(selectedOption);
    }
    const handleAttachmentChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("pdf", file);

        try {
            dispatch(setLoader(true));
            const response = await uploadPdf(formData); // Make an API call to get temporary URL
            if (response && response.status === 200) {
                setSelectedFileTempUrl(response.data.data.file);
                setPreviewSelectedFile(URL.createObjectURL(file));
                setServerError('');
                setMessageAttachment('');
            }
        } catch (error) {
            // Handle error
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
                setMessageAttachment(error.response.data.message);
            }

            //Unauthorized
            else if (error.response && error.response.status === 401) {
                navigate('/login');
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
        }
    }

    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        console.log(file)
        const formData = new FormData();
        formData.append("image", file);

        try {
            dispatch(setLoader(true));
            const response = await uploadImage(formData); // Make an API call to get temporary URL
            if (response && response.status === 200) {
                setSelectedLogoiTempUrl(response.data.data.image);
                setLogoPreview(URL.createObjectURL(file));
                setServerError('');
                setMessageLogo('');
            }
        } catch (error) {
            // Handle error
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
                setMessageLogo(error.response.data.message);
            }

            //Unauthorized
            else if (error.response && error.response.status === 401) {
                navigate('/login');
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
        }
    }
    const handleApplyFormChange = (event) => {
        setIsApplyForm(event.target.value);
    }

    const fetchJobWithId = async () => {
        try {
            const response = await fetchSingleJobPosted(jobId);
            if (response && response.status === 200) {
                setJobDetails(response.data.data);
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        }
    }

    //state and city change operations
    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption);
        console.log(selectedOption.value);

        if (selectedOption) {
            const selectedStateObject = states.find(
                (state) => state.name === selectedOption.value
            );
            if (selectedStateObject) {
                getAllCities(selectedStateObject.id);
            }
        }

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
                setServerError('');
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
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
                setServerError('');
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
        }
    };

    const handleSubmit = async () => {
        dispatch(setLoader(true));
        const data = {
            job_title: jobTitle.toUpperCase(),
            job_sector: jobSector.label,
            job_type: jobType.label,
            job_subheading: subHeading,
            location,
            attachment: selectedFileTempUrl,
            logo: selectedLogoTempUrl,
            description,
            job_request_status: isActive,
            apply_link: applyLink,
            job_apply_form: isApplyForm,
            job_start_date: jobStartDate,
            job_end_date: jobEndDate,
            fee_details: application_fee_details,
        }
        console.log(jobId, "user id")
        try {
            const response = await updateUserJobPosted(data, jobId);
            if (response && response.status === 201) {
                setServerError('');
                setErrors('');
                setMessage(response.data.message);
                setAlertClass("alert-success");
                changeUpdateClickedFlag(false);
            }
        } catch (error) {
            dispatch(setLoader(false));
            // Handle error
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
                setServerError('');
                setMessage('');
                setAlertClass('');
            }

            //Unauthorized
            else if (error.response && error.response.status === 401) {
                navigate('/login');
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
        }
    }

    useEffect(() => {
        if (jobDetails) {
            setJobTitle(jobDetails.job_title);
            setJobType({ value: jobDetails.job_type, label: jobDetails.job_type });
            setJobSector({ value: jobDetails.job_sector, label: jobDetails.job_sector });
            setSubHeading(jobDetails.job_subheading);
            setLocation(jobDetails.location);
            setSelectedFileTempUrl(jobDetails.notification_pdf);
            setPreviewSelectedFile(jobDetails.notification_pdf);
            setSelectedLogoiTempUrl(jobDetails.logo);
            setLogoPreview(jobDetails.logo);
            setApplyLink(jobDetails.apply_link);
            setDescription(jobDetails.description);
            setIsApplyForm(jobDetails.job_apply_form);
            setJobStartDate(yyyyMmDdFormat(jobDetails.job_start_date));
            setJobEndDate(yyyyMmDdFormat(jobDetails.job_end_date));
            setApplication_fee_details(jobDetails.fee_details);
            setIsActive(jobDetails.job_request_status);
            if(jobDetails.state){
                setSelectedState({value:jobDetails.state,label:jobDetails.state});
                console.log(states)
            }
            console.log(jobDetails.city)
            if(jobDetails.city){
                setSelectedCity({value:jobDetails.city,label:jobDetails.city});
            }

        }
    }, [jobDetails]);

    useEffect(() => {
        // Check if selectedCountry is already set
        getAllStates();
    }, []);

    useEffect(() => {
        if (selectedState) {
            const selectedStateObject = states.find(
                (state) => state.name === selectedState.label
              );
            getAllCities(selectedStateObject);
        }
    }, [selectedState]);


    useEffect(() => {
        fetchJobWithId();
    }, []);

    return (
        <Modal show={show} size="lg" onHide={handleClose} className="">
            <Modal.Header className="bg-info text-light" closeButton>Update Job</Modal.Header>
            <div id="" className="mt-2 container">
                <div className="row">
                    <div className="">

                        <div className={`card shadow mx-auto rounded ${errors ? 'border-danger' : ''}`}>

                            <div className="card-body">
                                {serverError && <span className='error'>{serverError}</span>}
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
                                <div className="form-group">
                                    <label>Job Title:</label>
                                    <input type="text"
                                        className={`form-control ${errors.job_title ? 'border-danger' : ''}`}
                                        placeholder="Enter Job Title"
                                        defaultValue={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                    />
                                    {errors.job_title && (
                                        <span className="error">{errors.job_title}</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Job Sector:</label>
                                    <Select
                                        className={`form-control ${errors.job_sector ? 'border-danger' : ''}`}
                                        options={jobSectorOption}
                                        value={jobSector}
                                        onChange={handleJobSectorChange}
                                        placeholder="Select Job Type..."
                                    />
                                    {errors.job_sector && (
                                        <span className="error">{errors.job_sector}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Job Type:</label>
                                    <Select
                                        className={`form-control ${errors.job_type ? 'border-danger' : ''}`}
                                        options={jobTypeOption}
                                        value={jobType}
                                        onChange={handleJobTypeChange}
                                        placeholder="Select Job Type..."
                                    />
                                    {errors.job_type && (
                                        <span className="error">{errors.job_type}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Other Subheading(optional):</label>
                                    <input type="text"
                                        className="form-control"
                                        placeholder="i.e. company name or organization or other"
                                        defaultValue={subHeading}
                                        onChange={(e) => setSubHeading(e.target.value)}
                                    />
                                    {errors.subHeading && (
                                        <span className="error">{errors.subHeading}</span>
                                    )}
                                </div>

                                <div className="row">
                                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                        <label className="form-label">State</label>

                                        <Select
                                            className=""
                                            options={states.map((state) => ({
                                                value: state.name,
                                                label: state.name,
                                            }))}
                                            value={selectedState}
                                            onChange={handleStateChange}
                                        />


                                    </div>

                                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                        <label className="form-label">City</label>

                                        <Select
                                            options={cities.map((city) => ({
                                                value: city.name,
                                                label: city.name,
                                            }))}
                                            value={selectedCity}
                                            onChange={handleCityChange}
                                        />

                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Address:</label>
                                    <input type="text"
                                        className="form-control"
                                        placeholder="i.e. company name or organization or other"
                                        defaultValue={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                    {errors.location && (
                                        <span className="error">{errors.location}</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <div>
                                                <label>Attachment:</label>
                                                <input type="file"
                                                    className="form-control"
                                                    accept=".pdf"
                                                    defaultValue={selectedFile}
                                                    onChange={handleAttachmentChange}
                                                />
                                                {messageAttachment && <span className="error">{messageAttachment}</span>}
                                                {errors.attachment && (
                                                    <span className="error">{errors.attachment}</span>
                                                )}
                                            </div>
                                            <div>
                                                <label>Logo Image(Optional):</label>
                                                <input type="file"
                                                    className="form-control"
                                                    accept=".jpg,.jpeg,.png"
                                                    defaultValue={logo}
                                                    onChange={handleLogoChange}
                                                />
                                                {messageLogo && <span className="error">{messageLogo}</span>}
                                                {errors.logo && (
                                                    <span className="error">{errors.logo}</span>
                                                )}
                                            </div>
                                            <div>
                                                <label>Apply Link</label>
                                                <textarea type="text"
                                                    className="form-control"
                                                    placeholder="Enter Description"
                                                    defaultValue={applyLink}
                                                    onChange={(e) => setApplyLink(e.target.value)}
                                                />
                                                {errors.apply_link && (
                                                    <span className="error">{errors.apply_link}</span>
                                                )}
                                            </div>
                                            <div>
                                                <label>Description{" "}<span className="text-danger">*</span></label>
                                                <textarea type="text"
                                                    className={`form-control ${errors.description ? 'border-danger' : ''}`}
                                                    placeholder="Enter Description"
                                                    defaultValue={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                                {errors.description && (
                                                    <span className="error">{errors.description}</span>
                                                )}
                                            </div>

                                            <div className="form-check mt-2">
                                                <p className={`btn ${isActive === 'Active' ? 'btn-success' : 'btn-danger'}`}>
                                                    {isActive === 'Active' ?
                                                        (<span>On submission of this job a request will be send to admin to 'active' to show on job search portal.</span>
                                                        ) : ((<span>On submission of this job a request will be send to admin to 'deactive' and not show on job search portal.
                                                        </span>))}</p>
                                                <label className="form-control">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        value="Active"
                                                        checked={isActive === 'Active'}
                                                        onChange={handleActiveChange}
                                                    />
                                                    Active
                                                </label>

                                                <label className="form-control">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        value="Inactive"
                                                        checked={isActive === 'Inactive'}
                                                        onChange={handleActiveChange}
                                                    />
                                                    Inactive
                                                </label>

                                                {errors.job_request_status && (
                                                    <span className="error">{errors.job_request_status}</span>
                                                )}
                                            </div>

                                            <div className="form-check mt-2">
                                                <p>Need a apply form to Apply ?</p>
                                                <label className="form-control">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        value="Active"
                                                        checked={isApplyForm === 'Active'}
                                                        onChange={handleApplyFormChange}
                                                    />
                                                    Yes
                                                </label>

                                                <label className="form-control">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        value="Inactive"
                                                        checked={isApplyForm === 'Inactive'}
                                                        onChange={handleApplyFormChange}
                                                    />
                                                    No
                                                </label>
                                                {errors.job_apply_form && (
                                                    <span className="error">{errors.job_apply_form}</span>
                                                )}
                                            </div>
                                            <div className="form-check mt-2">
                                                <label className="row bg-info fs-5 m-2 rounded">
                                                    <Space direction="vertical" size={12} className="mt-2">
                                                        <div className="">
                                                            <label className="">Application Start</label>
                                                            <input
                                                                type="date"
                                                                name="jobStartDate"
                                                                id="jobStartDate"
                                                                placeholder=""
                                                                className={`form-control ${errors.job_start_date ? 'border-danger' : ''}`}
                                                                value={jobStartDate}
                                                                onChange={(e) => setJobStartDate(e.target.value)}
                                                            />
                                                        </div>
                                                        {errors.job_start_date && (
                                                            <span className="error">{errors.job_start_date}</span>
                                                        )}
                                                        <div className="">
                                                            <label className="">Application End</label>
                                                            <input
                                                                type="date"
                                                                name="jobStartDate"
                                                                id="jobStartDate"
                                                                placeholder=""
                                                                className={`form-control ${errors.job_end_date ? 'border-danger' : ''}`}
                                                                value={jobEndDate}
                                                                onChange={(e) => setJobEndDate(e.target.value)}
                                                            />
                                                        </div>
                                                        {errors.job_end_date && (
                                                            <span className="error">{errors.job_end_date}</span>
                                                        )}
                                                    </Space>


                                                </label>
                                            </div>



                                        </div>


                                        <div className="col-md-6 col-sm-12 mt-2">
                                            <label>Short Information about Application Fee</label>
                                            <textarea type="text"
                                                className={`form-control ${errors.fee_details ? 'border-danger' : ''}`}
                                                placeholder="Enter application fee details or details about fee..."
                                                defaultValue={application_fee_details}
                                                onChange={(e) => setApplication_fee_details(e.target.value)}
                                            />
                                            {errors.fee_details && (
                                                <span className="error">{errors.fee_details}</span>
                                            )}
                                            <div className="d-flex">

                                                <div className="col-md-6 col-sm-12 mt-2" style={{ height: '300px', border: '1px solid #ccc' }}>
                                                    {previewSelectedFile && (
                                                        <div >
                                                            <embed src={previewSelectedFile} type="application/pdf" width="100%" height="300px" />

                                                        </div>
                                                    )}

                                                </div>
                                                <div className="col-md-6 col-sm-12 mt-2" style={{ height: '300px', border: '1px solid #ccc' }}>
                                                    {logoPreview && (
                                                        <div >
                                                            <img src={logoPreview} width={150} height={300} />

                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-sm-12 mt-2"><b>सामाजिक भारत</b> <li>एक ही समुदाय के लोगों को आपस में जोड़कर उन्हें सामाजिक रूप से जोड़ता है, जिससे समृद्धि और समर्थन में वृद्धि होती है।</li>
                                                <li>समुदाय के लोगों को समृद्धि के साथ ही अपने समुदाय से ही जीवनसाथी ढूंढने की सुविधा प्रदान करता है।</li>
                                                <li> सदस्यों को रोजगार और व्यापार की खोज के लिए एक सामाजिक मंच प्रदान करने से उन्हें अधिक अवसर मिलते हैं।</li>
                                                <li>समुदाय के सदस्यों के बीच सामूहिक समर्थन बढ़ता है, जिससे आपसी सहारा मिलता है और समस्याओं का समाधान होता है।</li>
                                                <li>समुदाय के सदस्यों को जागरूकता और शिक्षा के साधन के रूप में जोड़कर, उन्हें सामाजिक मुद्दों के प्रति जागरूक बनाए रखता है।</li>
                                            </div>
                                            <div className="col-md-12 col-sm-12 mt-2">
                                                <b>Social Bharat</b>
                                                <ul>
                                                    <li>Brings together people of the same community, fostering social connectivity, leading to growth and support.</li>
                                                    <li>Provides the community members with the convenience of finding life partners within their community, along with prosperity.</li>
                                                    <li>By offering a social platform for job and business search, it provides community members with more opportunities.</li>
                                                    <li>Enhances mutual support among community members, providing a collective solution to problems.</li>
                                                    <li>By connecting community members through awareness and education, it keeps them informed about social issues.</li>
                                                </ul>
                                            </div>

                                        </div>

                                        <div className="col-3 mx-auto mt-3 submit-btn">
                                            <button type="button" className="btn btn-success border-danger" onClick={handleSubmit}>submit</button>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </Modal>

    );
}
export default UpdateJobPosted;