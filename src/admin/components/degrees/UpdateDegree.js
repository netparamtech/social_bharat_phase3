import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Select from 'react-select';
import { fetchDegreeWithId, updateDegree, fetchAllDegrees } from "../../services/AdminService";

const UpdateDegree = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");
  const [degrees, setDegrees] = useState([]);

  const navigate = useNavigate();

  const handleSelectCategoryChange = (e) => {
    setName(e.target.value);
  };

  const fetchDegrees = async () => {
    try {
      const response = await fetchDegreeWithId(id);
      if (response && response.status === 200) {
        const degreeData = response.data.data;

        if (degreeData) {
          setName(degreeData.title);
        }

        setShortName(degreeData.short_title);
        setStatus(degreeData.status);
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

      const degreeData = {
        title: name,
        short_title: shortName,
        status,
      };

      const response = await updateDegree(id, degreeData);

      if (response && response.status === 200) {
        setErrors("");
        setMessage(response.data.message);
        setAlertClass("alert-success");
        setTimeout(() => {
          navigate('/admin/degrees')
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
    fetchDegrees();
  }, [degrees]);

  return (
    <div className="container-fluid" id="font-Resize">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Update Degree</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/degrees')
          }}
        >
          View All Degree
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
                  <label htmlFor="name" className="fw-bold">Title</label>
                  <input type="text" className="form-control" defaultValue={name} onChange={handleSelectCategoryChange} />
                 
                      {errors.title && <span className='error'>{errors.title}</span>}

                </div>
                <div className="form-group">
                  <label className="fw-bold">Short Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="shortName"
                    defaultValue={shortName}
                    onChange={(e) => setShortName(e.target.value)}
                    placeholder="Enter Short Title Name"
                  />
                  {errors.short_title && (
                    <span className="error">{errors.short_title}</span>
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
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateDegree;
