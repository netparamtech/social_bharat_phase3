import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { deleteCommunity, fetchAllCommunity, updateCommunityStatus } from '../../services/AdminService';
import { useDispatch } from 'react-redux';

const CommunitiesList = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchCommunities = async () => {

    try {
      const response = await fetchAllCommunity();
      if (response && response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage} });
      }
    }

  };

  const handleStatusToggle = async (communityId) => {
    try {
      const response = await updateCommunityStatus(communityId);
      if (response && response.status === 200) {
        fetchCommunities();
        
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage} });
      }
    }
  }

  const handleDelete = async (loggedUserid) => {
    try {
      const response = await deleteCommunity(loggedUserid); // Replace with your actual delete API endpoint
      if (response && response.status === 200) {
        // Fetch communities again to update the list
        fetchCommunities();
        
      }
    } catch (error) {
      // Handle error cases
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage} });
      }
    }
  };


  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <div >
      <div className="container-fluid">

        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Communities</h1>
          <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              navigate('/admin/create/community')
            }}
          >
            Create Community
          </a>
        </div>
        <div className="card table-responsive p-3">


          <table id='community-list' className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Title</th>
                <th scope="col">Thumbnail Image</th>
                <th scope="col">Banner Image</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>

              {data && data.length > 0 ? (data.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>
                    {item.thumbnail_image ? (
                      <a href={item.thumbnail_image} target='_blank'><img src={item.thumbnail_image} title="Thumbnail image" alt="Thumbnail" className="small-img-thumbnail" /></a>
                    ) : (
                      item.thumbnail_image
                    )}
                  </td>
                  <td>
                    {item.banner_image ? (
                      <a href={item.banner_image} target='_blank'><img src={item.banner_image} title="Banner image" alt="Banner" className="small-img-thumbnail" /></a>
                    ) : (
                      item.banner_image
                    )}
                  </td>
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
                      <a className="collapse-item" href="#" onClick={(e) => {
                        e.preventDefault(); // Prevent the default anchor tag behavior
                        navigate(`/admin/update/community/${item.id}`);
                      }}>
                        <i className="fa fa-edit mr-4" title='Edit' />
                      </a>

                      <a className="collapse-item" href="#" onClick={(e) => {
                        e.preventDefault(); // Prevent the default anchor tag behavior
                        handleDelete(item.id);
                      }}>
                        <i className="fa fa-trash" title='Delete' />
                      </a>
                    </div>
                  </td>
                </tr>

              ))) : (
                <tr>
                  <td colSpan="6">No data available</td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
};

export default CommunitiesList;
