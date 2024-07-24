import React, { useState } from "react";
import { updateAttemptMobile } from "../../services/userService";
import CheckOtpToUpdateMobile from "../otp/CheckOtpToUpdateMobile";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import MobileInput from "../custom/MobileInput";
import { toast } from "react-toastify";
import { errorOptions } from "../../../toastOption";

const UpdateMobile = () => {
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState('');
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const [isMobileValid, setIsMobileValid] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMobileChange = (event, errorMsg) => {
    setMobile(event.target.value);
    setMobileError(errorMsg);
  };

  const handleMobileValid = () => {
    setIsMobileValid(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(mobileError||!mobile){
      toast.error("Please fill in the mobile number before submitting.", errorOptions);
      return 
    }
    dispatch(setLoader(true));
    const cleanMobile = mobile.replace(/^0+/, '');

    try {
      const response = await updateAttemptMobile(cleanMobile);

      if (response && response.status === 200) {
        setErrors("");
        setMessage(response.data.message);
        handleMobileValid();
        setServerError('');

      }
    } catch (error) {
      // Handle validation errors
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setServerError('');
      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    } finally {
      dispatch(setLoader(false));
    }
  };
  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div id="changePassword" className="container">
        <div className={`card shadow mx-auto ${errors ? 'border-danger' : ''}`}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 p-4">
                <div className="card-title">
                  <h3 className="mb-3">Update Mobile{" "}<span className="text-danger">*</span></h3>
                </div>
                {!isMobileValid && !isMobileValid ? (
                  <form
                    action="/profile"
                    onSubmit={handleSubmit}
                    className="w-100 w-lg-75"
                  >
                    <div className="row mb-3">
                      <MobileInput handleMobileChange={handleMobileChange} htmlFor="update"
                        errorServer={errors.mobile} isRequired={true} placeholder="Enter your mobile number"
                        isAutoFocused={true}
                      />
                    </div>

                    <div className="row mb-3">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                ) : (
                  <CheckOtpToUpdateMobile mobile={mobile} message={message} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMobile;
