import React from 'react';

const JobInfo = () => {
  return (
    <div id="job-section" className="content-wrapper pt-4 mb-4">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <h5 className="fw-3 mb-3">Job Info</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="card shadow">
                  <div className="card-body">
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <td>Company Name</td>
                          <td className="text-muted">NetParam</td>
                        </tr>
                        <tr>
                          <td>Designation</td>
                          <td className="text-muted">Software Developer</td>
                        </tr>
                        <tr>
                          <td>Job Start Date</td>
                          <td className="text-muted">Jan, 2021</td>
                        </tr>
                        <tr>
                          <td>Job End Date</td>
                          <td className="text-muted">Jan, 2022</td>
                        </tr>
                        <tr>
                          <td>Active Company</td>
                          <td className="text-muted">No</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card shadow">
                  <div className="card-body">
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <td>Company Name</td>
                          <td className="text-muted">NetParam</td>
                        </tr>
                        <tr>
                          <td>Designation</td>
                          <td className="text-muted">Software Developer</td>
                        </tr>
                        <tr>
                          <td>Job Start Date</td>
                          <td className="text-muted">Jan, 2021</td>
                        </tr>
                        <tr>
                          <td>Job End Date</td>
                          <td className="text-muted">Jan, 2022</td>
                        </tr>
                        <tr>
                          <td>Active Company</td>
                          <td className="text-muted">No</td>
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

export default JobInfo;
