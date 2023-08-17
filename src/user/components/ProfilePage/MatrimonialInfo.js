import React from 'react';

const MatrimonialInfo = () => {
  return (
    <div className="card mt-4">
      <div className="card-body tab-content border-0 bg-white-smoke">
        <div className="tab-pane active" id="matrimonialInfo">
          <form action="#">
            <h1 className="d-inline-flex">Matrimonial Info</h1>
            <a href="/update-matrimonial-profile" className="float-end" title="Edit Matrimonial">
              <i className="fa-solid fa-user-pen mt-3 fs-5"></i>
            </a>
            <div className="row">
              <label htmlFor="fatherName" className="col-sm-3 col-form-label"> Father Name </label>
              <div className="col-sm-7">
                <input type="text" readOnly className="form-control-plaintext" id="fatherName" value="" placeholder="NaN" />
              </div>
            </div>

            <div className="row">
              <label htmlFor="motherName" className="col-sm-3 col-form-label"> Mother Name </label>
              <div className="col-sm-7">
                <input type="text" readOnly className="form-control-plaintext" id="motherName" value="" placeholder="NaN" />
              </div>
            </div>

            <div className="row">
              <label htmlFor="skinTone" className="col-sm-3 col-form-label"> Skin Tone </label>
              <div className="col-sm-7">
                <input type="text" readOnly className="form-control-plaintext" id="skinTone" value="" placeholder="NaN" />
              </div>
            </div>

            <div className="row">
              <label htmlFor="height" className="col-sm-3 col-form-label">Height (In Centimeter)</label>
              <div className="col-sm-7">
                <input type="number" readOnly className="form-control-plaintext" id="height" value="" placeholder="NaN" />
              </div>
            </div>

            <div className="row">
              <label htmlFor="weight" className="col-sm-3 col-form-label">Weight</label>
              <div className="col-sm-7">
                <input type="number" readOnly className="form-control-plaintext" id="weight" value="" placeholder="NaN" />
              </div>
            </div>

            <div className="row">
              <label htmlFor="cast" className="col-sm-3 col-form-label">Cast</label>
              <div className="col-sm-7">
                <input type="number" readOnly className="form-control-plaintext" id="cast" value="" placeholder="NaN" />
              </div>
            </div>

            <div className="row">
              <label className="col-sm-3 col-form-label">Gotra Self</label>
              <div className="col-sm-7">
                <input type="text" readOnly className="form-control-plaintext" id="gotraSelf" value="" placeholder="NaN" />
              </div>
            </div>

            <div className="row">
              <label htmlFor="maternalGotra" className="col-sm-3 col-form-label">Maternal Gotra</label>
              <div className="col-sm-7">
                <input type="text" readOnly className="form-control-plaintext" id="maternalGotra" value="" placeholder="NaN" />
              </div>
            </div>

            <div className="row">
              <label htmlFor="proposalPhoto" className="col-sm-3 col-form-label">Proposal Photo</label>
              <div className="col-sm-7">
                {/* Add your Proposal Photo content here */}
              </div>
            </div>

            <div className="row">
              <label htmlFor="biodata" className="col-sm-3 col-form-label">Biodata</label>
              <div className="col-sm-7">
                {/* Add your Biodata content here */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MatrimonialInfo;
