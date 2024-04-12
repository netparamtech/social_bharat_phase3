import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteJobsPosted, fetchAllJobsPosted, toggleJobPostFeatured, toggleJobPostStatus } from "../../services/AdminService";
import { Table } from "antd";
import { setLoader } from "../../actions/loaderAction";
import {
    Navbar,
    Nav,
    Form,
    FormControl,
} from "react-bootstrap";
import UpdateJobPosted from "./UpdateJobPosted";

const CurrentOpenings = (props) => {
    const {isCurrentOpnings} = props;
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

    const handleSearchChange = (e) => {
        setPage(1);
        setSearchQuery(e.target.value);
        console.log(e.target.value)
    };

    const fetchData = async () => {

    };

    const handleStatusToggle = async (id) => {
        try {
            const response = await toggleJobPostStatus(id);
            if (response && response.status === 200) {
                fetchData();
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/admin");
            } else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate("/server/error", { state: { errorMessage } });
            }
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete?");
        if (isConfirmed) {
            try {
                const response = await deleteJobsPosted(id);
                if (response && response.status === 200) {
                    fetchData();
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate("/admin");
                } else if (error.response && error.response.status === 500) {
                    let errorMessage = error.response.data.message;
                    navigate("/server/error", { state: { errorMessage } });
                }
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
            title: "S.No",
            dataIndex: "sno",
            render: (text, record, index) => (page - 1) * size + index + 1,
            width: 100,
        },
        {
            title: "Role",
            dataIndex: "name",
        },
        {
            title: "Company Name",
            dataIndex: "job_title",
        },
        {
            title: "Apply URL",
            dataIndex: "job_title",
        },
        {
            title: "Job Posted",
            dataIndex: "updated_at",
            render: (text, record) => calculateTimeDifference(record.updated_at),
        },
        {
            title: "Job Created",
            dataIndex: "created_at",
            render: (text, record) => calculateTimeDifference(record.updated_at),
        },

        {
            title: "Status",
            dataIndex: "status",
            render: (text, record) => (
                <div >
                    {record.status == "true" ? (
                        <a
                            className="collapse-item hover-pointer-admin "
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
        },
       
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex justify-content-between" style={{ width: '80px' }}>
                    {/* {
                        activeNavItem === 'MY JOBS' ? (
                            <a
                                className="collapse-item hover-pointer-admin"
                                onClick={(e) => actionInModelToUpdate(true, record.id)}
                            >
                                <i className="fa fa-edit mr-4" title="Edit" />
                            </a>
                        ) : ''
                    } */}

                    <a
                        className="collapse-item hover-pointer-admin"
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete(record.id);
                        }}
                    >
                        <i className="fas fa-trash "></i>
                    </a>
                    <a
                        className="collapse-item hover-pointer-admin"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent the default anchor tag behavior
                            navigate(`/admin/rgistered-users/${record.id}/job/${record.job_title}/company/${record.job_subheading}`);
                        }}
                    >
                        <i className="fas fa-eye "></i>
                    </a>
                </div>
            ),
        },
        // Rest of the columns definition
    ];

    useEffect(() => {
        if ( searchQuery || page) {

            fetchData();
        }
    }, [ searchQuery, page]);
    return (
        <div>
            <div id="" className="">
                <div className="row">
                    <div className="col-12 col-sm-12">
                        <div className="card shadow">

                            <div className="card-body">
                                <Table
                                    title={() => 'CURRENT OPENINGS'} // Set the title to 'Enquiries'
                                    dataSource={data}
                                    columns={columns}
                                    pagination={{
                                        current: page,
                                        pageSize: size,
                                        total: totalRows,
                                        onChange: handlePageChange,
                                        onShowSizeChange: handlePageSizeChange,
                                    }}
                                    // onChange={handleTableChange}

                                    rowKey={(record) => record.id}
                                // onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* <div className="card col-12 col-sm-3 m-2">
                    <FeaturedJobs />
                </div> */}
                </div>
            </div>
        </div>
    );
};

export default CurrentOpenings;
