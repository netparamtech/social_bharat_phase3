import React, { useState } from 'react';
import { login } from '../services/AdminService';
import { useDispatch } from 'react-redux';
import {login as adminlogin} from '../actions/authActions';
import { useNavigate } from 'react-router';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
   
    try{

      const response = await login(email,password);

      if (response && response.status === 200) {
        setErrors('');
        setMessage(response.data.message);
        setAlertClass('alert-success');
        dispatch(adminlogin(response.data.user, response.data.token));
        
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 1000);
      }
    } catch(error) {
      
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
      }
      
      else if (error.response && error.response.status === 401) {
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
      }
      else if (error.response && error.response.status === 500) {
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
      }
     
    }
  }
  return (
    <form className="user" onSubmit={handleSubmit}>
      {message && <div className={`alert ${alertClass}`}>
        {alertClass === 'alert-success' ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-exclamation-triangle"></i>)}
        {" " + message}
      </div>
      }
      <div className="form-group">
        <input
          type="text"
          className="form-control form-control-user"
          id="exampleInputEmail"
          aria-describedby="emailHelp"
          placeholder="Enter Email Address..."
          onChange={handleEmailChange}
        />
        {errors.email && <span className='error'>{errors.email}</span>}
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control form-control-user"
          id="exampleInputPassword"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        {errors.password && <span className='error'>{errors.password}</span>}
      </div>
      <button type='submit' className="btn btn-primary btn-user btn-block">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
