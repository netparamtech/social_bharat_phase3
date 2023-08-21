import React from 'react';

const UpdateBusinessProfile = () => {
  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 p-5">
                <div className="card-title">
                  <h3 className="mb-3">Business Info</h3>
                </div>
                <form action="" className="w-100 w-lg-75">
                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Business Name</label>
                      <input
                        type="text"
                        name="businessName"
                        id="businessName"
                        placeholder="Enter Business Name"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Enter Location"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                      <button type="submit" className="btn btn-primary">
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBusinessProfile;
