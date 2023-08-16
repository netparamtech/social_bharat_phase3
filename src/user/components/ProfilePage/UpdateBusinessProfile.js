import React from 'react';

const UpdateBusinessProfile = () => {
    return (
        <div className="card mt-4">
            <div className="card-body tab-content border-0 bg-white-smoke">
                <div className="tab-pane active" id="businessInfo">
                    <h1 className="d-inline-flex">Business Info</h1>
                    <form action="">
                        <div className="row">
                            <label htmlFor="businessName" className="col-sm-3 col-form-label">Business Name</label>
                            <div className="col-sm-7">
                                <input
                                    type="text"
                                    className="form-control w-75 mb-2"
                                    id="businessName"
                                    value=""
                                    placeholder="Enter Business Name"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="businessLocation" className="col-sm-3 col-form-label">Location</label>
                            <div className="col-sm-7">
                                <input
                                    type="text"
                                    className="form-control w-75 mb-2"
                                    id="businessLocation"
                                    value=""
                                    placeholder="Enter Location"
                                />
                            </div>
                        </div>
                        <div>
                            <a href="#" className="btn btn-green w-25 mt-2">Update</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateBusinessProfile;
