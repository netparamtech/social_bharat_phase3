import React from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

import Sidebar from "../components/Sidebar";
import { Footer } from "antd/es/layout/layout";
import Topbar from "../components/Topbar";

const AdminLayout = ({ children }) => {
    useEffect(() => {
        // List of script sources
        const scriptSources = [
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.0/js/bootstrap.bundle.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js',
          '/admin/js/sb-admin-2.min.js'
        ];
    
        // Create script elements for each source and append them to the body
        const scriptElements = scriptSources.map((src) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          document.body.appendChild(script);
          return script;
        });
    
        // Clean up by removing the script elements when the component unmounts
        return () => {
          scriptElements.forEach((script) => {
            document.body.removeChild(script);
          });
        };
      }, []);
    
  return (
    <>
    <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css" integrity="sha512-q3eWabyZPc1XTCmF+8/LuE1ozpg5xxn7iO89yfSOd5/oKvyqLngoNGsx8jq92Y8eXJ/IRxQbEC+FGSYxtk2oiw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/css/bootstrap.min.css" integrity="sha512-rt/SrQ4UNIaGfDyEXZtNcyWvQeOq0QLygHluFQcSjaGB04IxWhal71tKuzP6K8eYXYB6vJV4pHkXcmFGGQ1/0w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link href="/admin/css/sb-admin-2.min.css" rel="stylesheet" />
        <link href="/admin/css/custom.css" />
    </Helmet>
      <div id="wrapper">
        <Sidebar />
        {/*  Content Wrapper  */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content  */}
          <div id="content">
            <Topbar />
            {/* Begin Page Content */}
            <div className="container-fluid">
              {/* <!-- Content Row --> */}
              <main>{children}</main>
            </div>
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Scroll to Top Button--> */}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </>
  );
};

export default AdminLayout;
