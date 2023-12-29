import { Table } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUserRegisteredSingleService, fetchUserRegisteredServices, userAppliedForSameJob } from "../../services/userService";
import { useEffect, useState } from "react";
import { setLoader } from "../../actions/loaderAction";
import DropdownOnServices from "../services/DropdownOnServices";

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
                   <img className="" src={record.photo?record.photo:defaultImage} width={50}></img>
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

        // {
        //     title: 'Actions',
        //     dataIndex: 'actions',
        //     render: (text, record) => (
        //         <div>
        //             <a
        //                 className="collapse-item hover-pointer-admin"
        //                 onClick={(e) => {
        //                     e.preventDefault();
        //                     navigate(`/user/update/user-registered-service/${record.id}`)
        //                 }}
        //             >
        //                 <i className="fa fa-edit mr-4" title="Edit" />
        //             </a>

        //             <a
        //                 className="collapse-item hover-pointer-admin"

        //                 onClick={(e) => {
        //                     e.preventDefault();
        //                     handleDelete(record.id);
        //                 }}
        //             >
        //                 <i className="fas fa-trash"></i>
        //             </a>
        //         </div>
        //     ),
        // },
        // Rest of the columns definition
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

    // useEffect(() => {
    //     const handleResize = () => {
    //         setIsAndroidUsed(window.innerWidth < 1000); // Adjust the threshold based on your design considerations
    //     };

    //     // Listen for window resize events
    //     window.addEventListener("resize", handleResize);
    //     handleResize(); // Call initially to set the correct value

    //     // Cleanup the event listener when component is unmounted
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);

    // useEffect(() => {
    //     if (isAndroidUsed) {
    //         setHorizontalScroll(900);
    //     } else {
    //         setHorizontalScroll(0);
    //     }
    // }, [isAndroidUsed]);

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
                    <div className="card-header bg-darkskyblue">
                        <div className="d-sm-flex align-items-center justify-content-between ">
                            REGISTERED CONDIDATES
                            <a className="text-decoration-none hover-pointer" onClick={() => navigate('/user/search/jobs')}>GO BACK</a>
                        </div>
                    </div>
                    <div className="card-body">
                        <div>

                            <Table
                                title={() => `Applied Condidates For ${jobTitle}`}  // Set the title to 'Enquiries'
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

export default UserAppliedJobDetails;