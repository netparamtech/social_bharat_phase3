import React from 'react';
import AdminProfileDropdown from './AdminProfileDropdown';
import Timer from './Timer';

function Topbar({ children }) {

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Sidebar Toggle (Topbar) */}
      {children}

      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto mb-2 mb-lg-0">

        <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
          <Timer />
        </li>
      </ul>
      <ul className="navbar-nav ml-auto mb-2 mb-lg-0">

        <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
          <AdminProfileDropdown />
        </li>
      </ul>

    </nav>
  );
}

export default Topbar;
