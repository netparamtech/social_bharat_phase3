import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {
    UsersRequestedForNewService,
    deleteEnquiry,
    fetchAllEnquiries,
    searchUsersInService,
    updateToggleStatusForEnquiry,
    updateToggleStatusForUserRegisteredService,
} from '../../services/AdminService';
import { useNavigate, useParams } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';

const RequestedForNewService = () => {
    const { title } = useParams();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
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
        dispatch(setLoader(true));
        try {
            const response = await UsersRequestedForNewService(page, size);
            setData(response.data.data.users);
            setTotalRows(response.data.data.totalRowsFetched);
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

    const handleServiceToggleStatus = async (id) => {
        try {
            const response = await updateToggleStatusForUserRegisteredService(id);
            if (response && response.status === 200) {
                fetchData();
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

    const handleDeleteEnquiry = async (id) => {
        try {
            const response = await deleteEnquiry(id);
            if (response && response.status === 200) {
                fetchData();
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

    // Rest of the code for handleUserToggleStatus, handleDeleteEnquiry, formatDate, and columns remains the same

    useEffect(() => {
        fetchData();
    }, [page, size, searchQuery]);

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            render: (text, record, index) => index + 1,
            width: 50,
        },
        {
            title: 'Name', dataIndex: 'name',
            with: 150,
        },
        {
            title: 'Service Title', dataIndex: 'title',
            with: 150,
        },
        {
            title: 'Experience', dataIndex: 'experience',
        },
        {
            title: 'Mobile', dataIndex: 'mobile',
            render: (text, record) => (
                <p>
                    <a href={`tel:${record.mobile1}`}>
                        {record.mobile1}
                    </a>
                    {record.mobile2 ? (
                        <>
                            ,{" "}
                            <a href={`tel:${record.mobile2}`}>
                                {record.mobile2}
                            </a>
                        </>
                    ) : (
                        ""
                    )}
                    <a href={`tel:${record.masked_mobile}`}>
                        ,{record.masked_mobile}
                    </a>
                </p>
            )
        },
        {
            title: 'Service At', dataIndex: 'location',
        },
        {
            title: 'Description', dataIndex: 'description',
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
                                handleServiceToggleStatus(record.user_service_id);
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
                                handleServiceToggleStatus(record.user_service_id);
                            }}
                        >
                            <i className="fa fa-thumbs-down" title="Inactive" />
                        </a>
                    )}
                </div>
            ),

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
        // Rest of the columns definition
    ];

    return (
        <div>
            <div className=" card-header  d-sm-flex align-items-center mb-4">
                <h1 className="h3 mb-0 text-gray-800">All New Services</h1>

                <a className="d-sm-inline-block btn btn-sm btn-primary shadow-sm hover-pointer-admin ms-auto"
                    onClick={(e) => {
                        e.preventDefault();
                        // navigate('/admin/service/create')
                    }}
                >
                    Requested Services
                </a>
                <a className="d-sm-inline-block btn btn-sm btn-primary shadow-sm hover-pointer-admin ms-2"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/admin/service/index')
                    }}
                >
                    All Services
                </a>
            </div>
            <Search
                placeholder="Search"
                allowClear
                onSearch={handleSearchChange}
                style={{ marginBottom: 20, width: 200 }}
            />

            <Table
                title={() => title}  // Set the title to 'Enquiries'
                dataSource={data}
                columns={columns}
                pagination={{
                    current: page,
                    pageSize: size,
                    total: totalRows,
                    onChange: handlePageChange,
                    onShowSizeChange: handlePageSizeChange,
                }}
                scroll={{
                    x: true,
                }}
                onChange={handleTableChange}
                rowKey={(record) => record.id}
            // onChange={handleSearchChange}
            />
        </div>
    );
};

export default RequestedForNewService;
