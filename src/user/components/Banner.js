import React from 'react';

const Banner = () => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            {/* Indicators */}
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>

            {/* Wrapper for slides */}
            <div className="carousel-inner" role="listbox">
                <div className="carousel-item active">
                    <img className="banner-area d-block w-100" src="/user/images/social-bg.jpg" alt="..." />
                    <div className="overlay ">
                        <div className="carousel-caption d-none d-md-block">
                            <div className="container wow animate__animated animate__zoomIn">
                                <div id="hero" className="hero route">
                                    <div className="hero-content display-table">
                                        <div className="table-cell">
                                            <div className="container">
                                                <h1 className="hero-title  mb-4">Connect with your<br />Social Community
                                                    <br />
                                                    <a href="" className="typewrite" data-period="2000" data-type='[ "Hi, Im Si.", "I am Creative.", "I Love Design.", "I Love to Develop." ]'>
                                                        <span className="wrap"></span>
                                                    </a>
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="banner-button">
                                        <a className="hero-btn">Get started</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <img className="banner-area d-block w-100" src="/user/images/components/Banner.js/matrimonial-0.jpg" alt="..." />
                    <div className="overlay">
                        <div className="carousel-caption d-none d-md-block">
                            <div className="container">
                                <h2 className="">Connect with your<br />Social Community</h2>
                                <div className="banner-button">
                                    <a className="hero-btn">Get started</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <img className="banner-area d-block w-100" src="/user/images/matrimonial-1.jpg" alt="..." />
                    <div className="overlay">
                        <div className="carousel-caption d-none d-md-block">
                            <div className="container">
                                <h2 className="">Connect with your<br />Social Community</h2>
                                <div className="banner-button">
                                    <a className="hero-btn">Get started</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Left and right controls */}
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Banner;
