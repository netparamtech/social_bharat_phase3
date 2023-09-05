import { useEffect, useState } from 'react';
import { fetchBannerWithPageAndSection } from '../../../admin/services/AdminService';

const Matrimonial = () => {
    const [imageUrls, setImageUrls] = useState([]);

    const fetchBanners = async () => {
        try {
            const response = await fetchBannerWithPageAndSection("Home", "Matrimonial");
            const activeBanners = response.data.data.filter(banner => banner.status === "Active");
            setImageUrls(activeBanners);
        } catch (error) {
            // Handle errors here if needed
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []); // Run the fetchBanners function only once when the component mounts

    return (
        <div id="matrimonial" className="mt-5">
            <div className="container">
                <h1 className="fs-2 lh-base text-center text-white">Matrimonial Section</h1>
                <hr className="mb-5" />
                <div className="row gy-5 wow animate__animated animate__fadeInUp">
                    {imageUrls.length > 0 && imageUrls[0]?.banner_urls?.map((banner, index) => (
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
                                    <p>Some quick example text to build on the card title and make up the bulk of the card's content</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Matrimonial;
