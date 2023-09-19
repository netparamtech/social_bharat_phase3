import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* Sidebar - Brand */}

      <a className="sidebar-brand p-0" href="#" onClick={(e) => {
        e.preventDefault(); // Prevent the default anchor tag behavior
        navigate('/admin/dashboard');
      }}>
        <div className="sidebar-brand-icon">
          <img src="/user/images/sb-logo.png"  className='img-fluid'/>
        </div>
      </a>

      

      {/* Divider */}
      <hr className="sidebar-divider my-0" />

      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <a className="nav-link" href="#" onClick={(e) => {
          e.preventDefault(); // Prevent the default anchor tag behavior
          navigate('/admin/dashboard');
        }}>
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


          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" fill="currentColor"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" /></svg>
          <span className='m-2'>Communities</span>
        </a>
        <div id="collapseCommunity" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">

            <a className="collapse-item" href="#" onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor tag behavior
              navigate('/admin/communities');
            }}>List</a>
            <a className="collapse-item" href="#" onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor tag behavior
              navigate('/admin/create/community');
            }}>Create</a>

          </div>
        </div>
      </li>

      {/* <!-- Nav Item - User Collapse Menu --> */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUser"
          aria-expanded="true" aria-controls="collapseUser">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
          </svg>
          <span className='m-2'>Users</span>
        </a>
        <div id="collapseUser" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">

            <a className="collapse-item" href="#" onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor tag behavior
              navigate('/admin/users');
            }}>
              List
            </a>
          </div>
        </div>
      </li>

      {/* <!-- Nav Item - Banner Collapse Menu --> */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseBanner"
          aria-expanded="true" aria-controls="collapseBanner">

          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-images" viewBox="0 0 16 16">
            <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
          </svg>

          <span className='m-2'>Banners</span>
        </a>
        <div id="collapseBanner" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">

            <a className="collapse-item" href="#" onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor tag behavior
              navigate('/admin/banners');
            }}>List</a>
            <a className="collapse-item" href="#" onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor tag behavior
              navigate('/admin/banner/create');
            }}>Create</a>

          </div>
        </div>
      </li>

      {/* <!-- Nav Item - Degrees Collapse Menu --> */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseDegree"
          aria-expanded="true" aria-controls="collapseDegree">

          <i className="fas fa-graduation-cap" fill="currentColor"></i>

          <span className='m-2'>Degrees</span>
        </a>
        <div id="collapseDegree" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">

            <a className="collapse-item" href="#" onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor tag behavior
              navigate('/admin/degrees');
            }}>List</a>
            <a className="collapse-item" href="#" onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor tag behavior
              navigate('/admin/degree/create');
            }}>Create</a>

          </div>
        </div>
      </li>

      {/* <!-- Nav Item - Business Categories Collapse Menu --> */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseBusiness"
          aria-expanded="true" aria-controls="collapseBusiness">

          <i className="fas fa-business-time" fill="currentColor"></i>

          <span className='m-2'>Business Categorie</span>
        </a>
        <div id="collapseBusiness" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">

            <a className="collapse-item" href="" onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor tag behavior
              navigate('/admin/business-categories');
            }} >List</a>
            <a className="collapse-item" href="#" onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor tag behavior
              navigate('/admin/business-categories/create');
            }}>Create</a>

          </div>
        </div>
      </li>

      {/* <!-- Nav Item - Contact Enquiry Categories Collapse Menu --> */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseEnquiry"
          aria-expanded="true" aria-controls="collapseEnquiry">

          <i className="	
          fa fa-search" fill="currentColor"></i>

          <span className='m-2'>Enquiry</span>
        </a>
        <div id="collapseEnquiry" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">

            <a className="collapse-item" href="" onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor tag behavior
              navigate('/admin/enquiries');
            }} >List</a>
            

          </div>
        </div>
      </li>

      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

      {/* Sidebar Message */}

    </ul>
  );
}

export default Sidebar;
