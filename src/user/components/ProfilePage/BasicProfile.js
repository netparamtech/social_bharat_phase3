import React from 'react';

const BasicProfile = () => {
  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div id="profile-img">
        <div className="container">
          <div className="row">
            <div className="card shadow col-lg-4 me-1 pt-1">
              <img className="profile-img mx-auto" src="images/logo.png" alt="" title="" />
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
            <div className="card shadow col-lg-7">
              <div className="card-body">
                <form action="" className="w-100 w-lg-75">
                  <div className="mb-2 row">
                    <label htmlFor="" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                      <p>{/* Name content goes here */}</p>
                    </div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-sm-2">Email</label>
                    <div className="col-sm-10"><span className="text-muted">abc@example.com</span></div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-sm-2 col-form-label">Gender</label>
                    <div className="col-sm-10">{/* Gender content goes here */}</div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-sm-3 col-form-label">Community</label>
                    <div className="col-sm-8">
                      <p>{/* Community content goes here */}</p>
                    </div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-sm-3 col-form-label">Mobile No</label>
                    <div className="col-sm-8">
                      <p>{/* Mobile No content goes here */}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                      <button type="submit" className="btn btn-primary">Update</button>
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

export default BasicProfile;
