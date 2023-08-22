import React from 'react';

const ContactInfo = (props) => {

  const { user } = props;
  const contactDetails = user && user.data && user.data.contacts;
  return (
    <div id="contact-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <h5 className="fw-3 mb-3">Contact Info</h5>
            <div className="row">
              {contactDetails && contactDetails.map((item, idx) => (
                <div className="col-md-6">
                  <div className="card shadow">
                    <div className="edit-icon"><a href="/update-contact" title="Edit"><i className="fas fa-pencil-alt"></i></a></div>
                    <div className="card-body">
                      <div className="w-100 w-lg-75">
                        <div className="mb-2 row">
                          <u> {item.address_type}</u>
                          <label className="text-muted">
                            {item.address_line},
                            {item.city}, {item.state}, {item.country}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
