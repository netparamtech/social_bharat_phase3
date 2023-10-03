import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {
  deleteTestimonialByID,
  fetchTestimonials,
  updateToggleStatusForTestimonial,
} from "../../services/AdminService";
import { useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';

const Testimonial = () => {
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
      const response = await fetchTestimonials(page, size, searchQuery, sortField, sortOrder);

      setData(response.data.data);

      setTotalRows(response.data.totalRecords);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        navigate('/server/error');
      }
    }
  };

  const handleTestimonialToggleStatus = async (id) => {
    try {
      const response = await updateToggleStatusForTestimonial(id);
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

  const handleDeleteTestimonial = async (id) => {
    try {
      const response = await deleteTestimonialByID(id);
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

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const generateRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i} className="fas fa-star text-warning me-2"></span>
      );
    }
    return stars;
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
      width:100,
    },
    { title: 'Name', dataIndex: 'name',sorter: true,
    sorter: true,
    sortDirections: ['asc', 'desc'],
  },
    { title: 'Email', dataIndex: 'email',
    sorter: true,
    sortDirections: ['asc', 'desc'],
   },
    { title: 'Message', dataIndex: 'message',
    sorter: true,
    sortDirections: ['asc', 'desc'], },

    { title: 'Rating', dataIndex: 'rating', render:(text,record)=>(generateRatingStars(record.rating)),width:180,
    sorter: true,
    sortDirections: ['asc', 'desc'],
  },
   
    {
      title: "Last Modified At",
      dataIndex: "updated_at",
      render: (text, record) => calculateTimeDifference(record.updated_at),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div>
          {record.status === 'Active' ? (
           <a
           className="collapse-item m-2"
           href="#"
           onClick={(e) => {
             e.preventDefault();
             handleTestimonialToggleStatus(record.id);
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
             handleTestimonialToggleStatus(record.id);
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
              handleDeleteTestimonial(record.id);
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

  return (
    <div>
       <Search
        placeholder="Search"
        allowClear
        onSearch={handleSearchChange}
        style={{ marginBottom: 20,width:200 }}
      />
      <Table
      title={() => 'Enquiries'}  // Set the title to 'Enquiries'
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

export default Testimonial;
