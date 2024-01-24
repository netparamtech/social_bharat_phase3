import React, { useState, useEffect } from 'react';
import { fetchAllCitiesByStateID, fetchAllStatesByCountryID, fetchCountries, updateContactDetail } from '../../services/userService';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';
const UpdateContact = (props) => {
  const { contactDetails } = props;

  const [addressType, setAddressType] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState('');

  const [errors, setErrors] = useState('');
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddressTypeChange = (e) => {
    setAddressType(e.target.value);
  };

  const handleAddressLineChange = (e) => {
    setAddressLine(e.target.value);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption); // Update the state with the selected option object
    if (selectedOption.value === "India") {
      setCountryID(101);
    }
    setSelectedState(''); // Reset state when country changes
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);

    if (selectedOption) {
      const selectedStateObject = states.find((state) => state.name === selectedOption.value);
      if (selectedStateObject) {
        getAllCities(selectedStateObject.id);
      }
    }
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption); // Update the state with the selected option object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoader(true));

    const updatedData = {
      address_type: addressType,
      address_line: addressLine,
      city: selectedCity.label,
      state: selectedState.label,
      country: selectedCountry.label,
    };

    try {
      const response = await updateContactDetail(updatedData);

      if (response && response.status === 200) {
        setErrors('');
        setServerError('');
        navigate('/profile');
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
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };


  const getAllStates = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllStatesByCountryID(countryID);
      if (response && response.status === 200) {
        setStates(response.data.data);
        setServerError('');
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));

      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }

    }
  }

  const getAllCities = async (stateID) => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllCitiesByStateID(stateID);
      if (response && response.status === 200) {
        setCities(response.data.data);
        setServerError('');
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  }
  useEffect(() => {
    // Set default values from contactDetails prop when it changes
    if (contactDetails) {
      setAddressType(contactDetails.address_type || '');
      setAddressLine(contactDetails.address_line || '');
      setCountryID(contactDetails.country === 'India' ? 101 : ''); // Set the countryID accordingly
      setSelectedCountry({ value: contactDetails.country, label: contactDetails.country }); // Set the selected country as an object
      setSelectedState({ value: contactDetails.state, label: contactDetails.state }); // Set the selected state as an object
      setSelectedCity({ value: contactDetails.city, label: contactDetails.city }); // Set the selected city as an object
    }
  }, [contactDetails]);

  useEffect(() => {
    // Check if selectedCountry is already set
    if (selectedCountry) {
      getAllStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (states && contactDetails) {
      const selectedStateObject = states.find((state) => state.name === contactDetails.state);
      if (selectedStateObject) {
        getAllCities(selectedStateObject.id);
      }
    }
  }, [states])


  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className={`card ${errors ? 'border-danger' : ''}`}>
          <div className="">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 p-4">
                {serverError && <span className='error'>{serverError}</span>}
                <form onSubmit={handleSubmit} className="w-100 w-lg-75">
                  <fieldset className="shadow">
                    <legend>Address</legend>
                    <div className="card p-3">
                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Address Type{" "}<span className="text-danger">*</span></label>
                          <select className="form-select form-control" aria-label="Default select example" value={addressType} onChange={handleAddressTypeChange}>
                            <option value="">---Address Type---</option>
                            <option value="PERMANENT">PERMANENT</option>
                            <option value="CURRENT">CURRENT</option>
                          </select>
                          {errors.address_type && <span className='error'>{errors.address_type}</span>}
                        </div>

                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Country {" "}<span className="text-danger">*</span></label>

                          <Select
                            options={[
                              { value: 'India', label: 'India' },
                              // Add other country options here
                            ]}
                            value={selectedCountry}
                            onChange={handleCountryChange}
                          />


                          {errors.country && <span className='error'>{errors.country}</span>}
                        </div>

                      </div>

                      <div className="row">

                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">State{" "}<span className="text-danger">*</span></label>

                          <Select
                            options={states.map(state => ({ value: state.name, label: state.name }))}
                            value={selectedState}
                            onChange={handleStateChange}
                          />

                          {errors.state && <span className='error'>{errors.state}</span>}
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">City{" "}<span className="text-danger">*</span></label>

                          <Select
                            options={cities.map(city => ({ value: city.name, label: city.name }))}
                            value={selectedCity}
                            onChange={handleCityChange}
                          />
                          {errors.city && <span className='error'>{errors.city}</span>}

                        </div>
                      </div>

                      <div className='row'>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Address Line{" "}<span className="text-danger">*</span></label>
                          <textarea
                            type="text"
                            name="addressLine"
                            id="addressLine"
                            placeholder="Enter Address Line"
                            className="form-control"
                            defaultValue={addressLine}
                            onChange={handleAddressLineChange}
                            autoFocus
                          />
                          {errors.address_line && <span className='error'>{errors.address_line}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-lg-6 col-sm-12 col-xs-12">
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
      </div >
    </div >

  );
};

export default UpdateContact;
