import React, { useEffect, useState } from "react";
import { fetchBannerWithPageAndSection, loginWithPassword } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/userAction";
import { Input } from "antd";
import { setLoader, setModelAction } from "../../actions/loaderAction";
import MobileInput from "../custom/MobileInput";
import PasswordField from "../custom/PasswordField";

const LoginWithPassword = (props) => {

  const { chnageFlag } = props;

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");
  const [maxPassword, setMaxPassword] = useState(8);

  const [imageUrls, setImageUrls] = useState([]);
  const [defaultImage, setDefaultImage] = useState("/user/images/signup.png");

  //onChange handler
  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchBanners = async () => {
    dispatch(setLoader(true));

    try {
      const response = await fetchBannerWithPageAndSection('Login', 'Login With Password');

      const activeBanners = response.data.data.filter((banner) => banner.status === 'Active');
      if (!Array.isArray(activeBanners[0].banner_urls)) {
        const updatedBannerUrls = [activeBanners[0].banner_urls];
        activeBanners[0].banner_urls = updatedBannerUrls;
      }
      setImageUrls(activeBanners[0].banner_urls);
      dispatch(setLoader(false));

    } catch (error) {
      dispatch(setLoader(false));

      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else if (error.response && error.response.status === 500) {
        navigate('/login');
      }
    }
  };

  const handleSubmit = async (event) => {
    dispatch(setLoader(true));
    event.preventDefault();
    const cleanMobile = mobile.replace(/^0+/, '');

    try {
      const response = await loginWithPassword(cleanMobile, password);
      if (response && response.status === 200) {
        setErrors("");
        setMessage('');

        dispatch(login(response.data.data, response.data.token));
        dispatch(setModelAction(true));

        if (response.data.data.is_password_set) {
          navigate("/");
        } else {
          navigate("/setPassword");
        }
        dispatch(setLoader(false))
      }
    } catch (error) {
      dispatch(setLoader(false));
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setMessage('');
        setAlertClass("alert-danger");
      } else if (error.response && error.response.status === 401) {
        setMessage(error.response.data.message);
        setErrors('');
        setAlertClass("alert-danger");
      }
      //User Bloked
      else if (error.response && error.response.status === 451) {
        navigate("/user/block");
      } else if (error.response && error.response.status === 500) {
        setMessage(error.response.data.message);
        setErrors('');
        setAlertClass("alert-danger");
      }
    }
  };
  const openLoginWithOtpForm = () => {
    chnageFlag(true);
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
              <div className="col-md-6 d-none d-md-block wow animate__animated animate__zoomIn">
                <img
                  src={imageUrls && imageUrls[0] ? imageUrls[0] : defaultImage}
                  className="img-fluid"
                  alt="Signup"
                />
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12 p-5">
                <div className="card-title">
                  <h3 className="mb-3">Sign in</h3>
                </div>
                <form
                  action="/dashboard"
                  className="w-100 w-lg-75"
                  onSubmit={handleSubmit}
                >
                  {message && (
                    <div className={`alert ${alertClass}`}>
                      {alertClass === "alert-success" ? (
                        <i className="fas fa-check-circle"></i>
                      ) : (
                        <i className="fas fa-exclamation-triangle"></i>
                      )}
                      {" " + message}
                    </div>
                  )}
                  <div className="row mb-3">
                    <MobileInput handleMobileChange={handleMobileChange}
                      errorServer={errors.mobile} isRequired={true}
                      isAutoFocused={true} placeholder="Enter your mobile number" />
                  </div>
                  <div className="row mb-3">
                    <PasswordField handleChange={handlePasswordChange} value={password} errorServer={errors.password}
                    fieldName="Password" isRequired={true} placeholder="Enter your password"/>
                  </div>

                  <div className="row mb-3">
                    <button type="submit" className="btn-custom btn-primary-custom">
                      Login With Password
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
                    <button
                      type="button"
                      className="btn-custom btn-secondary"
                      onClick={openLoginWithOtpForm}
                    >
                      Login With OTP
                    </button>
                  </div>
                  <div className="row mt-3">
                    <p className="fw-lighter fs-6">
                      New User?{" "}
                      <a
                        className="text-primary text-decoration-none hover-pointer"
                        onClick={() => navigate("/register")}
                      >
                        Signup
                      </a>
                    </p>
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

export default LoginWithPassword;
