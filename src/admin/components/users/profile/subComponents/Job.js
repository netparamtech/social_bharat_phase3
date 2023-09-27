import React from 'react';

const Job = (props) => {
  const { userDetails } = props;
  const jobDetails = userDetails?.data?.jobs;

  
  return (
    <div id="job-section" className="content-wrapper pt-4 mb-4">
      <div className="container">
        <div className="">
          <div className="">
            <div className="row">
              {jobDetails && jobDetails.length > 0 ? (
                jobDetails.map((item, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="card shadow">
                      <div className="card-body">
                        <table className="table table-striped">
                          <tbody>
                            <tr>
                              <td>Company Name</td>
                              <td className="text-muted">{item.company_name || 'NA'}</td>
                            </tr>
                            <tr>
                              <td>Designation</td>
                              <td className="text-muted">{item.designation || 'NA'}</td>
                            </tr>
                            <tr>
                              <td>Job Start Date</td>
                              <td className="text-muted">{item.job_start_date || 'NA'}</td>
                            </tr>
                            <tr>
                              <td>Job End Date</td>
                              <td className="text-muted">{item.job_end_date || 'NA'}</td>
                            </tr>
                            <tr>
                              <td>Job Type</td>
                              <td className="text-muted">{item.job_type || 'NA'}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-md-12">
                  <p className="text-muted">No job details available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
