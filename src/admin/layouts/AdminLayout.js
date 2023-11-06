import React from "react";
import { useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const AdminLayout = ({ children }) => {
  const handleScrollTopClick = () => {
    window.scrollTo(0, 0);
  }
    useEffect(() => {
        // List of script sources
        const scriptSources = [
          "https://code.jquery.com/jquery-3.5.1.min.js",
          "https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js",
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.0/js/bootstrap.bundle.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js',
          "https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js",
          '/admin/js/sb-admin-2.min.js'
        ];
    
        // Create script elements for each source and append them to the body
        const scriptElements = scriptSources.map((src) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = false;
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
        <link rel="icon" type="image/x-icon" href="admin/img/logo.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css" integrity="sha512-q3eWabyZPc1XTCmF+8/LuE1ozpg5xxn7iO89yfSOd5/oKvyqLngoNGsx8jq92Y8eXJ/IRxQbEC+FGSYxtk2oiw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link href="/admin/css/sb-admin-2.min.css" rel="stylesheet" />
        <link href="/admin/css/custom.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/css/bootstrap.min.css" integrity="sha512-rt/SrQ4UNIaGfDyEXZtNcyWvQeOq0QLygHluFQcSjaGB04IxWhal71tKuzP6K8eYXYB6vJV4pHkXcmFGGQ1/0w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
          {/*   include summernote css/js*/}
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet"></link>
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
    </>
  );
};

export default AdminLayout;
