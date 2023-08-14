import React from 'react';

const OTP = () => {
    return (
        <div id="login-page">
            <div id="user-auth-section" className='login'>
                <div className="container wow animate__animated animate__fadeIn">
                    <div className="user-auth-panel">
                        <div className="">
                            <div className="loginContainer">
                                <div className="loginImage ">
                                    <img src="user/images/signup.png" alt="" />
                                </div>
                                <div className="loginDetail">
                                    <div>
                                        <h3>Enter the OTP</h3>
                                    </div>
                                    <div>
                                        <form id="otpForm">
                                            <div className="otp-container">

                                                <input type="number" className="otp-input" maxLength="1"  />
                                                <input type="number" className="otp-input" maxLength="1" />
                                                <input type="number" className="otp-input" maxLength="1" />
                                                <input type="number" className="otp-input" maxLength="1" />
                                                <input type="number" className="otp-input" maxLength="1" />
                                                <input type="number" className="otp-input" maxLength="1" />
                                            </div>
                                            <button type="button" id="sendOTPButton">VERIFY</button>
                                            <button type="submit" id="continueButton">CONTINUE</button>
                                            <p id="otpStatus">OTP Sent. Resend in <span id="resendTimer">30</span> seconds.</p>
                                            <p>New User? <a href="register.html">Signup</a>.</p>
                                        </form>
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

export default OTP;
