import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Country, State } from 'country-state-city';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateContactDetail } from '../services/userService';

function LocationComponent() {
  const [addressType, setAddressType] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);

  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleAddressTypeChange = (e) => {
    setAddressType(e.target.value);
  };

  const handleAddressLineChange = (e) => {
    setAddressLine(e.target.value);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setSelectedCity(null);
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      address_type: addressType,
      address_line: addressLine,
      selectedCity,
      selectedState,
      selectedCountry,
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
        navigate('/login');
      }
    }
  };


  useEffect(() => {
    if (selectedCountry && selectedState) {
      // Replace 'YOUR_API_URL' with the actual API endpoint
      axios.get(`YOUR_API_URL?country=${selectedCountry.value}&state=${selectedState.value}`)
        .then(response => {
          setCities(response.data.cities);
        })
        .catch(error => {
          console.error('Error fetching cities:', error);
        });
    }
  }, [selectedCountry, selectedState]);

  const countries = Country.getAllCountries().map(country => ({
    value: country.isoCode,
    label: country.name
  }));

  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry.value).map(state => ({
    value: state.isoCode,
    label: state.name
  })) : [];

  const cityOptions = cities.map(city => ({
    value: city.name,
    label: city.name
  }));

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
                      <select className="form-select form-control" aria-label="Default select example" onChange={handleAddressTypeChange}>
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
                        onChange={handleAddressLineChange}
                        autoFocus
                      />
                      {errors.address_line && <span className='error'>{errors.address_line}</span>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Country</label>

                      <Select
                        className="form-select form-control"
                        options={countries}
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        placeholder="Select Country"
                      />

                      
                        {errors.country && <span className='error'>{errors.country}</span>}
                    </div>

                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">State</label>

                      <Select
                        className="form-select form-control"
                        options={states}
                        value={selectedState}
                        onChange={handleStateChange}
                        placeholder="Select State"
                      />

                      {errors.state && <span className='error'>{errors.state}</span>}
                    </div>
                  </div>

                  <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                    <label className="form-label">City</label>

                    <Select
                      className="form-select form-control"
                      options={cityOptions}
                      value={selectedCity}
                      onChange={handleCityChange}
                      placeholder="Select City"
                    />
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
}

export default LocationComponent;
