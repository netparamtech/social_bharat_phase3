import { useEffect, useState } from 'react';
import { fetchBannerWithPageAndSection } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WhySocial = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
            else if (error.response && error.response.status === 500) {
                navigate('/login');
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
                        <p>Connecting Communities with Privacy & Matrimonial Excellence.</p>
                        <ul>
                            <li><i className="fa-sharp fa-regular fa-circle-check me-3"></i>
                            Discover and participate in communities you love.    
                            </li>
                            <li><i className="fa-sharp fa-regular fa-circle-check me-3"></i>
                            Trustworthy profiles for a secure matrimonial experience.  
                            </li>
                            <li><i className="fa-sharp fa-regular fa-circle-check me-3"></i>
                                Private Sharing in Chosen Communities.
                            </li>
                            <li><i className="fa-sharp fa-regular fa-circle-check me-3"></i>
                                Find Life Partners with Privacy.</li>
                            <li><i className="fa-sharp fa-regular fa-circle-check me-3"></i>
                            Elevate your business to new heights. </li>
                            <li><i className="fa-sharp fa-regular fa-circle-check me-3"></i>
                            Plan and attend events with friends and like-minded individuals. </li>
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
