import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { attemptLoginWithMobile } from '../../services/userService';
import LoginWithOtp from '../otp/LoginWithOtp';

const LoginWithMobile = (props) => {

  const {chnageFlag} = props;

  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const [isLoginClicked, setIsLoginClicked] = useState(false);

  const navigate = useNavigate();

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  }

  const handleLoginClicked = () => {
    setIsLoginClicked(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const response = await attemptLoginWithMobile(mobile);

      if (response && response.status === 200) {
        setErrors('');
        setMessage(response.data.message);
        handleLoginClicked();
      }

    } catch (error) {

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

  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 d-none d-md-block">
                <img src="/user/images/signup.png" className="img-fluid" alt="Sign In" />
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12 p-5">
                <div className="card-title">
                  <h3 className="mb-3">Sign in</h3>
                </div>

                {
                  !isLoginClicked && !isLoginClicked ? (
                    <form action="/dashboard" className="w-100 w-lg-75" onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <input
                          type="text"
                          name="mobile"
                          id="mobile"
                          placeholder="Enter your mobile number"
                          className="form-control"
                          onChange={handleMobileChange}
                          autoFocus

                        />
                        {errors.mobile && <span className='error'>{errors.mobile}</span>}
                      </div>
                      <div className="row mb-3">
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                          Login With OTP
                        </button>
                      </div>
                      <div className="row">
                        <div className="col-5 col-md-4">
                          <hr />
                        </div>
                        <div className="col-2 col-md-4 text-center mt-1">OR</div>
                        <div className="col-4 col-md-4">
                          <hr />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <a className="btn btn-secondary" onClick={()=>chnageFlag(false)}>
                          Login With PASSWORD
                        </a>
                      </div>
                      <div className="row mt-3">
                        <p className="fw-lighter fs-6">New User? <a href="#" className="text-primary text-decoration-none" onClick={() => navigate('/register')}>Signup</a>.</p>
                      </div>
                    </form>
                  ) : (
                    <LoginWithOtp mobile={mobile} message={message} />
                  )
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWithMobile;
