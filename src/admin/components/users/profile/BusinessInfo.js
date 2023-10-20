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
            <h5 className="mb-3 text-primary">Business Info</h5>
            <div className="row">
              <div className="col-md-12">
                {businessDetails && businessDetails.length > 0 ? (
                  <Collapse accordion >
                    {businessDetails.map((item, value) => (
                      <Panel
                        header={<span className="mb-3 fw fs-5">{`Business ${value + 1}`}</span>}
                        key={value}
                        className=""
                      >
                        <table className="table table-striped ">
                          <tbody>
                            <tr>
                              <td className='fw-bold font-14'>City</td>
                              <td className="text-muted">{item.city}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold font-14'>State</td>
                              <td className="text-muted">{item.state}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold font-14'>Country</td>
                              <td className="text-muted">{item.country}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold font-14'>Contact 1</td>
                              <td className="text-muted">{item.contact1}</td>
                            </tr>

                            {
                              item.contact2 && (
                                <tr>
                                  <td className='fw-bold font-14'>Contact 2</td>
                                  <td className="text-muted">
                                    {item.contact2}
                                  </td>
                                </tr>
                              )
                            }


                            {
                              item.contact3 && (
                                <tr>
                                  <td className='fw-bold font-14'>Contact 3</td>
                                  <td className="text-muted">
                                    {item.contact3}
                                  </td>
                                </tr>
                              )
                            }

                            {
                              item.business_email && (
                                <tr>
                                  <td className='fw-bold font-14'>Website Email</td>
                                  <td className="text-muted" style={{ maxWidth: '300px', wordWrap: 'break-word' }}>
                                    {item.business_email}
                                  </td>
                                </tr>
                              )
                            }

                            {
                              item.business_website && (
                                <tr>
                                  <td className='fw-bold font-14'>Website Link</td>
                                  <td className="text-muted">
                                    {item.business_website}
                                  </td>
                                </tr>
                              )
                            }

                            {
                              businessPhotos && (
                                <tr>
                                  <td className='fw-bold font-14'>Business Photos</td>
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
                              )
                            }

                            <tr>
                              <td className='fw-bold font-14'>Status</td>
                              <td className="text-muted">{item.status}</td>
                            </tr>
                          </tbody>
                        </table>
                      </Panel>
                    ))}
                  </Collapse>
                ) : (
                  <div className="col-md-12">
                    <p className="mb-3 font-14">No business details available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;
