import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteQualificationsByID,  deleteServiceByID,  fetchAllQualifications, fetchAllServices, updateToggleStatusForQualifications, updateToggleStatusForService } from "../../services/AdminService";
import Search from "antd/es/input/Search";
import { Table } from "antd";
import { setLoader } from "../../actions/loaderAction";

const ServiceList = () => {
  const [data, setData] = useState([]);
  const [copyData,setCopyData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(7);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePageSizeChange = (current, pageSize) => {
    setSize(pageSize);
  };

  const handleSearchChange = (e) => {
    setPage(1);
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

  const fetchData = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllServices();

      setData(response.data.data);
      setCopyData(response.data.data);
      setTotalRows(response.data.data.length);

      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage} });
      }
    }
  };

  const handleStatusToggle = async (id) => {
    try {
      const response = await updateToggleStatusForService(id);
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

  const handleDelete = async (id) => {
    try {
      const response = await deleteServiceByID(id);
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
      title: 'Status', dataIndex: 'status',
      render: (text, record) => (
        <div>
          {record.status === 'Active' ? (
            <a
              className="collapse-item hover-pointer-admin m-2"
              onClick={(e) => {
                e.preventDefault();
                handleStatusToggle(record.id);
              }}
            >
              <i className="fa fa-thumbs-up text-primary" title="Active" />
            </a>
          ) : (
            <a
              className="collapse-item text-secondary hover-pointer-admin m-2"
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
            className="collapse-item hover-pointer-admin"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/admin/service/update/${record.id}`)
            }}
          >
            <i className="fa fa-edit mr-4" title="Edit" />
          </a>

          <a
            className="collapse-item hover-pointer-admin"
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

  useEffect(()=>{
    const filteredData = copyData.filter(item=>item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setData(filteredData);
  },[searchQuery]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Master Services</h1>
        <a className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm hover-pointer-admin"
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/service/create')
          }}
        >
          Create Service
        </a>
      </div>
      
      <Search
        placeholder="Search"
        allowClear
        onChange={handleSearchChange}
        style={{ marginBottom: 20, width: 200 }}
      />
      <Table
        title={() => 'Services'}  // Set the title to 'Catagories'
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

export default ServiceList;
