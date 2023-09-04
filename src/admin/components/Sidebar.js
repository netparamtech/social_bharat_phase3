import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* Sidebar - Brand */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/admin/dashboard">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
      </a>

      {/* Divider */}
      <hr className="sidebar-divider my-0" />

      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <a className="nav-link" href="/admin/dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Heading */}
      <div className="sidebar-heading">
        Interface
      </div>

      {/* <!-- Nav Item - Comminity Collapse Menu --> */}

      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseCommunity"
          aria-expanded="true" aria-controls="collapseTwo">
          <i className="fas fa-fw fa-folder"></i>

          <span>Communities</span>
        </a>
        <div id="collapseCommunity" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">

          <a className="collapse-item" href="/admin/communities">List</a>
            <a className="collapse-item" href="/admin/create/community">Create</a>

          </div>
        </div>
      </li>

      {/* <!-- Nav Item - Banner Collapse Menu --> */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseBanner"
          aria-expanded="true" aria-controls="collapseBanner">
          <i className="fas fa-fw fa-folder"></i>

          <span>Banners</span>
        </a>
        <div id="collapseBanner" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">

          <a className="collapse-item" href="/admin/banners">List</a>
            <a className="collapse-item" href="/admin/create/banners">Create</a>
      
          </div>
        </div>
      </li>


      {/* <!-- Nav Item - User Collapse Menu --> */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUser"
          aria-expanded="true" aria-controls="collapseUser">
          <i className="fas fa-fw fa-folder"></i>

          <span>Users</span>
        </a>
        <div id="collapseUser" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">

            <a className="collapse-item" href="#" onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor tag behavior
              window.location.href = '/admin/users';
            }}>
              List
            </a>
          </div>
        </div>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider" />

   
      <li className="nav-item">
        <a className="nav-link" href="/admin/setting">
          <i className="fas fa-fw fa-cog"></i>
          <span>Setting</span>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />

      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

      {/* Sidebar Message */}
      <div className="sidebar-card d-none d-lg-flex">
        <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..." />
        <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
        <a className="btn btn-success btn-sm" href="#">Upgrade to Pro!</a>
      </div>
    </ul>
  );
}

export default Sidebar;
