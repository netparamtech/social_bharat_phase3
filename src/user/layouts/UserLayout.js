import '../pages/css/bootstrap.min.css';
import '../pages/css/userStyle.css';
import '../pages/css/btn.css';
import React, { useState } from "react";
import { useEffect } from "react";
import Footer from "../components/home/Footer";
import NavbarTransparent from "../components/home/NavbarTransparent";
import { useDispatch } from "react-redux";
import { setLoader } from "../actions/loaderAction";
import { fetchAllSiteSettings } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import '../pages/css/navbar.css';

const UserLayout = ({ children }) => {

  const [data, setData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchSettings = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllSiteSettings();
      setData(response.data.data);
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
      }
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [])

  useEffect(() => {
    // List of script sources
    const scriptSources = [
      // "https://code.jquery.com/jquery-3.6.0.min.js",
      "https://code.jquery.com/jquery-1.12.4.min.js",
      "https://cdn.jsdelivr.net/npm/typed.js@2.0.12",
      "http://cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.3/waypoints.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/Counter-Up/1.0.0/jquery.counterup.min.js",
      "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
      "https://unpkg.com/aos@next/dist/aos.js",
      "/user/js/userScript.js", "/user/js/bootstrap.min.js"
    ];

    // Create script elements for each source and append them to the body
    const scriptElements = scriptSources.map((src) => {
      const script = document.createElement("script");
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

        <link rel="icon" type="image/x-icon" href="/user/images/logo.png" />
        <link rel="stylesheet" href="/user/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/user/css/user.css" />
        {/* amimate Css CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        {/* fontawsome  */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        {/*  Slick  */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
        />
        {/* Animate on scroll library CSS  */}
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

      </Helmet>

      <header>
        <NavbarTransparent data={data} />
      </header>

      {children}
      <footer id="footer" className="animate__animated animate__fadeInUp">
        <Footer data={data} />
      </footer>
    </>
  );
};

export default UserLayout;