import React, { useState, useEffect } from 'react';
import { fetchAllActiveCommunities } from '../../services/userService';

const OurPartner = () => {
  const [casts, setCasts] = useState([]);

  const fetchCommunities = async () => {
    const response = await fetchAllActiveCommunities();
    if (response && response.status === 200) {
      setCasts(response.data.data);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <div className="wow animate__animated animate__fadeIn">
      <section id="partner">
        <div className="scrolling-container">
          {casts.map((community) => (
            <div className="icon-box" key={community.id}>
              {community.thumbnail_image && (
                <img src={community.thumbnail_image} alt={community.name} />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OurPartner;
