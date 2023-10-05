import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Collapse } from "antd";

const { Panel } = Collapse;

const BusinessInfo = (props) => {
  const { userDetails } = props;
  const [businessDetails, setBusinessDetails] = useState([]);
  const businessPhotos =
  userDetails &&
  userDetails.data &&
  userDetails.data.businesses &&
  userDetails.data.businesses.business_photos;
  const navigate = useNavigate();

  useEffect(() => {
    setBusinessDetails(userDetails?.data?.businesses || []);
  }, [userDetails]);

  return (
    <div id="businesses-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <h5 className="mb-3 fw-bold fs-5">Business Info</h5>
            <div className="row">
            
              {businessDetails && businessDetails.length > 0 ? (
                <Collapse accordion>
                  {businessDetails.map((item, value) => (
                    <Panel header={`Business ${value + 1}`} key={value} className="mb-3 fw fs-5">
                      <table className="table table-striped">
                      <tbody>
                              <tr>
                                <td>City</td>
                                <td className="text-muted">{item.city}</td>
                              </tr>
                              <tr>
                                <td>State</td>
                                <td className="text-muted">{item.state}</td>
                              </tr>
                              <tr>
                                <td>Country</td>
                                <td className="text-muted">{item.country}</td>
                              </tr>
                              <tr>
                                <td>Contact 1</td>
                                <td className="text-muted">{item.contact1}</td>
                              </tr>
                              <tr>
                                <td>Contact 2</td>
                                <td className="text-muted">{item.contact2}</td>
                              </tr>
                              <tr>
                                <td>Contact 3</td>
                                <td className="text-muted">{item.contact3}</td>
                              </tr>
                              <tr>
                                <td>Email</td>
                                <td className="text-muted">
                                  {item.business_email}
                                </td>
                              </tr>
                              <tr>
                                <td>Website Link</td>
                                <td className="text-muted">
                                  {item.business_website}
                                </td>
                              </tr>

                              <tr>
                                <td>Business Photo</td>
                                <td className="proposal-Photo">
                                  {businessPhotos &&
                                    Array.isArray(businessPhotos) ? (
                                    businessPhotos.map((item, idx) => (
                                      <a href={item} target="_blank">
                                        <img className="m-1" src={item} />
                                      </a>
                                    ))
                                  ) : (
                                    <a href={businessPhotos} target="_blank">
                                      <img src={businessPhotos} />
                                    </a>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Status</td>
                                <td className="text-muted">{item.status}</td>
                              </tr>
                            </tbody>
                      </table>
                    </Panel>
                  ))}
                </Collapse>
              ) : (
                <div className="col-md-12">
                  <p className="mb-3 fw fs-5">No business details available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;
