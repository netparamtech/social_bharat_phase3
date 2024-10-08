import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBusinessByID } from "../../services/userService";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";

const BusinessInfo = (props) => {
  const { user } = props;
  const [businessDetails, setBusinessDetails] = useState([]);
  const [isDetails, setIsDetails] = useState(false);

  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleIsDetailsClicked = (index) => {
    setIsDetails(prevState => ({
        ...prevState,
        [index]: !prevState[index]
    }));
}

  const deleteBusinessDetails = async (id) => {
    dispatch(setLoader(true));
    try {
      const response = await deleteBusinessByID(id);
      if (response && response.status === 200) {
        setBusinessDetails((prevDetails) =>
          prevDetails.filter((detail) => detail.id !== id)
        );
        setServerError("");
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  useEffect(() => {
    if (user) {
      setBusinessDetails(user?.data?.businesses || []);
    }
  }, [user]);

  return (
    <div id="businesses-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="card shadow ">
          <div className="edit-icon add-more-detail">
            <a
              className="hover-pointer"
              onClick={() => navigate("/user/update-business-profile")}
              title="Add More Detail"
            >
              <i className="btn btn-outline-info fas fa-plus"></i>
            </a>
          </div>
          {serverError && <span className="error">{serverError}</span>}
          <div className="card-header">
            {" "}
            <h5 className="fw-3 mb-3 text-primary">Business Info</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {businessDetails && businessDetails.length > 0 ? (
                <>
                  {" "}
                  {/* Render all fields inside a collapse div */}
                  {businessDetails.map((item, value) => (
                    <div
                      className="col-md-6 wow animate__animated animate__zoomIn"
                      key={value}
                    >
                      <div className="card shadow mb-2">
                        <div className="edit-icon ">
                          <a
                            className="hover-pointer"
                            onClick={() =>
                              navigate(
                                `/user/update-business-profile/${item.id}`
                              )
                            }
                            title="Edit"
                          >
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
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <tbody>
                              <tr>
                                <td>Business Name</td>
                                <td className="text-muted">
                                  {item.business_name}
                                </td>
                                <td width="50px"></td>
                              </tr>
                              <tr>
                                <td>Business Category</td>
                                <td className="text-muted">
                                  {item.business_category}
                                </td>
                                <td width="50px"></td>
                              </tr>
                              <tr>
                                <td>Street Address</td>
                                <td className="text-muted">
                                  {item.street_address}
                                </td>
                                <td width="50px"></td>
                              </tr>
                          
                              <tr>
                                <td>City</td>
                                <td className="text-muted">{item.city}</td>
                              </tr>
                              <tr>
                                <td>State</td>
                                <td className="text-muted">{item.state}</td>
                              </tr>
                            {isDetails[value]?(
                              <>
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
                                <td>Business Details <br />(or Website)</td>
                                <td className="truncate-text text-muted">
                                  {item.business_website}
                                </td>
                              </tr>

                              {
                                item.business_photos && Array.isArray(item.business_photos) ? (
                                  <tr>
                                    <td>Business Photo</td>
                                    <td className="proposal-Photo">
                                      {
                                        item.business_photos.map((item, idx) => (
                                          <a href={item} target="_blank" key={idx}>
                                            <img className="m-1" src={item} />
                                          </a>
                                        ))
                                      }
                                    </td>
                                  </tr>
                                ) : (
                                  <tr>
                                    {
                                      item.business_photos ? (
                                        <>
                                          <td>Business Photo</td>
                                          <td className="proposal-Photo">
                                            {
                                              <a href={item} target="_blank">
                                                <img className="m-1" src={item.business_photos} />
                                              </a>
                                            }
                                          </td></>
                                      ) : ''
                                    }
                                  </tr>
                                )
                              }
                              <tr>
                                <td>Status</td>
                                <td className="text-muted">{item.status}</td>
                              </tr>
                              </>
                            ):''}
                            </tbody>
                          </table>
                        </div>
                        <a className="btn over-pointer-g-effect mx-auto m-2 btn-toggle" onClick={() => handleIsDetailsClicked(value)}>{!isDetails[value] ? "Show More" : "Show Less"}</a>
                       
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="add-more-info ">
                  <a
                    className="btn btn-secondary hover-pointer"
                    onClick={() => navigate("/user/update-business-profile")}
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
