import { useEffect, useState } from 'react';
import { fetchBannerWithPageAndSection } from '../../../admin/services/AdminService';

const WhySocial = () => {
    const [imageUrls, setImageUrls] = useState('');

    const fetchBanners = async () => {
        try {
            const response = await fetchBannerWithPageAndSection("Home", "WhySocialBharat");
            const activeBanners = response.data.data.filter(banner => banner.status === "Active");
            setImageUrls(activeBanners[0].banner_urls);
            console.log(activeBanners[0].banner_urls)
        } catch (error) {

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
                        <div className="image-zoom-container">
                            <img src={imageUrls} className="img-fluid image-zoom" alt="..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhySocial;
