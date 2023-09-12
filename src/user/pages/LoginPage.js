import React, { useState } from 'react';
import UserLayout from '../layouts/UserLayout';
import LoginWithMobile from '../components/login/LoginWithMobile';
import LoginWithPassword from '../components/login/LoginWithPassword';


const LoginPage = () => {
    const [isOtpLogin,setIsOtpLogin] = useState(false);

    const chnageFlag = (value) => {
        setIsOtpLogin(value)
    }
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
