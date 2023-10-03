import React, { useEffect, useState } from 'react';
import { Dropdown, Avatar } from 'antd';
import 'antd/dist/antd'; // Import Ant Design CSS
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchOneCommunity, userLogout } from '../../services/userService';

// ...

const UserProfileDropdown = () => {

    const user = useSelector((state) => state.userAuth);
    const [id, setId] = useState(user && user.user && user.user.id);
    const [loggedUserFirstLatter, setLoggedUserFirstLatter] = useState('');
    const isPasswordSet = user && user.user && user.user.is_password_set;
    const [community,setCommunity] = useState({});

    const defaultPhoto = '/user/images/user.png';

    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userProfile, setUserProfile] = useState('');

    const [isAndroidUsed,setIsAndroidUsed] = useState(false);

    useEffect(() => {
        if (user && user.user) {
          const { id, name, email, photo, is_password_set } = user.user;
          setId(id);
          setUserName(name || '');
          setUserEmail(email || '');
          setUserProfile(photo || '');
          setLoggedUserFirstLatter(name.charAt(0).toUpperCase());
        }
      }, [user]);

      useEffect(() => {
        const handleResize = () => {
          setIsAndroidUsed(window.innerWidth < 768); // Adjust the threshold based on your design considerations
        };
    
        // Listen for window resize events
        window.addEventListener("resize", handleResize);
        handleResize(); // Call initially to set the correct value
    
        // Cleanup the event listener when component is unmounted
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
    
      const handleProfileClick = async () => {
        navigate(isPasswordSet ? '/profile' : '/set-password');
      };
    
      const handleChangePasswordClick = async () => {
        navigate(isPasswordSet ? '/change-password' : '/set-password');
      };
    
      const fetchLoggedUserCommunity = async () => {
        try {
          const response = await fetchOneCommunity();
          if (response && response.status === 200) {
            setCommunity(response.data.data);
          }
        } catch (error) {
          handleFetchError(error);
        }
      };
    
      useEffect(() => {
        fetchLoggedUserCommunity();
      }, []);
    
      const handleLogOutClick = async () => {
        try {
          const response = await userLogout(id);
          if (response.status === 200) {
            navigate('/login');
          }
        } catch (error) {
          handleFetchError(error);
        }
      };
    
      const handleFetchError = (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 500)) {
          navigate('/login');
        }
      };
    
      const generateMenuItems = () => {
        const items = [
          {
            key: '1',
            label: (
              <>
                <h6 className="dropdown-header d-flex align-items-center menu-font ">
                  <img className="dropdown-user-img me-2" src={userProfile || '/user/images/OIP.jpg'} alt="User" />
                  <div className="dropdown-user-details">
                    <div className="dropdown-user-details-name menu-font">{userName}</div>
                    <div className="dropdown-user-details-email menu-font">{userEmail}</div>
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
                  <img className="dropdown-thubnail-img me-2" src={community.thumbnail_image || defaultPhoto} alt="User" />
                  <div className="dropdown-user-details">
                    <div className="dropdown-user-details-name menu-font">{community.name}</div>
                  </div>
                </h6>
                <div className="dropdown-divider"></div>
              </>
            ),
          },
          {
            key: '3',
            label: (
              <span onClick={handleProfileClick} className='menu-font'>
                <i className="fas fa-user-alt m-2"></i> Profile
              </span>
            ),
          },
          {
            key: '4',
            label: (
              <span onClick={handleChangePasswordClick} className='menu-font'>
                <i className="fas fa-key m-2"></i> Change Password
              </span>
            ),
          },
          {
            key: '5',
            label: (
              <span className='menu-font'>
                <i className="fas fa-cog m-2"></i> Settings
              </span>
            ),
          },
        
          {
            key: '6',
            label: (
              <span onClick={(e) => { e.preventDefault(); handleLogOutClick(); }} className='menu-font'>
                <i className="fas fa-sign-out m-2"></i> Logout
              </span>
            ),
          },
        ];
        return items;
      };
    
      const items = generateMenuItems();
    
      return (
        <Dropdown
          menu={{
            items,
          }}
          trigger={['hover']}
          placement="bottomRight"
        
        >
          <span
            className="btn btn-icon btn-transparent-dark text-capitalize fs-6 text-primary custom-font"
            onClick={(e) => e.preventDefault()}
          >
            <span className='custom-font'>{!isAndroidUsed&&userName}</span>
            {userProfile ? (
              <Avatar
                src={userProfile}
                alt={userName}
                size="large"
                className='m-2 custom-font'
              />
            ) : (
              <button type='button' className='dropdown-user-img-letter m-2'>{loggedUserFirstLatter}</button>
            )}
          </span>
        </Dropdown>    );
};

export default UserProfileDropdown;
