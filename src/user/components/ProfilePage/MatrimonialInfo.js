import React from 'react';

const MatrimonialInfo = (props) => {
  const {user} = props;
  return (
    <div id="matrimonial-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="card shadow">
        <div class="edit-icon"><a href="/update-matrimonial-profile" title="Edit"><i className="fas fa-pencil-alt"></i></a></div>
          <div className="card-body">
            <h5 className="fw-3 mb-3">Matrimonial Info</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="card shadow">
                  <div className="card-body">
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <td>Father Name</td>
                          <td className="text-muted">{user&&user.data&&user.data.matrimonial[0]&&user.data.matrimonial[0].father_name}</td>
                        </tr>
                        <tr>
                          <td>Mother Name</td>
                          <td className="text-muted">{user&&user.data&&user.data.matrimonial[0]&&user.data.matrimonial[0].mother_name}</td>
                        </tr>
                        <tr>
                          <td>Skin Tone</td>
                          <td className="text-muted">{user&&user.data&&user.data.matrimonial[0]&&user.data.matrimonial[0].skin_tone}</td>
                        </tr>
                        <tr>
                          <td>Height</td>
                          <td className="text-muted">{user&&user.data&&user.data.matrimonial[0]&&user.data.matrimonial[0].height_in_feet}</td>
                        </tr>
                        <tr>
                          <td>Weight</td>
                          <td className="text-muted">{user&&user.data&&user.data.matrimonial[0]&&user.data.matrimonial[0].weight_in_kg}</td>
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
                          <td className="text-muted">{user&&user.data&&user.data.matrimonial[0]&&user.data.matrimonial[0].gotra}</td>
                        </tr>
                        <tr>
                          <td>Paternal Self</td>
                          <td className="text-muted">{user&&user.data&&user.data.matrimonial[0]&&user.data.matrimonial[0].paternal_gotra}</td>
                        </tr>
                        <tr>
                          <td>Maternal Gotra</td>
                          <td className="text-muted">{user&&user.data&&user.data.matrimonial[0]&&user.data.matrimonial[0].maternal_gotra}</td>
                        </tr>
                        <tr>
                          <td>Biodata</td>
                          <td className="text-muted">
                            <i className="fa-regular fa-file-lines"></i> {user&&user.data&&user.data.matrimonial[0]&&user.data.matrimonial[0].biodata}
                          </td>
                        </tr>
                        <tr>
                          <td>Proposal Photo</td>
                          <td className="proposal-Photo">
                            <img src={user&&user.data&&user.data.matrimonial[0]&&user.data.matrimonial[0].proposal_photo} alt=""
                             title={user&&user.data&&user.data.name} />
                            <img src="images/logo.png" alt="" title="" />
                            <img src="images/logo.png" alt="" title="" />
                            <img src="images/logo.png" alt="" title="" />
                            <img src="images/logo.png" alt="" title="" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrimonialInfo;
