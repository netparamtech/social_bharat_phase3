import React, { useState, useRef } from 'react';

const CreateCommunityForm = () => {
  const [name, setName] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [status, setStatus] = useState('');

  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');

  const thumbnailImageRef = useRef(null);
  const bannerImageRef = useRef(null);

  const handleThumbnailImageChange = (e) => {
    setThumbnailImage(e.target.files[0]);
  };

  const handleBannerImageChange = (e) => {
    setBannerImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(name,thumbnailImage,bannerImage,status)

    const formData = new FormData();
    formData.append('name', name);
    formData.append('thumbnail_image', thumbnailImage);
    formData.append('banner_image', bannerImage);
    formData.append('status', status);
  };

  return (
    <div className="container-fluid" style={{ minHeight: '100vh' }}>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Create Community</h1>
        <a href="index" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          See All Communities
        </a>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {message && (
              <div className={`alert ${alertClass}`}>
                {alertClass === 'alert-success' ? (
                  <i className="fas fa-check-circle"></i>
                ) : (
                  <i className="fas fa-exclamation-triangle"></i>
                )}
                {' ' + message}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter community name"
              />
              {errors.name && <span className="validation-error">{errors.name}</span>}
            </div>

            <div className="form-group mt-5">
              <label htmlFor="thumbnailImage">Thumbnail Image</label>
              <input
                type="file"
                className="form-control-file"
                id="thumbnailImage"
                ref={thumbnailImageRef}
                onChange={handleThumbnailImageChange}
              />
              {errors.thumbnail_image && (
                <span className="validation-error">{errors.thumbnail_image}</span>
              )}
            </div>

            <div className="form-group mt-5">
              <label htmlFor="bannerImage">Banner Image</label>
              <input
                type="file"
                className="form-control-file"
                id="bannerImage"
                ref={bannerImageRef}
                onChange={handleBannerImageChange}
              />
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
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunityForm;
