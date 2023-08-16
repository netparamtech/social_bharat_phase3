import React from 'react';

const ContactInfo = () => {
    return (
        <div className="card mt-4">
            <div className="card-body tab-content border-0 bg-white-smoke">
                <div className="tab-pane active" id="contactInfo">
                    <h1 className="d-inline-flex">Contact Info</h1>
                    <a href="profileUpdate/contactInfo.html" className="float-end" title="Edit Contact">
                        <i className="fa-solid fa-user-pen mt-3 fs-5"></i>
                    </a>
                    <div className="row">
                        <label className="col-sm-3 col-form-label">Native Place</label>
                        <div className="col-sm-7">
                            <input type="text" readOnly className="form-control-plaintext" id="nativePlace" value="" placeholder="NetParam College" />
                        </div>
                    </div>

                    <div className="row">
                        <label htmlFor="currentAddress" className="col-sm-3 col-form-label">Current Address</label>
                        <div className="col-sm-7">
                            <input type="text" readOnly className="form-control-plaintext" id="currentAddress" value="" placeholder="Jaipur College" />
                        </div>
                    </div>

                    <div className="row">
                        <label className="col-sm-3 col-form-label">Permanent Address</label>
                        <div className="col-sm-7">
                            <input type="text" readOnly className="form-control-plaintext" id="permanentAddress" value="" placeholder="Jaipur College" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
