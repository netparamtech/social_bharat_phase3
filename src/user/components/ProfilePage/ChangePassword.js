import React, { useState } from 'react';
import { apiWithHeaders } from '../../axios/apiConfig';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {
            const response = await apiWithHeaders.put('/profile/update-password', {
                password, confirmPassword
            });
            if (response && response.status === 200) {

                setErrors('');
                window.location.href = '/dashboard';
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
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        dispatch(logout());
        navigate('/login');
      }

        }
    };
    return (
        <div id="auth-wrapper" className="pt-5 pb-5">
            <div id="changePassword" className="container">
                <div className="card shadow mx-auto">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12 p-5">
                                <div className="card-title">
                                    <h3 className="mb-3">Change Password</h3>
                                </div>
                                <form onSubmit={handleSubmit} className="w-100 w-lg-75">
                                    <div className="row mb-3">
                                        <input
                                            type="password"
                                            name="newPassword"
                                            id="newPassword"
                                            placeholder="Enter New Password"
                                            className="form-control"
                                            onChange={handlePasswordChange}
                                        />
                                        {errors.password && <span className='error'>{errors.password}</span>}
                                    </div>
                                    <div className="row mb-3">
                                        <input
                                            type="password"
                                            name="cPassword"
                                            id="cPassword"
                                            placeholder="Enter Confirm Password"
                                            className="form-control"
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

export default ChangePassword;

