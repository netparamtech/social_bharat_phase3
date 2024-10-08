import React, { useEffect, useState } from "react";
import { fetchAllActiveBharatMandir } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";

function OurPartner() {
  const [casts, setCasts] = useState([]);
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);
  const [serverError, setServerError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const settings = {
    slidesToShow: !isAndroidUsed ? 12 : 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 1500,
  };

  const handleImageClick = (communityName) => {
    navigate(`/${communityName}`);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsAndroidUsed(window.innerWidth < 1000); // Adjust the threshold based on your design considerations
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set the correct value

    // Cleanup the event listener when component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchCommunities = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllActiveBharatMandir();
      if (response && response.status === 200) {
        setCasts(response.data.data);
        setServerError('');
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  useEffect(() => {
    // Fetch communities data
    fetchCommunities();
  }, []);
  return (
    <section id="partner">
      <div className="container">
        <div className="row">
          <div className="card shadow text-white h-100 costomer-logos">
            {serverError && <span className='error'>{serverError}</span>}
            <Slider {...settings}>
              {casts && casts.length > 0 &&
                casts.map(
                  (community) =>
                    community.thumbnail_image && (
                      <div className="icon-box d-inline-flex" key={community.id}>
                        <a className="hover-pointer">
                          <img
                            src={community.thumbnail_image}
                            className="mt-2"
                            alt={community.name}
                            onClick={() => handleImageClick(community.name)}
                          />
                        </a>
                      </div>
                    )
                )}
            </Slider>
            <div className="partner-slider mb-2" style={{ display: 'flex', flexDirection: 'row', overflow: 'scroll', gap: '4px' }}>
              {/* {casts && casts.length > 0 &&
                casts.map(
                  (community) =>
                    community.thumbnail_image && (
                      <div className="icon-box d-inline-flex" key={community.id}>
                        <a className="hover-pointer">
                          <img
                            src={community.thumbnail_image}
                            className="mt-2"
                            alt={community.name}
                            onClick={() => handleImageClick(community.name)}
                          />
                        </a>
                      </div>
                    )
                )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurPartner;
