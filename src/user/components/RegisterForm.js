import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTempUser, fetchAllActiveCommunities } from '../services/userService';
import RegisterWithOtp from './RegisterWithOtp';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [community_id, SetCommunity_id] = useState(1);
  const [casts, setCasts] = useState([]);

  const [isTempUserCreated, setIsTempUserCreated] = useState(false);
  const [errors, setErrors] = useState('');

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  }

  const handleSelectChange = (event) => {
    SetCommunity_id(parseInt(event.target.value, 10));
  };

  const tempUserCreated = () => {
    setIsTempUserCreated(true);
  }

  //fetch all active communities

  const fetchCommunities = async () => {
    const response = await fetchAllActiveCommunities();
    if (response && response.status === 201) {
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
        tempUserCreated();
      }
    } catch (error) {
      // Handle validation errors
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
    fetchCommunities();
  }, []);


  return (
    <>
      {!isTempUserCreated ? (
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
                    <form action="" className="w-100 w-lg-75">
                      <div className="row mb-3">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter your name"
                          className="form-control"
                          onChange={handleNameChange}
                        />
                        {errors.name && <p className='text-center mb-0 mt-1'><span className='error'>{errors.name}</span></p>}
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
                        {errors.mobile && <p className='text-center mb-0 mt-1'><span className='error'>{errors.mobile}</span></p>}
                      </div>
                      <div className="row mb-3">
                        
                        <select id="community_id" className="form-select form-control" aria-label="Default select example" value={community_id} onChange={handleSelectChange}>
                          <option selected>---Select Community---</option>
                          {casts.map((cast) => (
                            <option key={cast.id} value={cast.id}>
                              {cast.name}
                            </option>
                          ))}
                        </select>

                        {errors.community_id && <p className='text-center mb-0 mt-1'><span className='error'>{errors.community_id}</span></p>}
                      </div>
                      <div className="row mb-3">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                          Register
                        </button>
                      </div>
                      <div className="row mt-3">
                        <p className="fw-lighter fs-6">
                          Already User? <a href="/login" className="text-primary">Login</a>.
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (<RegisterWithOtp userDetail={{ mobile, name, community_id }} />)}

    </>
  );
};

export default RegisterForm;
