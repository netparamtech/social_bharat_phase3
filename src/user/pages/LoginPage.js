import React, { useState } from 'react';
import UserLayout from '../layouts/UserLayout';
import LoginWithPassword from '../components/LoginWithPassword';
import LoginWithOtp from '../components/LoginWithOtp';


const LoginPage = () => {
    const [isOtpLogin,setIsOtpLogin] = useState(false);

    const chnageFlag = (value) => {
        setIsOtpLogin(value)
    }
    return (
        <UserLayout>
            {
            isOtpLogin?( <LoginWithOtp chnageFlag = {chnageFlag} />)
            :
            (<LoginWithPassword chnageFlag = {chnageFlag} />)
            }
        </UserLayout>
        
        );
};

export default LoginPage;
