import React, { useEffect, useState } from 'react';
import { createUser, resendOtp } from '../services/userService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../actions/userAction';

const RegisterWithOtp = (props) => {
    const {userDetail,message} = props;

    const [otp, setOtp] = useState('');

    const [remainingTime, setRemainingTime] = useState(120);
    const [isTimeExpired, setIsTimeExpired] = useState(false);

    const [errors, setErrors] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const otpBoxes = Array.from({ length: 6 }, (_, index) => index);



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

    const handleResendOTP = () => {
        setIsTimeExpired(false);
        setRemainingTime(120);
    }

    const handleVarifiedClicked = async (event) => {
        event.preventDefault();
        const updatedUserDetail = { ...userDetail, otp: otp }; // Append the OTP to the userDetail object

        try {

            const response = await createUser(updatedUserDetail);

            if (response && response.status === 201) {
                dispatch(login(response.data.data, response.data.token));
                setOtp('');

                if (response.data.data.is_password_set) {
                    navigate('/dashboard');
                } else {
                    navigate('/set-password');
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
            const response = await resendOtp(userDetail.mobile);

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

    useEffect(() => {
        if (remainingTime > 0) {
            const timerInterval = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerInterval);
        } else if (remainingTime === 0) {
            setIsTimeExpired(true);
        }
    }, [remainingTime]);

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
                                <img src="/user/images/signup.png" className="img-fluid" alt="Signup" />
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12 p-5">
                                <div className="card-title">
                                    <h3 className="mb-3">Verify OTP</h3>
                                </div>
                                <form action='/dashboard' className="w-100 w-lg-75" onSubmit={handleVarifiedClicked}>

                                    <div className="row mb-3">
                                        <input type="text"
                                         name="mobile"
                                          id="mobile"
                                         placeholder="Enter your mobile number" 
                                         className="form-control"
                                         value={userDetail.mobile}
                                         disabled
                                         />
                                         
                                    </div>

                                    <div className="row mb-3">
                                    {message && <p className='text-center mb-0 mt-1 mb-2'><span className='error'>{message}</span></p>}
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
                                                    autoFocus={index === 0}
                                                    
                                                />
                                            ))}
                                        </div>
                                        {errors.otp && <p className='text-center mb-0 mt-1'><span className='error'>{errors.otp}</span></p>}
                                    </div>

                                    <div className="row text-center">
                                        <span id="timer">{formatTime()}</span>
                                    </div>

                                    <div className="row mb-3">

                                        <button type="submit"
                                            className="btn btn-primary"
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
                                            className="btn btn-secondary"
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

export default RegisterWithOtp;
