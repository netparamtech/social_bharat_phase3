import React, { useEffect, useState } from 'react';
import '../../pages/css/ourPartner.css';
import { Input, Table } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { createUserService, fetchAllServices } from '../../services/userService';
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

    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [serviceTitle, setServiceTitle] = useState('');
    const [mobile1, setMobile1] = useState('');
    const [mobile2, setMobile2] = useState('');
    const [experience, setExperience] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Active');
    const [disableServiceTitle, setDisableServiceTitle] = useState(true);

    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    const [alertClass, setAlertClass] = useState("");

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

    const handleSelectService = (selectedOption) => {
        setMessage('');
        setAlertClass('');
        setSelectedService(selectedOption);
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

    const handleSubmit = async () => {
        const data = {
            title: serviceTitle,
            mobile1,
            mobile2,
            experience,
            location,
            description,
            status,
        };

        try {
            dispatch(setLoader(true));
            const response = await createUserService(data);
            if (response && response.status === 201) {
                setErrors("");
                setAlertClass("alert-success");
                setMessage(response.data.message);
                setSelectedService("");
                setServiceTitle("");
                setMobile1("");
                setMobile2("");
                setLocation("");
                setExperience("");
                setDescription("");
                setStatus('Active');
                setDisableServiceTitle(true);
                
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
                setMessage('');
                setAlertClass("alert-danger");
            } else if (error.response && error.response.status === 401) {
                setMessage('');
                setErrors('');
                setAlertClass("alert-danger");
            }
            else if (error.response && error.response.status === 500) {
                setMessage(error.response.data.message);
                setErrors('');
                setAlertClass("alert-danger");
            }
        } finally {
            dispatch(setLoader(false));
        }
    }

    useEffect(() => {
        // Update the dropdownOptions whenever copyService changes
        setDropdownOptions([
            ...copyService.map((state) => ({
                value: state.title,
                label: state.title,
            })),
            { value: 'Other', label: 'Other' },
        ]);
    }, [copyService]);

    useEffect(() => {
        const filteredData = copyService.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setService(filteredData);
    }, [searchQuery]);

    useEffect(() => {
        if (selectedService) {
            if (selectedService.label !== 'Other') {
                setServiceTitle(selectedService.label);
                setDisableServiceTitle(true);
                setStatus('Active');
            } else {
                setServiceTitle('');
                setDisableServiceTitle(false);
                setStatus('Inactive');
            }

        }
    }, [selectedService])

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
                                    autoFocus
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
                                        {message && (
                                            <div className={`alert ${alertClass}`}>
                                                {alertClass === "alert-success" ? (
                                                    <i className="fas fa-check-circle"></i>
                                                ) : (
                                                    <i className="fas fa-exclamation-triangle"></i>
                                                )}
                                                {" " + message}
                                            </div>
                                        )}
                                        <div className="form-group mb-4">
                                            <p>अगर आपकी सेवा उपलब्ध नहीं है, तो 'अन्य' (Other) विकल्प चुनें।</p>
                                            <Select
                                                className="form-control"
                                                aria-label="Default select example"
                                                options={dropdownOptions}
                                                value={selectedService}
                                                placeholder="Select Your Service"
                                                onChange={handleSelectService}
                                            />
                                             {!selectedService && (
                                                <span className="error">select any service if not then select 'Other'</span>
                                            )}
                                        </div>
                                        <div className="form-group mb-4">
                                            <input
                                                type="text"
                                                placeholder="Enter Service Title"
                                                className="form-control"
                                                value={serviceTitle}
                                                onChange={(e) => setServiceTitle(e.target.value)}
                                                disabled={disableServiceTitle}
                                            />
                                            {errors.title && (
                                                <span className="error">{errors.title}</span>
                                            )}
                                        </div>
                                        <div className="form-group mb-4">
                                            <input
                                                type="number"
                                                placeholder="Enter Your Mobile Number 1"
                                                className="form-control"
                                                value={mobile1}
                                                onChange={(e) => setMobile1(e.target.value)}
                                            />
                                            {errors.mobile1 && (
                                                <span className="error">{errors.mobile1}</span>
                                            )}
                                        </div>
                                        <div className="form-group mb-4">
                                            <input
                                                type="number"
                                                placeholder="Enter Your Mobile Number 2"
                                                className="form-control"
                                                value={mobile2}
                                                onChange={(e) => setMobile2(e.target.value)}
                                            />
                                            {errors.mobile2 && (
                                                <span className="error">{errors.mobile2}</span>
                                            )}
                                        </div>
                                        <div className="form-group mb-4">
                                            <input
                                                type="text"
                                                placeholder="Enter Experience"
                                                className="form-control"
                                                value={experience}
                                                onChange={(e) => setExperience(e.target.value)}
                                            />
                                            {errors.experience && (
                                                <span className="error">{errors.experience}</span>
                                            )}
                                        </div>
                                        <div className="form-group mb-4">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Service At(i.e.Jaipur(rajasthan))"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                            />
                                            {errors.location && (
                                                <span className="error">{errors.location}</span>
                                            )}
                                        </div>
                                        <div className="form-group mb-4 ">
                                            <textarea
                                                className="form-control"
                                                placeholder="Enter details"
                                                id="floatingTextarea"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></textarea>
                                            {errors.description && (
                                                <span className="error">{errors.description}</span>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <button
                                                className="form-control w-100 btn-success bg-primary fs-5"
                                                type="submit"
                                                onClick={handleSubmit}
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