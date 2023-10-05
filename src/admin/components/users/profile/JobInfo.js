import React from 'react';

const JobInfo = (props) => {
  const { userDetails } = props;
  const jobDetails = userDetails?.data?.jobs;

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const [month, day, year] = new Date(dateString)
      .toLocaleDateString('en-GB', options)
      .split('/');
    return `${day}/${month}/${year}`;
  };


  return (
    <div id="job-section" className="content-wrapper pt-4 mb-4">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
          <h5 className="mb-3 fw-bold fs-5">Job Info</h5>
            <div className="row mb-3">
              {jobDetails && jobDetails.length > 0 ? (
                jobDetails.map((item, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="card shadow">
                      <div className="card-body">
                        <table className="table table-striped">
                          <tbody>
                            <tr>
                              <td className='fw-bold'>Company Name</td>
                              <td className="text-muted">{item.company_name || 'NA'}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Designation</td>
                              <td className="text-muted">{item.designation || 'NA'}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Job Start Date</td>
                              <td className="text-muted">{formatDate(item.job_start_date) || 'NA'}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Job End Date</td>
                              <td className="text-muted">{formatDate(item.job_end_date) || 'NA'}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Job Type</td>
                              <td className="text-muted">
                                {item.job_type === 'PART_TIME' ? 'PART TIME' : 'FULL TIME'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-md-12">
                  <p className="mb-3 fw fs-5">No job details available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobInfo;
