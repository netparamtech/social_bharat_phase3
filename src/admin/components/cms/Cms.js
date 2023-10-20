import { Collapse } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";

const Cms = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const navigate = useNavigate();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const { Panel } = Collapse;
  return (
    <>
      <Collapse idaccordion className="mb-3">
        <Panel
          header={<label className="text-primary">What Social Bharat Do</label>}
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
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class custom-editor-height editor-border p-2"
                        toolbarClassName="toolbar-class toolbar-border"
                      />
                    </div>
                  </div>
                  <div className="row ps-3 mb-3">
                    <div className="col-md-12">
                      <label className="fw-bold">Section Image</label>
                    </div>
                    <div className="col-md-10 form-group">
                      <input
                        type="file"
                        className="form-control"
                        accept=".png, .jpg, .jpeg"
                        multiple
                      />
                    </div>
                    <div className="col-md-2">
                      <div className="text-center">
                        <img
                          className="img-fluid"
                          src="/admin/img/1.jpg"
                          width="80px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Panel>
      </Collapse>

      <Collapse idaccordion className="mb-3">
        <Panel
          header={<label className="text-primary">Service</label>}
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
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class custom-editor-height editor-border p-2"
                        toolbarClassName="toolbar-class toolbar-border"
                      />
                    </div>
                  </div>
                  <div className="row ps-3 mb-3">
                    <div className="col-md-12">
                      <label className="fw-bold">Section Image</label>
                    </div>
                    <div className="col-md-10 form-group">
                      <input
                        type="file"
                        className="form-control"
                        accept=".png, .jpg, .jpeg"
                        multiple
                      />
                    </div>
                    <div className="col-md-2">
                      <div className="text-center">
                        <img
                          className="img-fluid"
                          src="/admin/img/1.jpg"
                          width="80px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Panel>
      </Collapse>
    </>
  );
};

export default Cms;
