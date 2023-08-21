import React from 'react';

const EducationInfo = () => {
  return (
    <div id="education-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <h5 className="fw-3 mb-3">Education Info</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="card shadow">
                  <div className="card-body">
                    <div className="w-100 w-lg-75">
                      <div className="mb-2 row">
                        <label htmlFor="" className="col-sm-3 d-inline-flex">Degree</label>
                        <div className="col-sm-8"><span className="text-muted">M.Tech</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">Study Field</label>
                        <div className="col-sm-8"><span className="text-muted">Computer Science</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">University</label>
                        <div className="col-sm-8"><span className="text-muted">RU</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">Score</label>
                        <div className="col-sm-8"><span className="text-muted">9.0 GPA</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">Score Type</label>
                        <div className="col-sm-8"><span className="text-muted">Grade</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">Passing Year</label>
                        <div className="col-sm-8"><span className="text-muted">2021</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card shadow">
                  <div className="card-body">
                    <div className="w-100 w-lg-75">
                      <div className="mb-2 row">
                        <label htmlFor="" className="col-sm-3 d-inline-flex">Degree</label>
                        <div className="col-sm-8"><span className="text-muted">B.Sc</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">Study Field</label>
                        <div className="col-sm-8"><span className="text-muted">Mathematics</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">University</label>
                        <div className="col-sm-8"><span className="text-muted">ABC University</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">Score</label>
                        <div className="col-sm-8"><span className="text-muted">8.5 GPA</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">Score Type</label>
                        <div className="col-sm-8"><span className="text-muted">Grade</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">Passing Year</label>
                        <div className="col-sm-8"><span className="text-muted">2018</span></div>
                      </div>
                    </div>
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

export default EducationInfo;
