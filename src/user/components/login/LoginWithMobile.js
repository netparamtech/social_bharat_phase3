import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { attemptLoginWithMobile, fetchBannerWithPageAndSection } from '../../services/userService';
import LoginWithOtp from '../otp/LoginWithOtp';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';
import MobileInput from '../custom/MobileInput';

const LoginWithMobile = (props) => {

  const { chnageFlag } = props;

  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [serverError, setServerError] = useState('');

  const [imageUrls, setImageUrls] = useState([]);
  const [defaultImage, setDefaultImage] = useState("/user/images/signup.png");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  }

  const handleLoginClicked = () => {
    setIsLoginClicked(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoader(true));
    const cleanMobile = mobile.replace(/^0+/, '');
    try {

      const response = await attemptLoginWithMobile(cleanMobile);

      if (response && response.status === 200) {
        setErrors('');
        setMessage(response.data.message);
        setServerError('');
        handleLoginClicked();
        dispatch(setLoader(false));
      }

    } catch (error) {
      dispatch(setLoader(false));

      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setServerError('');
      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate('/login');
      }
      //many otp request
      else if (error.response && error.response.status === 429) {
        setServerError(error.response.data.message);
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  }

  const fetchBanners = async () => {
    dispatch(setLoader(true));

    try {
      const response = await fetchBannerWithPageAndSection('Login', 'Login With OTP');

      const activeBanners = response.data.data.filter((banner) => banner.status === 'Active');
      if (!Array.isArray(activeBanners[0].banner_urls)) {
        const updatedBannerUrls = [activeBanners[0].banner_urls];
        activeBanners[0].banner_urls = updatedBannerUrls;
      }
      setImageUrls(activeBanners[0].banner_urls);
      setServerError('');
      dispatch(setLoader(false));

    } catch (error) {
      dispatch(setLoader(false));

      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className={`card shadow ${errors ? 'border-danger' : ''}`}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 d-none d-md-block  wow animate__animated animate__zoomIn">
                <img src={imageUrls && imageUrls[0] ? imageUrls[0] : defaultImage} className="img-fluid" alt="Sign In" />
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12 p-5">
                <div className="card-title">
                  <h3 className="mb-3">Sign in</h3>
                </div>

                {
                  !isLoginClicked && !isLoginClicked ? (
                    <form action="/dashboard" className="w-100 w-lg-75" onSubmit={handleSubmit}>
                      {serverError && <span className='error'>{serverError}</span>}
                      <div className="row mb-3">
                        <MobileInput handleMobileChange={handleMobileChange} 
                        errorServer={errors.mobile} isRequired={true} 
                        isAutoFocused={true} placeholder="Enter your mobile number" />
                      </div>
                      <div className="row mb-3">
                        <button type="submit" className="btn-custom btn-primary-custom" onClick={handleSubmit}>
                          Login With OTP
                        </button>
                      </div>
                      <div className="row">
                        <div className="col-4 col-md-4">
                          <hr />
                        </div>
                        <div className="col-4 col-md-4 text-center mt-1">OR</div>
                        <div className="col-4 col-md-4">
                          <hr />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <button type="submit" className="btn-custom btn-secondary" onClick={() => chnageFlag(false)}>
                          Login With PASSWORD
                        </button>

                      </div>
                      <div className="row mt-3">
                        <p className="fw-lighter fs-6">New User? <a className="text-primary text-decoration-none hover-pointer" onClick={() => navigate('/register')}>Signup</a>.</p>
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
