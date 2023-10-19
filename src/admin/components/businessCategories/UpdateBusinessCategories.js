import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  fetchBusinessCategorieWithId,
  updateBusinessCategorie,fetchAllCategories
} from "../../services/AdminService";
import Select from 'react-select';

const UpdateBusinessCategorie = () => {
  const { id } = useParams(); 

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");
  const [businessCategories,setBusinessCategories] = useState('');

  const navigate = useNavigate();

  const fetchBusinessCategorie = async () => {
    try {
      const response = await fetchBusinessCategorieWithId(id);
      if (response && response.status === 200) {
        const businessCategorieData = response.data.data;
        
        if (businessCategorieData) {
          setName(businessCategorieData.title);
      }

      setStatus(businessCategorieData.status);
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

  

  const handleSelectCategoryChange = (e) => {
    setName(e.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
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
        navigate('/admin/business-categories')
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
    fetchBusinessCategorie();
  }, [businessCategories]);

  return (
    <div className="container-fluid" id="font-Resize">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Update Business Categorie</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/business-categories');
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
                  <input type="text" className="form-control" defaultValue={name} onChange={handleSelectCategoryChange} />
                 
                      {errors.title && <span className='error'>{errors.title}</span>}
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

            <button type="submit" className="btn btn-primary w-25">
             Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBusinessCategorie;
