import { useEffect, useState } from "react";

const Contact = (props) => {

  const { userDetails } = props;
  const [contactDetails, setContactDetails] = useState([]);


  useEffect(() => {
    setContactDetails(userDetails?.data?.contacts);
  }, [userDetails]);
  return (
    <div id="contact-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="">
          
          <div className="">
            <div className="row">
              {contactDetails && contactDetails.length > 0 ?
                contactDetails.map((item, idx) => (
                  <div className="col-md-6">
                    <div className="card shadow">
                     
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
                )) : (
                  <div className="col-md-12">
                    <p className="text-muted">No contact details available.</p>
                  </div>
                )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
