import { useEffect, useState } from "react";

const ContactInfo = (props) => {

  const { userDetails } = props;
  const [contactDetails, setContactDetails] = useState([]);


  useEffect(() => {
    setContactDetails(userDetails?.data?.contacts);
  }, [userDetails]);
  return (
    <div id="contact-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="card shadow" id="font-Resize">
          
          <div className="card-body">
          <h5 className="mb-3 text-primary">Contact Info</h5>
            <div className="row">
              {contactDetails && contactDetails.length > 0 ?
                contactDetails.map((item, idx) => (
                  <div className="col-md-6">
                    <div className="card shadow">
                     
                      <div className="card-body">
                        <div className="w-100 w-lg-75">
                          <div className="mb-2 row">
                            <label className="mb-1 fw-bold">{item.address_type}</label>
                            <label className="text-muted">
                              {item.address_line},
                              {item.city}, {item.state}, {item.country}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-md-12">
                    <p className="mb-3 font-14">No contact details available.</p>
                  </div>
                )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
