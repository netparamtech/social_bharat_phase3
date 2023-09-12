import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";

import { logout } from "../../actions/authActions";
import {
  fetchBusinessCategorieWithId,
  updateBusinessCategorie,
} from "../../services/AdminService";

const UpdateBusinessCategorie = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchBusinessCategorie = async () => {
    try {
      const response = await fetchBusinessCategorieWithId(id);
      if (response && response.status === 200) {
        const businessCategorieData = response.data.data[0];
        
        setName(businessCategorieData.title);
        
        setStatus(businessCategorieData.status);
      }
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        dispatch(logout());
        navigate("/admin");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(name);
    try {
      const businessCategorieData = {
        title: name,
        status,
      };

      const response = await updateBusinessCategorie(id, businessCategorieData);

      if (response && response.status === 200) {
        setErrors("");
        setMessage(response.data.message);
        setAlertClass("alert-success");
        setTimeout(() => {
          window.location.href = "/admin/business-categories";
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
        dispatch(logout());
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        dispatch(logout());
        navigate("/admin");
      }
    }
  };

  useEffect(() => {
    fetchBusinessCategorie();
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Update Business Categorie</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/admin/business-categories";
          }}
        >
          View All Business Categories
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
                  <label htmlFor="name">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    defaultValue={name}
                    
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Business Categorie Name"
                  />
                  
                  {errors.title && (
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
                    defaultValue={status}
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

export default UpdateBusinessCategorie;
