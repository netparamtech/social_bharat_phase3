import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTempUser, fetchAllActiveCommunities } from '../../services/userService';
import RegisterWithOtp from '../otp/RegisterWithOtp';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userAction';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [community_id, SetCommunity_id] = useState('');
  const [casts, setCasts] = useState([]);

  const [isTempUserCreated, setIsTempUserCreated] = useState(false);
  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  }

  const handleSelectChange = (selectedOption) => {
    console.log(selectedOption)
    SetCommunity_id(selectedOption.value);
  };

  const tempUserCreated = () => {
    setIsTempUserCreated(true);
  }

  //fetch all active communities

  const fetchCommunities = async () => {
    const response = await fetchAllActiveCommunities();
    if (response && response.status === 200) {
      setCasts(response.data.data);
    }
  }

  //action on submit form

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name, mobile, community_id
    }
    try {
      const response = await createTempUser(userData);
      if (response && response.status === 201) {
        setErrors('');
        setMessage(response.data.message);
        tempUserCreated();
      }
    } catch (error) {
      // Handle validation errors
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

  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 d-none d-md-block">
                <img src="/user/images/signup.png" className="img-fluid" alt="Sign Up" />
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12 p-5">
                <div className="card-title">
                  <h3 className="mb-3">Sign up</h3>
                </div>
                {
                  !isTempUserCreated ? (
                    <form action="/dashboard" className="w-100 w-lg-75" onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter your name"
                          className="form-control"
                          onChange={handleNameChange}
                          autoFocus
                        />
                        {errors.name && <span className='error'>{errors.name}</span>}
                      </div>
                      <div className="row mb-3">
                        <input
                          type="text"
                          name="mobile"
                          id="mobile"
                          placeholder="Enter your mobile number"
                          className="form-control"
                          onChange={handleMobileChange}
                        />
                        {errors.mobile && <span className='error'>{errors.mobile}</span>}
                      </div>
                      <div className="row mb-3">

                        <Select
                          id="community_id"
                          className="form-select"
                          defaultValue={community_id} // Provide a selected option state
                          onChange={handleSelectChange} // Your change handler function
                          options={casts && casts.map((cast) => ({ value: cast.id, label: cast.name }))}
                          placeholder="---Select Community---"
                        />

                        {errors.community_id && <span className='error'>{errors.community_id}</span>}
                      </div>
                      <div className="row mb-3">
                        <button type="submit" className="btn btn-primary">
                          Register
                        </button>
                      </div>
                      <div className="row mt-3">
                        <p className="fw-lighter fs-6">
                          Already User? <a href="/login" className="text-primary">Login</a>.
                        </p>
                      </div>
                    </form>
                  ) : (
                    <RegisterWithOtp userDetail={{ mobile, name, community_id }} message={message} />
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm;
