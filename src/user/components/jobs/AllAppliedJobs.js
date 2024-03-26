import { Select, Table } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllAppliedJobs, toggleStatusInactiveForIds } from "../../services/userService";
import { useEffect, useState } from "react";
import Search from "antd/es/input/Search";
import { Option } from "antd/es/mentions";

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
    const [isChecked, setIsChecked] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);

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
    const handleCheckboxChange = (rowId) => {

        const updatedSelectedRowKeys = selectedRowKeys.includes(rowId)
            ? selectedRowKeys.filter((id) => id !== rowId)
            : [...selectedRowKeys, rowId];
        setSelectedRowKeys(updatedSelectedRowKeys);
    };

    const colorDropdown = (
        <Select
            style={{ width: 120 }}
            placeholder="Select Color"
            onSelect={(color) => setSelectedColor(color)}
        >
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
            <Option value="green">Green</Option>
            {/* Add more color options as needed */}
        </Select>
    );

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            render: (text, record, index) => index + 1,width:70,
        },
        {
            title: 'Company',
            dataIndex: 'company',width:200,
        },
        {
            title: 'Job Title', dataIndex: 'job_title',width:200,
        },
        {
            title: 'Applied Date', dataIndex: 'applied_date', render: (text, record, index) => (
                <div className="">
                    {formatDate(record.applied_date)}
                </div>
            ),width:200,
        },
        {
            title: 'Select', dataIndex: 'id', render: (text, record, index) => (
                <div className="">
                    <input type="checkbox" className="form-check-input" onChange={() => handleCheckboxChange(record.id)} />
                </div>
            ),width:100,
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

    const handleClearClicked = async () => {
        const data = {
            ids: selectedRowKeys,
        }
        const isConfirmed = window.confirm("Are you certain you wish to proceed with the clearance process? Please note that all cleared items will no longer be visible.");
        if (isConfirmed) {
            try {
                const response = await toggleStatusInactiveForIds(data);
                if (response && response.status === 200) {
                    setIsChecked(false);
                    setSelectedRowKeys([]);
                    fetchMyJobs();
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {

                } else if (error.response && error.response.status === 401) {
                    navigate("/login");
                } else if (error.response && error.response.status === 500) {
                    setServerError("Oops! Something went wrong on our server.");
                }
            }
        }
    }

    useEffect(() => {
        fetchSearchData();
    }, [searchQuery]);

    useEffect(() => {
        if (selectedRowKeys.length > 0) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [selectedRowKeys]);

    useEffect(() => {
        fetchMyJobs();
    }, []);
    return (
        <div id="service-section" className="pt-4 mb-5">
            <div className="container">
                <div className="card shadow card-search">
                    {serverError && <span className="error">{serverError}</span>}

                    <div className=" card-header shadow py-3 fs-6 rounded justify-content-between d-flex">
                        <div> Applied Jobs</div>
                        <div><button type="button" className="rounded border-0" disabled={!isChecked} onClick={handleClearClicked}>Clear</button>
                        </div>
                        <div className="hover-pointer-green hover-pointer" onClick={() => navigate(-1)}><i class="fa-solid fa-angles-left"></i> Go Back</div>
                    </div>
                    <div className="card-body">
                        <div>
                            <Search
                                placeholder="Search"
                                allowClear
                                onChange={handleSearchChange}
                                style={{ marginBottom: 20, width: 200 }}
                            />

                            <Table
                                dataSource={data}
                                columns={columns}
                                scroll={{
                                    y: 540,
                                    x: 0,
                                }}
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllAppliedJobs;