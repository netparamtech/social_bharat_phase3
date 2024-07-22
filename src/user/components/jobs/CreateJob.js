import { useEffect, useState } from "react";
import Select from "react-select";
import React from 'react';
import dayjs from 'dayjs';
import { DatePicker, Space, Table } from 'antd';
import FeaturedJobs from "./FeaturedJobs";
import { createNewJobPost, fetchAllCitiesByStateID, fetchAllStatesByCountryID, uploadImage, uploadPdf } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import { toast } from 'react-toastify';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import InputField from "../custom/InputField";
import SelectField from "../custom/SelectField";
import TextAreaField from "../custom/TextAreaField";
import { errorOptions } from "../../../toastOption";

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const CreateJob = (props) => {
    const { handleIsCreateJob } = props;
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
    const [jobStartDate, setJobStartDate] = useState('');
    const [jobEndDate, setJobEndDate] = useState('');
    const [application_fee_details, setApplication_fee_details] = useState('');
    const [isActive, setIsActive] = useState('Inactive');
    const [isApplyForm, setIsApplyForm] = useState('Inactive');
    const [isResumeApply, setIsResumeApply] = useState(false);

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    const [serverError, setServerError] = useState("");
    const [alertClass, setAlertClass] = useState("");
    const [messageAttachment, setMessageAttachment] = useState('');
    const [messageLogo, setMessageLogo] = useState('');
    const [applyWithResume, setApplyWithResume] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("India");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countryID, setCountryID] = useState(101);

    //validation-hooks
    const [jobTitleError, setJobTitleError] = useState('');
    const [jobSectorError, setJobSectorError] = useState('');
    const [jobTypeError, setJobTypeError] = useState('');
    const [stateError, setStateError] = useState('');
    const [cityError, setCityError] = useState('');
    const [feeError, setFeeError] = useState('');
    const [appStartDateError, setAppStartDateError] = useState('');
    const [appEndDateError, setAppEndDateError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
    const stateOptions = (
        states &&
        states.map((option) => ({
            value: option.name,
            label: option.name,
        }))
    )
    const cityOptions = (
        cities &&
        cities.map((option) => ({
            value: option.name,
            label: option.name,
        }))
    )

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const handleJobTypeChange = (selectedOption, errorMsg) => {
        setJobType(selectedOption);
        setJobTypeError(errorMsg);
    }
    const handleJobSectorChange = (selectedOption, errorMsg) => {
        setJobSector(selectedOption);
        setJobSectorError(errorMsg);
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
                setMessageAttachment(error.response.data.message);
            }

            //Unauthorized
            else if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
        }
    }

    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
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
                setMessageLogo(error.response.data.message);
            }

            //Unauthorized
            else if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
        }
    }

    const handleActiveChange = (event) => {
        setIsActive(event.target.value);
    };
    const handleApplyFormChange = (event) => {
        setIsApplyForm(event.target.value);
    }
    const jobStartDateChange = (value, dateString) => {
        setJobStartDate(dateString);
    };

    const jobEndDateChange = (value, dateString) => {
        setJobEndDate(dateString);
    };
    const handleApplyWithResume = () => {
        setApplyWithResume(!applyWithResume);
    }

    //state and city change operations
    const handleStateChange = (selectedOption, errorMsg) => {
        setSelectedState(selectedOption);
        setStateError(errorMsg);

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

    const handleCityChange = (selectedOption, errorMsg) => {
        setSelectedCity(selectedOption);
        setCityError(errorMsg);
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
        if (stateID) {
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
        }
    };

    const handleSubmit = async () => {
        if(jobTitleError||jobSectorError||jobTypeError||stateError||cityError||feeError||!jobTitle||!jobSector||!jobType||!selectedState||!selectedCity||!application_fee_details){
            toast.error("Please fill in all the required fields before submitting.",errorOptions);
            return;
        }
        dispatch(setLoader(true));

        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const htmlContent = draftToHtml(rawContentState);
        const data = {
            job_title: jobTitle.toUpperCase(),
            job_sector: jobSector.label,
            job_type: jobType.label,
            job_subheading: subHeading,
            location,
            attachment: selectedFileTempUrl,
            logo: selectedLogoTempUrl,
            description: htmlContent,
            apply_link: applyLink,
            job_apply_form: isApplyForm,
            job_start_date: jobStartDate,
            job_end_date: jobEndDate,
            fee_details: application_fee_details,
            state: selectedState && selectedState.label,
            city: selectedCity && selectedCity.label,
            resume_apply: applyWithResume ? 1 : 0
        }
        try {
            const response = await createNewJobPost(data);
            if (response && response.status === 201) {
                window.scroll(0, 0);
                setServerError('');
                setErrors('');
                setMessage(response.data.message);
                setAlertClass("alert-success");
                toast.success("You have successfully created this job");
                handleIsCreateJob(false);
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
                navigate("/login");
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
        }
    }

    useEffect(() => {
        // Check if selectedCountry is already set
        getAllStates();
    }, []);

    useEffect(() => {
        if (selectedState) {
            getAllCities(selectedState.id);
        }
    }, [selectedState]);

    return (

        <div id="" className="create-new-job">
            <div className="">


                <div className="row">
                    <div className="mb-3">
                        <div className={`card mx-auto rounded ${errors ? 'border-danger' : ''}`} style={{ flexDirection: 'column' }}>

                            <div className="card-body shadow" style={{ display: 'flow' }}>
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
                                    <InputField errorServer={errors.job_title} label="Job Title:" handleChange={(e, errorMsg) => {
                                        setJobTitle(e.target.value);
                                        setJobTitleError(errorMsg);
                                    }}
                                        placeholder="Enter Job Title" value={jobTitle} isRequired={true} isAutoFocused={true}
                                        maxLength={50} fieldName="Job title" />
                                </div>
                                <div className="form-group">
                                    <SelectField handleSelectChange={handleJobSectorChange} isRequired={true} value={jobSector}
                                        errorServer={errors.job_sector} placeholder="Select Job Type..." label="Job Sector:"
                                        options={jobSectorOption} fieldName="Job sector" />
                                </div>

                                <div className="form-group">
                                    <SelectField handleSelectChange={handleJobTypeChange} isRequired={true} value={jobType}
                                        errorServer={errors.job_type} placeholder="Select Job Type..." label="Job Type:"
                                        options={jobTypeOption} fieldName="Job type" />
                                </div>

                                <div className="form-group">
                                    <InputField errorServer={errors.job_subheading} label="Company Name / Other Subheading(optional):" handleChange={(e) => setSubHeading(e.target.value)}
                                        placeholder="i.e. company name or organization or other" value={subHeading} maxLength={100}
                                        fieldName="company name or organization or other" />
                                </div>

                                <div className="row">
                                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">

                                        <SelectField handleSelectChange={handleStateChange} isRequired={true} value={selectedState}
                                            errorServer={errors.state} placeholder="select state..." label="State (for government job state is optional.)"
                                            options={stateOptions} fieldName="State" />


                                    </div>

                                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                        <SelectField handleSelectChange={handleCityChange} isRequired={true} value={selectedCity}
                                            errorServer={errors.city} placeholder="select city..." label="City (for government job city is optional.)"
                                            options={cityOptions} fieldName="City" />

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <label>Address:</label>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="i.e. company place or organization address"
                                            defaultValue={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                        {errors.location && (
                                            <span className="error">{errors.location}</span>
                                        )}
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <TextAreaField handleChange={(e, errorMsg) => {
                                            setApplication_fee_details(e.target.value);
                                            setFeeError(errorMsg);
                                        }} placeholder="Enter application fee details or details about fee..."
                                            fieldName="Fee detail" value={application_fee_details} maxLength={1000} errorServer={errors.fee_details} isRequired={true} label="Short Information about Application Fee" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <label className="">Application Start<span className="text-danger">{" "}*</span></label>
                                        <input
                                            type="date"
                                            name="jobStartDate"
                                            id="jobStartDate"
                                            placeholder=""
                                            className={`form-control ${errors.job_start_date ? 'border-danger' : ''}`}
                                            value={jobStartDate}
                                            onChange={(e) => setJobStartDate(e.target.value)}
                                        />
                                        {errors.job_start_date && (
                                            <span className="error">{errors.job_start_date}</span>
                                        )}
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label className="">Application End<span className="text-danger">{" "}*</span></label>
                                        <input
                                            type="date"
                                            name="jobStartDate"
                                            id="jobStartDate"
                                            placeholder=""
                                            className={`form-control ${errors.job_end_date ? 'border-danger' : ''}`}
                                            value={jobEndDate}
                                            onChange={(e) => setJobEndDate(e.target.value)}
                                        />
                                        {errors.job_end_date && (
                                            <span className="error">{errors.job_end_date}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="mb-3">
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
                                            <div className="mb-3">
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
                                            <div className="mb-3">
                                                <label>Apply Link</label>
                                                <textarea type="text"
                                                    className={`form-control ${errors.apply_link ? 'border-danger' : ''}`}
                                                    placeholder="Enter Description"
                                                    defaultValue={applyLink}
                                                    onChange={(e) => setApplyLink(e.target.value)}
                                                />
                                                {errors.apply_link && (
                                                    <span className="error">{errors.apply_link}</span>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label>Other Details or Description if any </label>
                                                <div className="">

                                                    <Editor
                                                        editorState={editorState}
                                                        onEditorStateChange={onEditorStateChange}
                                                        wrapperClassName="wrapper-class"
                                                        editorClassName="editor-class custom-editor-height editor-border p-2"
                                                        toolbarClassName="toolbar-class toolbar-border"
                                                    />
                                                </div>
                                                {errors.description && (
                                                    <span className="error">{errors.description}</span>
                                                )}
                                            </div>

                                            <div className="form-check mt-2">
                                                <p>Apply From URL ?</p>
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
                                            <div className="m-3">
                                                <label>
                                                    Apply With Resume?
                                                </label>
                                                <div>
                                                    <label className="form-control">
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            value="yes"
                                                            checked={applyWithResume}
                                                            onChange={handleApplyWithResume}
                                                        />
                                                        Yes
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="form-control">
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            value="no"
                                                            checked={!applyWithResume}
                                                            onChange={handleApplyWithResume}
                                                        />
                                                        No
                                                    </label>
                                                </div>
                                            </div>



                                        </div>


                                        <div className="col-md-6 col-sm-12 mt-2">

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

                                        <div className="">
                                            <button type="button" className="btn btn-primary w-100" onClick={handleSubmit}>Submit</button>
                                        </div>



                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>

    );
}
export default CreateJob;