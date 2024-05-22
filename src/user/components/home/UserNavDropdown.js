import Dropdown from 'react-bootstrap/Dropdown';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneCommunity, userLogout } from '../../services/userService';
import { setLoader } from '../../actions/loaderAction';
import BharatMandirDrawer from './BharatMandirDrawer';
import { logout } from '../../actions/userAction';
function UserNavDropdown() {
    const { id } = useParams();

    const user = useSelector((state) => state.userAuth);
    const [communityId, setCommunityId] = useState('');
    const [userId, setUserId] = useState(user && user.user && user.user.id);
    const [loggedUserFirstLatter, setLoggedUserFirstLatter] = useState('');
    const isPasswordSet = user && user.user && user.user.is_password_set;
    const [community, setCommunity] = useState({});

    const defaultPhoto = '/user/images/user.png';

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userProfile, setUserProfile] = useState('');
    const [openSetting, setOpenSetting] = useState(false);

    const [isAndroidUsed, setIsAndroidUsed] = useState(false);
    const [serverError, setServerError] = useState("");

    useEffect(() => {
        if (user && user.user) {
            const { id, name, email, photo, is_password_set, community_id } = user.user;
            setUserId(id);
            setUserName(name || '');
            setUserEmail(email || '');
            setUserProfile(photo || '');
            setCommunityId(community_id)
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
        navigate(isPasswordSet ? '/change/password' : '/set-password');
    };

    const handleSettingClick = (e) => {
        navigate(isPasswordSet ? '/user/setting' : '/set-password');
    }

    const fetchLoggedUserCommunity = async () => {
        dispatch(setLoader(true));
        try {
            const response = await fetchOneCommunity();
            if (response && response.status === 200) {
                setCommunity(response.data.data);
            }
        } catch (error) {
            //handleFetchError(error);
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            } else if (error.response && error.response.status === 404) {
                dispatch(logout());
                navigate('/');
            }
        } finally {
            dispatch(setLoader(false));
        }
    };

    useEffect(() => {
        fetchLoggedUserCommunity();
    }, [communityId]);

    const handleLogOutClick = async () => {
        dispatch(setLoader(true));
        try {
            const response = await userLogout(userId);
            if (response.status === 200) {
                localStorage.removeItem("userAuth")
                dispatch(logout());
                navigate('/login');
            }
        } catch (error) {
            handleFetchError(error);
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
                dispatch(logout());
                setServerError("Oops! Something went wrong on our server.");
            }

        } finally {
            dispatch(setLoader(false));
        }
    };

    const handleFetchError = (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 500)) {
            navigate('/login');
        }
    };

    const showDrawer = () => {
        setOpenSetting(true);
    };

    function shortenName(inputName, maxLength) {
        if (inputName.length <= maxLength) {
            return inputName;
        } else {
            return inputName.substring(0, maxLength) + "...";
        }
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
                <span
                    className=""
                    onClick={(e) => e.preventDefault()}
                >

                    {userProfile ? (
                        <img
                            src={userProfile}
                            alt={userName}
                            size="large"
                            className='dropdown-user-img me-2'
                        />
                    ) : (
                        <button type='button' className='dropdown-user-img-letter m-2'>{loggedUserFirstLatter}</button>
                    )}
                    <span className=''><span className={isAndroidUsed ? 'd-none' : ''}>Hi</span> {!isAndroidUsed && shortenName(userName.toUpperCase(), 8)}</span>
                </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item>
                    <h6 className="dropdown-header d-flex align-items-center menu-font">
                        <img className="dropdown-user-img me-2" src={userProfile || '/user/images/OIP.jpg'} alt="User" />
                        <div className="dropdown-user-details">
                            <div className="dropdown-user-details-name menu-font">{shortenName(userName.toUpperCase(), 12)}</div>
                            <div className="dropdown-user-details-email menu-font">{userEmail}</div>
                        </div>
                    </h6>
                    <div className="dropdown-divider"></div>
                </Dropdown.Item>
                <Dropdown.Item>
                    <h6 className="dropdown-header d-flex align-items-center">
                        {
                            community && community.thumbnail_image ? (
                                <img className="dropdown-thubnail-img me-2" src={community.thumbnail_image || defaultPhoto} alt="User" />
                            ) : (
                                <div className="dropdown-user-details">
                                    <div className="dropdown-user-details-name menu-font">{community && community.name}</div>
                                </div>
                            )
                        }

                        {/* {
                community && <span className="dropdown-user-details-name menu-font">{community.name || ""}</span>
              } */}

                    </h6>
                    <div className="dropdown-divider"></div>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleProfileClick}>
                    <span className={`menu-font ${window.location.pathname === "/profile" || window.location.pathname === "/user/update-basic-profile" ||
                        window.location.pathname === "/update-mobile" || window.location.pathname === "/user/update-matrimonial-profile" ||
                        window.location.pathname === "/user/update-education-profile" || window.location.pathname === "/user/update-business-profile" || window.location.pathname === `/user/update-business-profile/${id}` ||
                        window.location.pathname === "/user/update-contact" || window.location.pathname === `/user/update-contact/${id}` || window.location.pathname === "/user/update-job-profile"
                        || window.location.pathname === `/user/update-job-profile/${id}` || window.location.pathname === `/user/update-contact/:id` ||
                        window.location.pathname === `/user/update-education-profile/${id}` ? "custom-active-user" : "inactive"
                        }`}>
                        <i className="fas fa-user-alt m-2"></i> PROFILE
                    </span>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleChangePasswordClick}>
                    <span className={`menu-font ${window.location.pathname === "/change/password" ? "custom-active-user" : "inactive"
                        }`}>
                        <i className="fas fa-key m-2"></i> CHANGE PASSWORD
                    </span>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleSettingClick}>
                    <span className={`menu-font ${window.location.pathname === "/user/setting" ? "custom-active-user" : "inactive"
                        }`}>
                        <i className="fas fa-cog m-2"></i> SETTING
                    </span>
                </Dropdown.Item>
                <Dropdown.Item>
                    <BharatMandirDrawer />
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => { e.preventDefault(); handleLogOutClick(); }}>
                    <span className='menu-font'>
                        <i className="fas fa-sign-out m-2"></i> LOGOUT
                    </span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default UserNavDropdown;