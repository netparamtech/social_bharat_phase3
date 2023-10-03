import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteDegree, fetchAllDegrees, updateDegreeStatus } from "../../services/AdminService";
import Search from "antd/es/input/Search";
import { Table } from "antd";

const DegreeList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const navigate = useNavigate();

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
      const response = await fetchAllDegrees(page, size, searchQuery, sortField, sortOrder);

      setData(response.data.data.degrees);

      setTotalRows(response.data.data.totalRecords);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        navigate('/admin');
      }
    }
  };

  const handleStatusToggle = async (id) => {
    try {
      const response = await updateDegreeStatus(id);
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

  const handleDelete = async (id) => {
    try {
      const response = await deleteDegree(id);
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

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      render: (text, record, index) => index + 1,
      width: 100,
    },
    {
      title: 'Title', dataIndex: 'title',
      sorter: true,
      sortDirections: ['asc', 'desc'],
    },

    {
      title: 'Short Title', dataIndex: 'short_title',
      sorter: true,
      sortDirections: ['asc', 'desc'],
    },
    {
      title: 'Status', dataIndex: 'status',
      render: (text, record) => (
        <div>
          {record.status === 'Active' ? (
            <a
              className="collapse-item m-2"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleStatusToggle(record.id);
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
                handleStatusToggle(record.id);
              }}
            >
              <i className="fa fa-thumbs-down" title="Inactive" />
            </a>
          )}
        </div>
      ),
      sorter: true,
      sortDirections: ['asc', 'desc'],
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div>
          <a
            className="collapse-item"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/admin/degree/update/${record.id}`)
            }}
          >
            <i className="fa fa-edit mr-4" title="Edit" />
          </a>

          <a
            className="collapse-item"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleDelete(record.id);
            }}
          >
            <i className="fas fa-trash"></i>
          </a>
        </div>
      ),
      fixed: 'right',
    },
    // Rest of the columns definition
  ];

  useEffect(() => {
    fetchData();
  }, [page, size, searchQuery, sortField, sortOrder]);

  return (
    <div>
      <Search
        placeholder="Search"
        allowClear
        onSearch={handleSearchChange}
        style={{ marginBottom: 20, width: 200 }}
      />
      <Table
        title={() => 'Degrees'}  // Set the title to 'Catagories'
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
      // onChange={handleSearchChange}
      />
    </div>
  );
};

export default DegreeList;
