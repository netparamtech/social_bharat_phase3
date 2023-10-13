import { useEffect, useState } from "react";
import { deleteMatrimonial } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const MatrimonialInfo = (props) => {
  const { user } = props;
  const [matrimonialDetails, setMatrimonialDetails] = useState([]);

  const navigate = useNavigate();

  const proposalPhotos =
    user &&
    user.data &&
    user.data.matrimonial[0] &&
    user.data.matrimonial[0].proposal_photos;

  const brothersDetails =
    user &&
    user.data &&
    user.data.matrimonial[0] &&
    user.data.matrimonial[0].brothers_details;

  const sistersDetails =
    user &&
    user.data &&
    user.data.matrimonial[0] &&
    user.data.matrimonial[0].sisters_details;

  const getFileType = (url) => {
    // Extract the file extension from the URL
    const extension = url.split(".").pop().toLowerCase();

    // Define mappings of common file types
    const fileTypeMappings = {
      pdf: "PDF",
      doc: "DOC",
      docx: "DOCX",
      txt: "TXT",
      // Add more file types as needed
    };
    // Use the mapping or show the extension as-is
    return fileTypeMappings[extension] || extension.toUpperCase();
  };
  const deleteMatrimonialDetails = async () => {
    try {
      const response = await deleteMatrimonial();
      if (response && response.status === 200) {
        setMatrimonialDetails((prevDetails) =>
          prevDetails.filter((detail) => detail.id !== user?.data?.matrimonial[0].id)
        );
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        navigate('/login');
      }
    }
  };
  useEffect(() => {
    setMatrimonialDetails(user?.data?.matrimonial || '');
  }, [user]);
  return (
    <div id="matrimonial-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="card shadow">
          {matrimonialDetails && matrimonialDetails.length > 0 ? (
            <div className="edit-icon">
              <a className="hover-pointer" onClick={() => navigate("/user/update-matrimonial-profile")} title="Edit">
                <i className="fas fa-pencil-alt"></i>
              </a>
            </div>
          ) : (
            <div className="edit-icon add-more-detail">
              <a
                className="hover-pointer"
                title="Add More Detail"
                onClick={() => navigate("/user/update-matrimonial-profile")}
              >
                <i className="btn btn-outline-info fas fa-plus"></i>
              </a>
            </div>
          )}
          {matrimonialDetails && matrimonialDetails.length > 0 ? (
            <div className="delete-icon">
              <a title="Delete" className="hover-pointer">
                <i
                  className="fa-solid fa-trash "
                  onClick={(e) => {
                    e.preventDefault();
                    deleteMatrimonialDetails();
                  }}
                ></i>
              </a>
            </div>
          ) : (
            ""
          )}

          <div className="card-body">
            <h5 className="fw-3 mb-3">Matrimonial Info</h5>
            {matrimonialDetails && matrimonialDetails.length > 0 ? (
              <div className="row">
                <div className="col-md-6">
                  <div className="card shadow">
                    <div className="card-body">
                      <table className="table table-striped">
                        <tbody>
                          <tr>
                            <td>Father Name</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].father_name||"N/A"}
                            </td>
                          </tr>
                          <tr>
                            <td>Mother Name</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].mother_name||"N/A"}
                            </td>
                          </tr>
                          <tr>
                            <td>Manglic</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].manglic||"N/A"}
                            </td>
                          </tr>
                          <tr>
                            <td>Height</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].height_in_feet}{" "}ft
                            </td>
                          </tr>
                          <tr>
                            <td>Package/Salary</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].salary_package||"N/A"}
                            </td>
                          </tr>
                          <tr>
                            <td>Date Of Birth</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].dob||"N/A"}
                            </td>
                          </tr>
                          <tr>
                            <td>Brother Count</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].brother_count||"N/A"}
                            </td>
                          </tr>
                          {
                            brothersDetails && (
                              <tr>
                                <td>Brothers Details</td>
                                <td className="text-muted">
                                  {brothersDetails}
                                </td>
                              </tr>
                            )
                          }

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card shadow">
                    <div className="card-body ">
                      <table className="table table-striped">
                        <tbody>
                          <tr>
                            <td>Sister Count</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].sister_count||"N/A"}
                            </td>
                          </tr>
                          {
                            sistersDetails && (
                              <tr>
                                <td>Sisters Details</td>
                                <td className="text-muted">
                                  {sistersDetails}
                                </td>
                              </tr>
                            )
                          }
                          <tr>
                            <td>Gender</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].gender||"N/A"}
                            </td>
                          </tr>
                          <tr>
                            <td>Paternal Gotra</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].paternal_gotra||"N/A"}
                            </td>
                          </tr>
                          <tr>
                            <td>Maternal Gotra</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].maternal_gotra||"N/A"}
                            </td>
                          </tr>
                          <tr>
                            <td>Biodata</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].biodata && (
                                  <span>
                                    <a
                                      href={user.data.matrimonial[0].biodata}
                                      download="biodata.pdf"
                                      target="_blank"
                                    >
                                      <i className="fa-regular fa-file-lines"></i>{" "}
                                      Download Biodata
                                    </a>
                                    &nbsp;(
                                    {getFileType(
                                      user.data.matrimonial[0].biodata
                                    )}
                                    )
                                  </span>
                                )}
                            </td>
                          </tr>
                          <tr>
                            <td>Proposal Photo</td>
                            <td className="proposal-Photo">
                              {proposalPhotos &&
                                Array.isArray(proposalPhotos) ? (
                                proposalPhotos.map((item, idx) => (
                                  <a href={item} target="_blank">
                                    <img className="m-1" src={item} />
                                  </a>
                                ))
                              ) : (
                                <a href={proposalPhotos} target="_blank">
                                  <img src={proposalPhotos} />
                                </a>
                              )}
                            </td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="add-more-info ">
                <a
                  className="btn btn-secondary hover-pointer"
                  onClick={() => navigate('/user/update-matrimonial-profile')}
                >
                  Add Matrimonial Info
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrimonialInfo;
