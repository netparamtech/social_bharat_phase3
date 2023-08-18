import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiConfig, apiWithHeaders } from '../axios/apiConfig';
import { login } from '../actions/userAction';
import { logout } from '../../admin/actions/authActions'
import { loginWithPassword } from '../services/userService';

const Login = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOTP] = useState('');
    const [userId, setUserId] = useState('');

    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    const [alertClass, setAlertClass] = useState('');

    const [isLoginWithOtp, setisLoginWithOTP] = useState(false);

    const [otpTimer, setOtpTimer] = useState(0); // 120 seconds (2 minutes) initial timer
    const [otpTimerExpired, setOtpTimerExpired] = useState(false);

    const [addDisabledClass, setAddDisabledClass] = useState(false)

    const [timerStarted, setTimerStarted] = useState(false);
    const [isLoginWithPasswordClicked, setIsLoginWithPasswordClicked] = useState(false);

    const tick = useRef();
    const otpBoxes = Array.from({ length: 6 }, (_, index) => index);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMobileInput = (e) => {
        setMobile(e.target.value)
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value)
    }

    const handleLoginWithOTPClicked = () => {
        setOtpTimerExpired(false);
        setisLoginWithOTP(true);
        setOtpTimer(120);
        setTimerStarted(true);
    }

    const handleLoginWithPassword = () => {
        setErrors('');
        setMessage('');
        setAlertClass('');
        setIsLoginWithPasswordClicked(false);
    }

    const changeLoginWithPassword = () => {
        setErrors('');
        setMessage('');
        setAlertClass('');
        setIsLoginWithPasswordClicked(true);
    }

    const handleOTPChange = (e, index) => {
        const value = e.target.value;
        const otpArray = otp.split('');
        otpArray[index] = value;
        setOTP(otpArray.join(''));

        // Move the focus to the next OTP box if the current box is filled
        if (value !== '' && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput && nextInput.focus();
        }
    };

    // Function to start the OTP timer
    const startOtpTimer = async () => {
        setTimerStarted(false);

        let minutes = Math.floor(otpTimer / 60);
        let seconds = otpTimer % 60;

        if (tick.current != null) {
            clearInterval(tick.current)
        }

        tick.current = setInterval(() => {

            seconds--;

            if (seconds < 0) {
                minutes--;
                seconds = 59;
            }

            if ((minutes === 0 && seconds === 0) || minutes < 0 || seconds < 0) {

                setOTP(''); // Clear the OTP
                setOtpTimerExpired(true);
                setAddDisabledClass(true)
                setMessage("OTP Expired ! Please resend otp")
            } else {
                console.log(minutes * 60 + seconds)
                setOtpTimer(minutes * 60 + seconds);
            }
        }, 1000);
    };

    const handleVarifiedClicked = async () => {

        try {

            const response = await apiConfig.post('/login', {
                mobile,
                otp
            })

            if (response && response.status === 200) {
                setisLoginWithOTP(false);
                setErrors('');
                setMessage(response.data.message);
                setAlertClass('alert-success');
                setUserId(response.data.data.id);

                dispatch(login(response.data.data, response.data.token));
                clearInterval(tick.current);
                setMobile('');
                setOTP('');

                if (response.data.data.is_password_set) {
                    navigate('/dashboard');
                } else {
                    navigate('/setPassword');
                }

            }
        } catch (error) {

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
                localStorage.removeItem('token');
            }
            else if (error.response && error.response.status === 404) {
                setMessage(error.response.data.message);
                setAlertClass('alert-danger');
                localStorage.removeItem('token');
            }


        }
    }


    const handleResendOTPclicked = async () => {

        try {

            const response = await apiConfig.post('/resendOTP', {
                mobile
            })


            if (response && response.status === 200) {

                setErrors('');
                setMessage(response.data.message);
                setAlertClass('alert-success');
                handleLoginWithOTPClicked()
                setAddDisabledClass(false)
                setTimerStarted(true);
                setOtpTimer(120)
                setOtpTimerExpired(false)

                //startOtpTimer(); // Start the OTP timer again

            }
        } catch (error) {
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
                localStorage.removeItem('token');
            }
            else if (error.response && error.response.status === 404) {
                setMessage(error.response.data.message);
                setAlertClass('alert-danger');
                localStorage.removeItem('token');
            }


        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isLoginWithPasswordClicked) {

            try {
                const response = await loginWithPassword(mobile, password);

                if (response && response.status === 200) {
                    setErrors('');
                    setMessage(response.data.message);
                    setAlertClass('alert-success');
                    //setIsLoginWithPasswordClicked(false);

                    dispatch(login(response.data.data, response.data.token));

                    if (response.data.data.is_password_set) {
                        navigate('/dashboard');
                    } else {
                        navigate('/setPassword');
                    }
                }
                // Redirect to the admin dashboard or desired page
            } catch (error) {

                // Handle validation errors
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
                    localStorage.removeItem('token');
                }
                else if (error.response && error.response.status === 404) {
                    setMessage(error.response.data.message);
                    setAlertClass('alert-danger');
                    localStorage.removeItem('token');
                }

            }

        } else {
            try {
                const response = await apiConfig.post('/attempt-login', {
                    mobile
                });

                if (response && response.status === 200) {
                    setErrors('');
                    setMessage(response.data.message);
                    setAlertClass('alert-success');
                    handleLoginWithOTPClicked()
                }
                // Redirect to the admin dashboard or desired page
            } catch (error) {

                // Handle validation errors
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
                    localStorage.removeItem('token');
                }
                else if (error.response && error.response.status === 404) {
                    setMessage(error.response.data.message);
                    setAlertClass('alert-danger');
                    localStorage.removeItem('token');
                }

            }
        }
    };




    useEffect(() => {
        if (isLoginWithOtp && timerStarted) {
            startOtpTimer();
        }
    }, [timerStarted]);


    return (
        <div id="login-page">
            <div id="user-auth-section">
                <div className="wow animate__animated animate__fadeIn">
                    <div className="user-auth-panel">
                        <div className="login">
                            <div className="loginContainer">
                                <div className="loginImage">
                                    <img src="user/images/signup.png" alt="" />
                                </div>
                                <div className="loginDetail">
                                    <div>
                                        <h2>Login</h2>
                                    </div>
                                    <div>

                                        {isLoginWithOtp ? (
                                            <form id='otpForm'>
                                                {message && <div className={`alert ${alertClass}`}>
                                                    {alertClass === 'alert-success' ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-exclamation-triangle"></i>)}
                                                    {" " + message}
                                                </div>
                                                }
                                                {otpTimer > 0 && !otpTimerExpired && (
                                                    <div>
                                                        <p className='fw-1 fs-5 text-danger'><b>{Math.floor(otpTimer / 60)}:{otpTimer % 60}</b></p>
                                                    </div>
                                                )}
                                                {otpTimer === 0 && !otpTimerExpired && (
                                                    <div className="text-center">
                                                        <p>OTP has expired. Please request a new one.</p>
                                                    </div>
                                                )}

                                                <div id='otp' className="inputs d-flex flex-row justify-content-center mt-2">

                                                    {otpBoxes.map((index) => (
                                                        <input
                                                            key={index}
                                                            type="text"
                                                            className="m-2 text-center form-control rounded mb-3"
                                                            id={`otp-${index}`}
                                                            value={otp[index] || ''}
                                                            maxLength="1" // Limit the input to one character
                                                            onChange={(e) => handleOTPChange(e, index)}
                                                        />
                                                    ))}

                                                    {errors.otp && <span className='validation-error'>{errors.otp}</span>}

                                                </div>
                                                <button
                                                    type="button"
                                                    className={`form-control w-100 btn btn-green-md mb-3 mt-1 ${addDisabledClass ? 'disabled' : ''}`}
                                                    onClick={handleVarifiedClicked}
                                                >
                                                    Verify OTP
                                                </button>

                                                <button
                                                    type="button"
                                                    className={`form-control w-100 btn btn-green-md mb-3 mt-1 ${!addDisabledClass ? 'disabled' : ''}`}
                                                    onClick={handleResendOTPclicked}
                                                >
                                                    Resend OTP
                                                </button>
                                            </form>
                                        ) : (!isLoginWithPasswordClicked ? (<form action="" className="mx-auto pt-5" onSubmit={handleSubmit}>
                                            {message && <div className={`alert ${alertClass}`}>
                                                {alertClass === 'alert-success' ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-exclamation-triangle"></i>)}
                                                {" " + message}
                                            </div>
                                            }

                                            <input type="text" className="mt-3 " placeholder="Enter Mobile No" onChange={handleMobileInput} />
                                            {errors.mobile && <span className='validation-error'>{errors.mobile}</span>}
                                            <input type="password" className="mt-2 " placeholder="Enter Password" onChange={handlePasswordInput} />
                                            {errors.password && <span className='validation-error'>{errors.password}</span>}
                                            <div className="">

                                                <button type="submit" id="login">Login With Password</button>
                                                <p className="login-option fw-bold">OR</p>
                                                <button type="button" id="loginWithOTP" className="mt-2 btn btn-orange-md w-100 fw-bold" onClick={changeLoginWithPassword}>Login With OTP</button>
                                            </div>
                                            <p>New User? <a href="/register">Register</a>.</p>
                                        </form>) : (
                                            <form id='otpForm' onSubmit={handleSubmit}>
                                                {message && <div className={`alert ${alertClass}`}>
                                                    {alertClass === 'alert-success' ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-exclamation-triangle"></i>)}
                                                    {" " + message}
                                                </div>
                                                }

                                                <div>
                                                    <input name="mobile" type="text" id="mobileInput" placeholder="Enter Mobile Number" onChange={handleMobileInput} />
                                                    {errors.mobile && <span className='validation-error'>{errors.mobile}</span>}
                                                </div>

                                                <button type="submit" id="sendOTPButton">Login With OTP</button>
                                                <button type="button" id="loginWithPassword" className='mt-2 btn btn-orange-md w-100 fw-bold' onClick={handleLoginWithPassword}>Login With Password</button>
                                                <p>New User? <a href="/register">Register</a>.</p>
                                            </form>
                                        ))}


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
