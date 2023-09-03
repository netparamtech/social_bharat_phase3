import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateAttemptMobile } from '../services/userService';
import CheckOtpToUpdateMobile from './otp/CheckOtpToUpdateMobile';

const UpdateMobile = () => {

    const [mobile, setMobile] = useState('');
    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');

    const [isMobileValid, setIsMobileValid] = useState(false);

    const navigate = useNavigate();

    const handleMobileChange = (event) => {
        setMobile(event.target.value);
    }

    const handleMobileValid = () => {
        setIsMobileValid(true);
    }

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {
            const response = await updateAttemptMobile(mobile);

            if (response && response.status === 200) {
                setErrors('');
                setMessage(response.data.message);
                handleMobileValid();
            }
        } catch (error) {
            // Handle validation errors
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
            }

            //Unauthorized
            else if (error.response && error.response.status === 401) {
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
                                    <h3 className="mb-3">Update Mobile</h3>
                                </div>
                                {
                                    !isMobileValid && !isMobileValid ? (
                                        <form action='/profile' onSubmit={handleSubmit} className="w-100 w-lg-75">

                                            <div className="row mb-3">
                                                <input
                                                    type="mobile"
                                                    name="mobile"
                                                    id="mobile"
                                                    placeholder="Enter New Mobile"
                                                    className="form-control"
                                                    onChange={handleMobileChange}
                                                    autoFocus
                                                />
                                                {errors.mobile && <span className='error'>{errors.mobile}</span>}
                                            </div>

                                            <div className="row mb-3">
                                                <button type="submit" className="btn btn-primary">
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <CheckOtpToUpdateMobile mobile={mobile} message={message} />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UpdateMobile;

