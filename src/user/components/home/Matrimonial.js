import { useEffect, useState } from "react";
import { fetchBannerWithPageAndSection } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const Matrimonial = () => {
  const [imageUrls, setImageUrls] = useState([]);

  const navigate = useNavigate();

  const fetchBanners = async () => {
    try {
      const response = await fetchBannerWithPageAndSection(
        "Home",
        "Matrimonial"
      );
      const activeBanners = response.data.data.filter(
        (banner) => banner.status === "Active"
      );
      if (!Array.isArray(activeBanners[0].banner_urls)) {
        // Convert it into an array
        const updatedBannerUrls = [activeBanners[0].banner_urls];

        // Update activeBanners with the updated banner URLs
        activeBanners[0].banner_urls = updatedBannerUrls;
      }
      setImageUrls(activeBanners);
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
    fetchBanners();
  }, []); // Run the fetchBanners function only once when the component mounts

  return (
    <div id="matrimonial" className="">
      <div className="container">
        <h1 className="fs-2 lh-base text-center text-white">
          Matrimonial Section
        </h1>
        <hr className="mb-5" />
        <div className="row gy-5 wow animate__animated animate__fadeInUp">
          {imageUrls.length > 0 &&
            imageUrls[0]?.banner_urls?.map((banner, index) => (
              <div className="col-lg-4 col-md-4 col-sm-12" key={index}>
                <div className="matrimonial-section">
                  <div className="matrimonial-img">
                    <img src={banner} alt="" className="img-fluid" />
                  </div>
                  <div className="matrimonial-details">
                    <div className="icon">
                      <i className="fa-brands fa-wpexplorer"></i>
                    </div>
                    <a href="#" className="stretched-link">
                      <h3>Explore partner from your cast</h3>
                    </a>
                    <p>
                      When you and your partner come from the same community,
                      your families often share similar values, beliefs, and
                      expectations. This common ground can make it easier for
                      both families to understand and accept the relationship,
                      reducing potential conflicts.
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Matrimonial;
