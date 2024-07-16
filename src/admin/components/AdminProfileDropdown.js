import React, { useEffect, useState } from 'react';
import { Dropdown, Avatar } from 'antd';
import 'antd/dist/antd'; // Import Ant Design CSS
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../services/AdminService';
import { logout } from '../actions/authActions';

// ...

const AdminProfileDropdown = () => {

    const user = useSelector((state) => state.auth.user);
    const tokenExpireDate = user && user.token && user.token.expire_at;
    const [isAuthenticUser, setIsAuthenticatedUser] = useState(user && user.isAuthenticated)
    const defaultPhoto = '/admin/img/user-add-icon.png';

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userProfile, setUserProfile] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        if (tokenExpireDate) {
            const expireDate = new Date(tokenExpireDate);
            const currentDate = new Date();
            if (expireDate < currentDate && window.location.pathname !== '/admin') {
                dispatch(logout())
                setIsAuthenticatedUser(false);
                navigate('/admin')
            } else if (expireDate < currentDate) {
                dispatch(logout())
            }
        }
    }, [tokenExpireDate]);

    useEffect(() => {
        if (user) {
            setUserName(user.name || '');
            setUserEmail(user.email || '');
            setUserProfile(user.photo && user.photo || '');
        }
    }, [user]);

    const handleLogOutClick = async () => {
        try {
            const response = await adminLogout();

            if (response.status === 200) {
                dispatch(logout())
                navigate('/admin');
            }
        } catch (error) {
            console.log(error.response.status)
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                console.log("logout success")
                navigate('/admin');
            } else if (error.response && error.response.status === 500) {
                navigate('/admin');
            }
        }
    }

    const items = [

        {
            key: '1',
            label: (
                <>
                    <h6 className="dropdown-header d-flex ps-0">
                        <img className="dropdown-admin-img me-2" src={userProfile ? userProfile : defaultPhoto} alt="User" />
                        <div className="dropdown-user-details">
                            <div className="dropdown-user-details-name">{userName}</div>
                            <div className="dropdown-user-details-email">{userEmail}</div>
                        </div>
                    </h6>
                    <div className="dropdown-divider"></div>
                </>
            ),
        },
        {
            key: '2',
            label: (
                <a className='hover-pointer-admin' onClick={() => navigate('/admin/change-profile')}>
                    <i className="fas fa-user-alt m-2"></i> Change Profile
                </a>
            ),
        },

        {
            key: '3',
            label: (
                <a className='hover-pointer-admin' onClick={() => navigate('/admin/change-password')}>
                    <i className="fas fa-key m-2"></i> Change Password
                </a>
            ),
        },

        {
            key: '4',
            label: (
                <div className="dropdown-divider"></div>
            ),
        },


        {
            key: '5',
            label: (
                <a className='hover-pointer-admin' onClick={(e) => {
                    e.preventDefault();
                    handleLogOutClick();
                }}>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 m-2"></i> Logout
                </a>
            ),
        },
    ]

    return (
        <Dropdown
            menu={{
                items,
            }}
            trigger={['hover']}
            placement="bottomRight"
        >

            <a
                className="btn btn-icon btn-transparent-dark"
                onClick={(e) => e.preventDefault()}
            >
                {userName}

                {

                    <Avatar
                        src={userProfile ? userProfile : defaultPhoto}
                        alt={userName}
                        size="large"
                        className='className="img-profile rounded-circle m-2'
                    />

                }

            </a>
        </Dropdown>
    );
};

export default AdminProfileDropdown;
