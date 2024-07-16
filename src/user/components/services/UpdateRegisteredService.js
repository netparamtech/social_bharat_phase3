import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setLoader } from "../../actions/loaderAction";
import { fetchAllCitiesByStateID, fetchAllServices, fetchAllStatesByCountryID, fetchCategoryByTitle, fetchUserRegisteredSingleService, updateUserService } from "../../services/userService";
import Select from "react-select";
import { Select as AntSelect, Space } from 'antd';
import { logout } from "../../actions/userAction";

const UpdateRegisteredService = () => {
    const { id } = useParams();
    const [service, setService] = useState([]);
    const [data, setData] = useState([]);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [serviceTitle, setServiceTitle] = useState('');
    const [category, setCategory] = useState([]);
    const [preCat, setPreCat] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [mobile1, setMobile1] = useState('');
    const [mobile2, setMobile2] = useState('');
    const [experience, setExperience] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Inactive');
    const [disableServiceTitle, setDisableServiceTitle] = useState(true);
    const [copyService, setCopyService] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    const [errors, setErrors] = useState('');
    const [serverError, setServerError] = useState('');

    const [selectedCountry, setSelectedCountry] = useState("India");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countryID, setCountryID] = useState(101);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSelectService = (selectedOption) => {
        setSelectedService(selectedOption);
        if (selectedOption) {
            let result = selectedOption.category.split(',');
            setCategory(result);
        }
    };
    const handleChange = (value) => {
        setSelectedCategory(value);
    };

    //state and city operations
    //state and city change operations
    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption);

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

    const fetchServices = async () => {
        dispatch(setLoader(false));
        try {
          const response = await fetchAllServices();
          if (response && response.status === 200) {
            const filteredFetch = response.data.data.filter(
              (item) => item && item.status === "Active"
            );
            setService(filteredFetch);
            setCopyService(filteredFetch);
            setServerError("");
          }
        } catch (error) {
          //Unauthorized
          if (error.response && error.response.status === 401) {
            dispatch(logout());
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
        if (category) {
            let options = [];
            category.map((item, index) => {
                options.push({
                    label: item,
                    value: item,
                });
            })
            setOptions(options);
        }
    }, [category]);

    useEffect(() => {
        // Update the dropdownOptions whenever copyService changes
        setDropdownOptions([
            ...service.map((state) => ({
                value: state.title,
                label: state.title,
                category: state.category,
            })),
            { value: 'Other', label: 'Other', category: 'Other' },
        ]);
    }, [service]);

    useEffect(() => {
        if (selectedService) {
            if (selectedService.label !== 'Other') {
                setServiceTitle(selectedService.label);
                setDisableServiceTitle(true);

            } else {
                setServiceTitle('');
                setDisableServiceTitle(false);

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
            if (data && data[0].state) {
                setSelectedState({ value: data && data[0].state, label: data && data[0].state });
            }
            if (data && data[0].city) {
                setSelectedCity({ value: data && data[0].city, label: data && data[0].city });
            }

            setDescription(data && data[0].description);
            setServiceTitle(data && data[0].title);
            const res = data[0].category.split(',');
            setSelectedCategory(res);

            setStatus(data && data[0].status);
            if (data[0].status === 'Active') {
                setIsUpdate(true);
            } else {
                setIsUpdate(false);
            }
            if (data && data[0].available_categories) {
                const result = data[0].available_categories.split(',');
                console.log(result)
                let options = [];
                result.map((item, index) => {
                    options.push({
                        label: item,
                        value: item,
                    });
                })
                setOptions(options);
            }
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
        let category = '';
        if (selectedCategory) {
            category = selectedCategory.toString();
        }
        const data = {
            title: serviceTitle,
            mobile1,
            mobile2,
            experience,
            location,
            state: selectedState && selectedState.label ? selectedState.label : '',
            city: selectedCity && selectedCity.label ? selectedCity.label : '',
            category: category ? category : '',
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
                            {!isUpdate && <p className="col-12 error">You cannot update until admin approves it.</p>}
                            <div className="row">
                                <div className="col-md-6 form-group mb-4">
                                    <label>Service</label>

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
                                    <label>Service Title</label>
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
                                <div className="form-group mb-4">
                                    <Space
                                        style={{
                                            width: '100%',
                                        }}
                                        direction="vertical"
                                    >
                                        <AntSelect
                                            mode="multiple"
                                            allowClear
                                            style={{
                                                width: '100%',
                                            }}
                                            value={selectedCategory}
                                            placeholder="Please select categories..."
                                            onChange={handleChange}
                                            options={options}
                                        />
                                    </Space>
                                    {errors.category && (
                                        <span className="error">{errors.category}</span>
                                    )}

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 form-group mb-4">
                                    <label>Mobile 1</label>
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
                                    <label>Mobile 2</label>
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
                                <div className="form-group mb-4 col-6">
                                    <label>State</label>
                                    <Select
                                        className="form-control"
                                        options={states.map((state) => ({
                                            value: state.name,
                                            label: state.name,
                                        }))}
                                        value={selectedState}
                                        onChange={handleStateChange}
                                        placeholder="select state..."
                                    />
                                    {errors.state && (
                                        <span className="error">{errors.state}</span>
                                    )}


                                </div>

                                <div className="form-group mb-4 col-6">
                                    <label>City</label>

                                    <Select
                                        className="form-control"
                                        options={cities.map((city) => ({
                                            value: city.name,
                                            label: city.name,
                                        }))}
                                        value={selectedCity}
                                        onChange={handleCityChange}
                                        placeholder="select city..."
                                    />
                                    {errors.city && (
                                        <span className="error">{errors.city}</span>
                                    )}

                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-6 form-group mb-4">
                                    <label>Experience</label>
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
                                    <label>Service Provides At</label>
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
                                <label>Description</label>
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
                            <div className="form-group mx-auto col-md-3 col-12">
                                <button
                                    className="form-control w-100 btn-success fs-5"
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