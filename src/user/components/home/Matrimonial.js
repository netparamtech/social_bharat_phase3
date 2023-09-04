import React from 'react';

const Matrimonial = () => {
    return (
        <div id="matrimonial" className="mt-5">
            <div className="container">
                <h1 className="fs-2 lh-base text-center text-white">Matrimonial
                    Section</h1>
                <hr className="mb-5" />
                <div className="row gy-5 wow animate__animated animate__fadeInUp">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="matrimonial-section">
                            <div className="matrimonial-img">
                                <img src="/user/images/1.jpg" alt="img" className="img-fluid" />
                            </div>
                            <div className="matrimonial-details">
                                <div className="icon">
                                    <i className="fa-brands fa-wpexplorer"></i>
                                </div>
                                <a href="#" className="stretched-link">
                                    <h3>Explore
                                        partner from your
                                        cast</h3>
                                </a>
                                <p>Some quick example text to
                                    build on the card title and make up the bulk
                                    of the card's content</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="matrimonial-section">
                            <div className="matrimonial-img">
                                <img src="/user/images/2.jpg" alt="img" className="img-fluid" />
                            </div>
                            <div className="matrimonial-details">
                                <div className="icon">
                                    <i className="fa-brands fa-wpexplorer"></i>
                                </div>
                                <a href="#" className="stretched-link">
                                    <h3>Explore
                                        verified profiles</h3>
                                </a>
                                <p>Some quick example text to
                                    build on the card title and make up the bulk
                                    of the card's content</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="matrimonial-section">
                            <div className="matrimonial-img">
                                <img src="/user/images/3.jpg" alt="img" className="img-fluid" />
                            </div>
                            <div className="matrimonial-details">
                                <div className="icon">
                                    <i className="fa-brands fa-wpexplorer"></i>
                                </div>
                                <a href="#" className="stretched-link">
                                    <h3>Choose
                                        your life partner</h3>
                                </a>
                                <p>Some quick example text to
                                    build on the card title and make up the bulk
                                    of the card's content</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Matrimonial;
