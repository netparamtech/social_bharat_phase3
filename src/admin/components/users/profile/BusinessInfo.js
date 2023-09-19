import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const BusinessInfo = (props) => {
  const { userDetails } = props;
  const [businessDetails, setBusinessDetails] = useState([]);
  const [collapsedItems, setCollapsedItems] = useState([]); // State to control collapse/expand

  const navigate = useNavigate();
  const businessPhotos =
    userDetails &&
    userDetails.data &&
    userDetails.data.businesses &&
    userDetails.data.businesses.business_photos;


  useEffect(() => {
    setBusinessDetails(userDetails?.data?.businesses || []);
    // Initialize the collapsedItems state with false for each item
    setCollapsedItems(Array(userDetails?.data?.businesses?.length).fill(true));
  }, [userDetails]);

  const toggleCollapse = (value) => {
    const newCollapsedItems = [...collapsedItems];
    newCollapsedItems[value] = !newCollapsedItems[value];
    setCollapsedItems(newCollapsedItems);
  };
  return (
    <div id="businesses-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="card shadow ">


          <div className="card-body">
            <h5 className="fw-3 mb-3">Business Info</h5>
            <div className="row">
              {businessDetails && businessDetails.length > 0 ? (
                <>                  {/* Render all fields inside a collapse div */}
                  {businessDetails.map((item, value) => (
                    <div className="col-md-6" key={value}>
                      <div className="card shadow">


                        <div className="card-body mt-4 pb-0">
                          <table className="table table-striped">
                            <tbody>
                              <tr>
                                <td>Business Name</td>
                                <td className="text-muted">
                                  {item.business_name}
                                </td>
                              </tr>
                              <tr>
                                <td>Business Category</td>
                                <td className="text-muted">
                                  {item.business_category}
                                </td>
                              </tr>
                              <tr>
                                <td>Street Address</td>
                                <td className="text-muted">
                                  {item.street_address}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div
                          className={`card-body pt-0 collapse${collapsedItems[value] ? "" : " show"
                            }`}
                          id={`collapse-${value}`}
                        >
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
                        </div>
                        <button
                          onClick={() => toggleCollapse(value)}
                          className="btn-primary mb-2"
                          type="button"
                          aria-expanded={!collapsedItems[value]} // Use the negation of collapsed state
                        >
                          {collapsedItems[value] ? "Show More" : "Show Less"}
                        </button>
                      </div>
                    </div>
                  ))}
                </>

              ) : (
                <div className="col-md-12">
                  <p className="text-muted">No business details available.</p>
                </div>
              )}
            </div>

            {/* Conditional rendering for "Show More" button */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;
