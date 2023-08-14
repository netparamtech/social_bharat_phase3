import React from 'react';

const SideBar = () => {
    return (
        <div className="col-lg-3 col-md-4 d-md-block mt-3 mb-3">
            {/* Side Bar */}
            <div className="card bg-common card-left side-bar">
                <div className="card-body bg-white-smoke">
                    <div className="row">
                        <div className="col-lg-6 container-profilepic card card-block-md overflow-hidden">
                            <img src="img/slide-1.webp" className="img-fluid max-width-100" alt="Profile Picture" />
                            <div className="middle-profilepic text-center card-img-overlay d-none flex-column justify-content-center">
                                <div className="text-profilepic text-success">
                                    <i className="fas fa-camera fs-6"></i>
                                    <div className="text-profilepic fs-6">
                                        <a href="profileUpdate/editProfilePhoto.html" className="text-decoration-none text-success">Edit</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 profile-detail">
                            <h4 className="card-title mt-3">Alex</h4><br />
                            <p className="card-text description ">Jaipur</p>
                        </div>
                    </div>

                    <nav className="nav profile-side-bar-details d-md-block d-none">
                        <a data-toggle="tab" className="nav-link" href="search.html"> <i className="fa-solid fa-magnifying-glass"></i>
                            Search People</a>
                        <a data-toggle="tab" className="nav-link active" href="#basicProfile"> <i className="fa-solid fa-user"></i>
                            Basic profile</a>
                        <a data-toggle="tab" className="nav-link" href="#matrimonialInfo"> <i className='fas fa-ring'></i>
                            Matrimonial Info</a>
                        <a data-toggle="tab" className="nav-link" href="#educationInfo"> <i className='fas fa-user-graduate'></i>
                            Education Info</a>
                        <a data-toggle="tab" className="nav-link" href="#businessInfo"> <i className='fas fa-business-time'></i>
                            Business Info</a>
                        <a data-toggle="tab" className="nav-link" href="#contactInfo">
                            <i className="fa-solid fa-address-card"></i>
                            Contact Info</a>
                        <a data-toggle="tab" className="nav-link" href="#jobInfo"> <i className="fa-solid fa-briefcase"></i>
                            Job Info</a>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
