import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { useNavigate } from "react-router-dom";
import { fetchBannerWithPageAndSection } from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import { Button, Typography } from "antd";

const { Title, Text } = Typography;

const Banner = () => {
  const user = useSelector((state) => state.userAuth);
  const isAuthenticUser = user && user.isAuthenticated;
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const typedRef = useRef(null); // Use a single ref for Typed instance
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultImageUrl = '/user/images/banner-1.jpg'

  const handleBecomeMemberClick = () => {
    navigate('/register');
  };

  const fetchBanners = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchBannerWithPageAndSection(
        "Home",
        "Main Banners"
      );
      const activeBanners = response.data.data.filter(
        (banner) => banner.status === "Active"
      );

      if (!Array.isArray(activeBanners[0].banner_urls)) {
        const updatedBannerUrls = [activeBanners[0].banner_urls];
        activeBanners[0].banner_urls = updatedBannerUrls;
      }

      setImageUrls(activeBanners);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
      }
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    const options = {
      strings: ["Growing Community ", "Business Growth ", "Search Partner"],
      typeSpeed: 80,
      backSpeed: 80,
      loop: true,
    };

    if (typedRef.current) {
      const typedInstance = new Typed(typedRef.current, options);
      return () => {
        typedInstance.destroy();
      };
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % imageUrls.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [imageUrls]);

  const backgroundImageUrl = imageUrls && imageUrls.length > 0 && imageUrls[0]
    ? imageUrls[0].banner_urls[currentImageIndex].replace(/\\/g, "/")
    : defaultImageUrl;

  return (
    <>

      <div id="banners-section" className="">
        <div className="container">
          <div className="jumbotron navbar-scroll" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
            <div className="hero-section">

              <div>
                <Title level={2}>Social Bharat Helps</Title>
               <h2>
               <Text className="h2 typed" ref={typedRef}></Text>
                </h2> 
              </div>
              <div className="">
                <a className="btn btn-banner" onClick={handleBecomeMemberClick}>
                  Become a member
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Banner;
