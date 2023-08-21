import React from 'react';

const MatrimonialInfo = () => {
  return (
    <div id="matrimonial-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="card shadow">
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
                          <td className="text-muted">Budha</td>
                        </tr>
                        <tr>
                          <td>Mother Name</td>
                          <td className="text-muted">Janki Devi</td>
                        </tr>
                        <tr>
                          <td>Skin Tone</td>
                          <td className="text-muted">Wheatish</td>
                        </tr>
                        <tr>
                          <td>Height</td>
                          <td className="text-muted">5.6</td>
                        </tr>
                        <tr>
                          <td>Weight</td>
                          <td className="text-muted">64</td>
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
                          <td className="text-muted">Jalindra</td>
                        </tr>
                        <tr>
                          <td>Paternal Self</td>
                          <td className="text-muted">Jalindra</td>
                        </tr>
                        <tr>
                          <td>Maternal Gotra</td>
                          <td className="text-muted">Biwal</td>
                        </tr>
                        <tr>
                          <td>Biodata</td>
                          <td className="text-muted">
                            <i className="fa-regular fa-file-lines"></i> File
                          </td>
                        </tr>
                        <tr>
                          <td>Proposal Photo</td>
                          <td className="proposal-Photo">
                            <img src="images/signup.png" alt="" title="" />
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
