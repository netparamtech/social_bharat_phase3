import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
    useEffect(() => {
        document.body.classList.add('bg-gradient-primary');
    }, []);
   return (
    <>
    <Helmet>
        <link rel="stylesheet" href="/admin/css/sb-admin-2.min.css" />
        <link rel="stylesheet" href="/admin/css/custom.css" />
    </Helmet>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome to Social Bharat!</h1>
                      </div>
                        <LoginForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
