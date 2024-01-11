import { Table } from "antd";
import { deleteEventByID, updateToggleFeaturedForEvent, updateToggleStatusForEvent } from "../../../admin/services/AdminService";
import { fetchAllEventsByLoggedUser } from "../../services/userService";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoader } from "../../actions/loaderAction";
import Search from "antd/es/input/Search";

const MyEvents = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [horizontalScroll, setHorizontalScroll] = useState(0);

    const [defaultImage, setDefaultImage] = useState('img/de-default-1.jpeg');

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
            const response = await fetchAllEventsByLoggedUser();

            setData(response.data.data);

            setTotalRows(response.data.totalRecords);
            dispatch(setLoader(false));
        } catch (error) {
            dispatch(setLoader(false));
            if (error.response && error.response.status === 401) {
                navigate("/admin");
            } else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate('/server/error', { state: { errorMessage } });
            }
        }
    };

    const handleEventToggleStatus = async (id) => {
        try {
            const response = await updateToggleStatusForEvent(id);
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

    const handleEventToggleFeatured = async (id) => {
        try {
            const response = await updateToggleFeaturedForEvent(id);
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

    const handleDeleteEvent = async (id) => {
        try {
            const response = await deleteEventByID(id);
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
                    className="collapse-item m-2"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        handleEventToggleFeatured(record.id);
                    }}
                >
                    <i class="fa fa-toggle-on" aria-hidden="true"></i>
                </a>
            ) : (
                <a
                    className="collapse-item text-secondary m-2"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        handleEventToggleFeatured(record.id);
                    }}
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
                        className="collapse-item"
                        onClick={() => navigate(`/events/view/${record.id}`)}
                    >
                        <i className="fas fa-eye"></i>
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
    }, [page, size, searchQuery, sortField, sortOrder]);

    return (
        <div id="service-section" className="pt-4 mb-5 container">

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
