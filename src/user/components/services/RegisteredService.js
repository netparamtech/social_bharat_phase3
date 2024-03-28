import { Table } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserRegisteredSingleService, fetchUserRegisteredServices } from "../../services/userService";
import { useEffect, useState } from "react";
import { setLoader } from "../../actions/loaderAction";
import DropdownOnServices from "./DropdownOnServices";

const RegisteredService = () => {
    const [service, setService] = useState([]);
    const [serverError, setServerError] = useState('');
    const [isAndroidUsed, setIsAndroidUsed] = useState(false);
    const [horizontalScroll, setHorizontalScroll] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchServices = async () => {
        dispatch(setLoader(false));
        try {
            const response = await fetchUserRegisteredServices();
            if (response && response.status === 200) {
                setService(response.data.data);
                setServerError('');
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
        }
    };

    const handleDelete = async (id) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete?");

        // If the user confirms the deletion, proceed with the delete operation
        if (isConfirmed) {
            dispatch(setLoader(true));

            try {
                const response = await deleteUserRegisteredSingleService(id);
                if (response && response.status === 200) {
                    fetchServices();
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                } else if (error.response && error.response.status === 500) {
                    setServerError("Oops! Something went wrong on our server.");
                }
            } finally {
                dispatch(setLoader(false));
            }
        }
    };



    const columns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            render: (text, record, index) => index + 1,
            width: 100,
        },
        {
            title: 'Title', dataIndex: 'title',
        },
        {
            title: 'Mobile 1', dataIndex: 'mobile1',
        },
        {
            title: 'Mobile 2', dataIndex: 'mobile2',
        },
        {
            title: 'Experience', dataIndex: 'experience',
        },
        {
            title: 'State', dataIndex: 'state',
        },
        {
            title: 'City', dataIndex: 'city',
        },
        {
            title: 'Description', dataIndex: 'description',
        },

        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div>
                    <a
                        className="collapse-item hover-pointer-admin"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/user/update/user-registered-service/${record.id}`)
                        }}
                    >
                        <i className="fa fa-edit mr-4" title="Edit" />
                    </a>

                    <a
                        className="collapse-item hover-pointer-admin"

                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete(record.id);
                        }}
                    >
                        <i className="fas fa-trash"></i>
                    </a>
                </div>
            ),
        },
        // Rest of the columns definition
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsAndroidUsed(window.innerWidth < 1000); // Adjust the threshold based on your design considerations
        };

        // Listen for window resize events
        window.addEventListener("resize", handleResize);
        handleResize(); // Call initially to set the correct value

        // Cleanup the event listener when component is unmounted
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (isAndroidUsed) {
            setHorizontalScroll(900);
        } else {
            setHorizontalScroll(0);
        }
    }, [isAndroidUsed]);

    useEffect(() => {
        fetchServices();
    }, []);
    return (
        <div id="service-section" className="pt-4 mb-5">
            <div className="container">
                <div className="card shadow card-search">
                    <div className="card-header bg-darkskyblue">
                        <div className="d-sm-flex align-items-center justify-content-between ">
                            REGISTERED SERVICES
                            <a className="text-decoration-none hover-pointer" onClick={()=>navigate(-1)}>GO BACK</a>

                            <DropdownOnServices path={window.location.pathname} />
                        </div>
                    </div>
                    <div className="card-body">
                        <div>

                            <Table
                                dataSource={service}
                                className='bg-success mt-2'
                                columns={columns}
                                bordered
                                pagination={false}
                                scroll={{
                                    y: 540,
                                    x: horizontalScroll,
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

export default RegisteredService;