import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { fetchAllUsers, permissionById, updateToggleStatus } from '../../services/AdminService';

import { useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Modal, Button } from 'react-bootstrap';

const UserList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [show, setShow] = useState(false);
  const [permissionId, setPermissionId] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [permissions, setPermissions] = useState({
    jobPermission: false,
    servicePermission: false,
    eventPermission: false,
    matrimonialPermission: false,
    businessPermission: false
  });
  const [permissionData, setPermissionData] = useState('');

  const handlePermissionChange = (permission) => {
    setPermissions({
      ...permissions,
      [permission]: !permissions[permission]
    });
  };


  const [defaultImage, setDefaultImage] = useState('img/de-default.png');

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
  const handleShowChange = (id) => {
    setPermissionId(id);
    setShow(!show);
  }
  const handleClose = () => {
    setShow(!show);
  }

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

  const fetchPermission = async (id) => {
    dispatch(setLoader(true));
    try {
      const response = await permissionById(id);
      setPermissionData(response.data.data);

    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    } finally {
      dispatch(setLoader(false));
    }
  }

  const fetchData = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllUsers(page, size, searchQuery, sortField, sortOrder);

      setData(response.data.data);

      setTotalRows(response.data.totalRecords);
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
        navigate('/server/error', { state: { errorMessage } });
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

  useEffect(()=>{
    if(permissionId){
      fetchPermission(permissionId)
    }
  },[permissionId]);
  useEffect(()=>{
    if(permissionData){
      setPermissions({
        jobPermission: permissionData.job_permission,
        servicePermission: permissionData.sevice_permission,
        eventPermission: permissionData.event_permission,
        matrimonialPermission: permissionData.matrimonial_permission,
        businessPermission: permissionData.business_permission
      })
    }
  },[permissionData]);

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
            width={30} height={40}
          />
        </a>
      ),

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
      width: 200,
    },

    {
      title: "Last Modified At",
      dataIndex: "updated_at",
      render: (text, record) => calculateTimeDifference(record.updated_at),
      sorter: true,
      sortDirections: ['asc', 'desc'],
      width: 150,
    },

    {
      title: 'Status', dataIndex: 'status', render: (text, record) => (record.status === 'Active' ? (
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
      width: 100,
    },
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
      width: 100
    },
    {
      title: 'Role',
      dataIndex: 'is_admin',
      render: (text, record) => (
        <div>
          <a className="collapse-item hover-pointer-admin"
            onClick={() => handleShowChange(record.permission_id)}
          >
            {
              record.is_admin ? <p className='text-danger'>ADMIN</p> : <p className='text-secondary'>USER</p>
            }
          </a>
        </div>
      ),
      width: 100
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
      } else if (days) {
        const months = Math.floor(days / 30);
        if (!months) {
          return `${days} day ago`;
        } else {
          const years = Math.floor(months / 12);
          if (!years) {
            return `${months} months ago`;
          } else {
            return `${years} years ago`;
          }
          return `${months} months ago`;
        }
      }
      return `${days} day ago`;
    }
  };

  const exportToExcel = async () => {
    dispatch(setLoader(true));

    try {
      const response = await fetchAllUsers(page, totalRows, searchQuery, sortField, sortOrder);
      const fetchedData = response.data.data;
      if (fetchedData !== null) {
        // Create a new workbook
        const wb = XLSX.utils.book_new();

        // Add a worksheet to the workbook
        const ws = XLSX.utils.json_to_sheet(fetchedData);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'User Data');

        // Save the workbook to an Excel file
        XLSX.writeFile(wb, 'user_data.xlsx');
      } else {
        alert('No User Available');
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    } finally {
      dispatch(setLoader(false));
    }
  };


  return (
    <div>
      <div className='d-sm-flex align-items-center justify-content-between mb-4'>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Permissions Controller</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='m-2'>
              <label>
                <input
                  className='m-2'
                  type="checkbox"
                  checked={permissions.jobPermission}
                  onChange={() => handlePermissionChange('jobPermission')}
                />
                Job Permission
              </label>
              <br />
              <label>
                <input
                  className='m-2'
                  type="checkbox"
                  checked={permissions.servicePermission}
                  onChange={() => handlePermissionChange('servicePermission')}
                />
                Service Permission
              </label>
              <br />
              <label>
                <input
                  className='m-2'
                  type="checkbox"
                  checked={permissions.eventPermission}
                  onChange={() => handlePermissionChange('eventPermission')}
                />
                Event Permission
              </label>
              <br />
              <label>
                <input
                  className='m-2'
                  type="checkbox"
                  checked={permissions.matrimonialPermission}
                  onChange={() => handlePermissionChange('matrimonialPermission')}
                />
                Matrimonial Permission
              </label>
              <br />
              <label>
                <input
                  className='m-2'
                  type="checkbox"
                  checked={permissions.businessPermission}
                  onChange={() => handlePermissionChange('businessPermission')}
                />
                Business Permission
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Search
          placeholder="Search"
          allowClear
          onSearch={handleSearchChange}
          style={{ marginBottom: 20, width: 200 }}
        />
        {/* <button className='btn btn-primary' onClick={generatePDF}>Export to PDF</button> */}
        <button className='btn btn-primary' onClick={exportToExcel}>Export to Excel</button>
      </div>

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
