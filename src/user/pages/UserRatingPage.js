import React, { useEffect } from 'react';
import UserLayout from '../layouts/UserLayout';
import UserRating from '../components/userRating/UserRating';

const UserRatingPage = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    return (
        <UserLayout>
            <UserRating />
        </UserLayout>
        
        );
};

export default UserRatingPage;