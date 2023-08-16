import React from 'react';

const UpdateContact = () => {
    return (
        <div className="card mt-4">
            <div className="card-body tab-content border-0 bg-white-smoke">
                <div className="tab-pane active" id="contactInfo">
                    <h1 className="d-inline-flex">Contact Info</h1>
                    <form>
                        <div className="row">
                            <label htmlFor="nativePlace" className="col-sm-3 col-form-label">Native Place</label>
                            <div className="col-sm-7">
                                <input
                                    type="text"
                                    className="form-control w-75 mb-2"
                                    id="nativePlace"
                                    value=""
                                    placeholder="Enter Native Place"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="currentAddress" className="col-sm-3 col-form-label">Current Address</label>
                            <div className="col-sm-7">
                                <input
                                    type="text"
                                    className="form-control w-75 mb-2"
                                    id="currentAddress"
                                    value=""
                                    placeholder="Enter Current Address"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="permanentAddress" className="col-sm-3 col-form-label">Permanent Address</label>
                            <div className="col-sm-7">
                                <input
                                    type="text"
                                    className="form-control w-75 mb-2"
                                    id="permanentAddress"
                                    value=""
                                    placeholder="Enter Permanent Address"
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

export default UpdateContact;
