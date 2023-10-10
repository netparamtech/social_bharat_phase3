import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Select from 'react-select';
import {  updateQualifications, fetchAllQualifications, fetchQualificationsByID } from "../../services/AdminService";

const UpdateQualification = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");
  const [qualifications, setQualifications] = useState([]);

  const navigate = useNavigate();

  const handleSelectCategoryChange = (selectedOption) => {
    // Find the degree object that matches the selected value
    const selectedQualifications = qualifications.find((qualification) => qualification.id === selectedOption.value);

    // Update the name and shortName based on the selected degree
    if (selectedQualifications) {
      setName(selectedOption);
    }
  };

  const fetchAllActiveQualifications = async () => {
    try {
      const response = await fetchAllQualifications();
      if (response && response.status === 200) {
        setQualifications(response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage} });
      }
    }
  };

  const fetchQualifications = async () => {
    try {
      const response = await fetchQualificationsByID(id);
      if (response && response.status === 200) {
        const qualificationData = response.data.data;

        if (qualificationData) {
          const category = qualifications.find(category => category.title === qualificationData.title);
          if (category) {
            setName({ value: category.id, label: category.title });
          }

        }
      
        setStatus(qualificationData.status);
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
        title: name,
        status,
      };

      const response = await updateQualifications(id, data);

      if (response && response.status === 200) {
        setErrors("");
        setMessage(response.data.message);
        setAlertClass("alert-success");
        setTimeout(() => {
          navigate('/admin/qualifications')
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
    fetchQualifications();
  }, [qualifications]);

  useEffect(() => {
    fetchAllActiveQualifications();
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Update Qualification</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/qualifications')
          }}
        >
          View All Qualifications
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
                  <label> Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Title Name"
                  />
                  {errors.short_title && (
                    <span className="error">{errors.title}</span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
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

export default UpdateQualification;
