import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';

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

  const handleDropThumbnail = async (acceptedFiles) => {
    const thumbnailFile = acceptedFiles[0];
    setThumbnailImage(thumbnailFile);

    try {

    } catch (error) {
      // Handle fetch error
    }
  };

  const handleDropBanner = async (acceptedFiles) => {
    const bannerFile = acceptedFiles[0];
    setBannerImage(bannerFile);

    try {

    } catch (error) {
      // Handle fetch error
    }
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    if (thumbnailImage) {
      formData.append('thumbnail_image', thumbnailImage);
    }
    if (bannerImage) {
      formData.append('banner_image', bannerImage);
    }
    formData.append('status', status);

    // ... rest of your code for handling form submission

    // Display the form data content
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  };

  return (
    <div className="container-fluid" style={{ minHeight: '100vh' }}>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Create Community</h1>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="p-5 w-75">
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

            <div className="row form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control w-50 mx-auto"
                id="name"
                defaultValue=""
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter community name"
              />
              {errors.name && <span className="validation-error">{errors.name}</span>}
            </div>



            <div className="row form-group">
              <label htmlFor="status">Status</label>
              <select
                className="form-control w-50 mx-auto"
                id="status"
                defaultValue=""
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select status</option>
                <option value="Active" selected={status === 'Active' ? true : false}>
                  Active
                </option>
                <option value="Inactive" selected={status === 'Inactive' ? true : false}>
                  Inactive
                </option>
              </select>

            </div>

            <div className="row form-group mt-5">

              <Dropzone
                accept="image/*"
                onDrop={handleDropThumbnail}
              >
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                  <div className="dropzone w-100 mx-auto p-5 border-success "  {...getRootProps()}>
                    <input {...getInputProps()} />
                    {acceptedFiles.length > 0 ? (
                      <img src={URL.createObjectURL(acceptedFiles[0])} alt="Thumbnail" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    ) : (
                      <p>Drag & drop a thumbnail image here, or click to select one</p>
                    )}
                  </div>
                )}
              </Dropzone>

              {errors.thumbnail_image && (
                <span className="validation-error">{errors.thumbnail_image}</span>
              )}
            </div>

            <div className="row form-group mt-5">

              <Dropzone
                accept="image/*"
                onDrop={handleDropBanner}
              >
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                  <div className="dropzone w-100 mx-auto p-5 border-success" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {acceptedFiles.length > 0 ? (
                      <img src={URL.createObjectURL(acceptedFiles[0])} alt="Banner" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    ) : (
                      <p>Drag & drop a banner image here, or click to select one</p>
                    )}
                  </div>
                )}
              </Dropzone>
              {errors.banner_image && (
                <span className="validation-error">{errors.banner_image}</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-25">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default CreateCommunityForm;
