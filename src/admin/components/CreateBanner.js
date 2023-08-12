import axios from 'axios';
import React, { useState } from 'react';

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

  const handleBannerUrlChange = (e) => {
    const file = e.target.files[0];
    setBannerUrl(file)
    setBannerPreview(URL.createObjectURL(file));
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
          <form onSubmit={handleSubmit} className="p-5 w-75">
            {message && <div className={`alert ${alertClass}`}>
              {alertClass === 'alert-success' ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-exclamation-triangle"></i>)}
              {" " + message}
            </div>
            }

            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="bannerUrl">Banner Url</label>

                  <input
                    type="file"
                    className="form-control-file"
                    id="bannerUrl"
                    onInput={handleBannerUrlChange}
                  />
                  {errors.banner_url && (
                    <span className="validation-error">{errors.banner_url}</span>
                  )}
                </div>
              </div>
              <div className="col-sm-6">
                {bannerPreview && <img src={bannerPreview} alt="Banner" className="thumbnail-image" />}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="section">Section</label>
              <input
                type="text"
                className="form-control"
                id="section"
                name="section"
                value={section}
                onChange={handleSectionChange}
              />
              {errors.section && <span className='validation-error'>{errors.section}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="page">Page</label>
              <input
                type="text"
                className="form-control"
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

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                className="form-control"
                id="status"
                name="status"
                defaultValue={status}
                onChange={handleStatusChange}
              >
                <option value="Active" selected>Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && <span className='validation-error'>{errors.status}</span>}
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBanner;
