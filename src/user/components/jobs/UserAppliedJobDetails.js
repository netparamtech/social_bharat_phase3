import React, { useState, useEffect } from 'react';
import { Table, Select, Image } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { changeRowColorInJobDetails, toggleUStatusInactiveForIds, updateRemarkInJobDetails, userAppliedForSameJob } from '../../services/userService';
import { Option } from 'antd/es/mentions';
import EmailModel from '../email/EmailModel';

const UserAppliedJobDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [copiedData, setCopiedData] = useState([]);
    const [jobTitle, setJobTitle] = useState('');
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
    const [checkedRows, setCheckedRows] = useState([]);
    const [jobId, setJobId] = useState('');
    const [remark, setRemark] = useState('');
    const [selectionType, setSelectionType] = useState('checkbox');
    const [isColor, setIsColor] = useState(false);

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
            const response = await userAppliedForSameJob(id);
            if (response && response.status === 200) {
                setData(response.data.data.jobs);
                setCopiedData(response.data.data.jobs);
                setTotalRows(response.data.data.jobs.length);
                setJobTitle(response.data.data.fetchJobTitle);
                setServerError('');
            }
        } catch (error) {
            // Unauthorized
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        }
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    useEffect(() => {
        if (selectedRowKeys.length > 0) {
            handleColorChange();
        }
    }, [isColor]);

    const colorDropdown = [
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
        { value: 'green', label: 'Green' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'no color', label: 'No Color' },
    ];

    const handleKeyDown = (e) => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault(); // Prevent the default browser save action
            updateRemark();
            // Your logic here when Ctrl + S is pressed
        }
    };

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Photo',
            dataIndex: 'photo',
            render: (text, record, index) => (
                <div>
                    <Image className="" src={record.photo ? record.photo : defaultImage} width={30} />
                </div>
            ),
        },
        {
            title: 'Username',
            dataIndex: 'username',
        },
        {
            title: 'Mobile 1',
            dataIndex: 'mobile',
        },
        {
            title: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Remark',
            dataIndex: 'remark',
            render: (text, record, index) => (
                <div>
                    <input type="text" className='rounded fs-6 border-0 px-2 bg-secondary text-light' onKeyDown={handleKeyDown} defaultValue={record.remark} onChange={(e) => handleRemarkChange(record.id, e)} onBlur={updateRemark} />
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (text, record, index) => (
                <div className='d-flex justify-content-between'>
                    <EmailModel />
                    <a className="" href={`tel:${record && record.mobile}`}>
                        <img className='ml-2' src='/user/images/phone.png' width={20} alt="Phone" />
                    </a>

                </div>
            ), width: 100,
        },
    ];

    // useEffect(() => {
    //     const handleBeforeUnload = (e) => {
    //         const confirmationMessage = 'Changes you made may not be saved. Are you sure you want to leave?';

    //         // Standard for most browsers
    //         e.returnValue = confirmationMessage;

    //         // For some older browsers
    //         return confirmationMessage;
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, []); // Run only once on component mount

    const fetchSearchData = () => {
        if (copiedData) {
            // Filter the data based on the search query
            const filteredData = copiedData.filter((item) =>
                item.username.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setData(filteredData);
        }
    };

    const handleClearClicked = async () => {
        const data = {
            ids: selectedRowKeys,
            job_title: jobTitle,
        };
        const isConfirmed = window.confirm(
            'Are you certain you wish to proceed with the clearance process? Please note that all cleared items will no longer be visible.'
        );
        if (isConfirmed) {
            try {
                const response = await toggleUStatusInactiveForIds(data);
                if (response && response.status === 200) {
                    setIsChecked(false);
                    setSelectedRowKeys([]);
                    fetchMyJobs();
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                } else if (error.response && error.response.status === 401) {
                    navigate('/login');
                } else if (error.response && error.response.status === 500) {
                    setServerError("Oops! Something went wrong on our server.");
                }
            }
        }
    };

    const handleColorChange = async () => {
        const data = {
            ids: selectedRowKeys,
            color: selectedColor,
        };
        try {
            const response = await changeRowColorInJobDetails(data);
            if (response && response.status === 200) {
                fetchMyJobs();
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
            } else if (error.response && error.response.status === 401) {
                navigate('/login');
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        }
    };

    const colorChange = (color) => {
        setSelectedColor(color);
        setIsColor(!isColor);
    }

    const handleRemarkChange = (jobId, e) => {
        setRemark(e.target.value);
        setJobId(jobId);
    };

    const updateRemark = async () => {
        const data = {
            id: jobId,
            remark,
        };
        try {
            const response = await updateRemarkInJobDetails(data);
            if (response && response.status === 200) {
                setIsChecked(false);
                setSelectedRowKeys([]);
                fetchMyJobs();
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
            } else if (error.response && error.response.status === 401) {
                navigate('/login');
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        }
    };

    const getRowClassName = (record) => {
        return record.color ? `ant-table-row-${record.color}` : ''; // Use the color information from the data
    };

    useEffect(() => {
        if (selectedRowKeys.length > 0) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [selectedRowKeys]);

    useEffect(() => {
        fetchSearchData();
    }, [searchQuery]);

    useEffect(() => {
        window.scroll(0, 0);
        fetchMyJobs();
    }, []);

    return (
        <div id="service-section" className="pt-4 mb-5">
            <div className="container">
                <div className="card shadow card-search">
                    <div className=" card-header  fs-6 justify-content-between d-flex">
                        <div className=""> REGISTERED CONDIDATES </div>
                        <div className="bg-light d-flex rounded">
                            <Select
                                className="rounded border-0"
                                placeholder="Color"
                                onChange={(color) => colorChange(color)}
                                disabled={!isChecked}
                            >
                                {colorDropdown.map((option) => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                            <button type="button" className="rounded border-0" disabled={!isChecked} onClick={handleClearClicked}>
                                Clear
                            </button>
                        </div>
                        <div className="hover-pointer-green hover-pointer" onClick={() => navigate('/user/search/jobs')}>
                            <i class="fa-solid fa-angles-left"></i> Go Back
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <Table
                                dataSource={data}
                                title={() => `Applied Condidates For ${jobTitle}`} // Set the title to 'Enquiries'
                                columns={columns}
                                rowClassName={getRowClassName}
                                rowSelection={{
                                    type: selectionType,
                                    ...rowSelection,
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
};

export default UserAppliedJobDetails;
