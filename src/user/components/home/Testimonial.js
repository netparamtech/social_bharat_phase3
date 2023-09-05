import { useEffect, useState } from 'react';
import { fetchBannerWithPageAndSection } from '../../services/userService';

const Testimonials = () => {
    const [imageUrls, setImageUrls] = useState([]);

    const fetchBanners = async () => {
        try {
            const response = await fetchBannerWithPageAndSection("Home", "Testimonial");
            const activeBanners = response.data.data.filter(banner => banner.status === "Active");

            // Check if activeBanner.banner_urls is not an array
            if (!Array.isArray(activeBanners[0].banner_urls)) {
                // Convert it into an array
                const updatedBannerUrls = [activeBanners[0].banner_urls];

                // Update activeBanners with the updated banner URLs
                activeBanners[0].banner_urls = updatedBannerUrls;
            }

            setImageUrls(activeBanners);
        } catch (error) {
            // Handle errors
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    return (
        <section id="testimonials" className="wow animate__animated animate__zoomIn">
            <div id="carouselExampleInterval" className="carousel slide text-center" data-bs-ride="carousel">
                <div className="carousel-inner">

                    {imageUrls.length > 0 && imageUrls[0]?.banner_urls?.map((banner, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img
                                className="rounded-circle shadow-1-strong mb-4"
                                src={banner}
                                alt={`avatar-${index}`}
                                style={{ width: '150px' }}
                            />
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-8">
                                    <h3 className="mb-3">Maria Kate</h3>
                                    <h4>Photographer</h4>
                                    <p>
                                        <i className="fa fa-quote-left pe-2"></i>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti
                                        nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia
                                        fugit consequatur laudantium velit magnam error. Consectetur distinctio fugit
                                        doloremque. <i className="fa fa-quote-right ps-2"></i>
                                    </p>
                                </div>
                            </div>
                            <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                                <li><i className="fas fa-star fa-sm"></i></li>
                                <li><i className="fas fa-star fa-sm"></i></li>
                                <li><i className="fas fa-star fa-sm"></i></li>
                                <li><i className="fas fa-star fa-sm"></i></li>
                                <li><i className="far fa-star fa-sm"></i></li>
                            </ul>
                        </div>
                    ))}

                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"
                    data-bs-slide="prev">
                    <span className="carousel-control-prev-icon " aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"
                    data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </section>
    );
};

export default Testimonials;
