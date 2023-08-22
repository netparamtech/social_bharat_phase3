import React from 'react';

const JobInfo = (props) => {
  const {user} = props;
  const jobDetails = user && user.data && user.data.jobs;

  return (
    <div id="job-section" className="content-wrapper pt-4 mb-4">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <h5 className="fw-3 mb-3">Job Info</h5>
            <div className="row">
            {jobDetails && jobDetails.map((item, idx) => (
              <div className="col-md-6">
                <div className="card shadow">
                <div className="edit-icon"><a href="/update-job-profile" title="Edit"><i className="fas fa-pencil-alt"></i></a></div>
                  <div className="card-body">
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <td>Company Name</td>
                          <td className="text-muted">{item.company_name}</td>
                        </tr>
                        <tr>
                          <td>Designation</td>
                          <td className="text-muted">{item.designation}</td>
                        </tr>
                        <tr>
                          <td>Job Start Date</td>
                          <td className="text-muted">{item.job_start_date}</td>
                        </tr>
                        <tr>
                          <td>Job End Date</td>
                          <td className="text-muted">{item.job_end_date}</td>
                        </tr>
                        <tr>
                          <td>Job Type</td>
                          <td className="text-muted">{item.job_type}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobInfo;
