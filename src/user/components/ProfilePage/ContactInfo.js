import React from 'react';

const ContactInfo = (props) => {
  return (
    <div id="contact-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <h5 className="fw-3 mb-3">Contact Info</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="card shadow">
                  <div className="card-body">
                    <div className="w-100 w-lg-75">
                      <div className="mb-2 row">
                        <label className="text-muted">
                          747, Janpath, Rani sathi nagar, Nirman nagar,
                          Jaipur(302020), Rajasthan, India
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card shadow">
                  <div className="card-body">
                    <div className="w-100 w-lg-75">
                      <div className="mb-2 row">
                        <label className="text-muted">
                          747, Janpath, Rani sathi nagar, Nirman nagar,
                          Jaipur(302020), Rajasthan, India
                        </label>
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

export default ContactInfo;
