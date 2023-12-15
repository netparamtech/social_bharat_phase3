import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {  fetchServiceByID, updateService } from "../../services/AdminService";

const UpdateService = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");
  const [services, setServices] = useState([]);

  const navigate = useNavigate();

  const handleSelectCategoryChange = (e) => {
   setTitle(e.target.value);
  };

  const fetchService = async () => {
    try {
      const response = await fetchServiceByID(id);
      if (response && response.status === 200) {
        const serviceData = response.data.data;

        if (serviceData) {
          setTitle(serviceData.title)
        }
      
        setStatus(serviceData.status);
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage} });
      }
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const data = {
        title,
        status,
      };

      const response = await updateService(id, data);

      if (response && response.status === 200) {
        setErrors("");
        setMessage(response.data.message);
        setAlertClass("alert-success");
        setTimeout(() => {
          navigate('/admin/service/index')
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
        navigate('/server/error', { state: { errorMessage} });
      }
    }
  };

  useEffect(() => {
    fetchService();
  }, [services]);

  return (
    <div className="container-fluid" id="font-Resize">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Update Service</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/service/index');
          }}
        >
          View All Services
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
                  <label className="fw-bold"> Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    defaultValue={title}
                    onChange={handleSelectCategoryChange}
                    placeholder="Enter Title Name"
                  />
                  {errors.title && (
                    <span className="error">{errors.title}</span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="status" className="fw-bold">Status</label>
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

export default UpdateService;
