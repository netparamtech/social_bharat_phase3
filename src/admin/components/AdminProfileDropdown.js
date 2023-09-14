import React, { useEffect, useState } from 'react';
import { Dropdown, Avatar } from 'antd';
import 'antd/dist/antd'; // Import Ant Design CSS
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../services/AdminService';

// ...

const AdminProfileDropdown = () => {

    const user = useSelector((state) => state.auth.user);
    const defaultPhoto = '/admin/img/user-add-icon.png';

    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userProfile, setUserProfile] = useState('');

    useEffect(() => {
        if (user) {
            setUserName(user.name || '');
            setUserEmail(user.email || '');
            setUserProfile(user.photo && user.photo || '');
        }
    }, [user]);

    const handleLogOutClick = async () => {
        try {
            const response = await logout();

            if (response.status === 200) {

                navigate('/admin');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
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
                <a href="#" onClick={() => navigate('/admin/change-profile')}>
                    <i className="fas fa-user-alt m-2"></i> Change Profile
                </a>
            ),
        },

        {
            key: '3',
            label: (
                <a href="#" onClick={() => navigate('/admin/change-password')}>
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
                <a href='#' onClick={(e) => {
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
