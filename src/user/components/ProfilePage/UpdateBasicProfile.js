import { useEffect, useState } from 'react';
import React from 'react';
import { updateBasicProfile } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../actions/userAction';

const UpdateBasicProfile = () => {
  const user = useSelector((state) => state.userAuth);

  const [name, setName] = useState(user.user.name); // Initial name
  const [gender, setGender] = useState(user.user.gender); // Initial gender
  const [email, setEmail] = useState(user.user.email); // Initial email
  const [token,setToken] = useState(''); 

  const [errors, setErrors] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the updated data
    const updatedData = {
      name,
      gender,
      email,
    };

    // Call the API to update the basic profile information
    try {
      const response = await updateBasicProfile(updatedData);
      if (response && response.status === 200) {
        setErrors('');
        dispatch(login(response.data.data,token));
        window.location.href = '/profile';
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

  }

  useEffect(()=>{
    setToken(user.token || '');
  },[user])

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
