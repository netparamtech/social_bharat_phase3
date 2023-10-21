import React, { useState } from "react";
import { loginWithPassword } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/userAction";
import { Input } from "antd";

const LoginWithPassword = (props) => {
  const { chnageFlag } = props;

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");

  //onChange handler
  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cleanMobile = mobile.replace(/^0+/, '');

    try {
      const response = await loginWithPassword(cleanMobile, password);

      if (response && response.status === 200) {
        setErrors("");

        dispatch(login(response.data.data, response.data.token));

        if (response.data.data.is_password_set) {
          navigate("/dashboard");
        } else {
          navigate("/setPassword");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setMessage(error.response.data.message);
        setAlertClass("alert-danger");
      } else if (error.response && error.response.status === 401) {
        setMessage(error.response.data.message);
        setAlertClass("alert-danger");
      }
      //User Bloked
      else if (error.response && error.response.status === 451) {
        navigate("/user/block");
      } else if (error.response && error.response.status === 500) {
        setMessage(error.response.data.message);
        setAlertClass("alert-danger");
      }
    }
  };
  const openLoginWithOtpForm = () => {
    chnageFlag(true);
  };
  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 d-none d-md-block">
                <img
                  src="/user/images/signup.png"
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
                    <Input
                      type="number"
                      name="mobile"
                      id="mobile"
                      placeholder="Enter your mobile number"
                      className="input-height"
                      maxLength="10" // Limit to 10 characters
                      onInput={(e) => {
                        // Trim the input to 10 characters
                        e.target.value = e.target.value.slice(0, 10);
                      }}
                      onChange={handleMobileChange}
                      autoFocus
                    />
                    {errors && errors.mobile && (
                      <span className="error">{errors.mobile}</span>
                    )}
                  </div>
                  <div className="row mb-3">
                    <Input.Password
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Password"
                      className="input-height"
                      onChange={handlePasswordChange}
                      
                    />
                    
                    {errors.password && (
                      <span className="error">{errors.password}</span>
                    )}
                  </div>
                
                  <div className="row mb-3">
                    <button type="submit" className="btn btn-primary">
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
                      className="btn btn-secondary"
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
