import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setLoader } from "../../actions/loaderAction";
import { fetchAllServices, fetchUserRegisteredSingleService, updateUserService } from "../../services/userService";
import Select from "react-select";

const UpdateRegisteredService = () => {
    const { id } = useParams();
    const [service, setService] = useState([]);
    const [data, setData] = useState([]);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [serviceTitle, setServiceTitle] = useState('');
    const [mobile1, setMobile1] = useState('');
    const [mobile2, setMobile2] = useState('');
    const [experience, setExperience] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Active');
    const [disableServiceTitle, setDisableServiceTitle] = useState(true);

    const [errors, setErrors] = useState('');
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSelectService = (selectedOption) => {

        setSelectedService(selectedOption);
    }
    const fetchServices = async () => {
        dispatch(setLoader(false));
        try {
            const response = await fetchAllServices();
            if (response && response.status === 200) {
                setService(response.data.data);
                setServerError('');
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
        }
    };

    const fetchSingleService = async () => {
        dispatch(setLoader(false));
        try {
            const response = await fetchUserRegisteredSingleService(id);
            if (response && response.status === 200) {
                setData(response.data.data);
                setServerError('');
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
        }
    };

    useEffect(() => {
        // Update the dropdownOptions whenever copyService changes
        setDropdownOptions([
            ...service.map((state) => ({
                value: state.title,
                label: state.title,
            })),
            { value: 'Other', label: 'Other' },
        ]);
    }, [service]);

    useEffect(() => {
        if (selectedService) {
            if (selectedService.label !== 'Other') {
                setServiceTitle(selectedService.label);
                setDisableServiceTitle(true);
                setStatus('Active');
            } else {
                setServiceTitle('');
                setDisableServiceTitle(false);
                setStatus('Inactive');
            }

        }
    }, [selectedService]);

    useEffect(() => {
        if (data.length > 0) {
            setSelectedService({
                value: data[0].title,
                label: data[0].title,
            });
            setMobile1(data && data[0].mobile1);
            setMobile2(data && data[0].mobile2);
            setExperience(data && data[0].experience);
            setLocation(data && data[0].location);
            setDescription(data && data[0].description);
        }
    }, [data])

    useEffect(() => {
        window.scroll(0, 0);
        fetchServices();
    }, []);
    useEffect(() => {
        fetchSingleService();
    }, []);

    const handleSubmit = async () => {
        const data = {
            title: serviceTitle,
            mobile1,
            mobile2,
            experience,
            location,
            description,
            status,
        };

        try {
            dispatch(setLoader(true));
            const response = await updateUserService(data, id);
            if (response && response.status === 201) {
                window.scroll(0, 0);
                setErrors("");
                navigate('/user/user-registered-services');

            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
            } else if (error.response && error.response.status === 401) {
                setErrors('');
            }
            else if (error.response && error.response.status === 500) {
                setErrors('');
            }
        } finally {
            dispatch(setLoader(false));
        }
    }
    return (
        <div id="searchPeople-section" className="pt-4 mb-4">
            <div className="container">

                <div className='col-md-12'>
                    <div className={`card shadow mb-2 ${errors ? 'border-danger' : ''}`}>
                    <div className="card-header bg-success">
                        <div className="d-sm-flex align-items-center justify-content-between text-light fs-5">
                            Update Service
                            <a className="d-sm-inline-block btn btn-sm btn-primary shadow-sm hover-pointer fs-5"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/user/user-registered-services')
                                }}
                            >
                                My Services
                            </a>
                        </div>
                    </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 form-group mb-4">

                                    <Select
                                        className="form-control"
                                        aria-label="Default select example"
                                        options={dropdownOptions}
                                        value={selectedService}
                                        placeholder="Select Your Service"
                                        onChange={handleSelectService}
                                    />
                                    <p>अगर आपकी सेवा उपलब्ध नहीं है, तो 'अन्य' (Other) विकल्प चुनें।</p>

                                </div>
                                <div className="col-md-6 form-group mb-4">
                                    <input
                                        type="text"
                                        placeholder="Enter Service Title"
                                        className="form-control"
                                        value={serviceTitle}
                                        onChange={(e) => setServiceTitle(e.target.value)}
                                        disabled={disableServiceTitle}
                                    />
                                    {errors.title && (
                                        <span className="error">{errors.title}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 form-group mb-4">
                                    <input
                                        type="number"
                                        placeholder="Enter Your Mobile Number 1"
                                        className="form-control"
                                        value={mobile1}
                                        onChange={(e) => setMobile1(e.target.value)}
                                    />
                                    {errors.mobile1 && (
                                        <span className="error">{errors.mobile1}</span>
                                    )}
                                </div>
                                <div className="col-md-6 form-group mb-4">
                                    <input
                                        type="number"
                                        placeholder="Enter Your Mobile Number 2"
                                        className="form-control"
                                        value={mobile2}
                                        onChange={(e) => setMobile2(e.target.value)}
                                    />
                                    {errors.mobile2 && (
                                        <span className="error">{errors.mobile2}</span>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 form-group mb-4">
                                    <input
                                        type="text"
                                        placeholder="Enter Experience"
                                        className="form-control"
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                    />
                                    {errors.experience && (
                                        <span className="error">{errors.experience}</span>
                                    )}
                                </div>
                                <div className="col-md-6 form-group mb-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Service At(i.e.Jaipur(rajasthan))"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                    {errors.location && (
                                        <span className="error">{errors.location}</span>
                                    )}
                                </div>
                            </div>
                            <div className="form-group mb-4 ">
                                <textarea
                                    className="form-control"
                                    placeholder="Enter details"
                                    id="floatingTextarea"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                                {errors.description && (
                                    <span className="error">{errors.description}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <button
                                    className="form-control w-100 btn-success bg-primary fs-5"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default UpdateRegisteredService;