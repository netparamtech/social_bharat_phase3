import React, { useEffect, useState } from 'react';
import '../../pages/css/ourPartner.css';
import { Input, Table } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { fetchAllServices } from '../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';
import { useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import Select from "react-select";

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
);
const Services = () => {
    const [service, setService] = useState([]);
    const [copyService, setCopyService] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isAndroidUsed, setIsAndroidUsed] = useState(false);
    const [serverError, setServerError] = useState('');

    const [searchData, setSearchData] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(7);
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
    };

    const handleFilterData = () => {
        const filteredData = copyService.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));
        setService(filteredData);
    }

    const columns = [

        {
            title: 'Services', dataIndex: 'title', className: 'bg-secondary fs-4 text-white',
            render: (text, record) => (
                <div className="card shadow mb-2 services-hover">
                    <div className="card-body bg-secondary rounded">
                        <div className="row wow animate__animated animate__zoomIn">
                            <div className="text-white fs-5">
                                {record.title}
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
    ]

    const fetchServices = async () => {
        dispatch(setLoader(false));
        try {
            const response = await fetchAllServices();
            if (response && response.status === 200) {
                const filteredFetch = response.data.data.filter((item) => item && item.status === 'Active');
                setService(filteredFetch);
                setCopyService(filteredFetch);
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

    useEffect(() => {
        const filteredData = copyService.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setService(filteredData);
    }, [searchQuery]);

    useEffect(() => {
        fetchServices();
    }, []);

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
    const cardStyles = {
        boxShadow: '0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '50px',
        borderBottomLeftRadius: '30px',
        borderBottomRightRadius: '10px',
        width: '300px',
    };
    const imageStyles = {
        width: '100%',
        objectFit: 'cover', // Ensures the image covers the entire container while maintaining aspect ratio
    };
    return (
        <div id="searchPeople-section" className="content-wrapper pt-4 mb-4">
            <div className="container">
                <div className="card shadow card-search">
                    <div className="card-body">

                        {serverError && <span className='error'>{serverError}</span>}
                        <div className='col-md-12 d-flex'>
                            <div className="col-md-8 rounded">

                                <Search
                                    placeholder="input search text"
                                    allowClear
                                    enterButton="Search"
                                    size="large"
                                    onChange={handleSearchChange}
                                />

                                <Table
                                    dataSource={service}
                                    className='bg-success mt-2'
                                    columns={columns}
                                    bordered
                                    pagination={false}
                                    scroll={{
                                        y: 400,
                                    }}

                                    rowKey={(record) => record.id}
                                // onChange={handleSearchChange}
                                />
                            </div>
                            <div className='col-md-4'>
                                <div className="card shadow mb-2">
                                    <div className='card-header bg-primary text-light fs-4'>Add Service</div>
                                    <div className="card-body">
                                        <div className="form-group mb-4">
                                            <Select
                                                className="form-control"
                                                aria-label="Default select example"
                                                options={copyService && copyService.map((state) => ({
                                                    value: state.title,
                                                    label: state.title,
                                                }))}
                                            // value={selectedState}
                                            // onChange={handleStateChange}
                                            />
                                        </div>
                                        <div className="form-group mb-4">
                                            <input
                                                type="text"
                                                placeholder="Enter Service Title"
                                                className="form-control"
                                            // value={name}
                                            // onChange={(e) => setName(e.target.value)}
                                            />
                                            {/* {errors.name && (
                                                <span className="error">{errors.name}</span>
                                            )} */}
                                        </div>
                                        <div className="form-group mb-4">
                                            <input
                                                type="number"
                                                placeholder="Enter Your Mobile Number 1"
                                                className="form-control"
                                            // value={email}
                                            // onChange={(e) => setEmail(e.target.value)}
                                            />
                                            {/* {errors.email && (
                                                <span className="error">{errors.email}</span>
                                            )} */}
                                        </div>
                                        <div className="form-group mb-4">
                                            <input
                                                type="number"
                                                placeholder="Enter Your Mobile Number 2"
                                                className="form-control"
                                            // value={email}
                                            // onChange={(e) => setEmail(e.target.value)}
                                            />
                                            {/* {errors.email && (
                                                <span className="error">{errors.email}</span>
                                            )} */}
                                        </div>
                                        <div className="form-group mb-4">
                                            <input
                                                type="text"
                                                placeholder="Enter Experience"
                                                className="form-control"
                                            // value={email}
                                            // onChange={(e) => setEmail(e.target.value)}
                                            />
                                            {/* {errors.email && (
                                                <span className="error">{errors.email}</span>
                                            )} */}
                                        </div>
                                        <div className="form-group mb-4">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Service At(i.e.Jaipur(rajasthan))"
                                            // value={mobile}
                                            // onChange={(e) => setMobile(e.target.value)}
                                            />
                                            {/* {errors.mobile && (
                                                <span className="error">{errors.mobile}</span>
                                            )} */}
                                        </div>
                                        <div className="form-group mb-4 ">
                                            <textarea
                                                className="form-control"
                                                placeholder="Enter details"
                                                id="floatingTextarea"
                                            // value={userQuery}
                                            // onChange={(e) => setUserQuery(e.target.value)}
                                            ></textarea>
                                            {/* {errors.message && (
                                                <span className="error">{errors.message}</span>
                                            )} */}
                                        </div>
                                        <div className="form-group">
                                            <button
                                                className="form-control w-100 btn-success bg-primary fs-5"
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Services;