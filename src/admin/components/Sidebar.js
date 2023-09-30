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
          className="nav-link"
          href=""
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

      {/* <!-- Nav Item - User Collapse Menu --> */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href=""
          data-toggle="collapse"
          data-target="#collapseUser"
          aria-expanded="true"
          aria-controls="collapseUser"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            navigate("/admin/users");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-people"
            viewBox="0 0 16 16"
          >
            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
          </svg>
          <span className="m-2">Users</span>
        </a>

      </li>

      {/* <!-- Nav Item - Contact Enquiry Categories Collapse Menu --> */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href=""
          data-toggle="collapse"
          data-target="#collapseEnquiry"
          aria-expanded="true"
          aria-controls="collapseEnquiry"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            navigate("/admin/enquiries");
          }}
        >
          <i
            className="	
          fa fa-search"
            fill="currentColor"
          ></i>

          <span className="m-2">Enquiry</span>
        </a>

      </li>

      {/* <!-- Nav Item - Master Setting Collapse Menu --> */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href=""
          data-toggle="collapse"
          data-target="#collapseMasterSetting"
          aria-expanded="true"
          aria-controls="collapseUser"
        >
          <i className="fas fa-cog"></i>
          <span className="m-2">Master Setting </span>
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
                navigate("/admin/degrees");
              }}
            >
              <i className="fas fa-graduation-cap me-1" fill="currentColor"></i>
              Degree
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
          <i className="fas fa-cog"></i>
          <span className="m-2">Side Setting </span>
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
              Banner
            </a>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href=""
          data-toggle="collapse"
          data-target="#collapseTestimonial"
          aria-expanded="true"
          aria-controls="collapseTestimonial"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            navigate("/admin/testimonials/index");
          }}
        >
          <i
            className="	
          fa fa-search"
            fill="currentColor"
          ></i>

          <span className="m-2">Testimonial</span>
        </a>
      </li>

      {/* <!-- Nav Item - Event Collapse Menu --> */}

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href=""
          data-toggle="collapse"
          data-target="#collapseEvent"
          aria-expanded="true"
          aria-controls="collapseEvent"
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

          <span className="m-2">Event</span>
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
