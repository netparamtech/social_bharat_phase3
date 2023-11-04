import React from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import Footer from "../components/home/Footer";
import NavbarTransparent from "../components/home/NavbarTransparent";

const UserLayout = ({ children }) => {
  useEffect(() => {
    // List of script sources
    const scriptSources = [
      // "https://code.jquery.com/jquery-3.6.0.min.js",
      "https://code.jquery.com/jquery-1.12.4.min.js",
      "https://cdn.jsdelivr.net/npm/typed.js@2.0.12",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
      "http://cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.3/waypoints.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/Counter-Up/1.0.0/jquery.counterup.min.js",
      "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
      "https://unpkg.com/aos@next/dist/aos.js",

      "/user/js/userScript.js",
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

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossorigin="anonymous"
        />
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
        <NavbarTransparent />
      </header>
      {children}
      <footer id="footer" className="animate__animated animate__fadeInUp">
        <Footer />
      </footer>
    </>
  );
};

export default UserLayout;