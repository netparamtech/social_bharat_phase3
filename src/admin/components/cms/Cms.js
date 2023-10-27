import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {
  deleteCommunity,
  fetchAllCommunity,
  fetchAllPagesCMS,
  updateCommunityStatus,
} from "../../services/AdminService";
import { useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';

const Cms = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [defaultImage, setDefaultImage] = useState('img/en.jpg');
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePageSizeChange = (current, pageSize) => {
    setSize(pageSize);
  };

  const handleSearchChange = (query) => {
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
      const response = await fetchAllPagesCMS();
      setData(response.data.data);
      setTotalRows(response.data.data.length);
    } catch (error) {
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
      title: 'Page', dataIndex: 'page',
      sorter: true,
      sortDirections: ['asc', 'desc'],
      with: 100,
    },

    {
      title: 'Sections', dataIndex: 'about',
      render: (text, record) => (
        <div>
          <button className='btn btn-success'>About</button>
          <button className='btn btn-primary m-2'>Services</button>
        </div>
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
        <h1 className="h3 mb-0 text-gray-800">Master CMS</h1>
        <h5 className="h5 mb-0 text-gray-800">Content Management System (CMS)</h5>
        <a href="" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/cms/update')
          }}
        >
          Update CMS
        </a>
      </div>
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-success shadow h-100 py-2">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col mr-2">
                <div className="h5 mb-0 font-weight-bold text-gray-800">

                  <span className="text-xs font-weight-bold  text-uppercase mb-1">
                    <a className="text-success stretched-link hover-pointer-admin" onClick={() => navigate('/home/cms')}>
                    <h3>  HOME</h3>
                    </a>
                  </span>
                </div>
              </div>
              <div className="col-auto">
                <h1>
                  <i class="fa fa-home h-20 text-gray-300" aria-hidden="true"></i>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cms;
