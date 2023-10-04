import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {
  deleteEventByID,
  fetchEvents,
  updateToggleStatusForEvent,
} from "../../services/AdminService";
import { useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';

const Event = () => {
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
    console.log(searchQuery);
    try {
      const response = await fetchEvents(page, size, searchQuery, sortField, sortOrder);

      setData(response.data.data);

      setTotalRows(response.data.totalRecords);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage} });
      }
    }
  };

  const handleEventToggleStatus = async (id) => {
    try {
      const response = await updateToggleStatusForEvent(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage} });
      }
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const response = await deleteEventByID(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage} });
      }
    }
  };

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      render: (text, record, index) => index + 1,
      width: 100,
    },
   
    {
      title: "Event", dataIndex: "title", width: 300,
      sorter: true,
      sortDirections: ['asc', 'desc'],
    },
    {
      title: "Location",
      dataIndex: "venue",
      render: (text, record) => {
        const { venue, city, state } = record;
        return `${venue}, ${city} (${state})`;
      },
      sorter: true,
      sortDirections: ['asc', 'desc'],
      width: 150,
    },

    {
      title: "Event Start At",
      dataIndex: "start_datetime",
      render: (text, record) => formatDate(record.start_datetime),
      width: 150,

    },
    {
      title: "Event End At",
      dataIndex: "end_datetime",
      render: (text, record) => formatDate(record.end_datetime),
      width: 150,

    },

    {
      title: 'Status', dataIndex: 'status', render: (text, record) => (record.status === 'Active' ? (
        <a
          className="collapse-item m-2"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleEventToggleStatus(record.id);
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
            handleEventToggleStatus(record.id);
          }}
        >
          <i className="fa fa-thumbs-down" title="Inactive" />
        </a>
      )), sorter: true,
      sortDirections: ['asc', 'desc'],
      fixed: 'right',
      width: 100,
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className=''>
          <a
            className="collapse-item"
            onClick={() => navigate(`/events/view/${record.id}`)}
          >
            <i className="fas fa-eye"></i>
          </a>

          <a
            className="collapse-item m-2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteEvent(record.id);
            }}
          >
            <i className="fas fa-trash"></i>
          </a>

        </div>
      ),
      fixed: 'right',
      with: 200,
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
        title ={() => 'Events'}  // Set the title to 'Enquiries'
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

export default Event;
