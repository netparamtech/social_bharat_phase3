import { Table } from "antd";
import { deleteEventByID, featuredEvent, fetchAllEventsByLoggedUser } from "../../services/userService";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoader } from "../../actions/loaderAction";
import { toast } from 'react-toastify';

const MyEvents = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [horizontalScroll, setHorizontalScroll] = useState(0);

    const [defaultImage, setDefaultImage] = useState('img/de-default-1.jpeg');

    const handleEventSearch = () =>{
        navigate('/user/search/events')
    }

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handlePageSizeChange = (current, pageSize) => {
        setSize(pageSize);
    };

    const fetchData = async () => {
        dispatch(setLoader(true));
        try {
            const response = await fetchAllEventsByLoggedUser();

            setData(response.data.data);

            setTotalRows(response.data.totalRecords);
            dispatch(setLoader(false));
            setServerError("");
            window.scroll(0, 0);
        } catch (error) {
            dispatch(setLoader(false));
            if (error.response && error.response.status === 401) {
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        }
    };

    const handleEventToggleFeatured = async (id) => {
        try {
            // Display a confirmation dialog
            const userConfirmed = window.confirm("Are you sure you want to toggle the featured status?");

            // Check if the user clicked "OK"
            if (userConfirmed) {
                const response = await featuredEvent(id);

                if (response && response.status === 200) {
                    fetchData();
                    setServerError("");
                }
            } else {
                // Handle the case where the user clicked "Cancel" or closed the dialog
                console.log("User canceled the operation.");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        }
    };
    const handleInactiveToggleFeatured = () => {
        const userConfirmed = window.confirm("Feature Toggle Error: Unauthorized Access You do not have the necessary permissions to feature an event. This action is restricted to administrators only. If you believethis is an error or require additional access, please contact your system administrator for assistance.");
    }


    const handleDeleteEvent = async (id) => {
        try {
            const response = await deleteEventByID(id);
            if (response && response.status === 200) {
                fetchData();
                setServerError("");
            }
        } catch (error) {
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
            render: (text, record, index) => (page - 1) * size + index + 1,
            width: 70
        },

        {
            title: "Event", dataIndex: "title", width: 150
        },
        {
            title: "Location",
            dataIndex: "venue",
            render: (text, record) => {
                const { venue, city, state } = record;
                return `${venue}, ${city} (${state})`;
            }, width: 150
        },

        {
            title: "Event Start At",
            dataIndex: "start_datetime",
            render: (text, record) => formatDate(record.start_datetime), width: 150

        },
        {
            title: "Event End At",
            dataIndex: "end_datetime",
            render: (text, record) => formatDate(record.end_datetime), width: 150

        },

        {
            title: 'Featured', dataIndex: 'featured', render: (text, record) => (record.featured === 'true' ? (
                <a
                    className="hover-pointer collapse-item m-2"
                    onClick={(e) => {
                        e.preventDefault();
                        handleEventToggleFeatured(record.id);
                    }}
                >
                    <i class="fa fa-toggle-on" aria-hidden="true"></i>
                </a>
            ) : (
                <a
                    className=" hover-pointer collapse-item text-secondary m-2"
                    onClick={handleInactiveToggleFeatured}
                >
                    <i class="fa fa-toggle-off" aria-hidden="true"></i>
                </a>
            )), width: 100
        },

        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className=''>
                    <a className="collapse-item" onClick={(e) => {
                        e.preventDefault(); // Prevent the default anchor tag behavior
                        navigate(`/user/my-event/${record.id}/update`);
                    }}>
                        <i className="fa fa-edit mr-2" title='Edit' />
                    </a>

                    <a
                        className="collapse-item m-2"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleDeleteEvent(record.id);
                        }}
                    >
                        <i className="fas fa-trash"></i>
                    </a>

                </div>
            ), width: 200
        },
        // Rest of the columns definition
    ];

    useEffect(() => {
        fetchData();
    }, [page, size]);

    return (
        <div id="service-section" className="pt-4 mb-5 container">
            {serverError && <span className="error">{serverError}</span>}
            <div className="mx-auto mb-2">
                <button className="btn btn-success" 
                onClick={handleEventSearch}
                >Search Events</button>
            </div>
            <Table
                title={() => 'My Events'}  // Set the title to 'Enquiries'
                dataSource={data}
                columns={columns}
                scroll={{
                    y: 540,
                    x: horizontalScroll,
                }}
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

export default MyEvents;
