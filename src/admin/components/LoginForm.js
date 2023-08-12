import React, { useState } from 'react';

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password)
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
