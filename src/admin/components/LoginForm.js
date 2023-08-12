import React, { useState } from 'react';
import { login } from '../services/AdminService';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');

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
      localStorage.setItem('token', response.data.token.token);

    }


    }catch(error){
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
      }
      //Unauthorized
      else if (error.response && error.response.status === 401) {
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
        
      }
      else if (error.response && error.response.status === 404) {
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
        {errors.email && <span className='validation-error'>{errors.email}</span>}
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control form-control-user"
          id="exampleInputPassword"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        {errors.password && <span className='validation-error'>{errors.password}</span>}
      </div>
      <button type='submit' className="btn btn-primary btn-user btn-block">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
