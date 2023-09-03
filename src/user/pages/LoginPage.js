import React, { useState } from 'react';
import UserLayout from '../layouts/UserLayout';
import LoginWithPassword from '../components/LoginWithPassword';
import LoginWithMobile from '../components/LoginWithMobile';


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
