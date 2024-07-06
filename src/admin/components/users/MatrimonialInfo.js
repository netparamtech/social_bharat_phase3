import React, { useEffect, useState } from 'react';
import { Image, Table } from 'antd';
import {
  deleteEnquiry,
  deleteSingleMatrimonial,
  fetchAllMatrimonialByOneUser,
  fetchCountOfMatrimonialPostedUserWiseAsInOneCommunity,
  setRemarkForEnquiry,
  updateToggleStatusForEnquiry,
  updateToggleStatusForMatrimonial,
} from '../../services/AdminService';
import { useNavigate, useParams } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';

const MatrimonialInfo = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [remark, setRemark] = useState('');
  const [matriId, setMatriId] = useState('');
  const [userName, setUserName] = useState('');

  const [page1, setPage1] = useState(1);
  const [size1, setSize1] = useState(10);
  const [totalRows1, setTotalRows1] = useState(0);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePageSizeChange = (current, pageSize) => {
    setSize(pageSize);
  };

  const handlePage1Change = (page) => {
    setPage1(page);
  };

  const handlePageSize1Change = (current, pageSize) => {
    setSize1(pageSize);
  };

  const handleMatriIdChange = (id, name) => {
    setMatriId(id);
    setUserName(name);
  }


  const handleSearchChange = (query) => {
    setPage(1);
    setSearchQuery(query);
  };
  const handleSearch = (query) => {
    setPage1(1);
    setSearch(query);
  };
  const handleRemarkChange = (id, e) => {
    setRemark(e.target.value);
  }

  const fetchData = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchCountOfMatrimonialPostedUserWiseAsInOneCommunity(search, page1, size1, id);
      setItems(response.data.combinedResult.dataResult);
      // setTotalRows(response.data.totalRecords);
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    }
  };

  const fetchMatrimonialData = async (id) => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllMatrimonialByOneUser(id);
      setData(response.data.result);
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    }
  };

  const handleMatrimonialToggleStatus = async (id) => {
    try {
      const response = await updateToggleStatusForMatrimonial(id);
      if (response && response.status === 200) {
        // const filterData = data.filter(item => item.id !== id);
        // setData(filterData);
        fetchMatrimonialData(matriId);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    }
  };

  const handleDeleteMatrimonial = async (id) => {
    try {
      const response = await deleteSingleMatrimonial(id);
      if (response && response.status === 200) {
        const filterData = data.filter(item => item.id !== id);
        setData(filterData);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    }
  };

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

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [page1, size1, search, id]);

  useEffect(() => {
    if (matriId) {
      fetchMatrimonialData(matriId);
    }
  }, [matriId]);

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: 'Name', dataIndex: 'matrimonial_profile_name', sorter: true,
      render: (text, record) => (
        <p style={{ wordWrap: 'break-word', wordBreak: 'break-word' }} className='text-wrap-break-word'>{record.matrimonial_profile_name}</p>
      ),
      width: '50'
    },
    {
      title: 'Relation', dataIndex: 'profile_created_for', sorter: true,
      with: 150,
    },
    {
      title: "Proposal Photos",
      dataIndex: "proposal_photos",
      render: (text, record) => (
        <div>
          {record.proposal_photos && Array.isArray(record.proposal_photos) ? (
            record.proposal_photos.map((item, value) => (
              <Image
                src={item}
                width={50}
                height={50}
                className="p-1"
                style={{
                  objectFit: "contain",
                }}
              ></Image>
            ))
          ) : (
            <Image src={record.proposal_photos} width={100} />
          )}
        </div>
      ),
    },
    {
      title: 'Mobile', dataIndex: 'contact_number', sorter: true,
    },
    {
      title: 'Description', dataIndex: 'description', sorter: true,
      sortDirections: ['asc', 'desc'],
    },

    {
      title: "Last Modified At",
      dataIndex: "updated_at",
      render: (text, record) => calculateTimeDifference(record.updated_at),
    },
    {
      title: "Status",
      dataIndex: 'status',
      render: (text, record) => (
        <div>
          {record.status === 'Active' ? (
            <a
              className="collapse-item m-2"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMatrimonialToggleStatus(record.id);
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
                handleMatrimonialToggleStatus(record.id);
              }}
            >
              <i className="fa fa-thumbs-down" title="Inactive" />
            </a>
          )}
        </div>
      ),
      sorter: true,
      sortDirections: ['asc', 'desc'],
      width: 100,
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
              handleDeleteMatrimonial(record.id);
            }}
          >
            <i className="fas fa-trash"></i>
          </a>
        </div>
      ),
      fixed: 'right',
      width: 100,
    },
    // Rest of the columns definition
  ];

  return (
    <div>
      <div>
        <table className='table'>
          <thead>
            <th>Posted By</th>
            <th>Total Records</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {
              items && items.length > 0 && items.map((item, index) => (
                <tr>
                  <td>{item.posted_by}</td>
                  <td>{item.totalCount}</td>
                  <td><a
                    className="collapse-item"
                    onClick={() => handleMatriIdChange(item.user_id, item.posted_by)}
                  >
                    <i className="fas fa-eye"></i>
                  </a></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Search
        placeholder="Search"
        allowClear
        onSearch={handleSearchChange}
        style={{ marginBottom: 20, width: 200 }}
      />
      <Table
        title={() => `All Matrimonials Posted By - ${userName}`}
        dataSource={data}
        columns={columns}
        pagination={{
          current: page,
          pageSize: size,
          total: totalRows,
          onChange: handlePageChange,
          onShowSizeChange: handlePageSizeChange,
        }}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default MatrimonialInfo;
