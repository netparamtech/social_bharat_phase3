import React, { useEffect, useState } from 'react';
import { fetchBannerWithPageAndSection } from '../../services/userService';

const PromoteBusiness = () => {
    const [imageUrls, setImageUrls] = useState('');

    const fetchBanners = async () => {
        try {
            const response = await fetchBannerWithPageAndSection("Home", "Promote-Business");
            const activeBanners = response.data.data.filter(banner => banner.status === "Active");
            setImageUrls(activeBanners[0].banner_urls);
        } catch (error) {

        }
    };
    useEffect(() => {
        fetchBanners();
    }, []);
    
    return (
        <div id="Promote-business" className="text-center stats mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 mt-3 text-white">
                        <span id="number1" className="fw-bold counter">500</span>
                        <p><strong>Project Done</strong></p>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 mt-3">
                        <span id="number2" className="fw-bold counter">800</span>
                        <p><strong>Events</strong></p>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 mt-3">
                        <span id="number3" className="fw-bold counter">1302</span>
                        <p><strong>Trainers</strong></p>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 mt-3">
                        <span id="number4" className="fw-bold counter">1050</span>
                        <p><strong>User Connected</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PromoteBusiness;
