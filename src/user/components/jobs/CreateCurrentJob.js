import React, { useState, useEffect } from 'react';
import { createCurrentJob, fetchAllCitiesByStateID, fetchAllStatesByCountryID } from '../../services/userService';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';
import { logout } from '../../actions/userAction';
import { toast } from 'react-toastify';
import { successOptions } from '../../../toastOption';
const CreateCurrentJob = () => {

    const [addressType, setAddressType] = useState('');
    const [addressLine, setAddressLine] = useState('');
    const [selectedCountry, setSelectedCountry] = useState("India");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countryID, setCountryID] = useState(101);

    const [role, setRole] = useState('');
    const [company, setCompany] = useState('');
    const [applyUrl, setApplyUrl] = useState('');

    const [errors, setErrors] = useState('');
    const [serverError, setServerError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleJobRole = (e) => {
        setRole(e.target.value);
    };

    const handleCompanyName = (e) => {
        setCompany(e.target.value);
    };

    const handleApplyUrl = (e) => {
        setApplyUrl(e.target.value);
    }

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
                setServerError("");
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                dispatch(logout());
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
                    setServerError("");
                }
            } catch (error) {
                //Unauthorized
                if (error.response && error.response.status === 401) {
                    dispatch(logout());
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoader(true));

        const updatedData = {
            role,
            company,
            apply_url: applyUrl,
            city: selectedCity&&selectedCity.label,
            state: selectedState&&selectedState.label,
        };

        try {
            const response = await createCurrentJob(updatedData);

            if (response && response.status === 201) {
                setErrors('');
                setServerError('');
                setRole('');
                setSelectedCity(null);
                setSelectedState(null);
                setCompany('');
                setApplyUrl('');
                toast.success("Successfully Created Job", successOptions);
                dispatch(setLoader(false));
            }
        } catch (error) {
            dispatch(setLoader(false));
            // Handle error
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);

            }

            //Unauthorized
            else if (error.response && error.response.status === 401) {
                navigate('/login');
            }
            //already exist
            else if (error.response && error.response.status === 403) {
                setServerError(error.response.data.message);
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        }
    };


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
        <div id="auth-wrapper" className="pt-5 pb-5">
            <div className="container">
                <div className={`card ${errors ? 'border-danger' : ''}`}>
                    <div className="">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12 p-4">
                                <form onSubmit={handleSubmit} className="w-100 w-lg-75">
                                    <fieldset className="shadow">
                                    <legend className='d-flex justify-content-between'>Create Current Job Opening
                                            <div className='hover-pointer hover-pointer-green' onClick={()=>navigate(-1)}>Go Back</div>
                                        </legend>
                                        <div className="card p-3">
                                            {serverError && <span className="fs-5 text-danger">{serverError}</span>}
                                            <div className="row">
                                                <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                                    <label className="form-label">Job Role{" "}<span className="text-danger">*</span></label>
                                                    <input
                                                        className="form-control"
                                                        value={role}
                                                        onChange={handleJobRole}
                                                        placeholder='Enter Job Role'
                                                    />
                                                    {errors.role && <span className='error'>{errors.role}</span>}
                                                </div>
                                                <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                                    <label className="form-label">Company Name{" "}<span className="text-danger">*</span></label>
                                                    <input
                                                        className="form-control"
                                                        value={company}
                                                        onChange={handleCompanyName}
                                                        placeholder='Enter Company Name'
                                                    />
                                                    {errors.company && <span className='error'>{errors.company}</span>}
                                                </div>
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
                                                    {errors.state && <span className='error'>{errors.state}</span>}
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
                                                    {errors.city && <span className='error'>{errors.city}</span>}
                                                </div>

                                            </div>

                                            <div className='row'>
                                                <div className="mb-3 col-lg-12 col-sm-12 col-xs-12">
                                                    <label className="form-label">Apply Urls{" "}<span className="text-danger">*</span></label>
                                                    <textarea
                                                        type="text"
                                                        name="addressLine"
                                                        id="addressLine"
                                                        placeholder="Enter Address Line"
                                                        className="form-control"
                                                        value={applyUrl}
                                                        onChange={handleApplyUrl}
                                                        autoFocus
                                                    />
                                                    {errors.apply_url && <span className='error'>{errors.apply_url}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-lg-6 col-sm-12 col-xs-12">
                                                <button type="submit" className="btn btn-primary">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    );
};

export default CreateCurrentJob;
