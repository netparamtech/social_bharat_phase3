import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiConfig } from '../axios/apiConfig';

const Register = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [userId, setUserId] = useState('');

    const [community_id, SetCommunity_id] = useState(1);
    const [casts, setCasts] = useState([]);

    const [isRegisterClicked, setIsRegisterClicked] = useState(false)

    const [otp, setOTP] = useState('')
    const [otpTimer, setOtpTimer] = useState(0); // 120 seconds (2 minutes) initial timer
    const [otpTimerExpired, setOtpTimerExpired] = useState(false);

    const [addDisabledClass, setAddDisabledClass] = useState(false)

    const [timerStarted, setTimerStarted] = useState(false);

    const tick = useRef();

    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    const [alertClass, setAlertClass] = useState('');

    const [backgroundImage, setBackgroundImage] = useState('');

    const otpBoxes = Array.from({ length: 6 }, (_, index) => index);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    }

    const handleSelectChange = (event) => {
        SetCommunity_id(parseInt(event.target.value, 10));
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

    const handleRegisterClicked = () => {
        setOtpTimerExpired(false);
        setIsRegisterClicked(true);
        setOtpTimer(120);
        setTimerStarted(true);
    };

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

    //varify otp method
    const handleVarifiedClicked = async () => {
        try {

            const response = await apiConfig.post('/register', {
                name,
                mobile,
                community_id,
                otp
            })


            if (response && response.status === 201) {
                setIsRegisterClicked(false);
                setErrors('');
                setMessage(response.data.message);
                setAlertClass('alert-success');
                localStorage.setItem('token', response.data.token.token);
                setUserId(response.data.data.id);

                clearInterval(tick.current)
                setName('')
                setMobile('')
                setOTP('')

                // setTimeout(() => {
                //     navigate('/user/change-password')
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
                handleRegisterClicked()
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

    //handleSubmit will called when register is clicked

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {
            const response = await apiConfig.post('/create-tmp-user', {
                name,
                mobile,
                community_id
            });
            if (response && response.status === 201) {

                setErrors('');
                setMessage(response.data.message);
                setAlertClass('alert-success');
                handleRegisterClicked()
            }
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
        if (isRegisterClicked && timerStarted) {
            startOtpTimer();
        }
    }, [timerStarted]);




    return (
        <div id="register-page">
            <div className="signup">
                <div className="signupContainer">
                    <div className="signupImage">
                        <img src="user/images/signup.png" alt="" />
                    </div>
                    <div className="signupDetail">
                        <div>
                            <h3>Signup</h3>
                        </div>
                        <div>

                            {isRegisterClicked ? (
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

                                    <div className='otp-container'>

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
                            ) : (
                                <form >
                                    {!isRegisterClicked ? (message && <div className={`alert ${alertClass}`}>
                                        {alertClass === 'alert-success' ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-exclamation-triangle"></i>)}
                                        {" " + message}
                                    </div>) : ''
                                    }

                                    <div >

                                        <input type="text" id="name" name='name' placeholder="Enter your name" onChange={handleNameChange} />
                                        {errors.name && <span className='validation-error'>{errors.name}</span>}
                                    </div>
                                    <div>

                                        <input type="text" id="mobile" name='mobile' placeholder="Enter your mobile" onChange={handleMobileChange} />
                                        {errors.mobile && <span className='validation-error'>{errors.mobile}</span>}
                                    </div>

                                    <div>

                                        <select id="community_id" className="mb-1" value={community_id} onChange={handleSelectChange}>
                                            <option value="">---Select Community---</option>
                                            {casts.map((cast) => (
                                                <option key={cast.id} value={cast.id}>
                                                    {cast.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.community_id && <span className='validation-error'>{errors.community_id}</span>}
                                    </div>


                                    <button type="submit" className="" onClick={handleSubmit}>Register</button>

                                    <p>Already a User? <a href="/login">Login</a>.</p>                                </form>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
