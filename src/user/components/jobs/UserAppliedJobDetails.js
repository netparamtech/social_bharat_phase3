import { Table, Select } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { userAppliedForSameJob } from "../../services/userService";
import { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";


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
            const response = await userAppliedForSameJob(id);
            if (response && response.status === 200) {
                setData(response.data.data.jobs);
                setCopiedData(response.data.data.jobs);
                setTotalRows(response.data.data.jobs.length);
                setJobTitle(response.data.data.fetchJobTitle);
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

    // const handleDelete = async (id) => {
    //     dispatch(setLoader(true));
    //     try {
    //         const response = await deleteUserRegisteredSingleService(id);
    //         if (response && response.status === 200) {
    //             fetchServices();
    //         }
    //     } catch (error) {
    //         if (error.response && error.response.status === 401) {
    //             navigate('/login');
    //         }
    //         else if (error.response && error.response.status === 500) {
    //             setServerError("Oops! Something went wrong on our server.");
    //         }
    //     } finally {
    //         dispatch(setLoader(false));
    //     }
    // }

    useEffect(() => {
        if (selectedColor) {
            console.log(`color changed to ${selectedColor}`);
        }
    }, [selectedColor]);

    const colorDropdown = [
        { value: "red", label: "Red" },
        { value: "blue", label: "Blue" },
        { value: "green", label: "Green" },
        { value: "yellow", label: "Yellow" },
    ];

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
                    <img className="" src={record.photo ? record.photo : defaultImage} width={50}></img>
                </div>
            )
        },
        {
            title: 'Username', dataIndex: 'username',
        },
        {
            title: 'Mobile 1', dataIndex: 'mobile',
        },

        {
            title: 'email', dataIndex: 'email',
        },
        {
            title: 'Set Color',
            dataIndex: 'id', // Assuming 'id' is the unique identifier for each row
            render: (text, record) => (
                <div className="">

                </div>
            ), width: 30
        },
        {
            title: 'Remark', dataIndex: 'remark',
        },


    ];

    const fetchSearchData = () => {
        if (copiedData) {
            // Filter the data based on the search query
            const filteredData = copiedData.filter(item =>
                item.username.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setData(filteredData);
        }
    }
    const getNameFirstLetter = (name) => {
        const nameArray = name.trim().split('');
        return nameArray[0];
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
                    <div className=" card-header bg-darkskyblue  fs-6 justify-content-between d-flex">
                        <div> REGISTERED CONDIDATES </div>
                        <Select
                            style={{ width: 120 }}
                            placeholder="Select Color"
                            onChange={(color) => setSelectedColor(color)}
                        >
                            {colorDropdown.map((option) => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                        <div className="hover-pointer-green hover-pointer" onClick={() => navigate('/user/search/jobs')}><i class="fa-solid fa-angles-left"></i> Go Back</div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">

                            <Table
                                dataSource={data}
                                title={() => `Applied Condidates For ${jobTitle}`}  // Set the title to 'Enquiries'
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

export default UserAppliedJobDetails;