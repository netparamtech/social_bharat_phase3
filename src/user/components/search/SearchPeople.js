import React from 'react';

const SearchPeople = () => {
    return (
        <div id="searchPeople-section" className="content-wrapper pt-4 mb-4">
            <div className="container">
                <div className="card shadow">
                    <div className="card-body">
                        <div>
                            <h5 className="fw-3 mb-3 d-none d-sm-block">Search People</h5>
                        </div>
                        <div className="filter-content">
                            <p>Rajasthan, Jaipur</p>
                        </div>
                        <div className="filter-icon">
                            <a href="#" title="Filter" className="btn btn-primary btn-sm me-2">
                                <i className="fas fa-filter me-1"></i>Filter
                            </a>
                        </div>
                        <div className="container-input mb-3">
                            <input type="text" placeholder="Search" name="text" className="input form-control" />
                            <i className="fas fa-search"></i>
                        </div>
                        <div className="row">
                            <div className="col-5 mb-3">
                                <select name="state" id="state" className="form-control form-select">
                                    <option value="">State</option>
                                    {/* Add state options here */}
                                </select>
                            </div>
                            <div className="col-5 mb-3">
                                <select id="city" name="city" className="form-control form-select">
                                    <option value="">City</option>
                                    {/* Add city options here */}
                                </select>
                            </div>
                            <div className="col-2 mb-3">
                                <a href="#" className="btn btn-set btn-primary">Go</a>
                            </div>
                        </div>
                        <div className="row">
                            {/* User Cards */}
                            <div className="col-md-4">
                                <div className="card shadow mb-2">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="avatar"></div>
                                                {/* <img src="images/matrimonial-1.jpg" alt="Avatar" className="avatar img-fluid img-circle " /> */}
                                            </div>
                                            <div className="col-8 user-detail">
                                                <p>Name</p>
                                                <p>Designation</p>
                                                <p className="text-muted">City</p>
                                                <p className="text-muted">D.O.B</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Repeat the user card structure as needed */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPeople;
