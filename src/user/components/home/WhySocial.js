import { useEffect, useState } from 'react';
import { fetchBannerWithPageAndSection } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userAction';

const WhySocial = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const dispatch = useDispatch();

    const fetchBanners = async () => {
        try {
            const response = await fetchBannerWithPageAndSection("Home", "Why Social Bharat");
            const activeBanners = response.data.data.filter(banner => banner.status === "Active");
            if (!Array.isArray(activeBanners[0].banner_urls)) {
                // Convert it into an array
                const updatedBannerUrls = [activeBanners[0].banner_urls];
        
                // Update activeBanners with the updated banner URLs
                activeBanners[0].banner_urls = updatedBannerUrls;
              }
            setImageUrls(activeBanners);
        } catch (error) {
            //handle errors
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
        fetchBanners();
    }, []);
    return (
        <div id="why-social-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 mt-5 what-social-bharat wow animate__animated animate__fadeInUp">
                        <h1>What social Bharat Do?</h1>
                        <p>A community is a social group where people share
                            things in common, like their geographic location,
                            culture, heritage, government, religion, values,
                            identity, work, or other common interests. Community
                            is the thread that brings people together.</p>
                        <ul>
                            <li><i className="fa-sharp fa-regular fa-circle-check me-3"></i>Allow
                                you to respond to change</li>
                            <li><i className="fa-sharp fa-regular fa-circle-check me-3"></i>Lead
                                to a new viewpoint</li>
                            <li><i className="fa-sharp fa-regular fa-circle-check me-3"></i>Make
                                you a better communicator</li>
                            <li><i className="fa-sharp fa-regular fa-circle-check me-3"></i>Lead
                                to a new viewpoint</li>
                        </ul>
                    </div>
                    <div className="col-lg-6 col-md-6 float-end mt-5 wow animate__animated animate__zoomIn">
                    {imageUrls.length > 0 && imageUrls[0]?.banner_urls?.map((banner, index) => (
                        <div key={index} className="image-zoom-containerm fade-in-image">
                           {index === 0 && <img src={banner} className="img-fluid image-zoom" alt="..." />}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhySocial;
