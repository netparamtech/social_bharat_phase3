import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const SiteSetting = () => {
  const navigate = useNavigate();
  const { Panel } = Collapse;

  return (
    <>
      <div id="setting-url-page">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Site Setting</h1>
        </div>
        <div className="container">
          <div className="card mb-5">
            <div className="row">
              <div className="col-md-12">
                <div className="row ps-3 pe-3 pt-2">
                  <div className="col-md-12">
                    <label className="fw-bold">Instagram URL</label>
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="text"
                      placeholder="Instagram Url"
                      className="form-control"
                    />
                  </div>
                </div>
              
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="row ps-3 pe-3">
                  <div className="col-md-12">
                    <label className="fw-bold">YouTube URL</label>
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="text"
                      placeholder="Youtube Url"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="row ps-3 pe-3">
                  <div className="col-md-12">
                    <label className="fw-bold">Twitter URL</label>
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="check-box"
                      placeholder="Twitter Url"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="row ps-3 pe-3">
                  <div className="col-md-12">
                    <label className="fw-bold">Facebook URL</label>
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="check-box"
                      placeholder="Facebook Url"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="row ps-3 pe-3">
                  <div className="col-md-12">
                    <label className="fw-bold">Linkedin URL</label>
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="check-box"
                      placeholder="Linkedin Url"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="row ps-3 pe-3">
                  <div className="col-md-12">
                    <label className="fw-bold">Address</label>
                  </div>
                  <div className="col-md-12 form-group">
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3 ps-3 pe-3">
              <div className="col-md-6">
                <div className="row ">
                  <div className="col-md-3">
                    <label className="fw-bold">Phone no-1</label>
                  </div>
                  <div className="col-md-9">
                    <input type="number" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-3">
                    <label className="fw-bold">Phone no-2</label>
                  </div>
                  <div className="col-md-9">
                    <input type="number" className="form-control" />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-2 ps-3 pe-3">
              <div className="col-md-6">
                <div className="row ">
                  <div className="col-md-3">
                    <label className="fw-bold">Email- 1</label>
                  </div>
                  <div className="col-md-9">
                    <input type="number" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-3">
                    <label className="fw-bold">Email- 2</label>
                  </div>
                  <div className="col-md-9">
                    <input type="number" className="form-control" />
                  </div>
                </div>
              </div>
            </div>

            <div className="row ps-3 pe-3 mb-2">
            <div className="col-md-12">
              <div className="row">
                <div className="col-10">
                  <label className="fw-bold">Image</label>
                  <div className="mb-2">
                    <input type="file" className=" form-control" />
                  </div>
                </div>
                <div className="col-2">
                  <div className="form-group">
                    <img
                      className="img-fluid  pt-2"
                      src="/admin/img/1.jpg"
                      width="80px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

            <div className="row ps-3 pe-3 mb-2">
              <div className="col-12">
                <a className="btn  btn-primary w-100">Submit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteSetting;
