import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiConfig, apiWithHeaders } from '../axios/apiConfig';
import { login } from '../actions/userAction';
import { updateAttemptMobile, updateMobile } from '../services/userService';

const UpdateMobile = () => {
    const [mobile, setMobile] = useState('')
    const [otp, setOTP] = useState('')
    const [userId, setUserId] = useState('');

    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    const [alertClass, setAlertClass] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');

    const [isUpdateClicked, setIsUpdateClicked] = useState(false);

    const [otpTimer, setOtpTimer] = useState(0); // 120 seconds (2 minutes) initial timer
    const [otpTimerExpired, setOtpTimerExpired] = useState(false);

    const [addDisabledClass, setAddDisabledClass] = useState(false)

    const [timerStarted, setTimerStarted] = useState(false);

    const tick = useRef();
    const otpBoxes = Array.from({ length: 6 }, (_, index) => index);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMobileInput = (e) => {
        setMobile(e.target.value)
    }

    const handleUpdateClicked = () => {
        setOtpTimerExpired(false);
        setIsUpdateClicked(true);
        setOtpTimer(120);
        setTimerStarted(true);
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
                console.log(minutes * 60 + seconds, "i am out")
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

            const response = await updateMobile(mobile,otp);

            if (response && response.status === 200) {
                setIsUpdateClicked(false);
                setErrors('');
                setMessage(response.data.message);
                setAlertClass('alert-success');
                console.log("check mobile no",response.data.data,response.data.token)
                dispatch(login(response.data.data))
                clearInterval(tick.current)
                setMobile('')
                setOTP('')

                // setTimeout(() => {
                //     navigate('/user/profile')
                // }, 2000)

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
                handleUpdateClicked()
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

        try {
            const response = await updateAttemptMobile(mobile)

            if (response && response.status === 200) {
                setErrors('');
                setMessage(response.data.message);
                setAlertClass('alert-success');
                setOTP('');
                handleUpdateClicked();
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
    };



    useEffect(() => {
        if (isUpdateClicked && timerStarted) {
            startOtpTimer();
        }
    }, [timerStarted]);


    return (
        <div id="setPassword">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 bg-white mx-auto p-4" >
                        

                            {isUpdateClicked ? (
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

                                    <div className='otp-container w-75 mx-auto'>

                                        {otpBoxes.map((index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                className=""
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
                                        className={`form-control  btn btn-green-md mb-3 mt-3 ${addDisabledClass ? 'disabled' : ''}`}
                                        onClick={handleVarifiedClicked}
                                    >
                                        Verify OTP
                                    </button>

                                    <button
                                        type="button"
                                        className={`form-control  btn btn-green-md mb-3 mt-1 ${!addDisabledClass ? 'disabled' : ''}`}
                                        onClick={handleResendOTPclicked}
                                    >
                                        Resend OTP
                                    </button>
                                </form>
                            ) : (
                                <form className='setPassword mx-auto p-4' onSubmit={handleSubmit}>
                                    {message && <div className={`alert ${alertClass}`}>
                                        {alertClass === 'alert-success' ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-exclamation-triangle"></i>)}
                                        {" " + message}
                                    </div>
                                    }
                                     <h5>Change Mobile</h5>

                                    <div>
                                        <input  className="mt-3 w-100" name="mobile" type="text" id="mobileInput" placeholder="Enter Mobile Number" onChange={handleMobileInput} />
                                        {errors.mobile && <span className='validation-error'>{errors.mobile}</span>}
                                    </div>

                                    <button type="submit" className='mt-3 btn btn-green-md' id="sendOTPButton">Update</button>

                                </form>
                            )}


                    </div>
                </div>
            </div>
        </div>
                
    );
};

export default UpdateMobile;
