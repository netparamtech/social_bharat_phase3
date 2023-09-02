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

  const handleUserClick = userDetails => {
    console.log('User Details:', userDetails);
  };

 
  const handleDeleteClick = userDetails => {
    console.log('Delete User:', userDetails);
  };

  const handleUserToggleStatus = async (id) => {
    console.log("Hello")
      try {
        const response = await updateToggleStatus(id);
        if(response && response.status === 200){
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
      cell: (row, index) => index + 1 + (page - 1) * size,
    },
    {
      name: 'Photo',
      selector: 'photo',
      cell: row => <img src={row.photo ? row.photo : defaultImage} alt={row.name} title={row.name} width="50" onClick={(e) => {
        e.preventDefault(); // Prevent the default anchor tag behavior
        navigate(`/users/view/${row.id}`);
      }} />,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Mobile',
      selector: 'mobile',
      sortable: true,
    },
    {
      name: 'Community',
      selector: 'community_id',
      sortable: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
    },
    {
      name: 'Created',
      selector: 'created_at',
      sortable: true,
    },
    {
      name: 'Updated',
      selector: 'updated_at',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div>
          <a className="collapse-item" href="#" onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            navigate(`/users/view/${row.id}`);
          }}>
            view
          </a>
          {row.status === 'Active' ? (
            <a className="collapse-item" href="#" onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor tag behavior
              handleUserToggleStatus(row.id);
            }}>
              Deactivate
            </a>
          ) : (
            <a className="collapse-item" href="#" onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor tag behavior
              handleUserToggleStatus(row.id);
            }}>
              Activate
            </a>
          )}
          <a className="collapse-item" href="#" onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            handleDeleteClick(row);
          }}>
            <i className="fa fa-trash" title='Delete' />
          </a>
        </div>
      ),
    },
    // ... other column definitions
  ];

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
      />
    </div>
  );
};

export default UserList;
