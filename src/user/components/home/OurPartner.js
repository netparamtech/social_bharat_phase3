import React, { useEffect, useState } from "react";
import { fetchAllActiveCommunities } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function OurPartner() {
  const [casts, setCasts] = useState([]);

  const navigate = useNavigate();

  const settings = {
    slidesToShow: 12,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 1500,
  };

  const fetchCommunities = async () => {
    try {
      const response = await fetchAllActiveCommunities();
      if (response && response.status === 200) {
        setCasts(response.data.data);
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    // Fetch communities data
    fetchCommunities();
  }, []);
  return (
    <div className="wow animate__animated animate__fadeIn">
      <section id="partner">
        <div className="container">
          <div className="row costomer-logos">
            <Slider {...settings}>
              {casts && casts.length > 0 &&
                casts.map(
                  (community) =>
                    community.thumbnail_image && (
                      <div className="icon-box d-inline-flex" key={community.id}>
                        <a href={`/${community.name}`}>
                          <img
                            src={community.thumbnail_image}
                            alt={community.name}
                          />
                        </a>
                      </div>
                    )
                )}
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OurPartner;
