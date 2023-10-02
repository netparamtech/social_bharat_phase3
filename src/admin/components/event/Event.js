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
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
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
    setSortField(sorter.field);
    setSortOrder(sorter.order);
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
        navigate("/admin");
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
        navigate("/admin");
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
        navigate("/admin");
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
      width: 150,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      width: 150,
    },
    {
      title: 'Email', dataIndex: 'email', width: 200,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      width: 150,
    },
    { title: "Event", dataIndex: "title", width: 150, },
    {
      title: "Location",
      dataIndex: "venue",
      render: (text, record) => {
        const { venue, city, state } = record;
        return `${venue}, ${city} (${state})`;
      },
      width: 150,
    },
    {
      title: "Thumb Image",
      dataIndex: "thumb_image",
      render: (text, record) => (
        <a href={record.thumb_image} target="_blank">
          <img
            src={record.thumb_image ? record.thumb_image : defaultImage}
            alt="Thumb Image"
            title="Thumb Image"
            className="small-img-user-list"
          />
        </a>
      ),
      width: 150,
    },

    {
      title: "Banner Image",
      field: "banner_image",
      render: (text, record) => (
        <a href={record.banner_image} target="_blank">
          <img
            src={record.banner_image ? record.banner_image : defaultImage}
            alt="Thumb Image"
            title="Thumb Image"
            className="small-img-user-list"
          />
        </a>
      ),
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
      sortDirections: ['ascend', 'descend'],
      fixed: 'right',
      width:100,
    },

    {
      title: "Event Start At",
      dataIndex: "start_datetime",
      render: (text, record) => formatDate(record.start_datetime),
      fixed: 'right',
      width: 150,

    },
    {
      title: "Event End At",
      dataIndex: "end_datetime",
      render: (text, record) => formatDate(record.end_datetime),
      fixed: 'right',
      width: 150,

    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
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
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      with:200,
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
        title={() => 'Events'}  // Set the title to 'Enquiries'
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
        scroll={{
          x: 1300,
        }}
      // onChange={handleSearchChange}
      />
    </div>
  );
};

export default Event;
