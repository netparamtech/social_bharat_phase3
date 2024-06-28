import React, { useState } from 'react';
import { apiWithHeaders } from '../../axios/apiConfig';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';
import PasswordField from '../custom/PasswordField';

const ChangePassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState('');
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
        try {
            const response = await apiWithHeaders.put('/profile/update-password', {
                password, confirmPassword
            });
            if (response && response.status === 200) {

                setErrors('');
                setServerError('');
                navigate('/dashboard');
                dispatch(setLoader(false));
            }
        } catch (error) {
            dispatch(setLoader(false));
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
    return (
        <div id="auth-wrapper" className="pt-5 pb-5">
            <div id="changePassword" className="container">
                <div className={`card shadow mx-auto ${errors ? 'border-danger' : ''}`}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12 p-5">
                                <div className="card-title">
                                    <h3 className="mb-3">Change Password</h3>
                                </div>
                                <form onSubmit={handleSubmit} className="w-100 w-lg-75">
                                    {serverError && <span className='error'>{serverError}</span>}
                                    <div className="row mb-3">
                                        <PasswordField handleChange={handlePasswordChange} errorServer={errors.password}
                                            fieldName="Password" isRequired={true} value={password} placeholder="Enter New Password" 
                                            minLength={6} />
                                    </div>
                                    <div className="row mb-3">
                                        <PasswordField handleChange={handleConfirmPasswordChange} errorServer={errors.confirmPassword}
                                            fieldName="Confirm password" isRequired={true} value={confirmPassword} placeholder="Enter Confirm Password"
                                            minLength={6} />
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

export default ChangePassword;

