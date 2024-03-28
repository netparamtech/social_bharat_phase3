import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../../actions/loaderAction';
import { createNewJobPost, fetchAllCitiesByStateID, fetchAllStatesByCountryID, uploadImage, uploadPdf } from '../../services/userService';
import { toast } from 'react-toastify';
import { isEmail } from '../validator/Validator';

function CreateNewJob(props) {
    const { handleIsCreateClicked } = props;
    const [validated, setValidated] = useState(false);
    const [jobTitle, setJobTitle] = useState('');
    const [jobSector, setJobSector] = useState('');
    const [jobType, setJobType] = useState("");
    const [subHeading, setSubHeading] = useState('');
    const [email, setEmail] = useState('');
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

    //validations
    const [emailError, setEmailError] = useState('');


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const jobTypeOption = ["Part Time", "Full Time", "Freelance", "Other"]
    const jobSectorOptions = ["Private Jobs", "Government Jobs", "Other"];

    const handleJobTypeChange = (e) => {
        const inputValue = e.target.value;
        setJobType(inputValue);
        // Validate input length
        if (inputValue.trim().length > 0) {
            e.target.setCustomValidity('');
        } else {
            e.target.setCustomValidity('Please enter at least 3 characters.');
        }
    }
    const handleJobTitleChange = (e) => {
        const inputValue = e.target.value;
        setJobTitle(inputValue);

        // Validate input length
        if (inputValue.trim().length >= 3) {
            e.target.setCustomValidity('');
        } else {
            e.target.setCustomValidity('Please enter at least 3 characters.');
        }
    }
    const handleJobSectorChange = (e) => {
        const inputValue = e.target.value;
        console.log(e.target.value)
        setJobSector(e.target.value);
        // Validate input length
        if (inputValue.trim().length > 0) {
            e.target.setCustomValidity('');
        } else {
            e.target.setCustomValidity('Please enter at least 3 characters.');
        }
    }
    const handleJobSubheadingChange = (e) => {
        const inputValue = e.target.value;
        setSubHeading(inputValue);

        // Validate input length
        if (inputValue.trim().length >= 3) {
            e.target.setCustomValidity('');
        } else {
            e.target.setCustomValidity('Please enter at least 3 characters.');
        }
    }
    const handleEmailChange = (e) => {
        const inputValue = e.target.value;
        setEmail(e.target.value);
        // Validate input length
        if (inputValue.trim().length > 0) {
            const isValid = isEmail(inputValue);
            if (isValid) {
                e.target.setCustomValidity('');
                setEmailError('');
            } else {
                e.target.setCustomValidity('Invalid Email Format.');
                setEmailError('Invalid Email Format.');
            }

        } else {
            e.target.setCustomValidity('Please enter email.');
            setEmailError('Please enter email.');
        }
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
                e.target.setCustomValidity('');
            }
        } catch (error) {
            // Handle error
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
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
                setErrors(error.response.data.errors);
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

    //state and city change operations
    const handleStateChange = (e) => {
        const inputValue = e.target.value;
        setSelectedState(inputValue);
        console.log(inputValue, "inputValue")
        if (inputValue) {
            const selectedStateObject = states.find(
                (state) => state.name === inputValue
            );
            console.log(selectedStateObject)
            if (selectedStateObject) {
                getAllCities(selectedStateObject.id);
            }
        }

        // Update selected city to null when state changes
        setSelectedCity('');
    };

    const handleCityChange = (e) => {
        const inputValue = e.target.value;
        setSelectedCity(inputValue);
    };
    const handleLocationChange = (e) => {
        const inputValue = e.target.value;
        setLocation(inputValue);
        // Validate input length
        if (inputValue.trim().length >= 3) {
            e.target.setCustomValidity('');
        } else {
            e.target.setCustomValidity('Please enter at least 3 characters.');
        }
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

    const handleSubmit1 = async () => {
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
            apply_link: applyLink,
            job_apply_form: isApplyForm,
            job_start_date: jobStartDate,
            job_end_date: jobEndDate,
            fee_details: application_fee_details,
            state: selectedState && selectedState.label,
            city: selectedCity && selectedCity.label,
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




    const handleSubmit = (event) => {
        const form = event.currentTarget;
        console.log(event.currentTarget)
        if (form.checkValidity() === false) {
            if (!email) {
                setEmailError("Email is Required.");
            }
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Job Title"
                        value={jobTitle}
                        onChange={handleJobTitleChange}
                        isInvalid={validated && !jobTitle}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a job title with at least 3 characters.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Job Sector</Form.Label>
                    <Form.Select aria-label="Default select example" value={jobSector} onChange={handleJobSectorChange} required>
                        <option value=''>Select...</option>
                        {jobSectorOptions.map((option, index) => (
                            <option value={option}>
                                {option}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Please select job sector..
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Job Type</Form.Label>
                    <Form.Select aria-label="Default select example" value={jobType} onChange={handleJobTypeChange} required>
                        <option value=''>Select...</option>
                        {jobTypeOption.map((option, index) => (
                            <option value={option}>
                                {option}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Please select job type..
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Job Title"
                        value={subHeading}
                        onChange={handleJobSubheadingChange}
                        isInvalid={validated && !subHeading}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter company name with at least 3 characters.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>State</Form.Label>
                    <Form.Select aria-label="Default select example" value={selectedState} onChange={handleStateChange} required>
                        <option value=''>Select...</option>
                        {states.map((option, index) => (
                            <option value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </Form.Select>

                    <Form.Control.Feedback type="invalid">
                        Please select state.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>City</Form.Label>
                    <Form.Select aria-label="Default select example" value={selectedCity} onChange={handleCityChange} required>
                        <option value=''>Select...</option>
                        {cities.map((option, index) => (
                            <option value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </Form.Select>

                    <Form.Control.Feedback type="invalid">
                        Please select city.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Location..."
                        value={location}
                        onChange={handleLocationChange}
                        isInvalid={validated && !location}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a location with at least 3 characters.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Attachment</Form.Label>
                    <Form.Control
                        required
                        type="file"
                        placeholder="Enter Job Title"
                        value={selectedFile}
                        accept=".pdf"
                        onChange={handleAttachmentChange}
                        isInvalid={validated && !selectedFile}
                    />
                    {previewSelectedFile && (
                        <div >
                            <embed src={previewSelectedFile} type="application/pdf" width="100%" height="300px" />

                        </div>
                    )}
                    {messageAttachment && <span className="error">{messageAttachment}</span>}
                    {errors.attachment && (
                        <span className="error">{errors.attachment}</span>
                    )}
                    <Form.Control.Feedback type="invalid">
                        Please select attachment (pdf only).
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Logo Image(Optional)</Form.Label>
                    <Form.Control
                        required
                        type="file"
                        placeholder="Enter Job Title"
                        accept=".jpg,.jpeg,.png"
                        value={logo}
                        onChange={handleLogoChange}
                        isInvalid={validated && !logo}
                    />
                    {logoPreview && (
                        <div >
                            <img src={logoPreview} width="100%" height={300} />

                        </div>
                    )}
                    {messageLogo && <span className="error">{messageLogo}</span>}
                    {errors.logo && (
                        <span className="error">{errors.logo}</span>
                    )}
                    <Form.Control.Feedback type="invalid">
                        Please select logo.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                </Form.Group>





                {/* <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Username</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            onChange={handleEmailChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {emailError && emailError }
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group> */}
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="State" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid state.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="text" placeholder="Zip" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid zip.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                />
            </Form.Group>
            <Button type="submit">Submit form</Button>
        </Form>
    );
}

export default CreateNewJob;