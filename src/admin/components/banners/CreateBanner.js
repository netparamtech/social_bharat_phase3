import axios from 'axios';
import React, { useState } from 'react';

import { useNavigate } from 'react-router';
import { createBanner, uploadMultipleImages } from '../../services/AdminService';

const CreateBanner = () => {
  const [bannerTempUrl, setBannerTempUrl] = useState([]);
  const [section, setSection] = useState('');
  const [page, setPage] = useState('');
  const [status, setStatus] = useState('');

  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');
  const navigate = useNavigate();

  const [bannerPreview, setBannerPreview] = useState("");

  const handleBannerChange = async (e) => {
    const selectedFiles = e.target.files;

    const formData = new FormData();

    // Append each file to the FormData
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images', selectedFiles[i]);
    }

    try {
      const response = await uploadMultipleImages(formData); // Make an API call to get temporary URL
      if (response.status === 200) {
        setBannerTempUrl(response.data.data.files);
      }
    } catch (error) {
      // Handle error or show an error message
    }
  };

  const handleSectionChange = (e) => {
    setSection(e.target.value);
  };

  const handlePageChange = (e) => {
    setPage(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value === "Active" ? "Active" : "Inactive");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      banner_urls: bannerTempUrl,
      section,
      page, status
    }

    try {
      const response = await createBanner(data);
      if (response && response.status === 200) {
        setErrors('');
        setMessage(response.data.message);
        setAlertClass('alert-success');
        setTimeout(() => {
          navigate('/admin/banners');
        }, 1000)

      }
    } catch (error) {

      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);

      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }

  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Create Banner</h1>
          </div>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="">

                <div className="row">
                  <div className="col-sm-6">
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
                      <label htmlFor="bannerUrl">Banner Url</label>

                      <input
                        type="file"
                        className="form-control-file"
                        accept=".png, .jpg, .jpeg"
                        id="bannerUrl"
                        onChange={handleBannerChange}
                        multiple
                      />
                      {errors.banner_urls && (
                        <span className="error">{errors.banner_urls}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="page">Page</label>
                  <select
                    className="form-control"
                    id="page"
                    name="page"
                    value={page}
                    onChange={handlePageChange}
                  >
                    <option value="Home">Home</option>
                    {/* Add other page options here if needed */}
                  </select>
                  {errors.page && <span className="error">{errors.page}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="section">Section</label>
                  <select
                    className="form-control"
                    id="section"
                    name="section"
                    onChange={handleSectionChange}
                  >
                    <option value="">Select Section</option>
                    <option value="Main Banners">Main Banners</option>
                    <option value="Testimonial">Testimonial</option>
                    <option value="Matrimonial">Matrimonial</option>
                    <option value="Stats Bg">Stats Bg</option>
                    {/* Add other section options here if needed */}
                  </select>
                  {errors.section && <span className="error">{errors.section}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    className="form-control"
                    id="status"
                    name="status"
                    onChange={handleStatusChange}
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {errors.status && <span className='error'>{errors.status}</span>}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBanner;
