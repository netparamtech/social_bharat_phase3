import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { deleteBusinessByID } from "../../services/userService";

const BusinessInfo = (props) => {
  const { user } = props;
  const [businessDetails, setBusinessDetails] = useState([]);
  const [collapsedItems, setCollapsedItems] = useState([]); // State to control collapse/expand

  const navigate = useNavigate();
  const businessPhotos =
    user &&
    user.data &&
    user.data.businesses &&
    user.data.businesses.business_photos;

  const deleteBusinessDetails = async (id) => {
    try {
      const response = await deleteBusinessByID(id);
      if (response && response.status === 200) {
        setBusinessDetails((prevDetails) =>
          prevDetails.filter((detail) => detail.id !== id)
        );
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else if (error.response && error.response.status === 500) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    setBusinessDetails(user?.data?.businesses || []);
    // Initialize the collapsedItems state with false for each item
    setCollapsedItems(Array(user?.data?.businesses?.length).fill(true));
  }, [user]);

  const toggleCollapse = (value) => {
    const newCollapsedItems = [...collapsedItems];
    newCollapsedItems[value] = !newCollapsedItems[value];
    setCollapsedItems(newCollapsedItems);
  };

  return (
    <div id="businesses-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="card shadow ">
          <div className="edit-icon add-more-detail">
            <a className="hover-pointer" onClick={()=>navigate('/user/update-business-profile')} title="Add More Detail">
              <i className="btn btn-outline-info fas fa-plus"></i>
            </a>
          </div>

          <div className="card-body">
            <h5 className="fw-3 mb-3">Business Info</h5>
            <div className="row">
              {businessDetails && businessDetails.length > 0 ? (
                <>                  {/* Render all fields inside a collapse div */}
                  {businessDetails.map((item, value) => (
                    <div className="col-md-6" key={value}>
                      <div className="card shadow mb-3">
                        <div className="edit-icon ">
                          <a className="hover-pointer" onClick={()=>navigate(`/user/update-business-profile/${item.id}`)} title="Edit">
                            <i className="fas fa-pencil-alt"></i>
                          </a>
                        </div>
                        <div className="delete-icon">
                          <a className="hover-pointer" title="Delete">
                            <i
                              className="fa-solid fa-trash"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteBusinessDetails(item.id);
                              }}
                            ></i>
                          </a>
                        </div>

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
                          className={`card-body pt-0 collapse${
                            collapsedItems[value] ? "" : " show"
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
                          data-toggle="collapse"
                          data-target={`#collapse-${value}`} // Add a unique ID for each collapse element
                          aria-expanded={!collapsedItems[value]} // Use the negation of collapsed state
                        >
                          {collapsedItems[value] ? "Show More" : "Show Less"}
                        </button>
                      </div>
                    </div>
                  ))}
                  </>
                
              ) : (
                <div className="add-more-info ">
                  <a
                    className="btn btn-secondary hover-pointer"
                    onClick={()=>navigate("/user/update-business-profile")}
                  >
                    Add Business Info
                  </a>
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
