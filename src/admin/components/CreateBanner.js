import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const CreateBanner = () => {
  const [bannerUrl, setBannerUrl] = useState(null);
  const [section, setSection] = useState("");
  const [page, setPage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState("Active");

  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');

  const [bannerPreview, setBannerPreview] = useState("");

  const handleDropBanner = async (acceptedFiles) => {
    const bannerFile = acceptedFiles[0];
    setBannerUrl(bannerFile);

    try {

    } catch (error) {
      // Handle fetch error
    }
  };

  const handleSectionChange = (e) => {
    setSection(e.target.value);
  };

  const handlePageChange = (e) => {
    setPage(e.target.value);
  };

  const handleFeaturedChange = (e) => {
    setFeatured(e.target.checked ? 1 : 0);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value === "Active" ? "Active" : "Inactive");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append form data
    formData.append("banner_url", bannerUrl);
    formData.append("section", section);
    formData.append("page", page);
    formData.append("featured", featured);
    formData.append("status", status);

    // Perform form submission logic or API call here
    // You can access the field values and file data from the formData object

  };

  return (
    <div className="container-fluid" style={{ minHeight: '100vh' }}>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Create Banner</h1>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="">
            {message && <div className={`alert ${alertClass}`}>
              {alertClass === 'alert-success' ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-exclamation-triangle"></i>)}
              {" " + message}
            </div>
            }

            <div className="row form-group">

              <Dropzone
                accept="image/*"
                onDrop={handleDropBanner}
              >
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                  <div className="dropzone w-75 mx-auto p-5 border-success" {...getRootProps()}>
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

            <div className="row form-group">
              <label htmlFor="section">Section</label>
              <input
                type="text"
                className="form-control w-50 mx-auto"
                id="section"
                name="section"
                value={section}
                onChange={handleSectionChange}
              />
              {errors.section && <span className='validation-error'>{errors.section}</span>}
            </div>

            <div className="row form-group">
              <label htmlFor="page">Page</label>
              <input
                type="text"
                className="form-control w-50 mx-auto"
                id="page"
                name="page"
                value={page}
                onChange={handlePageChange}
              />
              {errors.page && <span className='validation-error'>{errors.page}</span>}
            </div>

            <div className="form-group">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="featured"
                  name="featured"
                  checked={featured}
                  onChange={handleFeaturedChange}
                />
                <label className="form-check-label" htmlFor="featured">
                  Featured
                </label>
              </div>
              {errors.featured && <span className='validation-error'>{errors.featured}</span>}
            </div>

            <div className="row form-group">
              <label htmlFor="status">Status</label>
              <select
                className="form-control w-50 mx-auto"
                id="status"
                name="status"
                defaultValue={status}
                onChange={handleStatusChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && <span className='validation-error'>{errors.status}</span>}
            </div>

            <button type="submit" className="btn btn-primary w-25">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBanner;
