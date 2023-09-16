import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { fetchAllUsers, updateToggleStatus } from '../../services/AdminService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

const UserList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState('');
  const [totalRows, setTotalRows] = useState(0);

  const [defaultImage, setDefaultImage] = useState('img/de-default-1.jpeg');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetchAllUsers(page, size);
      
      setData(response.data.data);
      
      setTotalRows(response.data.totalRecords);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        navigate('/admin');
      }
    }
  };

  const handlePageChange = newPage => {
    setPage(newPage);
  };

  const handleUserToggleStatus = async (id) => {
    try {
      const response = await updateToggleStatus(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        navigate('/admin');
      }
    }
  }

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1 + (page - 1) * size,
    },
    {
      name: 'Photo',
      selector: (row) => row.photo,
      cell: (row) => (
        <a href={row.photo} target='_blank'>
          <img
            src={row.photo ? row.photo : defaultImage}
            alt={row.name}
            title={row.name}
            className='small-img-user-list'
          />
        </a>
      ),
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Mobile',
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: 'Community',
      selector: (row) => row.community?.name || 'N/A',
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Created',
      selector: (row) => formatDate(row.created_at),
      sortable: true,
    },
    {
      name: 'Updated',
      selector: (row) => formatDate(row.updated_at),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <a className="collapse-item" href="#" onClick={()=>navigate(`/users/view/${row.id}`)}>
            <i className="fas fa-eye"></i>
          </a>
          {row.status === 'Active' ? (
            <a
              className="collapse-item m-2"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleUserToggleStatus(row.id);
              }}
            >
              <i className="fa fa-thumbs-up text-primary" title="Active" />
            </a>
          ) : (
            <a
              className="collapse-item text-secondary m-2"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleUserToggleStatus(row.id);
              }}
            >
              <i className="fa fa-thumbs-down" title="Inactive" />
            </a>
          )}
         
        </div>
      ),
    },
    // ... other column definitions
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '16px',
      },
    },
  };

  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input changes
  const handleSearch = async (query) => {
    setSearchQuery(query);
    setPage(1); // Reset to the first page when searching

    // Fetch data for the first page with the new search query
    await fetchData();

    // Check if the searched user exists on the current page
    const userExistsOnCurrentPage = filteredData.some((row) =>
      Object.values(row).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    // If the user is not found on the current page and there are more pages, increment the page and search again
    if (!userExistsOnCurrentPage && page < Math.ceil(totalRows / size)) {
      setPage(page + 1);
      await fetchData();
    }
  };

  // Function to filter data based on the search query
  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  useEffect(() => {
    fetchData();
  }, [page, size]);
  return (
    <div>
      <DataTable
        title="User List"
        columns={columns}
        data={filteredData} // Use filteredData instead of data
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={(newPage) => handlePageChange(newPage)}
        onChangeRowsPerPage={(newSize) => setSize(newSize)}
        customStyles={customStyles}
        subHeader // Enable the subHeader
        subHeaderComponent={
          // Add a search input for the entire table
          <form className="form-inline mr-auto w-100 navbar-search">
            <div className="input-group">
              <input type="text" className="form-control bg-light border-0 small"
                placeholder="Search for..." aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={(e) => handleSearch(e.target.value)}
               
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>

        }
      />
    </div>
  );
};

export default UserList;
