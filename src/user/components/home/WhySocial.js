import React, { useEffect, useState } from 'react';
import { fetchBannerWithPageAndSection } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';

const WhySocial = (props) => {
  const {aboutCMS} = props;
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const defaultImage = '/user/images/banner-3.jpg';

  const fetchBanners = async () => {
    dispatch(setLoader(true));

    try {
      const response = await fetchBannerWithPageAndSection('Home', 'Why Social Bharat');

      const activeBanners = response.data.data.filter((banner) => banner.status === 'Active');
      if (!Array.isArray(activeBanners[0].banner_urls)) {
        const updatedBannerUrls = [activeBanners[0].banner_urls];
        activeBanners[0].banner_urls = updatedBannerUrls;
      }
      setImageUrls(activeBanners[0].banner_urls);
      dispatch(setLoader(false));

    } catch (error) {
      dispatch(setLoader(false));

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
            <h1>{aboutCMS && aboutCMS.title && aboutCMS.title}</h1>
            <h5>{aboutCMS && aboutCMS.subtitle && aboutCMS.subtitle}</h5>
            <ul>
             <li
              dangerouslySetInnerHTML={{
                    __html:aboutCMS && aboutCMS.content,
                  }}
             />
             
            </ul>
          </div>
          <div className="col-lg-6 col-md-6 float-end mt-0 mt-lg-5 d-md-block wow animate__animated animate__zoomIn">
            <div className="image-zoom-containerm fade-in-image">
              <Carousel effect="fade" autoplay>
                {aboutCMS && aboutCMS.images && aboutCMS.images.map((item, index) => (
                  <div key={index} style={contentStyle} className='zoom-on-hover'>
                  <img src={item} className="img-fluid image-zoom pb-3" alt={`Banner ${index}`} />

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
