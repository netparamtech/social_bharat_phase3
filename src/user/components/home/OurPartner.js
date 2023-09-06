import React, { useState, useEffect } from 'react';
import { fetchAllActiveCommunities } from '../../services/userService';

const OurPartner = () => {
  const [casts, setCasts] = useState([]);

  const fetchCommunities = async () => {
    const response = await fetchAllActiveCommunities();
    if (response && response.status === 200) {
      const communitiesWithThumbnails = response.data.data.map((community) => ({
        ...community,
        thumbnail_image: community.thumbnail_image.replace(/\\/g, '/'), // Replace backslashes with forward slashes
      }));
      setCasts(communitiesWithThumbnails);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <div className="wow animate__animated animate__fadeIn">
      <section id="partner">
        <div className="row costomer-logos justify-content-between">
          {casts.map((community) => (
            <div className="icon-box col-lg-2 col-md-4 col-sm-6" key={community.id}>
              <img src={community.thumbnail_image} alt={community.name} title={community.name} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OurPartner;
