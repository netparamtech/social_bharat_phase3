import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiWithHeaders } from '../../axios/apiConfig';
import { logout } from '../../actions/userAction';

const Navbar = () => {
    const user = useSelector((state) => state.userAuth);
    const isAuthenticUser = user && user.isAuthenticated;
    const [id, setId] = useState(user && user.user && user.user.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userProfile, setUserProfile] = useState('');
    const [loggedButton, setLoggedButton] = useState('');

    useEffect(() => {
        if (user && user.user) {
            setUserName(user.user.name || '');
            setUserEmail(user.user.email || '');
            setUserProfile(user.user.photo || '');
            setLoggedButton(user.user.name ? user.user.name.charAt(0).toUpperCase() : '');
        }
    }, [user]);

    const handleLogOutClick = async () => {
        try {
            const response = await apiWithHeaders.post('/logout', { id });

            if (response.status === 200) {
                dispatch(logout())
                navigate('/login')
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate('/login');
            }
        }
    }
    useEffect(() => {
        const loggedUser = user && user.user && user.user.name && user.user.name;
        setLoggedButton(loggedUser && loggedUser.charAt(0).toUpperCase());

    })
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src="/user/images/logo.png" alt="Logo" /> SocialBharat
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                About
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/dashboard">
                                Services
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Promote Business
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Matrimonial
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Contact
                            </a>
                        </li>
                        <li className="nav-item">
                            {
                                isAuthenticUser && isAuthenticUser ? (
                                    <a className="nav-link" href="/user/search">
                                        Search
                                    </a>
                                ) : ''
                            }
                        </li>
                        {/* You can add more nav items here */}
                    </ul>
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        {isAuthenticUser && isAuthenticUser ? '' : (
                            <li className="nav-item">
                                <a className="nav-link  btn-primary login-btn" href="/login">
                                    Login
                                </a>
                            </li>
                        )}
                    </ul>

                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
                            {
                                isAuthenticUser && isAuthenticUser ? (
                                    <a
                                        className="btn btn-icon btn-transparent-dark dropdown-toggle"
                                        id="navbarDropdownUserImage"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        {
                                            userProfile && userProfile ? (<img className="dropdown-user-img me-2" src={userProfile} alt={userName} title={userName} />)
                                                :
                                                (<button type='button' className='dropdown-user-img-letter'>{loggedButton}</button>)
                                        }


                                    </a>
                                ) : ''
                            }
                            <div
                                className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up"
                                aria-labelledby="navbarDropdownUserImage"
                                data-bs-popper="static"
                            >
                                <h6 className="dropdown-header d-flex align-items-center">
                                    <img className="dropdown-user-img me-2" src={userProfile ? userProfile : '/user/images/OIP.jpg'} alt="User" />
                                    <div className="dropdown-user-details">
                                        <div className="dropdown-user-details-name">{userName}</div>
                                        <div className="dropdown-user-details-email">{userEmail}</div>
                                    </div>
                                </h6>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/profile">
                                    <div className="dropdown-item-icon"><i className="fas fa-user-alt"></i></div>
                                    <span className="ms-2">Profile</span>
                                </a>
                                <a className="dropdown-item" href="/update-password">
                                    <div className="dropdown-item-icon"><i className="fas fa-key"></i></div>
                                    <span className="ms-2">Change Password</span>
                                </a>
                                <a className="dropdown-item" href="#!">
                                    <div className="dropdown-item-icon"><i className="fas fa-cog"></i></div>
                                    <span className="ms-2">Settings</span>
                                </a>
                                <a className="dropdown-item" href="#" onClick={(e) => {
                                    e.preventDefault();
                                    handleLogOutClick();
                                }}>
                                    <div className="dropdown-item-icon"><i className="fas fa-sign-out"></i></div>
                                    <span className="ms-2">Logout</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
