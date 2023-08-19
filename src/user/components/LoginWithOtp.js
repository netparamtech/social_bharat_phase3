import React, { useEffect, useState } from 'react';
import { attemptLoginWithMobile, mobileVarified, resendOtp } from '../services/userService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../actions/userAction';

const LoginWithOtp = (props) => {
    const {chnageFlag} = props;

    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');

    const [isLoginClicked, setIsLoginClicked] = useState(false);
    const [remainingTime, setRemainingTime] = useState(120);
    const [isTimeExpired, setIsTimeExpired] = useState(false);

    const [errors, setErrors] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const otpBoxes = Array.from({ length: 6 }, (_, index) => index);

    const handleMobileChange = (event) => {
        setMobile(event.target.value);
    }

    const handleOTPChange = (e, index) => {
        const value = e.target.value;
        const otpArray = otp.split('');
        otpArray[index] = value;
        setOtp(otpArray.join(''));

        // Move the focus to the next OTP box if the current box is filled
        if (value !== '' && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput && nextInput.focus();
        }
    };

    const handleLoginClicked = () => {
        setIsLoginClicked(true);
    }

    const handleResendOTP = () => {
        setIsTimeExpired(false);
        setIsLoginClicked(true);
        setRemainingTime(120);
    }

    const handleVarifiedClicked = async () => {

        try {

            const response = await mobileVarified(mobile, otp);

            if (response && response.status === 200) {
                setIsLoginClicked(false);
                dispatch(login(response.data.data, response.data.token));
                setMobile('');
                setOtp('');

                if (response.data.data.is_password_set) {
                    navigate('/dashboard');
                } else {
                    navigate('/setPassword');
                }

            }
        } catch (error) {

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


    const resendOTP = async () => {
        setErrors('');
        try {
            const response = await resendOtp(mobile);

            if (response && response.status === 200) {
                handleResendOTP();
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate('/login')
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const response = await attemptLoginWithMobile(mobile);
            console.log(response.status)

            if (response && response.status === 200) {
                setErrors('');
                handleLoginClicked();
            }

        } catch (error) {
            console.log("clicked")
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

    const openLoginWithPasswordForm = () => {
        chnageFlag(false);
    }

    useEffect(() => {
        if (isLoginClicked && remainingTime > 0) {
            const timerInterval = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerInterval);
        } else if (remainingTime === 0) {
            setIsTimeExpired(true);
        }
    }, [isLoginClicked, remainingTime]);

    const formatTime = () => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    return (
        <div id="auth-wrapper" className="pt-5 pb-5">
            <div className="container">
                <div className="card shadow">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 d-none d-md-block">
                                <img src="images/signup.png" className="img-fluid" alt="Signup" />
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12 p-5">
                                <div className="card-title">
                                    <h3 className="mb-3">Sign in</h3>
                                </div>
                                <form className="w-100 w-lg-75">

                                    <div className="row mb-3">
                                        <input
                                            type="text"
                                            name="mobile"
                                            id="mobile"
                                            placeholder="Enter your mobile number"
                                            className="form-control"
                                            onChange={handleMobileChange}
                                            disabled={isLoginClicked}
                                        />
                                        {errors.mobile && <p className='text-center mb-0 mt-1'><span className='error'>{errors.mobile}</span></p>}
                                    </div>

                                    <div className={`row mb-3  ${!isLoginClicked ? 'd-none' : ''}`}>
                                        <div id="otp-form">
                                            {otpBoxes.map((index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    className="form-control otp-input"
                                                    id={`otp-${index}`}
                                                    value={otp[index] || ''}
                                                    maxLength="1" // Limit the input to one character
                                                    onChange={(e) => handleOTPChange(e, index)}
                                                />
                                            ))}
                                        </div>
                                        {errors.otp && <p className='text-center mb-0 mt-1'><span className='error'>{errors.otp}</span></p>}
                                    </div>
                                    
                                    <div className={`row text-center ${!isLoginClicked ? 'd-none' : ''}`}>
                                      <span id="timer">{formatTime()}</span>
                                    </div>
                                    
                                    <div className="row mb-3">
                                        <button type="button" className={`btn btn-primary ${!isLoginClicked ? '' : 'd-none'}`} onClick={handleSubmit}>
                                            Login With OTP
                                        </button>
                                        <button type="button"
                                            className={`btn btn-primary ${!isLoginClicked ? 'd-none' : ''}`}
                                            onClick={handleVarifiedClicked}
                                            disabled={isTimeExpired}
                                        >
                                            Varified With OTP
                                        </button>
                                    </div>

                                    <div className="row">
                                        <div className="col-5 col-md-4">
                                            <hr />
                                        </div>
                                        <div className="col-2 col-md-4 text-center mt-1">OR</div>
                                        <div className="col-5 col-md-4">
                                            <hr />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <button type="button"
                                         className={`btn btn-secondary ${!isLoginClicked ? '' : 'd-none'}`}
                                         onClick={openLoginWithPasswordForm}
                                         >
                                            Login With PASSWORD
                                        </button>
                                        <button type="button"
                                            className={`btn btn-secondary ${!isLoginClicked ? 'd-none' : ''}`}
                                            onClick={resendOTP}
                                            disabled={!isTimeExpired}
                                        >
                                            Resend OTP
                                        </button>
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

export default LoginWithOtp;
