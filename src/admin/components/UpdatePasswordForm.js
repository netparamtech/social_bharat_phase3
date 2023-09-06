import React, { useState } from 'react';
import { updatePassword } from '../services/AdminService';
import { useNavigate } from 'react-router-dom';

const UpdatePasswordForm = () => {

  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await updatePassword(password, confirm_password);


      if (response && response.status === 200) {
        setPassword('')
        setConfirmPassword('')
        setErrors('');
        setMessage(response.data.message);
        setAlertClass('alert-success');

      }
      // Redirect to the admin dashboard or desired page
    } catch (error) {
      console.log("error found")
      // Handle validation errors
      if (error.response && error.response.status === 400) {
        console.log(error.response.data.message);
        setErrors(error.response.data.errors);
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
      }
      //Internal Server Erro
      else if (error.response && error.response.status === 500) {
        console.log(error.response.data.message);
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
      }
      //Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate('/admin')
      }
      //Conflict
      else if (error.response && error.response.status === 409) {
        console.log(error.response.data.message);
        setErrors(error.response.data.errors);
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Change Password</h1>
      </div>
      <div className="card">
        <div className="card-body">

          <form onSubmit={handleSubmit} className="p-3">
            {message && <div className={`alert ${alertClass}`}>
              {alertClass === 'alert-success' ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-exclamation-triangle"></i>)}
              {" " + message}
            </div>
            }
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"

                onChange={(e) => setPassword(e.target.value)}

              />
              {errors.password && <span className='validation-error'>{errors.password}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"

                onChange={(e) => setConfirmPassword(e.target.value)}

              />
              {errors.confirm_password && <span className='validation-error'>{errors.confirm_password}</span>}
            </div>
            <button type="submit" className="btn btn-primary">Change Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
