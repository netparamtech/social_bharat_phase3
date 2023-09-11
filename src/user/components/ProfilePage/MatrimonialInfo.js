import { useEffect, useState } from "react";
import { deleteMatrimonial } from "../../services/userService";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userAction";

const MatrimonialInfo = (props) => {
  const { user } = props;
  const [matrimonialDetails, setMatrimonialDetails] = useState([]);

  const dispatch = useDispatch();
  const proposalPhotos =
    user &&
    user.data &&
    user.data.matrimonial[0] &&
    user.data.matrimonial[0].proposal_photos;
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
        dispatch(logout());
        window.location.href = '/login';
      } else if (error.response && error.response.status === 500) {
        dispatch(logout());
        window.location.href = '/login';
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
              <a href="/user/update-matrimonial-profile" title="Edit">
                <i className="fas fa-pencil-alt"></i>
              </a>
            </div>
          ) : (
            <div className="edit-icon add-more-detail">
              <a
                href="/user/update-matrimonial-profile"
                title="Add More Detail"
              >
                <i className="btn btn-outline-info fas fa-plus"></i>
              </a>
            </div>
          )}
          {matrimonialDetails && matrimonialDetails.length > 0 ? (
            <div className="delete-icon">
              <a href="#" title="Delete">
                <i
                  className="fa-solid fa-trash"
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
                                user.data.matrimonial[0].father_name}
                            </td>
                          </tr>
                          <tr>
                            <td>Mother Name</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].mother_name}
                            </td>
                          </tr>
                          <tr>
                            <td>Skin Tone</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].skin_tone}
                            </td>
                          </tr>
                          <tr>
                            <td>Height</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].height_in_feet}
                            </td>
                          </tr>
                          <tr>
                            <td>Weight</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].weight_in_kg}
                            </td>
                          </tr>
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
                            <td>Gotra</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].gotra}
                            </td>
                          </tr>
                          <tr>
                            <td>Paternal Self</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].paternal_gotra}
                            </td>
                          </tr>
                          <tr>
                            <td>Maternal Gotra</td>
                            <td className="text-muted">
                              {user &&
                                user.data &&
                                user.data.matrimonial[0] &&
                                user.data.matrimonial[0].maternal_gotra}
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
                  href="/user/update-matrimonial-profile"
                  className="btn btn-secondary"
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
