import { Button, Card } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../admin/css/style.css';
import { logout } from '../actions/authActions';
const ServerError = ({ errorMessage }) => {
  const user = useSelector((state) => state.auth);
  const isAuthenticUser = user && user.isAuthenticated;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoBack = (e) => {
    e.preventDefault();
    if (isAuthenticUser) {
      navigate('/admin/dashboard');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="containerServerError">
      <div className="cardContainerServerError">
        <Card title="500 Internal Server Error">
          <p>Error Message: {errorMessage || "Oops! Something went wrong on our server."}</p>
          {
            errorMessage === 'userId is not defined' ? (
              <Button className="errorButtonServerError" type="primary" onClick={()=>{
                dispatch(logout());
                navigate('/admin');
              }}>
                Need to Logout
              </Button>) : (
              <Button className="errorButtonServerError" type="primary" onClick={handleGoBack}>
                Go Back
              </Button>
            )
          }

        </Card>
      </div>
    </div>
  );
};

export default ServerError;
