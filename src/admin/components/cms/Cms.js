import { Collapse } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Cms = () => {

  const navigate = useNavigate();

  const { Panel } = Collapse;
  return (
    <>
      <div id="accordion">
        <div class="card shadow mb-3">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0 ">
              <a
                class="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                What Social Bharat Do
              </a>
              <i class="fa fa-arrow-down my-2"></i>
            </h5>
          </div>

          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div class="card-body">
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
        <div class="card mb-3 shadow">
          <div class="card-header" id="headingTwo">
            <h5 class="mb-0">
              <a
                class="btn btn-link collapsed "
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Services
              </a>
              <i class="fa fa-arrow-down my-2"></i>
            </h5>
          </div>
          <div
            id="collapseTwo"
            class="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordion"
          >
            <div class="card-body">
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
        <div class="">
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
                          id="summernote-3"
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
