import React, { useState } from "react";
import { useNavigate } from "react-router";
import { CreateBusinessCategorie,  } from "../../services/AdminService";

const CreateBusinessCategories = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const BusinessCategorieData = {
        title: name,
        status,
      };

      const response = await CreateBusinessCategorie(BusinessCategorieData);

      if (response && response.status === 201) {
        setErrors("");
        setMessage(response.data.message);
        setAlertClass("alert-success");
        setName("");
        setStatus("");

        // Reset file inputs

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
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage} });
      }
    }
  };

  return (
    <div className="container-fluid" id="font-Resize">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Create Business Categorie</h1>
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
                  <label htmlFor="name" className="fw-bold">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Business Categories Name"
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

            <button type="submit" className="btn btn-primary ">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBusinessCategories;
