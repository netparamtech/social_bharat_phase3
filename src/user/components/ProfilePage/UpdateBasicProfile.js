import { useEffect, useState } from 'react';
import React from 'react';
import { fetchAllCitiesByStateID, fetchAllStatesByCountryID, updateBasicProfile } from '../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';

const UpdateBasicProfile = () => {
  const user = useSelector((state) => state.userAuth);

  const [name, setName] = useState(user.user.name); // Initial name
  const [gender, setGender] = useState(user.user.gender); // Initial gender
  const [email, setEmail] = useState(user.user.email); // Initial email
  const [token, setToken] = useState('');

  const [selectedCountry, setSelectedCountry] = useState('India');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);

  const [errors, setErrors] = useState('');

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

    }
  }

  const getAllCities = async (stateID) => {
    try {
      const response = await fetchAllCitiesByStateID(stateID);
      if (response && response.status === 200) {
        setCities(response.data.data);
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
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the updated data
    const updatedData = {
      name,
      gender,
      email,
      native_place_city: selectedCity.label,
      native_place_state: selectedState.label,
    };

    console.log(updatedData, "checking");

    // Call the API to update the basic profile information
    try {
      const response = await updateBasicProfile(updatedData);
      if (response && response.status === 200) {
        setErrors('');
        dispatch(login(response.data.data, token));
        navigate('/profile');
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
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        navigate('/login');
      }
    }

  }

  useEffect(() => {
    setToken(user.token || '');
  }, [user])

  useEffect(() => {
    // Check if selectedCountry is already set
    getAllStates();
  }, []);

  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 p-5">
                <div className="card-title">
                  <h3 className="mb-3">Basic Profile</h3>
                </div>
                <form onSubmit={handleSubmit} className="w-100 w-lg-75">
                  <div className="row ">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12 ">
                      <label className="form-label">Name</label>
                      <input type="text" name="name" id="name" placeholder="Enter your name" className="form-control" defaultValue={name} onChange={handleNameChange} autoFocus />
                      {errors.name && <span className='error'>{errors.name}</span>}
                    </div>

                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Email </label>
                      <input type="text" name="email" id="email" placeholder="Enter Email" className="form-control" defaultValue={email} onChange={handleEmailChange} />
                      {errors.email && <span className='error'>{errors.email}</span>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Gender</label>
                      <select className="form-select form-control" aria-label="Default select example" defaultValue={gender} onChange={handleGenderChange}>
                        <option value="">---Select Gender---</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && <span className='error'>{errors.gender}</span>}
                    </div>

                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">State</label>

                      <Select
                        className='form-control'
                        options={states.map(state => ({ value: state.name, label: state.name }))}
                        value={selectedState}
                        onChange={handleStateChange}    
                      />

                      {errors.native_place_state && <span className='error'>{errors.native_place_state}</span>}
                    </div>
                  </div>
                  <div className='row'>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">City</label>

                      <Select
                        className='form-control'
                        options={cities.map(city => ({ value: city.name, label: city.name }))}
                        value={selectedCity}
                        onChange={handleCityChange}
                      />
                      {errors.native_place_city && <span className='error'>{errors.native_place_city}</span>}

                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBasicProfile;
