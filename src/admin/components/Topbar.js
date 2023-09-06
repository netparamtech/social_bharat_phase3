import React from 'react';
import { logout } from '../services/AdminService';
import { useDispatch, useSelector } from 'react-redux';
import { logout as adminLogout } from '../actions/authActions'
import { useNavigate } from 'react-router-dom';

function Topbar() {

  const defaultPhoto = '/admin/img/matrimonial-0.jpg';

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response && response.status === 200) {
        dispatch(adminLogout())
        navigate('/admin')
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(adminLogout)
        navigate('/admin')
      } else if (error.response && error.response.status === 500) {
        dispatch(adminLogout)
        navigate('/admin')
      }
    }
  }

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Sidebar Toggle (Topbar) */}
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="fa fa-bars"></i>
      </button>

      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>

        {/* Nav Item - User Information */}
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Welcome {user && user.name} </span>
            <img className="img-profile rounded-circle" src={user && user.photo ? user.photo : defaultPhoto} />
          </a>
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            <a className="dropdown-item" href="/admin/change-profile-picture">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Change Profile Picture
            </a>
            <a className="dropdown-item" href="/admin/change-password">
              <i className="fas fa-lock fa-sm fa-fw mr-2 text-gray-400"></i>
              Change Password
            </a>

            <a className="dropdown-item" href="/admin/change-profile">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Change Profile
            </a>
            <div className='dropdown-divider'></div>
            <a className="dropdown-item" href="#" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Topbar;
