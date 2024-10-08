import React from "react";

const JobInfo = (props) => {
  const { userDetails } = props;
  const jobDetails = userDetails?.data?.jobs;

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const [month, day, year] = new Date(dateString)
      .toLocaleDateString("en-GB", options)
      .split("/");
    return `${day}/${month}/${year}`;
  };

  return (
    <div id="job-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <h5 className="mb-3 text-primary">Job Info</h5>
            <div className="row">
              {jobDetails && jobDetails.length > 0 ? (
                jobDetails.map((item, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="card shadow mb-2">
                      <div className="card-body">
                        <table className="table table-striped">
                          <tbody>
                            <tr>
                              <td className="fw-bold font-14">Company Name</td>
                              <td className="text-muted text-wrap-break-word">
                                {item.company_name || "NA"}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bold font-14">Designation</td>
                              <td className="text-muted text-wrap-break-word">
                                {item.designation || "NA"}
                              </td>
                            </tr>
                           
                            <tr>
                              <td className="fw-bold font-14">Job Type</td>
                              <td className="text-muted">
                                {item.job_type === "PART_TIME"
                                  ? "PART TIME"
                                  : "FULL TIME"}
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
                  <p className="mb-3 font-14">No job details available.</p>
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
