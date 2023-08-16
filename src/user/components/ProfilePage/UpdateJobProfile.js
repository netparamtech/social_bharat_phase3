import React from 'react';

const UpdateJobProfile = () => {
    return (
        <div className="card mt-4 mb-5">
            <div className="card-body tab-content border-0 bg-white-smoke">
                <div className="tab-pane active" id="jobInfo">
                    <form className="repeater">
                        <h1 className="d-inline-flex">Job Info</h1>
                        <i
                            data-repeater-create
                            className="mt-3 float-end fa-solid fa-user-plus fs-5"
                        ></i>

                        <div className="table-responsive">
                            <table
                                data-repeater-list="tasks"
                                className="table table-striped"
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">Company Name</th>
                                        <th scope="col">Designation</th>
                                        <th scope="col">Job Start</th>
                                        <th scope="col">Job End</th>
                                        <th scope="col">Active Company</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr data-repeater-item scope="row">
                                        <td>
                                            <input
                                                type="text"
                                                id="monthInput"
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="month"
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="month"
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <select className="form-select me-4">
                                                <option>NO</option>
                                                <option>Yes</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-green-lg"
                                                data-repeater-delete
                                            >
                                                <i
                                                    className="fa-solid fa-trash"
                                                    style={{ color: 'red' }}
                                                ></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-2">
                            <a href="#" className="btn btn-green w-25 mt-2">
                                Update
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateJobProfile;
