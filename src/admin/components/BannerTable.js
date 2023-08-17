import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import UpdateBannerForm from './UpdateBannerForm';

const BannerTable = () => {
  const [data, setData] = useState([]);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [item, setItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFeaturedClick = (id) => {
    try {
      axios
        .put(`/api/admin/banners/${id}/featured`)
        .then((response) => {
          console.log('Banner featured status updated successfully.');
          // Update the featured status in the local data state
          const updatedData = data.map((item) =>
            item.id === id ? { ...item, featured: !item.featured } : item
          );
          setData(updatedData);
        })
        .catch((error) => {
        });
    } catch (error) {
    }
  };



  const handleDelete = (id) => {
    // axios
    //   .delete(`/api/admin/banners/${id}`, config)
    //   .then((response) => {
    //     console.log('Banner deleted successfully.');
    //     fetchBanners();
    //   })
    //   .catch((error) => {
    //     console.error('Error deleting banner:', error);
    //   });
  };

  const handleUpdate = (item) => {
    console.log(item);
    setItem(item);
    setIsEditClicked(true);
  };

  const changeIsEditableFlag = (value) => {
    console.log('Changing state of edit');
    setIsEditClicked(value);
  };

  const fetchBanners = () => {
    axios
      .get('/api/admin/banners')
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate('/admin')
         }
      });
  };

  useEffect(() => {
    fetchBanners();
  }, [isEditClicked]);

  // Pagination related functions
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container-fluid">
      {isEditClicked ? (
        <UpdateBannerForm item={item} changeIsEditableFlag={changeIsEditableFlag} />
      ) : (
        <>
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Banners</h1>
            <a href="/admin/create-banner" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
              Create Banner
            </a>
          </div>
          <div className="card">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Banner_Url</th>
                  <th scope="col">Section</th>
                  <th scope="col">Page</th>
                  <th scope="col">Featured</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData && paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                      <td>
                        {item.banner_url ? (
                          <a href={item.banner_url} target="_blank">
                            <img src={item.banner_url} title="Banner image" alt="Banner" className="thumbnail-image" />
                          </a>
                        ) : (
                          item.banner_url
                        )}
                      </td>
                      <td>{item.section}</td>
                      <td>{item.page}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={item.featured ? faThumbsUp : faThumbsDown}
                          title={item.featured ? 'Featured' : 'Not Featured'}
                          className="fa-lg"
                          style={{ color: item.featured ? 'blue' : 'gray' }}
                          onClick={(e) => {
                            e.stopPropagation(); // Stop event propagation to avoid automatic toggling
                            handleFeaturedClick(item.id);
                          }}
                        />
                      </td>
                      <td>{item.status}</td>
                      <td key={item.id}>
                        <div className="d-flex">
                          <a className="collapse-item">
                            <i className="fa fa-edit mr-4" title="Edit" onClick={() => handleUpdate(item)} />
                          </a>
                          <a className="collapse-item" href="">
                            <i className="fa fa-trash" title="Delete" onClick={() => handleDelete(item.id)} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <nav>
              <ul className="pagination justify-content-center">
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <a
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                      href="#"
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default BannerTable;
