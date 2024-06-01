import { useEffect, useState } from "react";
import { currentJobs, deleteCurrentJob, deleteMatrimonialDetailsById, fetchAllCitiesByStateID, fetchAllStatesByCountryID, toggleMatrimonial } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import { setLoader } from "../../actions/loaderAction";
import Select from "react-select";
import { Avatar, Divider, List, Skeleton, Statistic } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
    Navbar,
    Nav, Container
} from "react-bootstrap";
import CountUp from "react-countup";

const formatter = (value) => <CountUp end={value} separator="," />;
const CurrentJobOpening = () => {
    const user = useSelector((state) => state.userAuth);
    const [selectedCountry, setSelectedCountry] = useState("India");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countryID, setCountryID] = useState(101);
    const [searchText, setSearchText] = useState('');
    const [serverError, setServerError] = useState("");
    const [dataStatic, setDataStatic] = useState([]);
    const [copyData, setCopyData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [jobPermission, setJobPermission] = useState(false);
    const [isAction, setIsAction] = useState(false);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loadMoreData = () => {
        setLoading(false);
        console.log(dataStatic.length, totalRows)
        if (dataStatic.length < totalRows) {
            if (loading) {
                return;
            }
            setLoading(true);

            const state = selectedState ? selectedState.label : "";
            const city = selectedCity ? selectedCity.label : "";
            fetchJobs(size, page, state, city, searchText);
        }
    };

    const handleSearchText = (e) => {
        setDataStatic([]);
        setSearchText(e.target.value);
    }
    const handleActionClicked = () => {
        setIsAction(!isAction);
    }
    //state and city change operations
    const handleStateChange = (selectedOption) => {
        setDataStatic([]);
        setSelectedState(selectedOption);

        if (selectedOption) {
            const selectedStateObject = states.find(
                (state) => state.name === selectedOption.value
            );
            if (selectedStateObject) {
                getAllCities(selectedStateObject.id);
            }
        }

        // Update selected city to null when state changes
        setSelectedCity(null);
    };

    const handleCityChange = (selectedOption) => {
        setDataStatic([]);
        setSelectedCity(selectedOption);
    };
    const handleViewAll = () => {
        setSelectedState("");
        setSelectedCity("");
        setSearchText('');
    }
    const fetchJobs = async (size, page, state, city, searchText) => {
        dispatch(setLoader(false));
        try {
            const response = await currentJobs(size, page, state, city, searchText);
            if (response && response.status === 200) {
                console.log(response.data.data.totalRowsAffected, response.data.data.jobs)
                setTotalRows(response.data.data.totalRowsAffected);
                setDataStatic([...new Set([...dataStatic, ...response.data.data.jobs])]);
                setCopyData(response.data.data);
                setPage(page + 1);
                setLoading(false);
                setServerError("");
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate("/login");
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
            setLoading(false);
        }
    };

    const getAllStates = async () => {
        dispatch(setLoader(false));
        try {
            const response = await fetchAllStatesByCountryID(101);
            if (response && response.status === 200) {
                setStates(response.data.data);
                setServerError("");
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate("/login");
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
        }
    };

    const getAllCities = async (stateID) => {
        dispatch(setLoader(false));
        if (stateID) {
            try {
                const response = await fetchAllCitiesByStateID(stateID);
                if (response && response.status === 200) {
                    setCities(response.data.data);
                    setServerError("");
                }
            } catch (error) {
                //Unauthorized
                if (error.response && error.response.status === 401) {
                    dispatch(logout());
                    navigate("/login");
                }
                //Internal Server Error
                else if (error.response && error.response.status === 500) {
                    setServerError("Oops! Something went wrong on our server.");
                }
            } finally {
                dispatch(setLoader(false));
            }
        }
    };

    const deleteJob = async (id) => {
        dispatch(setLoader(true));
        try {
            const response = await deleteCurrentJob(id);
            if (response && response.status === 200) {
                const filteredData = dataStatic.filter(item => item.id !== id);
                setDataStatic(filteredData);
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
        }
    };
    useEffect(() => {
        if (isAdmin) {
            setJobPermission(user.user.permissions && user.user.permissions.have_job_permission);
        }
    }, [isAdmin]);

    useEffect(() => {
        // Check if selectedCountry is already set
        if (user) {
            getAllStates();
            setIsAdmin(user.user.is_admin);
        }
    }, [user]);

    useEffect(() => {
        loadMoreData();
    }, []);
    useEffect(() => {
        const state = selectedState ? selectedState.label : "";
        const city = selectedCity ? selectedCity.label : "";
        fetchJobs(size, 1, state, city, searchText);
    }, [searchText, selectedState, selectedCity]);

    useEffect(() => {
        if (selectedState) {
            getAllCities(selectedState.id);
        }
    }, [selectedState]);

    function isDateMoreThan15DaysOld(dateString) {
        const givenDate = new Date(dateString);
        const currentDate = new Date();

        // Calculate the difference in time (milliseconds)
        const timeDifference = currentDate - givenDate;

        // Convert time difference to days
        const differenceInDays = timeDifference / (1000 * 3600 * 24);

        // Check if the difference is more than 15 days
        if (differenceInDays > 15) {
            return true;
        } else {
            return false;
        }
    }

    // Example usage
    const date1 = "2023-05-01";
    const date2 = "2024-05-10";

    console.log(isDateMoreThan15DaysOld(date1)); // Output: true (if current date is after 2023-05-16)
    console.log(isDateMoreThan15DaysOld(date2)); // Output: false (if current date is 2024-05-25)

    return (
        <div id="" className=""
        >

            {
                jobPermission ? <Navbar bg="light" data-bs-theme="dark">
                    <Container>
                        <Nav className="me-auto">
                            <Nav.Link onClick={handleViewAll}>View All</Nav.Link>
                            <Nav.Link className="hover-pointer" onClick={() => navigate('/user/create/current-job')}>Create</Nav.Link>
                            <Nav.Link onClick={handleActionClicked}>Action</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar> : ''
            }

            {serverError && <span className="fs-5 text-danger">{serverError}</span>}
            <div className="row">
                <div className="mb-3 col-lg-4 col-sm-12 col-xs-12">
                    <label className="form-label">Search</label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search i.e job title, company name, state, city..."
                        name="text"
                        value={searchText}
                        onChange={handleSearchText}
                        style={{ fontSize: '12px', height: '38px' }}
                    />
                </div>

                <div className="mb-3 col-lg-4 col-sm-12 col-xs-12">
                    <label className="form-label">State</label>

                    <Select
                        className=""
                        options={states.map((state) => ({
                            value: state.name,
                            label: state.name,
                        }))}
                        value={selectedState}
                        onChange={handleStateChange}
                    />
                </div>

                <div className="mb-3 col-lg-4 col-sm-12 col-xs-12">
                    <label className="form-label">City</label>

                    <Select
                        options={cities.map((city) => ({
                            value: city.name,
                            label: city.name,
                        }))}
                        value={selectedCity}
                        onChange={handleCityChange}
                    />
                </div>
            </div>

            <div className="" id="scrollableDiv1"
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}>

                <InfiniteScroll
                    dataLength={dataStatic.length}
                    next={loadMoreData}
                    hasMore={dataStatic.length < totalRows}
                    loader={
                        <Skeleton
                            avatar
                            paragraph={{
                                rows: 1,
                            }}
                            active
                        />
                    }
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv1"
                >
                    <table className="table table-striped" style={{ fontSize: '12px' }}>
                        <thead>
                            <tr>
                                <th>Sr.No.</th>
                                <th>JOB ROLE</th>
                                <th>Company Name</th>
                                <th>APPLY URL LINKS</th>
                                {
                                    jobPermission && isAction && <th>Action</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataStatic && dataStatic.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.role}</td>
                                        <td>{item.company}<br />{item.city}({item.state})</td>
                                        <td>
                                            {
                                                isDateMoreThan15DaysOld(item.updated_at) ? '' : <p className="infinite-color-animation d-inline-block" style={{marginBottom:'-10px',marginLeft:'30px'}}>new</p>
                                            }
                                            <a href={item.apply_url} target="_blank">
                                                <button className="current-job-apply" style={{ borderRadius: '20px', border: 'none', padding: '5px', width: '80px' }} type="button">Apply</button>
                                            </a>

                                        </td>
                                        {
                                            jobPermission && isAction && <td>
                                                <a className='hover-pointer' onClick={() => navigate(`/user/update/current-job/${item.id}`)} title="Edit">
                                                    <i className="text-success fas fa-pencil-alt"></i>
                                                </a>

                                                <a className='hover-pointer m-2' onClick={() => deleteJob(item.id)} title="Delete">
                                                    <i className="text-success fas fa-trash"></i>
                                                </a>
                                            </td>
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </InfiniteScroll>

            </div>

        </div>
    );
}
export default CurrentJobOpening;