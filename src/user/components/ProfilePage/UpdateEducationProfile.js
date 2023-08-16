import React from 'react';

const UpdateEducationProfile = () => {
  return (
    <div className="card">
      <div className="card-body tab-content border-0 bg-white-smoke">
        <div className="tab-pane active" id="educationInfo">
          <form action="#" className="repeater">
            <h1 className="d-inline-flex">Education Info</h1>
            <i
              data-repeater-create
              className="mt-3 float-end fa-solid fa-user-plus fs-5"
            ></i>

            <div className="table-responsive">
              <table className="table table-striped" data-repeater-list="tasks">
                <thead>
                  <tr className="text-center">
                    <th>Degree</th>
                    <th>College</th>
                    <th>University</th>
                    <th>Grade</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr data-repeater-item>
                    <td><input type="text" className="form-control" /></td>
                    <td><input type="text" className="form-control" /></td>
                    <td><input type="text" className="form-control" /></td>
                    <td><input type="number" className="form-control" /></td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-green-lg"
                        data-repeater-delete
                      >
                        <i
                          className="fa-solid fa-trash"
                          style={{ color: '#ff0000' }}
                        ></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <a href="#" className="btn btn-green w-25 mt-3">Update</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEducationProfile;
