import React from 'react';

const Navbar = () => {
  return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light wow animate__animated animate__slideInDown">
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
              <a href="/login" className="btn btn-green">Login</a>
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
