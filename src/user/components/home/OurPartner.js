import React, { useEffect, useState } from "react";
import { fetchAllActiveCommunities } from "../../services/userService";

function OurPartner() {
  const [casts, setCasts] = useState([]);

  const fetchCommunities = async () => {
    const response = await fetchAllActiveCommunities();
    if (response && response.status === 200) {
      setCasts(response.data.data);
    }
  };

  useEffect(() => {
    // Fetch communities data
    fetchCommunities();
  }, []);
  return (
    <div className="wow animate__animated animate__fadeIn">
    <section id="partner">
      <div className="row costomer-logos justify-content-between">
     
          {casts.length > 0 && (
            casts.map((community) => (
              community.thumbnail_image && (
                <div className="icon-box col-lg-2 col-md-4 col-sm-6" key={community.id}>
                  <img src={community.thumbnail_image} alt={community.name} />
                </div>
              )
            ))
          )}
        
      </div>
    </section>
    </div>
  );
}

export default OurPartner;
