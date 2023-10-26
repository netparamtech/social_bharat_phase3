import { Collapse, Divider } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { updateCMS } from "../../services/AdminService";
import Select from "react-select";
import { data } from "jquery";

const Cms = () => {
  const [editorStates, setEditorStates] = useState([EditorState.createEmpty()]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [page, setPage] = useState("");
  const [about, setAbout] = useState({
    title: "",
    subtitle: "",
    sectionContent: "",
    images: [],
  });
  const [serviceTitle, setServiceTitle] = useState("");
  const [services, setServices] = useState({
    sectionTitle: "",
    items: [],
  });

  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");

  const [items, setItems] = useState([]);

  const [numRows, setNumRows] = useState(1);

  const iconOptions = [
    { value: "fas fa-star", label: "Star" },
    { value: "fas fa-heart", label: "Heart" },
    { value: "fas fa-thumbs-up", label: "Thumbs Up" },
    { value: "fa-solid fa-handshake-simple", label: "Handshake" },
    { value: "fa-solid fa-ring", label: "Ring" },
    { value: "fa-sharp fa-solid fa-briefcase fa-2xl", label: "Briefcase" },
    { value: "fa-solid fa-list", label: "List" },

    // Add more icons as needed
  ];

  const handleAboutChange = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };

  const addRow = () => {
    setNumRows(numRows + 1);
    setEditorStates([...editorStates, EditorState.createEmpty()]);
  };

  const navigate = useNavigate();

  const onEditorStateChanges = (editorState, index) => {
    const updatedEditorStates = [...editorStates];
    updatedEditorStates[index] = editorState;
    setEditorStates(updatedEditorStates);
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const updateRowData = (index, key, value) => {
    const updatedRowData = [...items];
    if (!updatedRowData[index]) {
      updatedRowData[index] = {};
    }
    updatedRowData[index][key] = value;
    setItems(updatedRowData);
  };

  const htmlFormet = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);
    return htmlContent;
  };

  const handleSubmit = async () => {
    try {
      const itemsWithEditorState = items.map((row, index) => ({
        ...row,
        content: htmlFormet(editorStates[index]), // Include the editor state in the item
      }));

      about.sectionContent = htmlFormet(editorState);
      services.sectionTitle = serviceTitle;
      services.items = itemsWithEditorState;

      const data = {
        page: "Home",
        about,
        services,
      };
      const response = await updateCMS(data);
      if (response && response.status === 200) {
        setErrors("");
        setMessage(response.data.message);
        setAlertClass("alert-success");
        window.scrollTo(0, 0);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
      console.log(itemsWithEditorState, about); // Print the data including editor state to the console
    } catch (error) {
      // Handle validation errors
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setMessage("");
        setAlertClass("");
      }
      // Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate("/server/error", { state: { errorMessage } });
      }
    }
  };
  const { Panel } = Collapse;

  return (
    <>
      {message && (
        <div className={`alert ${alertClass}`}>
          {alertClass === "alert-success" ? (
            <i className="fas fa-check-circle"></i>
          ) : (
            <i className="fas fa-exclamation-triangle"></i>
          )}
          {" " + message}
        </div>
      )}
      <Collapse idaccordion className="mb-3">
        <Panel
          header={<label className="text-primary">What Social Bharat Do</label>}
        >
          <div className="row">
            <form>
              <div className="col-md-12">
                <div className="row ps-3 mb-3">
                  <div className="col-md-12">
                    <label className="fw-bold">Title</label>
                  </div>

                  <div className="col-md-12">
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      onChange={handleAboutChange}
                    />
                  </div>
                </div>
                <div className="row ps-3 mb-3">
                  <div className="col-md-12">
                    <label className="fw-bold">Sub Title</label>
                  </div>

                  <div className="col-md-12">
                    <input
                      type="text"
                      name="subtitle"
                      className="form-control"
                      onChange={handleAboutChange}
                    />
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
              <div className="ps-4">
                <button
                  type="button"
                  className="btn btn-primary w-25"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </Panel>
      </Collapse>

      <Collapse idaccordion className="mb-3">
        <Panel header={<label className="text-primary">Service</label>}>
          <div>
            <div className="row ps-4 mb-3">
              <div className="col-md-10">
                <label className="fw-bold">Section Title</label>
              </div>
              <div className="col-md-2 mb-2">
                <button type="button" className="btn btn-outline-primary" title="Add More " onClick={addRow}>
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setServiceTitle(e.target.value)}
                />
              </div>
            </div>

            {Array.from({ length: numRows }, (_, index) => (
              <div className="row" key={index}>
                <form>
                  <div className="col-md-12">
                    <div className="row ps-3 mb-3">
                      <div className="col-md-12">
                        <label className="fw-bold">Title</label>
                      </div>
                      <div className="col-md-12">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) =>
                            updateRowData(index, "title", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="row ps-3 mb-3">
                      <div className="col-md-12">
                        <label className="fw-bold">Section Content</label>
                      </div>
                      <div className="col-md-12">
                        <Editor
                          editorState={editorStates[index]}
                          onEditorStateChange={(editorState) =>
                            onEditorStateChanges(editorState, index)
                          }
                          wrapperClassName="wrapper-class"
                          editorClassName="editor-class custom-editor-height editor-border p-2"
                          toolbarClassName="toolbar-class toolbar-border"
                        />
                      </div>
                    </div>
                    <div className="row ps-3 mb-3">
                      <div className="col-md-12">
                        <label className="fw-bold">Section Icon</label>
                      </div>
                      <div className="col-md-12 form-group">
                        <Select
                          options={iconOptions}
                          onChange={(selectedOption) =>
                            updateRowData(index, "icon", selectedOption.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="ps-4">
                    <button
                      type="button"
                      className="btn btn-primary w-25"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                  <Divider />
                </form>
              </div>
            ))}
          </div>
        </Panel>
      </Collapse>
    </>
  );
};

export default Cms;
