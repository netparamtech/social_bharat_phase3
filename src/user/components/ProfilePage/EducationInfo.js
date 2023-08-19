import React from 'react';

const EducationInfo = () => {
  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 p-5">
                <div className="card-title">
                  <h3 className="mb-3 d-inline-flex">Education Info</h3>
                  <a href="#" title="Add More Details"> <i data-repeater-create className="mt-3 float-end fa-solid fa-user-plus fs-5"></i>
                  </a>
                </div>
                <form action="" className="w-100 w-lg-75">
                  <div className="card p-3">
                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Degree</label>
                        <input type="text" name="degree" id="degree" placeholder="Enter your degree name" className="form-control" />
                      </div>
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Study Field</label>
                        <input type="text" name="studyField" id="studyField" placeholder="Enter Study Field" className="form-control" />
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">University/Institution</label>
                        <input type="text" name="university" id="university" placeholder="Enter university name" className="form-control" />
                      </div>
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Score</label>
                        <input type="number" name="Score" id="Score" placeholder="Enter Score" className="form-control" />
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Score Type</label>
                        <input type="number" name="scoreType" id="scoreType" placeholder="Enter Score Type" className="form-control" />
                      </div>
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Passing Year</label>
                        <input type="month" name="year" id="year" placeholder="Enter Passing Year" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-lg-2 col-sm-12 col-xs-12">
                      <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationInfo;
