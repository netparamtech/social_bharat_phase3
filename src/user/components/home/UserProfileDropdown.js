import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd'; // Import Ant Design CSS
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { apiWithHeaders } from '../../axios/apiConfig';
import { logout } from '../../actions/userAction';
import { userLogout } from '../../services/userService';

// ...

const UserProfileDropdown = () => {

    const user = useSelector((state) => state.userAuth);
    const [id, setId] = useState(user && user.user && user.user.id);
    const [loggedUserFirstLatter, setLoggedUserFirstLatter] = useState('');
    const isPasswordSet = user && user.user && user.user.is_password_set;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userProfile, setUserProfile] = useState('');

    useEffect(() => {
        if (user && user.user) {
            setUserName(user.user.name || '');
            setUserEmail(user.user.email || '');
            setUserProfile(user.user.photo || '');
            setLoggedUserFirstLatter(user.user.name.charAt(0).toUpperCase());
        }
    }, [user]);

    const handleProfileClick = async () => {
        if(isPasswordSet){
            navigate('/profile');
        }else {
            navigate('/set-password');
        }
    }

    const handleChangePasswordClick = async () => {
        if(isPasswordSet){
            navigate('/change-password');
        }else {
            navigate('/set-password');
        }
    }
    const handleLogOutClick = async () => {
        try {
            const response = await userLogout(id);

            if (response.status === 200) {
               
                navigate('/login');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate('/login');
            } else if (error.response && error.response.status === 500) {
                dispatch(logout());
                navigate('/login');
            }
        }
    }

    const items = [

        {
            key: '1',
            label: (
                <>
                    <h6 className="dropdown-header d-flex align-items-center">
                        <img className="dropdown-user-img me-2" src={userProfile ? userProfile : '/user/images/OIP.jpg'} alt="User" />
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
                <>
                    <h6 className="dropdown-header d-flex align-items-center">
                        <img className="dropdown-user-img me-2" src={userProfile ? userProfile : '/user/images/OIP.jpg'} alt="User" />
                        <div className="dropdown-user-details">
                            <div className="dropdown-user-details-name">Community Name</div>
                            
                        </div>
                    </h6>
                    <div className="dropdown-divider"></div>
                </>
            ),
        },

        {
            key: '3',
            label: (
                <a href="#" className="text-decoration-none" onClick={handleProfileClick}>
                    <i className="fas fa-user-alt m-2"></i> Profile
                </a>
            ),
        },

        {
            key: '4',
            label: (
                <a href="#" className="text-decoration-none" onClick={handleChangePasswordClick}>
                    <i className="fas fa-key m-2"></i> Change Password
                </a>
            ),
        },
        {
            key: '5',
            label: (
                <a href="#!" className="text-decoration-none">
                    <i className="fas fa-cog m-2"></i> Settings
                </a>
            ),
        },

        {
            key: '6',
            label: (
                <a href='#' className="text-decoration-none" onClick={(e) => {
                    e.preventDefault();
                    handleLogOutClick();
                }}>
                    <i className="fas fa-sign-out m-2"></i> Logout
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
                className="btn btn-icon btn-transparent-dark text-capitalize fs-6 text-primary "
                onClick={(e) => e.preventDefault()}
            >
                {userName}

                {
                    userProfile ? (
                        <Avatar
                            src={userProfile}
                            alt={userName}
                            size="large"
                            className='m-2'
                        />
                    ) : (<button type='button' className='dropdown-user-img-letter m-2'>{loggedUserFirstLatter}</button>)
                }

            </a>
        </Dropdown>
    );
};

export default UserProfileDropdown;
