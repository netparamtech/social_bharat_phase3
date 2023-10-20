import { Collapse } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Cms = () => {

  const navigate = useNavigate();

  const { Panel } = Collapse;
  return (
    <>
      <div id="accordion ">
        <div className="card shadow mb-3" id="font-Resize">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0 ">
              <a
                className="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                What Social Bharat Do
              </a>
              <i className="fa fa-arrow-down my-2"></i>
            </h5>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="card-body">
              <div className="row">
                <form>
                  <div className="col-md-12">
                    <div className="row ps-3 mb-3">
                      <div className="col-md-12">
                        <label className="fw-bold">Section Title</label>
                      </div>

                      <div className="col-md-12">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row ps-3 mb-3">
                      <div className="col-md-12">
                        <label className="fw-bold">Section Content</label>
                      </div>
                      <div className="col-md-12">
                        <textarea
                          id="summernote"
                          name="editordata"
                          className="form-control"
                          rows="5"
                        />
                      </div>
                    </div>
                    <div className="row ps-3 mb-3">
                      <div className="col-md-12">
                        <label className="fw-bold">Section Image</label>
                      </div>
                      <div className="col-md-12 form-group">
                        <input
                          type="file"
                          className="form-control"
                          accept=".png, .jpg, .jpeg"
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <div className="col-md-12">
                  <div className="card shawdo m-3">
                    <div className="card-body">
                      <div className="text-center">
                        <img
                          className="img-fluid"
                          src="/admin/img/1.jpg"
                          width="200px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3 shadow">
          <div className="card-header" id="headingTwo">
            <h5 className="mb-0">
              <a
                className="btn btn-link collapsed "
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Services
              </a>
              <i className="fa fa-arrow-down my-2"></i>
            </h5>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordion"
          >
            <div className="card-body">
              <div className="row">
                <form>
                  <div className="col-12">
                    <div className="row ps-3 mb-3">
                      <div className="col-md-12">
                        <label className="fw-bold">Section Title</label>
                      </div>
                      <div className="col-md-12">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row ps-3 mb-3">
                      <div className="col-md-12">
                        <label className="fw-bold">Section Content</label>
                      </div>
                      <div className="col-md-12">
                        <textarea
                          id="summernote-1"
                          name="editordata"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row ps-3 mb-3">
                      <div className="col-md-12">
                        <label className="fw-bold">Section Image</label>
                      </div>
                      <div className="col-md-12 form-group">
                        <input
                          type="file"
                          className="form-control"
                          accept=".png, .jpg, .jpeg"
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                </form>

                <div className="col-md-12">
                  <div className="card shawdo m-3">
                    <div className="card-body">
                      <div className="text-center">
                        <img
                          className="img-fluid"
                          src="/admin/img/1.jpg"
                          width="200px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Collapse idaccordion >
        <Panel
          header=" What Social Bharat Do"
          className=""
        >
        <div className="">
              <div className="row">
                <form>
                  <div className="col-md-12">
                    <div className="row ps-3 mb-3">
                      <div className="col-md-12">
                        <label className="fw-bold">Section Title</label>
                      </div>

                      <div className="col-md-12">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row ps-3 mb-3">
                      <div className="col-md-12">
                        <label className="fw-bold">Section Content</label>
                      </div>
                      <div className="col-md-12">
                        <textarea
                          id="summernote-2"
                          name="editordata"
                          className="form-control"
                          rows="5"
                        />
                      </div>
                    </div>
                    <div className="row ps-3 mb-3">
                      <div className="col-md-12">
                        <label className="fw-bold">Section Image</label>
                      </div>
                      <div className="col-md-12 form-group">
                        <input
                          type="file"
                          className="form-control"
                          accept=".png, .jpg, .jpeg"
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <div className="col-md-12">
                  <div className="card shawdo m-3">
                    <div className="card-body">
                      <div className="text-center">
                        <img
                          className="img-fluid"
                          src="/admin/img/1.jpg"
                          width="200px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Panel>
        
      </Collapse>
    </>
  );
};

export default Cms;