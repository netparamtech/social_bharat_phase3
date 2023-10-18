import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  fetchCommunityWithId,
  updateCommunity,
  uploadImage,
} from "../../services/AdminService";

const CommunityUpdateForm = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [status, setStatus] = useState("");

  const [thumbnailImageTempUrl, setThumbnailImageTempUrl] = useState("");
  const [bannerImageTempUrl, setBannerImageTempUrl] = useState("");
  const [communityArchive,setCommunityArchive] = useState('');

  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const navigate = useNavigate();

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
      // Internal Server error
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
      //internal server error
      else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const communityData = {
        name,
        status,
        thumbnail_image: thumbnailImageTempUrl,
        banner_image: (bannerImageTempUrl === null) ? "" : bannerImageTempUrl,
        community_archive:communityArchive,
      };
      const response = await updateCommunity(id, communityData);

      if (response && response.status === 200) {
        setErrors("");
        setMessage(response.data.message);
        setAlertClass("alert-success");
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

  const fetchCommunities = async () => {
    try {
      const response = await fetchCommunityWithId(id);
      if (response && response.status === 200) {
        const communityData = response.data.data[0]; // Assuming the fetched data is in the format { name, thumbnail_image, banner_image, status }
        setName(communityData.name);
        setThumbnailImageTempUrl(communityData.thumbnail_image);
        setBannerImageTempUrl(communityData.banner_image);
        setStatus(communityData.status);

        setThumbnailPreview(communityData.thumbnail_image);
        setBannerPreview(communityData.banner_image);
        setCommunityArchive(communityData.community_archive);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Update Community</h1>
        <a
          href=""
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/communities');
          }}
        >
          View All Communities
        </a>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="p-2 ">
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
              <div className="col-md-6 col-sm-12 ">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter community name"
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
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

              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div className="col-sm-10">
                    <div className="form-group">
                      <label htmlFor="thumbnailImage">Thumbnail Image</label>
                      <div className="input-group ">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="thumbnailImage"
                            onInput={handleThumbnailImageChange}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile01"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>

                      {errors.thumbnail_image && (
                        <span className="error">{errors.thumbnail_image}</span>
                      )}
                    </div>
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

                <div className="row">
                  <div className="col-sm-10">
                    <div className="form-group">
                      <label htmlFor="bannerImage">Banner Image</label>
                      <div className="input-group ">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="bannerImage"
                            onChange={handleBannerImageChange}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile01"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>

                      {errors.banner_image && (
                        <span className="error">{errors.banner_image}</span>
                      )}
                    </div>
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
              </div>
              <div className="row ps-3 mb-3">
                <div className="col-md-12">
                  <label className="fw-bold">Community Archieve</label>
                </div>
                <div className="col-md-12">
                  <textarea
                    id="summernote-1"
                    name="editordata"
                    className="form-control"
                    onChange={(e)=>setCommunityArchive(e.target.value)}
                    defaultValue={communityArchive}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityUpdateForm;
