import React, { useEffect } from 'react';
import UserLayout from '../layouts/UserLayout';
import RegisterForm from '../components/register/RegisterForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const user = useSelector((state) => state.userAuth);
    const isAuthenticUser = user && user.isAuthenticated;
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticUser) {
            navigate('/')
        } else {
            navigate('/register')
        }
        window.scroll(0, 0);
    }, []);

    return (
        <UserLayout>
            <RegisterForm />
        </UserLayout>

    );
};

export default RegisterPage;