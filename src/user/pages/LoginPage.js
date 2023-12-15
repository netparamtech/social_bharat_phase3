import './css/login.css';
import React, { useEffect, useState } from 'react';
import UserLayout from '../layouts/UserLayout';
import LoginWithMobile from '../components/login/LoginWithMobile';
import LoginWithPassword from '../components/login/LoginWithPassword';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/userAction';
import { setModelAction } from '../actions/loaderAction';


const LoginPage = () => {
    const [isOtpLogin,setIsOtpLogin] = useState(false);
    const dispatch = useDispatch();

    const chnageFlag = (value) => {
        setIsOtpLogin(value)
    }

    useEffect(()=>{
        dispatch(logout());
        dispatch(setModelAction(true));
        window.scrollTo(0, 0);
    },[]);
  
    return (
        <UserLayout>
            {
            isOtpLogin?( <LoginWithMobile chnageFlag = {chnageFlag} />)
            :
            (<LoginWithPassword chnageFlag = {chnageFlag} />)
            }
        </UserLayout>
        );
};

export default LoginPage;
