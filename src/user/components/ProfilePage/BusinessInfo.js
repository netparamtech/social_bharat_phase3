import React from 'react';

const BusinessInfo = () => {
    return (
        <div className="card mt-4">
            <div className="card-body tab-content border-0 bg-white-smoke">
                <div className="tab-pane active" id="businessInfo">
                    <h1 className="d-inline-flex">Business Info</h1>
                    <a href="profileUpdate/businessInfo.html" className="float-end" title="Edit Business">
                        <i className="fa-solid fa-user-pen mt-3 fs-5"></i>
                    </a>
                    <div className="row">
                        <label htmlFor="businessName" className="col-sm-3 col-form-label">Business Name</label>
                        <div className="col-sm-7">
                            <input type="text" readOnly className="form-control-plaintext" id="businessName" value="" placeholder="NetParam College" />
                        </div>
                    </div>

                    <div className="row">
                        <label htmlFor="businessLocation" className="col-sm-3 col-form-label">Location</label>
                        <div className="col-sm-7">
                            <input type="text" readOnly className="form-control-plaintext" id="businessLocation" value="" placeholder="Jaipur College" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessInfo;
