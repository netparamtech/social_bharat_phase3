import React from 'react';

const Testimonials = () => {
    return (
        <section id="testimonials" className="wow animate__animated animate__zoomIn">
            <div id="carouselExampleInterval" className="carousel slide text-center" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img className="rounded-circle shadow-1-strong mb-4"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar"
                            style={{ width: '150px' }} />
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h3 className="mb-3">Maria Kate</h3>
                                <h4>Photographer</h4>
                                <p>
                                    <i className="fa fa-quote-left pe-2"></i>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Minus et deleniti
                                    nesciunt sint eligendi reprehenderit
                                    reiciendis, quibusdam illo, beatae quia
                                    fugit consequatur laudantium velit magnam
                                    error. Consectetur distinctio fugit
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

                    <div className="carousel-item" data-bs-interval="2000">
                        <img className="rounded-circle shadow-1-strong mb-4"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp" alt="avatar"
                            style={{ width: '150px' }} />
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h3 className="mb-3">Maria Kate</h3>
                                <h4>Photographer</h4>
                                <p>
                                    <i className="fa fa-quote-left pe-2"></i>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Minus et deleniti
                                    nesciunt sint eligendi reprehenderit
                                    reiciendis, quibusdam illo, beatae quia
                                    fugit consequatur laudantium velit magnam
                                    error. Consectetur distinctio fugit
                                    doloremque. <i className="fa fa-quote-right ps-2"></i>
                                </p>
                            </div>
                        </div>
                        <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                            <li><i className="fas fa-star fa-sm" style={{ color: 'bold #ffffff' }}></i></li>
                            <li><i className="fas fa-star fa-sm"></i></li>
                            <li><i className="fas fa-star fa-sm"></i></li>
                            <li><i className="fas fa-star fa-sm"></i></li>
                            <li><i className="far fa-star fa-sm"></i></li>
                        </ul>
                    </div>

                    <div className="carousel-item">
                        <img className="rounded-circle shadow-1-strong mb-4"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp" alt="avatar"
                            style={{ width: '150px' }} />
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h3 className="mb-3">Maria Kate</h3>
                                <h4>Photographer</h4>
                                <p>
                                    <i className="fa fa-quote-left pe-2"></i>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Minus et deleniti
                                    nesciunt sint eligendi reprehenderit
                                    reiciendis, quibusdam illo, beatae quia
                                    fugit consequatur laudantium velit magnam
                                    error. Consectetur distinctio fugit
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
