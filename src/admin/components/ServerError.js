import { Button, Card } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../admin/css/style.css'; 
const ServerError = () => {
  const user = useSelector((state) => state.auth);
  const isAuthenticUser = user && user.isAuthenticated;

  const navigate = useNavigate();

  const handleGoBack = () => {
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
          <p>Oops! Something went wrong on our server.</p>
          <Button className="errorButtonServerError" type="primary" onClick={handleGoBack}>
            Go Back
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ServerError;
