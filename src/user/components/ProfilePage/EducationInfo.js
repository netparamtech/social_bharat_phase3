import React from 'react';

const EducationInfo = () => {
  return (
    <div className="card mt-4">
      <div className="card-body tab-content border-0 bg-white-smoke">
        <div className="tab-pane active" id="educationInfo">
          <h1 className="d-inline-flex">Education Info</h1>
          <a href="profileUpdate/eductionalInfo.html" className="float-end" title="Edit Education">
            <i className="fa-solid fa-user-pen mt-3 fs-5"></i>
          </a>
          <div className="table-responsive-sm" style={{ overflowX: 'auto' }}>
            <table className="table table-striped">
              <thead>
                <tr className="fw-bold">
                  <th scope="col">No.</th>
                  <th>Degree</th>
                  <th>College</th>
                  <th>University</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>B.Tech</td>
                  <td>sadafsfsdfddgdsgdgsd</td>
                  <td>dwdafcddewf e e e</td>
                  <td>gffgff hf fff</td>
                </tr>
                {/* Add more education rows here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationInfo;
