import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { fetchAllUsers} from '../services/AdminService'; // Import your fetch service

const UserList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState('');
  const [totalRows, setTotalRows] = useState(0);

  const [defaultImage,setDefaultImage] = useState('img/de-default-1.jpeg')

  useEffect(() => {
    fetchData();
  }, [page, size]);

  const fetchData = async () => {
    const response = await fetchAllUsers(page, size);

    setData(response.data.data);
    setTotalRows(response.data.totalRecords);
  };

  const handlePageChange = newPage => {
    setPage(newPage);
  };

  const handleUserClick = userDetails=>() => {
    console.log('User Details:', userDetails);
  };

  const columns = [
    {
      name: 'Serial Number',
      cell: (row, index) => index + 1 + (page - 1) * size,
    },
    {
      name: 'Photo',
      selector: 'photo',
      cell: row => <img src={row.photo?row.photo:defaultImage} alt={row.name} title={row.name} width="50" onClick={handleUserClick(data)} />,
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
