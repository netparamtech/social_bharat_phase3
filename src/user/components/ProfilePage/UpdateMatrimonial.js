import React from 'react';

const UpdateMatrimonial = () => {
  return (
    <div className="col-lg-9 col-md-8 mt-4">
      {/* Matrimonial Info */}
      <div className="card">
        <div className="card-body tab-content border-0 bg-white-smoke">
          <div className="tab-pane active" id="matrimonialInfo">
            <form action="#">
              <h1 className="d-inline-flex">Matrimonial Info</h1>

              <div className="row">
                <label htmlFor="fatherName" className="col-sm-3 col-form-label">Father Name</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control w-75 mb-2" id="fatherName" value="" placeholder="Enter Father Name" />
                </div>
              </div>
              <div className="row">
                <label htmlFor="motherName" className="col-sm-3 col-form-label">Mother Name</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control w-75 mb-2" id="motherName" value="" placeholder="Enter Mother Name" />
                </div>
              </div>
              <div className="row">
                <label htmlFor="skinTone" className="col-sm-3 col-form-label">Skin Tone</label>
                <div className="col-sm-7">
                  <select className="form-control w-75 mb-2">
                    <option>---Select---</option>
                    <option>Fair</option>
                    <option>Dark</option>
                    <option>Wheatish</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <label htmlFor="height" className="col-sm-3 col-form-label">Height</label>
                <div className="col-sm-7 d-flex">
                  <select className="form-control w-25 mb-2 me-1">
                    <option>Feet</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>

                  </select>
                  <select className="form-control w-25 mb-2">
                    <option>Inch</option>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>

                  </select>
                </div>
              </div>
              <div className="row">
                <label htmlFor="weight" className="col-sm-3 col-form-label">Weight</label>
                <div className="col-sm-7">
                  <input type="number" className="form-control w-75 mb-2" id="weight" value="" placeholder="Enter Weight" />
                </div>
              </div>
              <div className="row">
                <label htmlFor="cast" className="col-sm-3 col-form-label">Cast</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control w-75 mb-2" id="cast" value="" placeholder="Enter Cast" />
                </div>
              </div>
              <div className="row">
                <label htmlFor="gotraSelf" className="col-sm-3 col-form-label">Gotra Self</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control w-75 mb-2" id="gotraSelf" value="" placeholder="Enter Gotra Self" />
                </div>
              </div>
              <div className="row">
                <label htmlFor="maternalGotra" className="col-sm-3 col-form-label">Maternal Gotra</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control w-75 mb-2" id="maternalGotra" value="" placeholder="Enter Maternal Gotra" />
                </div>
              </div>
              <div className="row">
                <label htmlFor="proposalPhoto" className="col-sm-3 col-form-label">Proposal Photo</label>
                <div className="col-sm-7">
                  <input type="file" className="form-control w-75 mb-2" multiple accept=".png, .jpg, .jpeg" id="proposalPhoto" />
                </div>
              </div>
              <div className="row">
                <label htmlFor="biodata" className="col-sm-3 col-form-label">Biodata</label>
                <div className="col-sm-7">
                  <input type="file" className="form-control w-75 mb-2" accept=".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" id="biodata" />
                </div>
              </div>

              <div>
                <a href="#" className="btn btn-green w-25 mt-2">Update</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMatrimonial;
