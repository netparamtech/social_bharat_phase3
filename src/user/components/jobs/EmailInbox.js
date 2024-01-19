import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import { useDispatch } from 'react-redux';
import { fetchMails } from '../../services/userService';
import { setLoader } from '../../actions/loaderAction';

const EmailInbox = (props) => {
    const { handleInboxChange, ids } = props;
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [serverError, setServerError] = useState('');
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
        const data = {
            searchQuery,
            page,
            size,
            ids,
        }
        try {
            const response = await fetchMails(data);
            setData(response.data.data.emails);
            setTotalRows(response.data.data.totalRowsAffected);
            setServerError('');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
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
    }, [page, size, ids,searchQuery]);

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
            title: 'Email', dataIndex: 'email_to',
        },
        {
            title: 'Subject', dataIndex: 'subject',
        },
        {
            title: 'Message', dataIndex: 'message',
        },

        {
            title: "Date",
            dataIndex: "updated_at",
            render: (text, record) => calculateTimeDifference(record.updated_at),
        },

        // {
        //     title: 'Actions',
        //     dataIndex: 'actions',
        //     render: (text, record) => (
        //         <div>

        //             <a
        //                 className="collapse-item"
        //                 href="#"
        //                 onClick={(e) => {
        //                     e.preventDefault();
        //                     handleDeleteEnquiry(record.id);
        //                 }}
        //             >
        //                 <i className="fas fa-trash"></i>
        //             </a>
        //         </div>
        //     ),
        //     fixed: 'right',
        //     width: 100,
        // },
        // Rest of the columns definition
    ];

    return (
        <div>
            {serverError && <span className="error">{serverError}</span>}
            <div className='d-flex justify-content-between'>
                <Search
                    placeholder="Search"
                    allowClear
                    onSearch={handleSearchChange}
                    style={{ marginBottom: 20, width: 200 }}
                />
                <button className='btn btn-success custom-small-btn hover-pointer-green' onClick={()=>handleInboxChange(false)}>Back</button>
            </div>
            <Table
                title={() => 'Emails'}  // Set the title to 'Enquiries'
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
            // onChange={handleSearchChange}
            />
        </div>
    );
};

export default EmailInbox;