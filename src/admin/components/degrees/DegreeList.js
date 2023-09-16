import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteDegree, fetchAllDegrees, updateDegreeStatus } from "../../services/AdminService";
import { logout } from "../../actions/authActions";

const DegreeList = () => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const fetchDegrees = async () => {
    try {
      const response = await fetchAllDegrees();
      if (response && response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data.message);
        setErrors(error.response.data.errors);
      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        navigate("/admin");
      }
    }
  };

  const handleStatusToggle = async (degreeId) => {
    try {
      const response = await updateDegreeStatus(degreeId);
      if (response && response.status === 200) {
        fetchDegrees();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      } else if (error.response && error.response.status === 500) {
        navigate('/admin');
      }
    }
  }

  const handleDelete = async (loggedUserid) => {
    try {
      const response = await deleteDegree(loggedUserid); // Replace with your actual delete API endpoint
      if (response && response.status === 200) {
        // Fetch communities again to update the list
        fetchDegrees();
      }
    } catch (error) {
      // Handle error cases
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      } else if (error.response && error.response.status === 500) {
        navigate('/admin');
      }
    }
  };

  useEffect(() => {
    fetchDegrees();
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Degree</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/degree/create');
          }}
        >
          Create Degree
        </a>
      </div>
      <div className="card table-responsive p-3">
        <table className="table table-striped table-bordered table-sm">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Title</th>
              <th scope="col">Short Title</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.short_title}</td>

                  <td>
                  {item.status === 'Active' ? (
                    <a href = "#" onClick={() => handleStatusToggle(item.id)}>
                      <i className="fa fa-thumbs-up text-primary" title="Active" />
                    </a>
                  ) : (
                   <a href='#' onClick={() => handleStatusToggle(item.id)}>
                     <i className="fa fa-thumbs-down text-secondary" title="Inactive" />
                   </a>
                  )}
                  </td>
                  <td key={item.id}>
                    <div className="d-flex">
                      <a
                        className="collapse-item"
                        href="#"
                        onClick={()=>navigate(`/admin/degree/update/${item.id}`)}
                      >
                        <i className="fa fa-edit mr-4" title="Edit" />
                      </a>
                      <a className="collapse-item" href="#" onClick={(e) => {
                        e.preventDefault(); 
                        handleDelete(item.id);
                      }}>
                        <i className="fa fa-trash" title='Delete' />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DegreeList;
