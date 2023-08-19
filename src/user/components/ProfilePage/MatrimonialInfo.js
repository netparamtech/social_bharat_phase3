import React from 'react';

const MatrimonialInfo = () => {
  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 p-5">
                <div className="card-title">
                  <h3 className="mb-3">Matrimonial Info</h3>
                </div>
                <form action="" className="w-100 w-lg-75">
                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Father Name</label>
                      <input type="text" name="fatherName" id="fatherName" placeholder="Enter Father Name" className="form-control" />
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Mother Name</label>
                      <input type="text" name="motherName" id="motherName" placeholder="Enter Mother Name" className="form-control" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Skin Tone</label>
                      <select className="form-select form-control" aria-label="Default select example">
                        <option selected>---Select Skin---</option>
                        <option value="1">Fair</option>
                        <option value="2">Dark</option>
                        <option value="3">Wheatish</option>
                      </select>
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Height</label>
                      <div className="d-flex">
                        <div>
                          <label htmlFor="feet" className="col-lg-6 col-sm-12 col-xs-12 text-secondary">Feet:</label>
                          <input type="range" name="feet" id="feet" min="1" max="15" />
                        </div>
                        <div>
                          <label htmlFor="inch" className="col-lg-6 col-sm-12 col-xs-12 text-secondary">Inch:</label>
                          <input type="range" name="inch" id="inch" min="1" max="12" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Weight</label>
                      <input type="number" name="weight" id="weight" placeholder="Enter Weight" className="form-control" />
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Cast</label>
                      <input type="text" name="cast" id="cast" placeholder="Enter Cast" className="form-control" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Gotra </label>
                      <input type="text" name="gotra" id="gotra" placeholder="Enter Gotra" className="form-control" />
                    </div>
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Paternal Gotra</label>
                      <input type="text" name="paternal" id="paternal" placeholder="Enter Paternal Gotra" className="form-control" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Maternal Gotra</label>
                      <input type="text" name="maternal" id="maternal" placeholder="Enter Maternal Gotra" className="form-control" />
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Proposal Photo </label>
                      <input type="file" className="form-control" multiple accept=".png, .jpg, .jpeg" id="proposalPhoto" value="" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Biodata </label>
                      <input type="file" className="form-control" accept=".pdf, .doc, .docx, .xml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" id="biodata" value="" />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-lg-6 col-sm-12 col-xs-12">
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

export default MatrimonialInfo;
