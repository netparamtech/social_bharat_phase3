import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { createCommunity, uploadImage } from "../../services/AdminService";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';


const CreateCommunityForm = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [thumbnailImageTempUrl, setThumbnailImageTempUrl] = useState("");
  const [bannerImageTempUrl, setBannerImageTempUrl] = useState("");
  const [communityArchive, setCommunityArchive] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");

  const thumbnailImageRef = useRef(null);
  const bannerImageRef = useRef(null);

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const navigate = useNavigate();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);
    setCommunityArchive(htmlContent);
  };


  const handleThumbnailImageChange = async (e) => {
    //setThumbnailImage(e.target.files[0]);
    const selectedFile = e.target.files[0];
    setThumbnailPreview(URL.createObjectURL(selectedFile));
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await uploadImage(formData);
      if (response && response.status === 200) {
        setThumbnailImageTempUrl(response.data.data.image);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }
      // Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/admin");
      }
      //handle internal server error
      else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    }
  };

  const handleBannerImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    setBannerPreview(URL.createObjectURL(selectedFile));
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await uploadImage(formData);
      if (response && response.status === 200) {
        setBannerImageTempUrl(response.data.data.image);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }
      // Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/admin");
      }
      //handle internal server error
      else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);
    try {
      const communityData = {
        name,
        status,
        thumbnail_image: thumbnailImageTempUrl,
        banner_image: bannerImageTempUrl,
        community_archive: '',
      };
      const response = await createCommunity(communityData);

      if (response && response.status === 200) {
        setErrors("");
        setMessage(response.data.message);
        setAlertClass("alert-success");
        setName("");
        setStatus("");

        // Reset file inputs
        thumbnailImageRef.current.value = null;
        bannerImageRef.current.value = null;

        setTimeout(() => {
          navigate('/admin/communities')
        }, 1000);
      }
      // Redirect to the admin dashboard or desired page
    } catch (error) {
      // Handle validation errors
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }
      // Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/admin");

      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    }
  };


  return (
    <div className="container-fluid" id="font-Resize">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Create Community</h1>
        <a
          href=""
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/communities')
          }}
        >
          View All Communities
        </a>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
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

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="fw-bold">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter community name"
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label className="fw-bold">Status</label>
                  <select
                    className="form-control"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Select status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {errors.status && (
                    <span className="error">{errors.status}</span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="fw-bold">Thumbnail Image</label>
                  <div className="input-group mb-3">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input community-images"
                        id="thumbnailImage"
                        ref={thumbnailImageRef}
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleThumbnailImageChange}
                      />
                      <label className="custom-file-label" htmlFor="inputGroupFile01">
                        Choose file
                      </label>
                    </div>
                    <div className="col-sm-2">
                    {thumbnailPreview && (
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail"
                        title="Thumbnail"
                        className="small-img-thumbnail"
                      />
                    )}
                  </div>
                  </div>

                  {errors.thumbnail_image && (
                    <span className="error">{errors.thumbnail_image}</span>
                  )}
                  
                </div>

                <div className="form-group">
                  <label htmlFor="bannerImage" className="fw-bold">Banner Image</label>
                  <div className="input-group mb-3">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input community-images"
                        id="bannerImage"
                        ref={bannerImageRef}
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleBannerImageChange}
                      />
                      <label className="custom-file-label" htmlFor="inputGroupFile01">
                        Choose file
                      </label>
                    </div>
                    <div className="col-sm-2">
                    {bannerPreview && (
                      <img
                        src={bannerPreview}
                        alt="Banner"
                        title="Banner"
                        className="small-img-thumbnail"
                      />
                    )}
                    </div>
                  </div>

                  {errors.banner_image && (
                    <span className="error">{errors.banner_image}</span>
                  )}
                   
                </div>
              </div>
              {/* <div className="row ps-3 mb-4">
                <div className="col-md-12">
                  <label className="fw-bold">Community Archieve</label>
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

              </div> */}
            </div>

            <button type="submit" className="btn btn-primary w-25 ">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunityForm