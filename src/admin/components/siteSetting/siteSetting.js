import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const SiteSetting = () => {
  const navigate = useNavigate();

  return (
    <>
      <div id="setting-url-page">
      <div ></div>
      <p className="ps-4 fs-5">Manage Pages URL</p>
        <div className="container">
          <div className="card mb-5">
            <div className="card-title p-3 bg-dark text-white fw-bold">
            Section-1 
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row ps-3 mb-3">
                  <div className="col-md-12">
                    <label className="fw-bold">Section Title</label>
                  </div>
                  <div className="col-md-12 ">
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row ps-3 mb-3 ">
                  <div className="col-md-12">
                    <label className="fw-bold">Description</label>
                  </div>
                  <div className="col-md-12">
                    <textarea className="form-control" rows="2" cols="50" />
                  </div>
                </div>
                <div className="row ps-3 mb-3">
                  <div className="col-md-12">
                    <label className="fw-bold">Action URL</label>
                  </div>
                  <div className="col-md-12 form-group">
                    <input type="check-box" className="form-control" />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card shawdo m-3">
                  <div className="card-body">
                    <div className="text-center">
                      <img className="img-fluid" src="/admin/img/1.jpg" width="200px" />
                      <p className="text-center m-2">
                      <a href="">Change Picture</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="card">
            <div className="card-title p-3 bg-dark text-white fw-bold">
            Section-2 
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row ps-3 mb-3">
                  <div className="col-md-12">
                    <label className="fw-bold">Section Title</label>
                  </div>
                  <div className="col-md-12 ">
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row ps-3 mb-3 ">
                  <div className="col-md-12">
                    <label className="fw-bold">Description</label>
                  </div>
                  <div className="col-md-12">
                    <textarea className="form-control" rows="3" cols="50" />
                  </div>
                </div>
                <div className="row ps-3 mb-3">
                  <div className="col-md-12">
                    <label className="fw-bold">Action URL</label>
                  </div>
                  <div className="col-md-12 form-group">
                    <input type="check-box" className="form-control" />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card shawdo m-3">
                  <div className="card-body">
                    <div className="text-center">
                      <img className="img-fluid" src="/admin/img/1.jpg" width="300px" />
                      <p className=" m-2">
                      <a href="">Change Picture</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="card mt-5">
            <div className="card-title p-3 bg-dark text-white fw-bold">
            Section-3 
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row ps-3 mb-3">
                  <div className="col-md-12">
                    <label className="fw-bold">Section Title</label>
                  </div>
                  <div className="col-md-12 ">
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row ps-3 mb-3 ">
                  <div className="col-md-12">
                    <label className="fw-bold">Description</label>
                  </div>
                  <div className="col-md-12">
                    <textarea className="form-control" rows="3" cols="50" />
                  </div>
                </div>
                <div className="row ps-3 mb-3">
                  <div className="col-md-12">
                    <label className="fw-bold">Action URL</label>
                  </div>
                  <div className="col-md-12 form-group">
                    <input type="check-box" className="form-control" />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card shawdo m-3">
                  <div className="card-body">
                    <div className=" text-center">
                      <img className="img-fluid" src="/admin/img/1.jpg" width="300px" />
                      <p className=" m-2">
                      <a href="">Change Picture</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default SiteSetting;
