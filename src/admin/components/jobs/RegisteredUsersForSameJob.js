import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {
    deleteEnquiry,
    updateToggleStatusForUserRegisteredService,
    userAppliedForSameJob,
} from '../../services/AdminService';
import { useNavigate, useParams } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';

const RegisteredUsersForSameJob = () => {
    const { id } = useParams();
    const { title } = useParams();
    const { company } = useParams();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
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

    const fetchData = async () => {
        dispatch(setLoader(true));
        try {
            const response = await userAppliedForSameJob(id, searchQuery, page, size);
            setData(response.data.data.registeredUsers);
            setTotalRows(response.data.data.totalRowsAffected);
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
            title: 'email', dataIndex: 'email',
        },
        {
            title: 'Mobile', dataIndex: 'mobile',
        },
        {
            title: "Applied Date",
            dataIndex: "applied_date",
            render: (text, record) => formatDate(record.applied_date),
        },
        {
            title: "Remark",
            dataIndex: 'remark',
            width: 100,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div>
                    <a className="collapse-item hover-pointer-admin" onClick={() => navigate(`/users/view/${record.user_id}`)}>
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
            <div className=" card-header bg-gray   d-sm-flex align-items-center justify-content-between mb-4">
                {/* <h4 className="mb-0 text-gray-800">Registered Users In {title}</h4> */}
                <div className="ms-auto">
                    
                    <a className="d-sm-inline-block btn btn-sm btn-primary shadow-sm hover-pointer-admin"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/admin/job-board')
                        }}
                    >
                        JOB BOARD
                    </a>
                </div>
            </div>
            <Search
                placeholder="Search by job title, email, company name, mobile.."
                allowClear
                onSearch={handleSearchChange}
                style={{ marginBottom: 20, width: 400 }}
            />

            <Table
                title={() => `${title}, COMPANY - ${company}`}  // Set the title to 'Enquiries'
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
                rowKey={(record) => record.id}
            // onChange={handleSearchChange}
            />
        </div>
    );
};

export default RegisteredUsersForSameJob;
