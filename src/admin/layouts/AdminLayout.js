import React, { useState, useEffect } from "react";
import '../pages/css/sb-admin-2.min.css';
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Helmet } from "react-helmet-async";
import { Footer } from "antd/es/layout/layout";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleScrollTopClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const scriptSources = [
      "https://code.jquery.com/jquery-3.5.1.min.js",
      "https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js",
      'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.0/js/bootstrap.bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js',
      "https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js",
      '/admin/js/sb-admin-2.min.js'
    ];

    const scriptElements = scriptSources.map((src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
      return script;
    });

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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/3.6.2/css/bootstrap.min.css" integrity="sha512-rt/SrQ4UNIaGfDyEXZtNcyWvQeOq0QLygHluFQcSjaGB04IxWhal71tKuzP6K8eYXYB6vJV4pHkXcmFGGQ1/0w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet"></link>
      </Helmet>
      <div id="wrapper" className="admin-layout">
        <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
        <div id="content-wrapper" className="d-flex flex-column content-wrapper">
          <div id="content" className="content">
            <Topbar>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </Topbar>
            <div className="container-fluid">
              <main>{children}</main>
            </div>
          </div>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Copyright &copy; Social Bharat 2023
          </Footer>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
