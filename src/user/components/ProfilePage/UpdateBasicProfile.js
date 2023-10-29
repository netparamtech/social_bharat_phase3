import { useEffect, useState } from "react";
import React from "react";
import {
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

  const [dob, setDOB] = useState(dayjs(user.user.dob != null && user.user.dob).add(0, 'day')); // Initial DOB
  const [age, setAge] = useState(0); // Initial age
  const [maritalStatus, setMaritalStatus] = useState(null); // Initial marital status
  const [occupation, setOccupation] = useState(null);
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDOBChange = (isoDateString) => {
    if (isoDateString) {
      const date = new Date(isoDateString); // Parse ISO date string
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, '0'); // Months are zero-based
      const day = `${date.getDate()}`.padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setDOB(formattedDate);
    } else {
      // Handle null or "Invalid Date"
      setDOB(null); // Or set a default value or handle it as needed
    }
  };


  const handleMaritalStatusChange = (selectedOption) => {
    setMaritalStatus(selectedOption);
  };

  const handleOccuptionChange = (selectedOption) => {
    setMaritalStatus(selectedOption);
  };

  const handleAvailableMarriageCheckboxChange = (e) => {
    setIsAvailableForMarriage(e.target.checked);
  };

  const fetchLoggedUserCommunity = async () => {
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
    }
  };

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
    }
  };

  const getAllCities = async (stateID) => {
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
    }
  };

  const convertToCustomDateFormat = (isoDateString) => {

    if (isoDateString === null) {
      return '';
    }

    const date = new Date(isoDateString); // Parse ISO date string
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0'); // Months are zero-based
    const day = `${date.getDate()}`.padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };


  useEffect(() => {
    setDOB(convertToCustomDateFormat(user.user.dob));
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
    dispatch(setLoader(true))

    // Prepare the updated data
    const updatedData = {
      name,
      gender,
      email,
      native_place_city: selectedCity ? selectedCity.label : '',
      native_place_state: selectedState ? selectedState.label : '',
      dob: dob,
      is_available_for_marriage: isAvailableForMarriage,
      marital_status: maritalStatus ? maritalStatus.label : '',
    };

    // Call the API to update the basic profile information
    try {
      const response = await updateBasicProfile(updatedData);
      if (response && response.status === 200) {
        dispatch(setLoader(false))
        setErrors("");
        setServerError('');
        dispatch(login(response.data.data, token));
        if (isAvailableForMarriage) {
          openNotification('topLeft')
          setTimeout(() => {
            navigate("/user/update-matrimonial-profile")
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
        setShowAvailableForMarriage(true);
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
    }else {
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
          <div className="card shadow">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 p-4">
                  <div className="card-title">
                    <h3 className="mb-3">Basic Profile</h3>
                  </div>
                  <form onSubmit={handleSubmit} className="w-100 w-lg-75">
                    <div className="row ">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12 ">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter your name"
                          className="form-control"
                          defaultValue={name}
                          onChange={handleNameChange}
                          autoFocus
                        />
                        {errors.name && (
                          <span className="error">{errors.name}</span>
                        )}
                      </div>

                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Email </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter Email"
                          className="form-control"
                          defaultValue={email}
                          onChange={handleEmailChange}
                        />
                        {errors.email && (
                          <span className="error">{errors.email}</span>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Gender</label>
                        <select
                          className="form-select form-control"
                          aria-label="Default select example"
                          defaultValue={gender}
                          onChange={handleGenderChange}
                        >
                          <option value="">---Select Gender---</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.gender && (
                          <span className="error">{errors.gender}</span>
                        )}
                      </div>

                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Date of Birth</label>
                        <DatePicker className="form-control" defaultValue={dayjs(dob, dateFormat)} format={dateFormat} onChange={handleDOBChange} />
                        {errors.dob && (
                          <span className="error">{errors.dob}</span>
                        )}
                        {/* Add error handling if needed */}
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

                        {errors.native_place_state && (
                          <span className="error">
                            {errors.native_place_state}
                          </span>
                        )}
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
                        {errors.native_place_city && (
                          <span className="error">
                            {errors.native_place_city}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className={`mb-3 col-lg-6 col-sm-12 col-xs-12 ${showMarriageStatus ? '' : 'd-none'}`}>
                        <label className="form-label">Marital Status</label>
                        <Select
                          options={maritalStatusOptions}
                          value={maritalStatus}
                          onChange={handleMaritalStatusChange}
                          placeholder="Select..."
                        />
                      </div>

                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">What Is Your Job ?</label>
                        <input
                          type="text"
                          name="occupation"
                          id="occupation"
                          placeholder="Example: Software Engineer, Grocery Shop Owner"
                          className="form-control"
                          defaultValue={occupation}
                          onChange={(e)=>setOccupation(e.target.value)}

                        />
                        {/* Add error handling if needed */}
                      </div>

                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12 ">
                        <label className="form-label">Community</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter your name"
                          className="form-control"
                          defaultValue={community.name}
                          disabled
                        />

                      </div>

                    </div>



                    <div className={`mb-3 col-lg-6 col-sm-12 col-xs-12 ${showAvailableForMarriage ? '' : 'd-none'}`}>
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



                    <div className="row mt-4">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <button type="submit" className="btn btn-primary">
                          Update
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
    </Context.Provider>
  );
};

export default UpdateBasicProfile;
