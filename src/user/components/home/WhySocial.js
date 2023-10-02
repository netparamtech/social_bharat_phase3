import React, { useEffect, useState } from 'react';
import { fetchBannerWithPageAndSection } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';

const WhySocial = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();
  const defaultImage = '/user/images/banner-3.jpg';

  const fetchBanners = async () => {
    try {
      const response = await fetchBannerWithPageAndSection('Home', 'Why Social Bharat');

      const activeBanners = response.data.data.filter((banner) => banner.status === 'Active');
      if (!Array.isArray(activeBanners[0].banner_urls)) {
        const updatedBannerUrls = [activeBanners[0].banner_urls];
        activeBanners[0].banner_urls = updatedBannerUrls;
      }
      setImageUrls(activeBanners[0].banner_urls);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else if (error.response && error.response.status === 500) {
        navigate('/login');
      }
    }
  };

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div id="why-social-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 mt-5  what-social-bharat wow animate__animated animate__fadeInUp">
            <h1>What social Bharat Do?</h1>
            <p>Connecting Communities with Privacy & Matrimonial Excellence.</p>
            <ul>
              <li>
                <i className="fa-sharp fa-regular fa-circle-check me-2"></i>
                Discover and participate in communities you love.
              </li>
              <li>
                <i className="fa-sharp fa-regular fa-circle-check me-2"></i>
                Trustworthy profiles for a secure matrimonial experience.
              </li>
              <li>
                <i className="fa-sharp fa-regular fa-circle-check me-2"></i>
                Private Sharing in Chosen Communities.
              </li>
              <li>
                <i className="fa-sharp fa-regular fa-circle-check me-2"></i>
                Find Life Partners with Privacy.
              </li>
              <li>
                <i className="fa-sharp fa-regular fa-circle-check me-2"></i>
                Elevate your business to new heights.{' '}
              </li>
              <li>
                <i className="fa-sharp fa-regular fa-circle-check me-2"></i>
                Plan and attend events with friends and like-minded individuals.{' '}
              </li>
            </ul>
          </div>
          <div className="col-lg-6 col-md-6 float-end mt-0 mt-lg-5 wow animate__animated animate__zoomIn">
            <div className="image-zoom-containerm fade-in-image">
              <Carousel effect="fade" autoplay>
                {imageUrls.map((item, index) => (
                  <div key={index} style={contentStyle}>
                    <img src={item} className="img-fluid image-zoom" alt={`Banner ${index}`} />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhySocial;
