import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {
  deleteCommunity,
  fetchAllCommunity,
  fetchAllUsersWithCommunity,
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
      const response = await fetchAllUsersWithCommunity();

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
    },
    
    {
      title: 'Community Name',
      dataIndex: 'name',
    },

    {
      title: 'Total User',
      dataIndex: 'totalCount',
      render: (text, record) => record.totalCount || 'N/A',
    },

  ];

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Master Communities</h1>
        <a href="" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/users')
          }}
        >
          View All Users
        </a>
        <a href="" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/communities')
          }}
        >
          View All Communities
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

        rowKey={(record) => record.id}
      // onChange={handleSearchChange}
      />
    </div>
  );
};

export default CommunitiesList;
