import React, { useEffect, useState } from "react";
import { fetchAllActiveCommunities } from "../../services/userService";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userAction";

function OurPartner() {
  const [casts, setCasts] = useState([]);

  const dispatch = useDispatch();

  const fetchCommunities = async () => {
    try {
      const response = await fetchAllActiveCommunities();
      if (response && response.status === 200) {
        setCasts(response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        window.location.href = '/login';
      }
      else if (error.response && error.response.status === 500) {
        dispatch(logout());
        window.location.href = '/login';
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
