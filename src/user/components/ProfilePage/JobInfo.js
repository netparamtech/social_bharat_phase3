import React from 'react';

const JobInfo = () => {
  return (
    <div className="card mt-4 mb-5">
      <div className="card-body tab-content border-0 bg-white-smoke">
        <div className="tab-pane active" id="jobInfo">
          <h1 className="d-inline-flex">Job Info</h1>
          <a href="update-job-profile" className="float-end" title="Edit Job">
            <i className="ms-5 fa-solid fa-user-pen mt-3 fs-5"></i>
          </a>
          <div className="table-responsive-sm" style={{ overflowX: 'auto' }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Company Name</th>
                  <th scope="col">Designation</th>
                  <th scope="col">Job Start Date</th>
                  <th scope="col">Job End Date</th>
                  <th scope="col">Active Company</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>NetParam</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
                {/* Add more job rows here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobInfo;
