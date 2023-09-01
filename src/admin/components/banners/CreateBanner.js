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
    <div className="container-fluid" style={{ minHeight: '100vh' }}>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Create Banner</h1>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="">

            <div className="row">
              <div className="col-sm-6">
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
                  {errors.banner_url && (
                    <span className="error">{errors.banner_url}</span>
                  )}
                </div>
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
              {errors.page && <span className='error'>{errors.page}</span>}
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
              {errors.status && <span className='error'>{errors.status}</span>}
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBanner;
