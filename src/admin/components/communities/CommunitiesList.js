import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {
  deleteCommunity,
  fetchAllCommunitiesForAdmin,
  fetchAllCommunity,
  updateCommunityStatus,
} from "../../services/AdminService";
import { useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';

const CommunitiesList = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [defaultImage, setDefaultImage] = useState('img/en.jpg');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePageSizeChange = (current, pageSize) => {
    setSize(pageSize);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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

  const fetchSearchData = () => {
    if (data) {
      // Filter the data based on the search query
      const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchData(filteredData);
    }
  }

  const fetchData = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllCommunitiesForAdmin();

      setData(response.data.data);
      setSearchData(response.data.data);
      setTotalRows(response.data.data.length);
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    }
  };

  const handleCommunityToggleStatus = async (id) => {
    try {
      const response = await updateCommunityStatus(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await deleteCommunity(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    }
  }

  // Rest of the code for handleUserToggleStatus, handleDeleteEnquiry, formatDate, and columns remains the same

  useEffect(() => {
    fetchSearchData();
  }, [searchQuery]);
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      render: (text, record, index) => (page - 1) * size + index + 1,
      width: 100,
    },

    {
      title: 'Name', dataIndex: 'name',
      sorter: false,
      sortDirections: ['asc', 'desc'],
      with: 100,
    },

    {
      title: 'Thumbnail Image', dataIndex: 'thumbnail_image',
      render: (text, record) => (
        <a href={record.thumbnail_image} target='_blank'>
          <img
            src={record.thumbnail_image ? record.thumbnail_image : defaultImage}
            alt={record.name}
            title={record.name}
            className='small-img-user-list'
          />
        </a>
      ),
      width: 200,
    },

    {
      title: 'Banner Image', dataIndex: 'banner_image',
      render: (text, record) => (
        <a href={record.banner_image} target='_blank'>
          <img
            src={record.banner_image ? record.banner_image : defaultImage}
            alt={record.name}
            title={record.name}
            className=''
            style={{ width: record.banner_image ? '150px' : '60px' }}
          />
        </a>
      ),
      width: 200,
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <div>
          {record.status === 'Active' ? (
            <a
              className="collapse-item m-2"
              href=""
              onClick={(e) => {
                e.preventDefault();
                handleCommunityToggleStatus(record.id);
              }}
            >
              <i className="fa fa-thumbs-up text-primary" title="Active" />
            </a>
          ) : (
            <a
              className="collapse-item text-secondary m-2"
              href=""
              onClick={(e) => {
                e.preventDefault();
                handleCommunityToggleStatus(record.id);
              }}
            >
              <i className="fa fa-thumbs-down" title="Inactive" />
            </a>
          )}
        </div>
      ),
      fixed: 'right',
      sorter: false,
      sortDirections: ['asc', 'desc'],
      width: 150,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div>
          <a className="collapse-item" onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            navigate(`/admin/update/community/${record.id}`);
          }}>
            <i className="fa fa-edit mr-2" title='Edit' />
          </a>

          <a className="collapse-item" onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            handleDelete(record.id);
          }}>
            <i className="fa fa-trash" title='Delete' />
          </a>
          <a className="collapse-item m-2 hover-pointer-admin" onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            navigate(`/community/${record.id}`);
          }}>
            <i className="fas fa-eye"></i>
          </a>
        </div>
      ),
      fixed: 'right',
      width: 200,
    },
    // Rest of the columns definition
  ];

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Master Communities</h1>
        <a href="" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/create/community')
          }}
        >
          Create Community
        </a>
      </div>
      <Search
        placeholder="Search"
        allowClear
        onChange={handleSearchChange}
        style={{ marginBottom: 20, width: 200 }}
      />
      <Table
        title={() => 'Communities'}  // Set the title to 'Enquiries'
        dataSource={searchData}
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

export default CommunitiesList;
