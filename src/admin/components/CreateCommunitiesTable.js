import React, { useEffect, useState } from 'react';
import UpdateCommunityForm from './UpdateCommunityForm';
import { fetchAllCommunities } from '../services/AdminService';

const CreateCommunityTable = () => {
  const [data, setData] = useState([]);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [id, setId] = useState(0);
  const [item,setItem] = useState(null);

  const handleDelete = (id) => {
        
    // axios.delete(`/api/admin/communities/${id}`,{
    //   headers: {
    //     'Authorization': 'Bearer '+localStorage.getItem('token')
    //   }
    // })
    //   .then(response => {
    //     console.log('Community deleted successfully.');
    //     fetchCommunities();
    //   })
    //   .catch(error => {
    //     console.error('Error deleting community:', adminLoading);
    //   });
    //   dispatch(clearAdminLoading())
  };

  const handleUpdate = (item) => {
    setItem(item)
    setIsEditClicked(true)
  }

  const changeIsEditableFlag = (value) => {
      setIsEditClicked(value)
  }

  const fetchCommunities = async() => {

    const response = await fetchAllCommunities();
    
  };

  useEffect(() => {
    fetchCommunities();
  }, [isEditClicked]);

  return (

    <div className="container-fluid">

      {
        isEditClicked ? (<UpdateCommunityForm
            item={item}
            changeIsEditableFlag={changeIsEditableFlag}
          />
        ) : (
          <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Communities</h1>
              <a href="create-community" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                Create Community
              </a>
            </div>
            <div className="card">


              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Title</th>
                    <th scope="col">Thumbnail_Image</th>
                    <th scope="col">Banner_Image</th>
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
                          <a href={item.thumbnail_image} target='_blank'><img src={item.thumbnail_image} title="Thumbnail image"  alt="Thumbnail" className="thumbnail-image" /></a>
                        ) : (
                          item.thumbnail_image
                        )}
                      </td>
                      <td>
                        {item.banner_image ? (
                          <a href={item.banner_image} target='_blank'><img src={item.banner_image} title="Banner image" alt="Banner" className="banner-image" /></a>
                        ) : (
                          item.banner_image
                        )}
                      </td>
                      <td>{item.status}</td>
                      <td key={item.id}>
                        <div className="d-flex">
                          <a className="collapse-item">
                            <i className="fa fa-edit mr-4" title='Edit' onClick={() => handleUpdate(item)} />
                          </a>
                          <a className="collapse-item" href="">
                            <i className="fa fa-trash" title='Delete' onClick={() => handleDelete(item.id)} />
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
          </>
        )

      }

    </div>
  );
};

export default CreateCommunityTable;
