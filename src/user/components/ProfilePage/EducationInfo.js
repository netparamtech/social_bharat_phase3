import React, { useEffect, useState } from 'react';

const EducationInfo = (props) => {
  const {user} = props;
  const [educationDetails, setEducationDetails] = useState([]);

  useEffect(() => {
    if (user && user.education) {
      setEducationDetails(user.education);
    }
  }, [user]);

  return (
    <div className="card mt-4">
      <div className="card-body tab-content border-0 bg-white-smoke">
        <div className="tab-pane active" id="educationInfo">
          <h1 className="d-inline-flex">Education Info</h1>
          <a href="/update-education-profile" className="float-end" title="Edit Education">
            <i className="fa-solid fa-user-pen mt-3 fs-5"></i>
          </a>
          <div className="table-responsive-sm" style={{ overflowX: 'auto' }}>
            <table className="table table-striped">
              <thead>
                <tr className="fw-bold">
                  <th scope="col">No.</th>
                  <th>Degree</th>
                  <th>Study Field</th>
                  <th>University/Institution</th>
                  <th>Score</th>
                  <th>Score Type</th>
                  <th>Passing Year</th>
                </tr>
              </thead>
              <tbody>
              {educationDetails && educationDetails.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.degree}</td>
                  <td>{item.field_of_study}</td>
                  <td>{item.institution_name}</td>
                  <td>{item.score}</td>
                  <td>{item.score_type}</td>
                  <td>{item.passing_year}</td>
                </tr>

              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationInfo;
