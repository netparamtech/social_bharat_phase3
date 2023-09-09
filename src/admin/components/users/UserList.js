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
  const dispatch = useDispatch();


  useEffect(() => {
    fetchData();
  }, [page, size]);

  const fetchData = async () => {
    try {
      const response = await fetchAllUsers(page, size);

      setData(response.data.data);
      setTotalRows(response.data.totalRecords);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout);
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        dispatch(logout);
        navigate('/admin');
      }
    }
  };

  const handlePageChange = newPage => {
    setPage(newPage);
  };

  const handleDeleteClick = userDetails => {
    console.log('Delete User:', userDetails);
  };

  const handleUserToggleStatus = async (id) => {
    try {
      const response = await updateToggleStatus(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout);
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        dispatch(logout);
        navigate('/admin');
      }
    }
  }

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
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: 'Updated',
      selector: (row) => row.updated_at,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <a className="collapse-item" href={`/users/view/${row.id}`}>
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
          <a
            className="collapse-item"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteClick(row);
            }}
          >
            <i className="fa fa-trash" title='Delete' />
          </a>
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

  return (
    <div>

      <DataTable
        title="User List"
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={newPage => handlePageChange(newPage)}
        onChangeRowsPerPage={newSize => setSize(newSize)}
        customStyles={customStyles}
      />
    </div>
  );
};

export default UserList;
