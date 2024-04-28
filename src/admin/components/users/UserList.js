import React, { useEffect, useId, useState } from 'react';
import { Table } from 'antd';
import { deleteUser, fetchAdmin, fetchAllUsers, permissionById, toggelAdmin, updatePermissions, updateToggleStatus } from '../../services/AdminService';

import { useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { successOptions } from '../../../toastOption';

const UserList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [show, setShow] = useState(false);
  const [uId, setUid] = useState('');
  const [permissionId, setPermissionId] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userType, setUserType] = useState(false);
  const [userPhoto, setUserPhoto] = useState('');
  const [searchAdmin, setSearchAdmin] = useState(0);
  const [name, setName] = useState('');
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

  const handleSearchAdmin = () => {
    setSearchAdmin(searchAdmin === 0 ? 1 : 0);
  }

  const handleSearchChange = (query) => {
    setPage(1);
    setSearchQuery(query);
  };
  const handleShowChange = (pId, uId, photo, name) => {
    setPermissionId(pId);
    setUid(uId);
    setShow(true);
    setUserPhoto(photo);
    setName(name);
  }
  const handleClose = () => {
    setShow(false);
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
  const toggleAdminStatus = async () => {
    console.log("Hello", uId)
    if (uId) {
      try {
        const response = await toggelAdmin(uId);
        setUserType(response.data.is_admin);
        setIsAdmin(response.data.is_admin);
        fetchData();

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
  }
  const fetchAdminStatus = async (id) => {
    console.log("Hello")
    try {
      const response = await fetchAdmin(id);
      setIsAdmin(response.data.is_admin);
      setUserType(response.data.is_admin)
      setShow(true);

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


  const fetchPermission = async () => {
    dispatch(setLoader(true));
    try {
      const response = await permissionById(permissionId);
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
      const response = await fetchAllUsers(page, size, searchQuery, searchAdmin, sortField, sortOrder);

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

  const deleteUserFromAll = async (id) => {
    dispatch(setLoader(true));
    try {
      const isConfirmed = window.confirm("If you proceed with deleting the user, their presence will be completely removed from all modules within the system. This action is irreversible and will result in the permanent deletion of all associated data and records related to the user.")
      if (isConfirmed) {
        const isConfirmed = window.confirm("Are You Confirmed ?");
        if (isConfirmed) {
          const response = await deleteUser(id);
          const afterDelete = data.filter(item => item.id !== id);
          setData(afterDelete);
        }

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
  const handlePermissionSubmit = async () => {
    console.log(permissions, "onSub,it")
    dispatch(setLoader(true));
    const data = {
      job_permission: permissions.jobPermission,
      service_permission: permissions.servicePermission,
      event_permission: permissions.eventPermission,
      matrimonial_permission: permissions.matrimonialPermission,
      business_permission: permissions.businessPermission,
    }
    try {
      const response = await updatePermissions(data, permissionId);
      toast.success("Successfully Assigned Permissions", successOptions);
      setShow(false);

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

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };
  // Rest of the code for handleUserToggleStatus, handleDeleteEnquiry, formatDate, and columns remains the same

  useEffect(() => {
    fetchData();
  }, [page, size, searchQuery, searchAdmin, sortField, sortOrder]);

  useEffect(() => {
    if (show) {
      fetchAdminStatus(uId);
      fetchPermission();
    }
  }, [show]);
  useEffect(() => {

  }, [userType]);

  useEffect(() => {
    if (permissionData) {
      setPermissions({
        jobPermission: permissionData.job_permission,
        servicePermission: permissionData.service_permission,
        eventPermission: permissionData.event_permission,
        matrimonialPermission: permissionData.matrimonial_permission,
        businessPermission: permissionData.business_permission
      })
    }
  }, [permissionData]);
  useEffect(() => {
    if (!isAdmin) {
      setPermissions({
        jobPermission: 0,
        servicePermission: 0,
        eventPermission: 0,
        matrimonialPermission: 0,
        businessPermission: 0
      })
    }
  }, [isAdmin]);

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
          <a className="collapse-item m-2" onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            deleteUserFromAll(record.id);
          }}>
            <i className="fa fa-trash" title='Delete' />
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
            onClick={() => handleShowChange(record.permission_id, record.id, record.photo, record.name)}
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
        <Modal show={show} onHide={handleClose} className=''>
          <Modal.Header closeButton className='bg-secondary text-light'>
            <Modal.Title>Permissions Controller</Modal.Title>
          </Modal.Header>
          <Modal.Body className='bg-secondary'>
            <div className='row text-light'>
              <div className='col-6'>
                <div className='m-2'>
                  <div className='m-2'>
                    <label>
                      <input
                        type="radio"
                        value={userType}
                        checked={userType}
                        onClick={toggleAdminStatus}
                        className="red-radio-button" // Apply custom CSS class
                      />
                      Admin
                    </label>
                  </div>
                  <label>
                    <input
                      className='m-2'
                      type="checkbox"
                      checked={permissions.jobPermission}
                      onChange={() => handlePermissionChange('jobPermission')}
                      disabled={isAdmin ? false : true}
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
                      disabled={isAdmin ? false : true}
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
                      disabled={isAdmin ? false : true}
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
                      disabled={isAdmin ? false : true}
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
                      disabled={isAdmin ? false : true}
                    />
                    Business Permission
                  </label>
                </div>
              </div>
              <div className='col-6' style={{ border: '1px solid' }}>
                <div className='row'>
                  <div className='col-8'>
                    <h4 className='text-info'>Permissions Assigned</h4>
                    <p>{permissions.jobPermission ? 'Job Permission' : ''}</p>
                    <p>{permissions.servicePermission ? 'Service Permission' : ''}</p>
                    <p>{permissions.eventPermission ? 'Event Permission' : ''}</p>
                    <p>{permissions.businessPermission ? 'Business Permission' : ''}</p>
                    <p>{permissions.matrimonialPermission ? 'Matrimonial Permission' : ''}</p>

                  </div>
                  <div className='col-4 mt-2'>
                    <img
                      src={userPhoto ? userPhoto : defaultImage}
                      className='small-img-user-list'
                      width={40} height={40}
                      style={{ borderRadius: '50%' }}
                    />
                    <p className='fw-bold mt-2' style={{ fontSize: '8px' }}>{name}</p>
                  </div>
                </div>


              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className='bg-secondary'>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handlePermissionSubmit}>
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
        <button className='btn btn-primary' onClick={handleSearchAdmin}>{searchAdmin ? 'All Users' : 'Only Admins'}</button>
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
