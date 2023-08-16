import React, { useState } from 'react';
import { apiWithHeaders } from '../axios/apiConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../actions/userAction';

const SetPassword = (props) => {
    const {changeIsPasswordSet} = props;
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    const [alertClass, setAlertClass] = useState('');

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


        try {
            const response = await apiWithHeaders.put('/profile/update-password', {
               password,confirmPassword
            });
            if (response && response.status === 200) {

                setErrors('');
                setMessage(response.data.message);
                setAlertClass('alert-success');
               setTimeout(()=>{
                navigate('/dashboard');
               },1000)

                
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
                
            }
            else if (error.response && error.response.status === 404) {
                setMessage(error.response.data.message);
                setAlertClass('alert-danger');
                
            }

        }
    };
    return (
        <div id="setPassword">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <form action="" className="setPassword mx-auto p-4" onSubmit={handleSubmit}>
                        {message && <div className={`alert ${alertClass}`}>
                                        {alertClass === 'alert-success' ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-exclamation-triangle"></i>)}
                                        {" " + message}
                                    </div>
                                    }
                            <h5>Set Password</h5>
                            <input type="password" className="mt-3 w-100" placeholder="Enter New Password" onChange={handlePasswordChange} />
                            {errors.password && <span className='validation-error'>{errors.password}</span>}
                            <input type="password" className="mt-3 w-100" placeholder="Enter Confirm Password" onChange={handleConfirmPasswordChange} />
                            {errors.confirmPassword && <span className='validation-error'>{errors.confirmPassword}</span>}
                            <div className="text-center">
                                <button type="submit" className="mt-3 btn btn-green-md">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SetPassword;
