import React from 'react';

const UpdateBasicProfile = () => {
  return (
    <div className="card mt-4">
      <div className="card-body tab-content border-0 bg-white-smoke">
        {/* Basic Profile */}
        <div className="tab-pane active" id="basicProfile">
          <form action="#">
            <h1>Basic Profile</h1>
            <div className="row">
              <label htmlFor="name" className="col-sm-3 col-form-label">Full Name</label>
              <div className="col-sm-7">
                <input type="text" className="form-control w-75 mb-2" id="name" value="" placeholder="Enter Name" />
              </div>
            </div>
            <div className="row">
              <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-7">
                <input type="email" className="form-control w-75 mb-2" readOnly id="email" value="" placeholder="Enter Email" />
              </div>
            </div>
            <div className="row">
              <label htmlFor="mobile" className="col-sm-3 col-form-label">Mobile</label>
              <div className="col-sm-7">
                <input type="number" id="mobile" className="form-control w-75 mb-2" value="" placeholder="Enter Mobile No" />
              </div>
            </div>
            <div className="row mb-2">
              <label htmlFor="status" className="col-sm-3 col-form-label">Status</label>
              <div className="col-sm-7">
                <select className="form-select w-75" aria-label="Default select example">
                  <option>Active</option>
                  <option selected>Inactive</option>
                </select>
              </div>
            </div>
            <div className="row mb-2">
              <label htmlFor="gender" className="col-sm-3 col-form-label">Gender</label>
              <div className="col-sm-7">
                <select className="form-select w-75" aria-label="Default select example">
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
            <div className="row">
              <label htmlFor="place" className="col-sm-3 col-form-label">Native Place</label>
              <div className="col-sm-7">
                <input type="text" id="place" className="form-control w-75" value="" placeholder="Enter Place" />
              </div>
            </div>
            <div>
              <a href="#" className="btn btn-green w-25 mt-2">Update</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBasicProfile;
