import React from 'react';
import './FlatRentService.css'; // Import the CSS file if you decide to keep styles in a CSS file
import ServiceCard from './ServiceCard';
import { Rate } from 'antd';

const FlatRentBanner = ({ items }) => {
    const checkMobileVisibility = (mobileNumber) => {
        const isHidden = /\*/.test(mobileNumber);
        return !isHidden;
    };
    return (
        <div id="flat-rent-service" className="banner" style={{backgroundColor:'lightblue'}}>
            <h3 className='text-danger'>Find Your Perfect Room, Flat, or PG</h3>
            <div className='card card-body mb-2 shadow w-75 mx-auto'>
                <div className="d-flex justify-content-start rounded-3 mt-2"
                >
                    Service At - {items.city}
                    {items.state
                        ? `(${items.state})`
                        : ""}
                </div>
                ({items.location})
                <div
                    className="d-flex justify-content-start rounded-3"
                >
                    Experience-{items.experience ? items.experience : 'N/A'}
                </div>
            </div>
            <div className="service-image-container">
                <img src="/user/images/home1.jpg" alt="Accommodation Image 1" />
                <img src="/user/images/home2.jpeg" alt="Accommodation Image 2" />
                <img src="/user/images/home1.jpg" alt="Accommodation Image 3" />
            </div>
            <p>
                Explore a wide range of accommodations tailored to your needs and budget. Convenient locations, affordable prices, and excellent amenities.
            </p>
            <Rate className="m-2" allowHalf defaultValue={parseFloat(items.avg_rating)} disabled />
            <p className="fw-bold fs-4 m-2">{items.avg_rating}</p>
            <h5 className="m-2">Rating</h5>
            <p className="m-2">Total Participate - {items.total_participating}</p>
            <a href="#" className="cta">Book Now</a>
            <div>

            </div>
            <div className="details-container">
                <div className='row' style={{ padding: '12px' }}>
                    <div className='col-12 col-md-7'>
                        <ServiceCard items={items} />
                    </div>
                    <div className='col-12 col-md-5'>
                        <h2>Customer Reviews</h2>
                        <div className="reviews">

                            <div className="review">
                                <p>"Amazing service and comfortable stay!"</p>
                                <p className="reviewer">- John Doe</p>
                            </div>
                            <div className="review">
                                <p>"Affordable and well-maintained properties."</p>
                                <p className="reviewer">- Jane Smith</p>
                            </div>
                            <div className="review">
                                <p>"Amazing service and comfortable stay!"</p>
                                <p className="reviewer">- John Doe</p>
                            </div>
                            <div className="review">
                                <p>"Affordable and well-maintained properties."</p>
                                <p className="reviewer">- Jane Smith</p>
                            </div>
                            <div className="review">
                                <p>"Amazing service and comfortable stay!"</p>
                                <p className="reviewer">- John Doe</p>
                            </div>
                            <div className="review">
                                <p>"Affordable and well-maintained properties."</p>
                                <p className="reviewer">- Jane Smith</p>
                            </div>
                        </div>
                        <div className="contact">
                            <h2>Contact Us</h2>
                            {/* <p className="contact-info">Phone: 123-456-7890</p> */}
                            <p className="mb-0 contact-info" style={{display:'flex',justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
                                <a href={`tel:${items.mobile1}`}>+91-{items.mobile1}</a>
                                {items.mobile2 && (
                                    <>
                                        <a href={`tel:${items.mobile2}`}>+91-{items.mobile2}</a>
                                    </>
                                )}
                                {checkMobileVisibility(items.masked_mobile) && (
                                    <>
                                        <a href={`tel:${items.masked_mobile}`}>+91-{items.masked_mobile}</a>
                                    </>
                                )}
                            </p>
                            <p className="contact-info">Email: info@yourservice.com</p>
                        </div>
                        <div className="logo">
                            <img src="your-logo-url.png" alt="Your Logo" />
                        </div>
                    </div>
                </div>

            </div>
            <div className=" comment-text m-2">
                Description :
                <p
                >{items.description}</p>

            </div>
        </div>
    );
};

export default FlatRentBanner;
