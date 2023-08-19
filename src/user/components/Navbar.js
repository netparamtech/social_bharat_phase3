import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiWithHeaders } from '../axios/apiConfig';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/userAction';

const Navbar = () => {
  const user = useSelector((state) => state.userAuth);
  const [id, setId] = useState(user && user.user && user.user.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light wow animate__animated ">
      <div className="container">
        <img src="/user/images/3.png" width="50px" height="50px" id="logo" alt="Logo image" />

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon bg-white"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item me-3">
              <a className="nav-link" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link" href="#">Business Promotion</a>
            </li>
            <li className="nav-item dropdown me-3">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Events
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="profile.html">Profile</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="dashboard.html">Dashboard</a></li>
              </ul>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link" href="contact.html">Contact</a>
            </li>
            {user.isAuthenticated ? (
              <li className="nav-item me-3">
                <div className="dropdown " id="profile-name-logo">

                  {(user && user.user && user.user.photo && user.user.photo) ? (<img src={user.user.photo} data-bs-toggle="dropdown" className='' />) : (<button className="dropbtn  fw-bold fs-5" type="button" data-bs-toggle="dropdown" >
                    {user && user.user && user.user.name.charAt(0)}
                  </button>)}
                  <ul className="dropdown-menu" >
                    <li><a className="dropdown-item" href="/update-photo">Update Profile Picture</a></li>
                    <li><a className="dropdown-item" href="/setPassword">Change Password</a></li>
                    <li><a className="dropdown-item " onClick={handleLogOutClick}>Logout</a></li>
                  </ul>
                </div>
              </li>) : (<a href="/login" className="btn btn-green">Login</a>)}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
