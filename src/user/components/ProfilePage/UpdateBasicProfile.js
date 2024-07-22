import { useEffect, useState } from "react";
import React from "react";
import {
  fetchAllActiveQualifications,
  fetchAllCitiesByStateID,
  fetchAllStatesByCountryID,
  fetchOneCommunity,
  updateBasicProfile,
} from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import dayjs from 'dayjs';
import { DatePicker, notification } from 'antd';
import { useMemo } from 'react';
import { setLoader } from "../../actions/loaderAction";
import WOW from 'wowjs';
import { yyyyMmDdFormat } from "../../util/DateConvertor";
import InputField from "../custom/InputField";
import HtmlSelect from '../custom/HtmlSelect';
import SelectField from "../custom/SelectField";
import { toast } from "react-toastify";
import { errorOptions } from "../../../toastOption";

const { RangePicker } = DatePicker;
const dateFormat = 'DD-MM-YYYY';

const Context = React.createContext({
  name: 'Default',
});

const UpdateBasicProfile = () => {
  const user = useSelector((state) => state.userAuth);
  const [community, setCommunity] = useState('');

  const [name, setName] = useState(user.user.name); // Initial name
  const [gender, setGender] = useState(user.user.gender); // Initial gender
  const [email, setEmail] = useState(user.user.email); // Initial email
  const [token, setToken] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);

  const [errors, setErrors] = useState("");
  const [serverError, setServerError] = useState("");

  const [dob, setDOB] = useState(dayjs().add(0, 'day')); // Initial DOB
  const [age, setAge] = useState(0); // Initial age
  const [maritalStatus, setMaritalStatus] = useState(null); // Initial marital status
  const [occupation, setOccupation] = useState(null);
  const [qualification, setQualification] = useState(null);
  const [qualificationID, setQualificationID] = useState('');
  const [qualificationList, setQualificationList] = useState([]);
  const [jobType, setJobType] = useState(null);
  const minDate = '1900-01-01';
  const maxDate = '2015-12-31';
  const maritalStatusOptions = [
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
    { value: "Divorced", label: "Divorced" },
    { value: "Widow", label: "Widow" },
  ];
  const occupationOptions = [
    { value: "Govt", label: "Government Sector" },
    { value: "Private Job", label: "Private Sector" },
    { value: "Business ", label: "Business" },
    { value: "Farmer", label: "Farmer" },
    { value: "Service", label: "Service" },
    { value: "Other", label: "Other" },
  ];
  const [isAvailableForMarriage, setIsAvailableForMarriage] = useState(false);
  const [showMarriageStatus, setShowMarriageStatus] = useState(false);
  const [showAvailableForMarriage, setShowAvailableForMarriage] = useState(false);

  //validation error
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [dobError, setDobError] = useState('');
  const [stateError, setStateError] = useState('');
  const [cityError, setCityError] = useState('');
  const [highQualificationError, setHighQualificationError] = useState('');
  const [jobTypeError, setJobTypeError] = useState('');
  const [jobDetailsError, setJobDetailsError] = useState('');
  const [maritalStatusError, setMaritalStatusError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNameChange = (e, errorMsg) => {
    setName(e.target.value);
    setNameError(errorMsg);
  };

  const handleGenderChange = (e, errorMsg) => {
    setGender(e.target.value);
    setGenderError(errorMsg);
  };

  const handleEmailChange = (e, errorMsg) => {
    setEmail(e.target.value);
    setEmailError(errorMsg);
  };

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
  ]
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

  const handleMaritalStatusChange = (selectedOption, errorMsg) => {
    setMaritalStatusError(errorMsg);
    setMaritalStatus(selectedOption);
  };

  // Handle onChange for each input field
  const handleQualificationChange = (selectedOption, errorMsg) => {
    setHighQualificationError(errorMsg);
    setQualificationID(selectedOption.value);
    setQualification(selectedOption); // Update the degree state with the selected option
  };

  const handleJobType = (selectedOption, errorMsg) => {
    if (selectedOption) {
      setJobTypeError(errorMsg);
      setJobType(selectedOption);
    }
  }

  const handleAvailableMarriageCheckboxChange = (e) => {
    setIsAvailableForMarriage(e.target.checked);
  };

  const fetchLoggedUserCommunity = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchOneCommunity();
      if (response && response.status === 200) {
        setCommunity(response.data.data);
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

  const handleStateChange = (selectedOption, errorMsg) => {
    setStateError(errorMsg);
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

  const handleCityChange = (selectedOption, errorMsg) => {
    setCityError(errorMsg);
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

  const fetchAllQualification = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllActiveQualifications();
      if (response && response.status === 200) {
        setQualificationList(response.data.data.qualifications);
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        navigate('/login');
      }
    } finally {
      dispatch(setLoader(false));
    }
  }

  useEffect(() => {
    new WOW.WOW({
      live: true
    }).init();
  }, [])

  useEffect(() => {
    fetchAllQualification();
  }, []);

  useEffect(() => {
    if (user.user && user.user.dob !== null) {
      setDOB(yyyyMmDdFormat(user.user.dob));
    }
  }, [user]);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: <Context.Consumer>{({ name }) => `Hello, ${user.user.name}!`}</Context.Consumer>,
      description: 'Your profile is updated successfully.',
      placement,
    });
  };
  const contextValue = useMemo(
    () => ({
      name: 'Ant Design',
    }),
    [],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(nameError||emailError||genderError||dobError||
      stateError||cityError||highQualificationError||
      jobTypeError||maritalStatusError||jobDetailsError||
      !name||!email||!gender||!dob||!selectedState||!selectedCity||
      !occupation||!jobType||!maritalStatus
    ){
      toast.error("Please fill in all the required fields before submitting.",errorOptions);
      return;
    }
    dispatch(setLoader(true));

    const arrayName = name.split(' ');
    const modifiedName = arrayName.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

    // Prepare the updated data
    const updatedData = {
      name: modifiedName,
      gender,
      email,
      native_place_city: selectedCity ? selectedCity.label : '',
      native_place_state: selectedState ? selectedState.label : '',
      dob: dob,
      is_available_for_marriage: isAvailableForMarriage,
      marital_status: maritalStatus ? maritalStatus.label : '',
      occupation: occupation,
      job_type: jobType && jobType.label,
      highest_qualification: qualification.label
    };

    // Call the API to update the basic profile information
    try {
      const response = await updateBasicProfile(updatedData);
      if (response && response.status === 200) {
        setErrors("");
        setServerError('');
        dispatch(login(response.data.data, token));
        if (isAvailableForMarriage) {
          openNotification('topLeft')
          setTimeout(() => {
            navigate("/user/create-matrimonial-profile")
          }, 2000);
        } else {
          openNotification('topLeft')
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
        }
      }
    } catch (error) {
      // Handle error
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
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
  };

  useEffect(() => {
    setToken(user.token || "");
    setCountryID(101);
    setSelectedState({
      value: user.user.native_place_state,
      label: user.user.native_place_state,
    }); // Set the selected state as an object
    setSelectedCity({
      value: user.user.native_place_city,
      label: user.user.native_place_city,
    }); // Set the selected city as an object
    if (user.user.marital_status) {
      setMaritalStatus({
        value: user.user.marital_status,
        label: user.user.marital_status,
      });
      setShowMarriageStatus(true);
    } else {
      setIsAvailableForMarriage(false);
    }
    if (user.user.marital_status === 'Married') {
      setIsAvailableForMarriage(false);
      setShowAvailableForMarriage(false)
    }
    setOccupation(user.user.occupation);
    setJobType({ value: user.user.job_type, label: user.user.job_type });

    setQualification({
      value: user && user.user && user.user.highest_qualification,
      label: user && user.user && user.user.highest_qualification
    });

  }, [user]);

  useEffect(() => {
    // Check if selectedCountry is already set
    getAllStates();
  }, []);

  useEffect(() => {
    if (states && user) {
      const selectedStateObject = states.find(
        (state) => state.name === user.user.native_place_state
      );
      if (selectedStateObject) {
        getAllCities(selectedStateObject.id);
      }
    }
  }, [states]);

  useEffect(() => {
    if (dob) {
      const dobDate = new Date(dob);
      const currentDate = new Date();

      // Calculate the age in years
      const ageInMilliseconds = currentDate - dobDate;
      const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));

      setAge(ageInYears);
    }
  }, [dob]);

  useEffect(() => {
    if (age >= 21 && gender === 'Male') {
      setShowMarriageStatus(true);
    } else if (age >= 18 && gender === 'Female') {
      setShowMarriageStatus(true);
    } else {
      setShowMarriageStatus(false);
      if (maritalStatus && gender === null || maritalStatus && age === null) {
        setShowMarriageStatus(true);
      }
    }
  }, [age, gender]);

  useEffect(() => {
    if (maritalStatus) {

      if (maritalStatus.label !== 'Married' && maritalStatus.label !== 'Engaged') {
        if (age >= 21 && gender === 'Male') {
          setShowAvailableForMarriage(true);
        } else if (age >= 18 && gender === 'Female') {
          setShowAvailableForMarriage(true);
        } else {
          setShowAvailableForMarriage(false);
          if (maritalStatus && gender === null || maritalStatus && age === null) {
            setShowAvailableForMarriage(true);
          }
        }
      } else {
        setShowAvailableForMarriage(false);
        setIsAvailableForMarriage(false);
      }
    }
  }, [maritalStatus]);

  useEffect(() => {
    if (user.user.is_available_for_marriage) {
      setShowAvailableForMarriage(true);
      setIsAvailableForMarriage(true);
    } else {
      setShowAvailableForMarriage(false);
      setIsAvailableForMarriage(false);
    }
  }, [user]);

  useEffect(() => {
    fetchLoggedUserCommunity();
  }, []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div id="auth-wrapper" className="pt-5 pb-5">
        <div className="container">
          <div className={`card ${errors ? 'border-danger' : ''}`}>
            <div className="">
              {serverError && <span className='error'>{serverError}</span>}
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 p-4">
                  <form onSubmit={handleSubmit} className="w-100 w-lg-75">
                    <fieldset className="shadow">
                      <legend>Basic Profile</legend>
                      <div className="card p-3">
                        <div className="row ">
                          <div className="mb-3 col-lg-6 col-sm-12 col-xs-12 ">
                            <InputField errorServer={errors.name} label="Name" handleChange={handleNameChange}
                              placeholder="Enter your name. Example: Vipul Sharma"
                              value={name} isRequired={true} isAutoFocused={true}
                              maxLength={100} fieldName="Name" />
                          </div>

                          <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                            <InputField errorServer={errors.email} label="Email" handleChange={handleEmailChange} boxFor="email"
                              placeholder="Enter Email"
                              value={email} isRequired={true} isAutoFocused={false}
                              maxLength={100} fieldName="Email" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                            <HtmlSelect handleSelectChange={handleGenderChange} options={genderOptions} value={gender} isRequired={true} errorServer={errors.gender}
                              label="Gender" fieldName="Gender" />
                          </div>


                          <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                            <label className="form-label">Date of Birth {" "}<span className="text-danger">*</span></label>
                            <input
                              type="date"
                              name="jobStartDate"
                              id="jobStartDate"
                              placeholder=""
                              className="form-control"
                              value={dob}
                              onChange={(e) => setDOB(e.target.value)}
                              max={maxDate}
                              min={minDate}
                            />
                            {errors.dob && (
                              <span className="error">{errors.dob}</span>
                            )}
                            {/* Add error handling if needed */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                            <SelectField handleSelectChange={handleStateChange} isRequired={true} value={selectedState}
                              errorServer={errors.native_place_state} placeholder="select state..." label="State"
                              options={stateOptions} fieldName="State" />
                          </div>

                          <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                            <SelectField handleSelectChange={handleCityChange} isRequired={true} value={selectedCity}
                              errorServer={errors.native_place_city} placeholder="select city..."
                              options={cityOptions} fieldName="City" label="City" />
                          </div>
                        </div>

                        <div className="row">

                          <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                            <SelectField handleSelectChange={handleQualificationChange} isRequired={true} value={qualification}
                              errorServer={errors.highest_qualification} placeholder="---Select...---" label="Highest Qualification"
                              options={
                                qualificationList &&
                                qualificationList.map((qualification) => ({
                                  value: qualification.title,
                                  label: qualification.title,
                                }))
                              } fieldName="Highest qualification" />
                          </div>
                          <div className="mb-3 col-lg-6 col-sm-12 col-xs-12 ">
                            <label className="form-label">Community</label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Enter your name"
                              className="form-control"
                              defaultValue={community && community.name}
                              disabled
                            />

                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                            <SelectField handleSelectChange={handleJobType} isRequired={true} value={jobType}
                              errorServer={errors.job_type} placeholder="Select..."
                              options={occupationOptions} fieldName="Job Type" label="Job Type" />
                            {/* Add error handling if needed */}
                          </div>
                          <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                            <InputField errorServer={errors.occupation} label="Job Detail" handleChange={(e, errorMsg) => {
                              setOccupation(e.target.value);
                              setJobDetailsError(errorMsg);
                            }}
                              placeholder="Example: Software Engineer, Grocery Shop Owner"
                              value={occupation} isRequired={true}
                              maxLength={200} fieldName="Job Detail" />
                            {/* Add error handling if needed */}
                          </div>
                        </div>
                        <div className="row">
                          <div className={`mb-3 col-lg-6 col-sm-12 col-xs-12 ${showMarriageStatus ? '' : 'd-none'}`}>

                            <SelectField handleSelectChange={handleMaritalStatusChange} isRequired={true} value={maritalStatus}
                              errorServer={errors.marital_status} placeholder="Select..."
                              options={maritalStatusOptions} fieldName="Marital status" label="Marital Status" />
                          </div>


                        </div>



                        <div className={`mb-3 col-lg-6 col-sm-12 col-xs-12 ${showMarriageStatus && showAvailableForMarriage ? '' : 'd-none'}`}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="marriageCheckbox"
                              checked={isAvailableForMarriage}
                              onChange={handleAvailableMarriageCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor="marriageCheckbox">
                              Is Available For Marriage
                            </label>
                          </div>
                        </div>

                      </div>

                      <div className="row mt-4">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <button type="submit" className="btn btn-primary">
                            Update
                          </button>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Context.Provider>
  );
};

export default UpdateBasicProfile;
