import { Table } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUserRegisteredSingleService, fetchAllAppliedJobs, fetchUserRegisteredServices, userAppliedForSameJob } from "../../services/userService";
import { useEffect, useState } from "react";
import { setLoader } from "../../actions/loaderAction";
import DropdownOnServices from "../services/DropdownOnServices";

const AllAppliedJobs = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [copiedData, setCopiedData] = useState([]);
    const [serverError, setServerError] = useState('');
    const [isAndroidUsed, setIsAndroidUsed] = useState(false);
    const [horizontalScroll, setHorizontalScroll] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [defaultImage, setDefaultImage] = useState(
        "/user/images/download.png"
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handlePageSizeChange = (current, pageSize) => {
        setSize(pageSize);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const fetchMyJobs = async () => {
        try {
            const response = await fetchAllAppliedJobs();
            if (response && response.status === 200) {
                setData(response.data.data);
                setCopiedData(response.data.data);
                setTotalRows(response.data.data.length);
                setServerError("");
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
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
            title: 'S.No',
            dataIndex: 'sno',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Company',
            dataIndex: 'company',
        },
        {
            title: 'Job Title', dataIndex: 'job_title',
        },
        {
            title: 'Applied Date', dataIndex: 'applied_date', render:(text, record, index) => (
                formatDate(record.applied_date)
            )
        },

    ];

    const fetchSearchData = () => {
        if (copiedData) {
            // Filter the data based on the search query
            const filteredData = copiedData.filter(item =>
                item.company.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setData(filteredData);
        }
    }

    useEffect(() => {
        fetchSearchData();
    }, [searchQuery]);

    useEffect(() => {
        fetchMyJobs();
    }, []);
    return (
        <div id="service-section" className="pt-4 mb-5">
            <div className="container">
                <div className="card shadow card-search">
                    {serverError && <span className="error">{serverError}</span>}
                    <div className="card-header bg-darkskyblue">
                        <div className="d-sm-flex align-items-center justify-content-between ">
                            REGISTERED JOBS
                            <a className="text-decoration-none hover-pointer" onClick={() => navigate('/user/search/jobs')}>GO BACK</a>
                        </div>
                    </div>
                    <div className="card-body">
                        <div>

                            <Table
                                title={() => 'Applied Jobs'}  // Set the title to 'Enquiries'
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllAppliedJobs;