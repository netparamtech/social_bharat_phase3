import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  
  const navigate = useNavigate();
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}

      <a className="sidebar-brand p-0" href="/" target="_blank">
        <div className="sidebar-brand-icon">
          <img src="/user/images/sb-logo.png" className="img-fluid" />
        </div>
      </a>

      {/* Divider */}
      <hr className="sidebar-divider my-0" />

      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <a
          className="nav-link hover-pointer-admin"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            navigate("/admin/dashboard");
          }}
        >
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Heading */}
      <div className="sidebar-heading">Interface</div>

      {/* <!-- Nav Item - Master Setting Collapse Menu --> */}
      <li className="nav-item">
        <a
           className="nav-link collapsed hover-pointer-admin"
           data-toggle="collapse"
           data-target="#collapseMasterSetting"
           aria-expanded="true"
           aria-controls="collapseMasterSetting"
        >
          <i className="fas fa-cog" fill="currentColor"></i>
          <span className="m-2">Master Settings </span>
        </a>
        <div
          id="collapseMasterSetting"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <a
              className="collapse-item"
              href=""
              onClick={(e) => {
                e.preventDefault(); // Prevent the default anchor tag behavior
                navigate("/admin/communities");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 640 512"
                fill="currentColor"
                className="me-1"
              >
                <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
              </svg>
              Communities
            </a>
            <a
              className="collapse-item"
              href=""
              onClick={(e) => {
                e.preventDefault(); // Prevent the default anchor tag behavior
                navigate("/admin/business-categories");
              }}
            >
              <i className="fas fa-business-time me-1" fill="currentColor"></i>
              Business
            </a>
            <a
              className="collapse-item"
              href=""
              onClick={(e) => {
                e.preventDefault(); // Prevent the default anchor tag behavior
                navigate("/admin/qualifications");
              }}
            >
            <i className="fa fa-school me-1" fill="currentColor"></i>
              Qualifications
            </a>
            <a
              className="collapse-item"
              href=""
              onClick={(e) => {
                e.preventDefault(); // Prevent the default anchor tag behavior
                navigate("/admin/degrees");
              }}
            >
              <i className="fas fa-graduation-cap me-1" fill="currentColor"></i>
              Degrees
            </a>

          </div>
        </div>
      </li>

      {/* <!-- Nav Item - Side Setting Collapse Menu --> */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href=""
          data-toggle="collapse"
          data-target="#collapseSideSetting"
          aria-expanded="true"
          aria-controls="collapseUser"
          
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 640 512"
            fill="currentColor"
          >
            <path d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
          </svg>
          
          <span className="m-2">Site Settings </span>
        </a>
        <div
          id="collapseSideSetting"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <a
              className="collapse-item"
              href=""
              onClick={(e) => {
                e.preventDefault(); // Prevent the default anchor tag behavior
                navigate("/admin/banners");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-images me-1"
                viewBox="0 0 16 16"
              >
                <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
              </svg>
              Banners
            </a>
            <a
              className="collapse-item"
              href=""
              onClick={(e) => {
                e.preventDefault(); // Prevent the default anchor tag behavior
                navigate("/admin/setting");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-images me-1"
                viewBox="0 0 16 16"
              >
                <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
              </svg>
              Setting URL
            </a>
          </div>
        </div>
      </li>

      {/* <!-- Nav Item - User Collapse Menu --> */}
      <li className="nav-item">
        <a
          className="nav-link collapsed hover-pointer-admin"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            navigate("/admin/users");
          }}
        >
        
          <i className="fa fa-users" fill="currentColor"></i>
          <span className="m-2">Users</span>
        </a>
      </li>

      {/* <!-- Nav Item - Contact Enquiry Categories Collapse Menu --> */}
      <li className="nav-item">
        <a
          className="nav-link collapsed hover-pointer-admin"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            navigate("/admin/enquiries");
          }}
        >
         
         
          <i className="fa fa-question" fill="currentColor"></i>

          
          <span className="m-2">Enquiry</span>
        </a>
      </li>

      {/* <!-- Nav Item - Event Collapse Menu --> */}

      <li className="nav-item">
        <a
          className="nav-link collapsed hover-pointer-admin"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            navigate("/admin/event/index");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
            fill="currentColor"
          >
            <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z" />
          </svg>
          <i className="fa fa-calendar-days"></i>
          <span className="m-2">Event</span>
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed hover-pointer-admin"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            navigate("/admin/testimonials/index");
          }}
        >
          
          <i className="fa fa-comment" fill="currentColor"></i>
          <span className="m-2">Testimonial</span>
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed hover-pointer-admin"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            navigate("/admin/bharat-mandir/index");
          }}
        >
          
          <i class="fa fa-history" fill="currentColor" aria-hidden="true"></i>
          <span className="m-2">Bharat Mata Mandir</span>
        </a>
      </li>

      {/* <!-- Nav Item - Event Collapse Menu --> */}

      <li className="nav-item">
        <a
          className="nav-link collapsed hover-pointer-admin"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            navigate("/admin/cms");
          }}
        >
          
          <i className="fa fa-layer-group"  fill="currentColor"></i>

          <span className="m-2">CMS</span>
        </a>
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
