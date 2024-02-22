import './css/login.css';
import React, { useEffect, useState } from 'react';
import UserLayout from '../layouts/UserLayout';
import LoginWithMobile from '../components/login/LoginWithMobile';
import LoginWithPassword from '../components/login/LoginWithPassword';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction';
import { setModelAction } from '../actions/loaderAction';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const user = useSelector((state) => state.userAuth);
    const isAuthenticUser = user && user.isAuthenticated;
    const tokenExpireDate = user && user.token && user.token.expire_at;
    const [isOtpLogin, setIsOtpLogin] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const chnageFlag = (value) => {
        setIsOtpLogin(value)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (user) {
            const expireDate = new Date(tokenExpireDate);
            const currentDate = new Date();
            if (expireDate > currentDate) {
                navigate('/')
            } else {
                navigate('/login')
            }
        }
    }, [user]);

    return (
        <UserLayout>
            {
                isOtpLogin ? (<LoginWithMobile chnageFlag={chnageFlag} />)
                    :
                    (<LoginWithPassword chnageFlag={chnageFlag} />)
            }
        </UserLayout>
    );
};

export default LoginPage;
