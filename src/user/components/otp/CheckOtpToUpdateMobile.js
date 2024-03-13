import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resendOtp, updateMobile } from "../../services/userService";

const CheckOtpToUpdateMobile = (props) => {
  const { mobile, message } = props;

  const [otp, setOtp] = useState("");

  const [remainingTime, setRemainingTime] = useState(120);
  const [isTimeExpired, setIsTimeExpired] = useState(false);

  const [errors, setErrors] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const otpBoxes = Array.from({ length: 6 }, (_, index) => index);

  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    const updatedOtp = [...otp];

    // Update the OTP array with the new value
    updatedOtp[index] = value;

    // Join the OTP array into a string of maximum length 6
    const updatedOtpString = updatedOtp.slice(0, 6).join("");

    // Set the updated OTP
    setOtp(updatedOtpString);

    // Move the focus to the next OTP box if the current box is filled
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput && nextInput.focus();
    }

    if (e.key === "Backspace" && index > 0) {
      if (value === "") {
        const nextInput = document.getElementById(`otp-${index - 1}`);
        nextInput && nextInput.focus();
      }
    }
  };

  const handleResendOTP = () => {
    setIsTimeExpired(false);
    setRemainingTime(120);
    setOtp('');
  };

  const handleVarifiedClicked = async (event) => {
    event.preventDefault();
    const truncatedOtp = otp.slice(0, 6);

    try {
      const response = await updateMobile(mobile, truncatedOtp);

      if (response && response.status === 200) {
        setOtp("");
        navigate("/profile");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setErrorMessage('');
      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
        setErrors("");
      }

      //User Bloked
      else if (error.response && error.response.status === 451) {
        navigate("/user/block");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        navigate("/login");
      }
    }
  };

  const resendOTP = async () => {
    setErrors("");
    try {
      const response = await resendOtp(mobile);

      if (response && response.status === 200) {
        setErrorMessage("");
        handleResendOTP();
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (remainingTime > 0) {
      const timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    } else if (remainingTime === 0) {
      setIsTimeExpired(true);
    }
  }, [remainingTime]);

  const formatTime = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <form className="w-100 w-lg-75 wow animate__animated animate__zoomIn" onSubmit={handleVarifiedClicked}>
        <div className="row mb-3">
          <input
            type="number"
            name="mobile"
            id="mobile"
            placeholder="Enter your mobile number"
            className="form-control"
            value={mobile}
            disabled
          />
        </div>

        <div className="row mb-3">
          {message && (
            <p className="text-center mb-0 mt-1 mb-2">
              <span className="error">{message}</span>
            </p>
          )}
          <div id="otp-form">
            {otpBoxes.map((index) => (
              <input
                key={index}
                type="number"
                className="form-control otp-input"
                id={`otp-${index}`}
                value={otp[index] || ""}
                maxLength="1" // Limit the input to one character
                onChange={(e) => handleOTPChange(e, index)}
                onKeyDown={(e) => handleOTPChange(e, index)}
                autoFocus={index === 0}
              />
            ))}
          </div>
          {errorMessage && (
            <p className="text-center mb-0 mt-1">
              <span className="error">{errorMessage}</span>
            </p>
          )}
          {errors.otp && (
            <p className="text-center mb-0 mt-1">
              <span className="error">{errors.otp}</span>
            </p>
          )}
        </div>

        <div className="row text-center">
          <span id="timer">{formatTime()}</span>
        </div>

        <div className="row mb-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isTimeExpired}
          >
            Verify OTP
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
            onClick={resendOTP}
            disabled={!isTimeExpired}
          >
            Resend OTP
          </button>
        </div>
      </form>
    </>
  );
};

export default CheckOtpToUpdateMobile;
