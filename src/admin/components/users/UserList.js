import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { fetchAllUsers, updateToggleStatus } from '../../services/AdminService';

import { useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';

const UserList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const navigate = useNavigate();

  const [defaultImage, setDefaultImage] = useState('img/de-default-1.jpeg');

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePageSizeChange = (current, pageSize) => {
    setSize(pageSize);
  };

  const handleSearchChange = (query) => {
    setPage(1);
    setSearchQuery(query);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const newSortField = sorter.field || '';
    let newSortOrder = sorter.order || '';
  
    // If the same column is clicked again, toggle the sort order
    if (sortField === newSortField) {
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    }
  
    setSortField(newSortField);
    setSortOrder(newSortOrder);
  };

  const fetchData = async () => {
    
    try {
      const response = await fetchAllUsers(page, size, searchQuery, sortField, sortOrder);

      setData(response.data.data);

      setTotalRows(response.data.totalRecords);
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
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage} });
      }
    }
  }

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };
  // Rest of the code for handleUserToggleStatus, handleDeleteEnquiry, formatDate, and columns remains the same

  useEffect(() => {
    fetchData();
  }, [page, size, searchQuery, sortField, sortOrder]);

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      render: (text, record, index) => index + 1,
      width: 100,
    },
    {
      title: 'Photo', dataIndex: 'photo',
      render: (text, record) => (
        <a href={record.photo} target='_blank'>
          <img
            src={record.photo ? record.photo : defaultImage}
            alt={record.name}
            title={record.name}
            className='small-img-user-list'
          />
        </a>
      ),
      width:100,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      sortDirections: ['asc', 'desc'],
    },
   
    {
      title: 'Community',
      dataIndex: 'community',
      render: (text, record) => record.community?.name || 'N/A',
      sorter: true,
      sortDirections: ['asc', 'desc'],
    },
  
    {
      title: "Last Modified At",
      dataIndex: "updated_at",
      render: (text, record) => calculateTimeDifference(record.updated_at),
      sorter: true,
      sortDirections: ['asc', 'desc'],
    },

    { title: 'Status', dataIndex: 'status', render: (text,record) =>  (record.status === 'Active' ? (
      <a
        className="collapse-item m-2 hover-pointer-admin"
        onClick={(e) => {
          e.preventDefault();
          handleUserToggleStatus(record.id);
        }}
      >
        <i className="fa fa-thumbs-up text-primary" title="Active" />
      </a>
    ) : (
      <a
        className="collapse-item text-secondary m-2 hover-pointer-admin"
        onClick={(e) => {
          e.preventDefault();
          handleUserToggleStatus(record.id);
        }}
      >
        <i className="fa fa-thumbs-down" title="Inactive" />
      </a>
    )), sorter: true,
    sortDirections: ['asc', 'desc'],
  fixed: 'right',
width:100,},
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div>
          <a className="collapse-item hover-pointer-admin" onClick={() => navigate(`/users/view/${record.id}`)}>
            <i className="fas fa-eye"></i>
          </a>

        </div>
      ),
      fixed: 'right',
      width:100
    },
    // Rest of the columns definition
  ];

  const calculateTimeDifference = (updatedDate) => {
    const currentDate = new Date();
    const updatedDateObj = new Date(updatedDate);
    const differenceInSeconds = Math.floor(
      (currentDate - updatedDateObj) / 1000
    );

    if (differenceInSeconds < 1) {
      return "now";
    } else if (differenceInSeconds < 60) {
      return `${differenceInSeconds} sec ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} min ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hour ago`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      if (!days) {
        return "";
      }
      return `${days} day ago`;
    }
  };

  return (
    <div>
      <Search
        placeholder="Search"
        allowClear
        onSearch={handleSearchChange}
        style={{ marginBottom: 20, width: 200 }}
      />
      <Table
        title={() => 'Users'}  // Set the title to 'Enquiries'
        dataSource={data}
        columns={columns}
        pagination={{
          current: page,
          pageSize: size,
          total: totalRows,
          onChange: handlePageChange,
          onShowSizeChange: handlePageSizeChange,
        }}
        onChange={handleTableChange}
        rowKey={(record) => record.id}
       
      // onChange={handleSearchChange}
      />
    </div>
  );
};

export default UserList;
