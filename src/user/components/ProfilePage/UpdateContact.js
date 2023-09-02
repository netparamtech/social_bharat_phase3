import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllCitiesByStateID, fetchAllStatesByCountryID, fetchCountries, updateContactDetail } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userAction';
const UpdateContact = (props) => {
  const { contactDetails } = props;

  const [addressType, setAddressType] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity,setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState('');

  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddressTypeChange = (e) => {
    setAddressType(e.target.value);
  };

  const handleAddressLineChange = (e) => {
    setAddressLine(e.target.value);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption.target.value);
    if (selectedOption.target.value === "India") {
      setCountryID(101);
    }
    setSelectedState('');
  };

  const handleStateChange = (selectedOption) => {
    const selectedStateName = selectedOption.target.value;

    const selectedStateObject = states.find((state) => state.name === selectedStateName);
    if (selectedStateObject) {
      getAllCities(selectedStateObject.id);
      setSelectedState(selectedOption.target.value);
      //setSelectedCity('');
    } 
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedCountry, selectedState, selectedCity)
    e.preventDefault();

    const updatedData = {
      address_type: addressType,
      address_line: addressLine,
      city: selectedCity,
      state: selectedState,
      country: selectedCountry,
    };

    try {
      const response = await updateContactDetail(updatedData);

      if (response && response.status === 200) {
        setErrors('');
        navigate('/profile')
      }
    } catch (error) {
      // Handle error
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);

      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate('/login');
      }
    }
  };


  const getAllStates = async () => {
    try {
      const response = await fetchAllStatesByCountryID(countryID);
      if (response && response.status === 200) {
        setStates(response.data.data);
      }
    } catch (error) {

    }
  }

  const getAllCities = async (stateID) => {
    try {
      const response = await fetchAllCitiesByStateID(stateID);
      if (response && response.status === 200) {
        setCities(response.data.data);
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    console.log(contactDetails)
    // Set default values from contactDetails prop when it changes
    if (contactDetails) {
      setAddressType(contactDetails.address_type || '');
      setAddressLine(contactDetails.address_line || '');
      setSelectedCountry(contactDetails.country || '');
      setSelectedState(contactDetails.state || '');
      setSelectedCity(contactDetails.city||'');
      if(contactDetails.country==="India"){
        setCountryID(101);
      }
    }
  }, [contactDetails]);



  useEffect(() => {
    // Check if selectedCountry is already set
    if (selectedCountry) {
      getAllStates();
    }
  }, [selectedCountry]);

  useEffect(()=>{    
    if(states && contactDetails){
      const selectedStateObject = states.find((state) => state.name === contactDetails.state);
      if(selectedStateObject){
        getAllCities(selectedStateObject.id);
      }
    }
  },[states])


  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 p-5">
                <div className="card-title">
                  <h3 className="mb-3">Contact</h3>
                </div>
                <form onSubmit={handleSubmit} className="w-100 w-lg-75">
                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Address Type</label>
                      <select className="form-select form-control" aria-label="Default select example" value={addressType} onChange={handleAddressTypeChange}>
                        <option value="">---Address Type---</option>
                        <option value="PERMANENT">PERMANENT</option>
                        <option value="CURRENT">CURRENT</option>
                      </select>
                      {errors.address_type && <span className='error'>{errors.address_type}</span>}
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Address Line</label>
                      <input
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

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Country</label>

                      <select
                        name="country"
                        id="country"
                        className="form-control"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                      >
                        <option value="">---Select Country---</option>
                        <option value="India">India</option>
                      </select>


                      {errors.country && <span className='error'>{errors.country}</span>}
                    </div>

                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">State</label>

                      <select
                        name="state"
                        id="state"
                        className="form-control"
                        value={selectedState}
                        onChange={handleStateChange}
                      >
                        <option value="">---Select State</option>
                        {states && states.map((state) => (
                          <option key={state.id} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </select>

                      {errors.state && <span className='error'>{errors.state}</span>}
                    </div>
                  </div>

                  <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                    <label className="form-label">City</label>

                    <select
                      name="city"
                      id="city"
                      className="form-control"
                      value={selectedCity}
                      onChange={handleCityChange}
                    >
                      <option value="">---Select City</option>
                      {cities && cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {errors.city && <span className='error'>{errors.city}</span>}

                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-6 col-sm-12 col-xs-12">
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
      </div >
    </div >

  );
};

export default UpdateContact;
