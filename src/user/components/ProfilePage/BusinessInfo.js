import React from 'react';

const BusinessInfo = (props) => {
    const { user } = props;
    return (
        <div id="business-section" className="content-wrapper pt-4">
            <div className="container">
                <div className="card shadow">
                    <div className="edit-icon add-more-detail"><a href="/update-business-profile" title="Add More Detail"><i className="btn btn-outline-info fas fa-plus"></i></a></div>
                    <div className="card-body">
                        <h5 className="fw-3 mb-3">Business Info</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card shadow">
                                    <div className="edit-icon">
                                        <a href="#" title="Edit">
                                            <i className="fas fa-pencil-alt"></i>
                                        </a>
                                    </div>
                                    <div className="card-body ">
                                        <div className="w-100 w-lg-75">
                                            <div className="mb-2 row">
                                                <label htmlFor="" className="col-sm-4 d-inline-flex">
                                                    Business Name
                                                </label>
                                                <div className="col-sm-8">
                                                    <span className="text-muted">School</span>
                                                </div>
                                            </div>
                                            <div className="mb-2 row">
                                                <label className="col-sm-4">Location</label>
                                                <div className="col-sm-8">
                                                    <span className="text-muted">Jaipur</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card shadow">
                                    <div className="edit-icon">
                                        <a href="#" title="Edit">
                                            <i className="fas fa-pencil-alt"></i>
                                        </a>
                                    </div>
                                    <div className="card-body ">
                                        <div className="w-100 w-lg-75">
                                            <div className="mb-2 row">
                                                <label htmlFor="" className="col-sm-4 d-inline-flex">
                                                    Business Name
                                                </label>
                                                <div className="col-sm-8">
                                                    <span className="text-muted">School</span>
                                                </div>
                                            </div>

                                            <div className="mb-2 row">
                                                <label className="col-sm-4">Location</label>
                                                <div className="col-sm-8">
                                                    <span className="text-muted">Jaipur</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessInfo;
