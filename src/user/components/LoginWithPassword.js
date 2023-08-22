import React, { useState } from 'react';
import { loginWithPassword } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from '../actions/userAction';

const LoginWithPassword = (props) => {
    const { chnageFlag } = props;

    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState('');

    //onChange handler
    const handleMobileChange = (event) => {
        setMobile(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await loginWithPassword(mobile, password);

            if (response && response.status === 200) {
                setErrors('');

                dispatch(login(response.data.data, response.data.token));

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
            //Internal Server Error
            else if (error.response && error.response.status === 500) {

            }
            //Unauthorized
            else if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate('/login');
            }

        }
    }
    const openLoginWithOtpForm = () => {
        chnageFlag(true);
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
                                    <h3 className="mb-3">Sign in</h3>
                                </div>
                                <form action='/dashboard' className="w-100 w-lg-75" onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <input
                                            type="text"
                                            name="mobile"
                                            id="mobile"
                                            placeholder="Enter your mobile number"
                                            className="form-control"
                                            onChange={handleMobileChange}
                                        />
                                         {errors.mobile && <span className='error'>{errors.mobile}</span>}
                                    </div>
                                    <div className="row mb-3">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Enter Password"
                                            className="form-control"
                                            onChange={handlePasswordChange}
                                            autoFocus
                                        />
                                        {errors.password && <span className='error'>{errors.password}</span>}
                                    </div>
                                    <div className="row mb-3">
                                        <button type="submit" className="btn btn-primary">
                                            Login With Password
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
                                        <button type = "button" className="btn btn-secondary" onClick={openLoginWithOtpForm}>
                                            Login With OTP
                                        </button>
                                    </div>
                                    <div className="row mt-3">
                                        <p className="fw-lighter fs-6">New User? <a href="/register" className="text-primary">Signup</a>.</p>
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
