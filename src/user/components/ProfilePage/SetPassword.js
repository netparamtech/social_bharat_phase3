import React, { useEffect, useState } from 'react';
import { apiWithHeaders } from '../../axios/apiConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userAction';
import { Input } from 'antd';
import { setLoader } from '../../actions/loaderAction';

const SetPassword = () => {
    const loggedUser = useSelector((state) => state.userAuth);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');

    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    const [alertClass, setAlertClass] = useState('');
    const [serverError, setServerError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        dispatch(setLoader(true));

        const updatedUser = {
            ...user, // Spread the original object to keep its other properties
            is_password_set: 1, // Update the specific field
        };


        try {
            const response = await apiWithHeaders.put('/profile/update-password', {
                password, confirmPassword
            });
            if (response && response.status === 200) {

                setErrors('');
                setMessage(response.data.message);
                setAlertClass('alert-success');
                dispatch(login(updatedUser, token));
                setServerError('');
                navigate('/dashboard');
                dispatch(setLoader(false));
            }
        } catch (error) {
            dispatch(setLoader(false));
            // Handle validation errors
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
                setServerError('');
            }
            //Unauthorized
            else if (error.response && error.response.status === 401) {
                navigate('/login');
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }

        }
    };
    useEffect(() => {
        setUser(loggedUser?.user);
        setToken(loggedUser?.token);
    })
    return (
        <div id="auth-wrapper" className="pt-5 pb-5">
            <div id="changePassword" className="container">
                <div className="card shadow mx-auto">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12 p-5">
                                <div className="card-title">
                                    <h3 className="mb-3">Set Password</h3>
                                </div>
                                <form action='/dashboard' onSubmit={handleSubmit} className="w-100 w-lg-75">
                                    {serverError && <span className='error'>{serverError}</span>}
                                    <div className="row mb-3">
                                        <Input.Password
                                            type="password"
                                            name="newPassword"
                                            id="newPassword"
                                            placeholder="Enter New Password"
                                            className="input-height"
                                            onChange={handlePasswordChange}
                                            autoFocus
                                        />

                                        {errors.password && <span className='error'>{errors.password}</span>}
                                    </div>
                                    <div className="row mb-3">
                                        <Input.Password
                                            type="password"
                                            name="cPassword"
                                            id="cPassword"
                                            placeholder="Enter Confirm Password"
                                            className="input-height"
                                            onChange={handleConfirmPasswordChange}
                                        />
                                        {errors.confirmPassword && <span className='error'>{errors.confirmPassword}</span>}
                                    </div>
                                    <div className="row mb-3">
                                        <button type="submit" className="btn btn-primary">
                                            Submit
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

export default SetPassword;

