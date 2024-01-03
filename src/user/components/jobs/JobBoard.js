import { useEffect, useState } from "react";
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
    Alert,
    Offcanvas,
} from "react-bootstrap";
import FeaturedJobs from "./FeaturedJobs";
import {
    applyJob,
    deleteUserPostedSingleJob,
    deleteUserPostedSingleService,
    fetchAllCitiesByStateID,
    fetchAllJobsByLoggedUser,
    fetchAllJobsPosted,
    fetchAllStatesByCountryID,
    ifAlreadyAppliedSameJob,
    jobsApplicantStatistics,
    toggleJobRequest,
} from "../../services/userService";
import InfiniteScroll from "react-infinite-scroll-component";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UpdateJobPosted from "./UpdateJobPosted";
import { setLoader } from "../../actions/loaderAction";
import Select from "react-select";
import UserAppliedJobModel from "./UsersAppliedJobModel";

const JobBoard = () => {
    const user = useSelector((state) => state.userAuth);
    const [activeNavItem, setActiveNavItem] = useState("ALL");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState("");
    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [isMyJobsClicked, setIsMyJobsClicked] = useState(false);
    const [userId, setUserId] = useState("");
    const [jobId, setJobId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [isUpdateClicked, setIsUpdateClicked] = useState(false);
    const [isApplyClicked, setIsApplyClicked] = useState(false);
    const [appliedJob, setAppliedJob] = useState("");
    const [defaultImage, setDefaultImage] = useState(
        "/user/images/netparamlogo.jpg"
    );

    const [selectedCountry, setSelectedCountry] = useState("India");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countryID, setCountryID] = useState(101);

    const [errors, setErrors] = useState("");

    const [show, setShow] = useState(true);
    const [jobTitle, setJobTitle] = useState("");
    const [applicationStatus, setApplicationStatus] = useState("");
    const [appliedStatistics, setAppliedStatistics] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false);
        setIsApplyClicked(false);
    };

    const handleNavItemClick = (navItem) => {
        setActiveNavItem(navItem);
    };

    //state and city change operations
    const handleStateChange = (selectedOption) => {
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
        setSelectedCity(selectedOption);
    };

    const getJobApplicantStatistics = async () => {
        dispatch(setLoader(true));
        try {
            const response = await jobsApplicantStatistics();
            if (response && response.status === 200) {
                setAppliedStatistics(response.data.data);
                setServerError("");
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
        getJobApplicantStatistics();
    }, []);

    const getAllStates = async () => {
        dispatch(setLoader(true));
        try {
            const response = await fetchAllStatesByCountryID(101);
            if (response && response.status === 200) {
                setStates(response.data.data);
                setServerError("");
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

    const getAllCities = async (stateID) => {
        dispatch(setLoader(true));
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

    const changeUpdateClickedFlag = (value, jobId) => {
        setIsUpdateClicked(value);
        if (jobId) {
            setJobId(jobId);
        }
    };

    const handleApplyClicked = (value, item) => {
        setIsApplyClicked(value);
        setAppliedJob(item);

    };

    const fetchJobs = async (page, size, state, city, jobType) => {
        jobType = "";

        if (activeNavItem === "PART TIME") {
            jobType = "Part Time";
        } else if (activeNavItem === "ALL") {
            jobType = "";
        } else if (activeNavItem === "FULL TIME") {
            jobType = "Full Time";
        } else if (activeNavItem === "FREELANCE") {
            jobType = "Freelance";
        } else if (activeNavItem === "OTHERS") {
            jobType = "Other";
        }
        try {
            const response = await fetchAllJobsPosted(
                page,
                size,
                state,
                city,
                jobType
            );
            if (response && response.status === 200) {
                setData(response.data.data.jobs);
                setTotalRows(response.data.data.totalRowsAffected);
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

    const fetchMyJobs = async (page, size) => {
        try {
            const response = await fetchAllJobsByLoggedUser(userId, page, size);
            if (response && response.status === 200) {
                setData(response.data.data.jobs);
                setTotalRows(response.data.data.totalRowsAffected);
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

    const deleteMyJob = async (id) => {
        try {
            const response = await deleteUserPostedSingleJob(id);
            if (response && response.status === 200) {
                fetchMyJobs(page, 20);
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

    const handleJobToggleStatus = async (id) => {
        try {
            const response = await toggleJobRequest(id);
            if (response && response.status === 200) {
                fetchMyJobs(page, 20);
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

    const fetchMoreData = () => {
        if (!isLoading && data.length < totalRows) {
            fetchJobs(page + 1, 20, activeNavItem);
            setPage(page + 1);
        }
    };
    useEffect(() => {
        if (
            activeNavItem === "ALL" ||
            activeNavItem === "PART TIME" ||
            activeNavItem === "FULL TIME" ||
            activeNavItem === "FREELANCE" ||
            activeNavItem === "OTHERS"
        ) {
            setPage(1);
            const state = selectedState ? selectedState.label : "";
            const city = selectedCity ? selectedCity.label : "";
            fetchJobs(page, 20, state, city, activeNavItem);
            setIsMyJobsClicked(false);
        } else if (activeNavItem === "MY JOBS") {
            setSelectedCity(null);
            setSelectedState(null);
            setPage(1);
            setIsMyJobsClicked(true);
            fetchMyJobs(page, 20);
        } else if (activeNavItem === "CREATE JOB") {
            navigate("/user/job/create");
        } else if (activeNavItem === "APPLIED JOBS") {
            navigate("/user/all/applied/jobs");
        }
    }, [activeNavItem, isUpdateClicked, selectedState, selectedCity]);

    useEffect(() => {
        if (user) {
            setUserId(user.user.id);
        }
    }, [user]);

    useEffect(() => {
        // Check if selectedCountry is already set
        getAllStates();
    }, []);

    useEffect(() => {
        if (selectedState) {
            getAllCities(selectedState.id);
        }
    }, [selectedState]);

    const groupedItems = [];
    for (let i = 0; i < data.length; i += 1) {
        const pair = data.slice(i, i + 1); // Change 3 to 2 here
        groupedItems.push(pair);
    }
    const calculateTimeDifference = (updatedDate) => {
        const currentDate = new Date();
        const updatedDateObj = new Date(updatedDate);
        const differenceInSeconds = Math.floor(
            (currentDate - updatedDateObj) / 1000
        );

        if (differenceInSeconds < 1) {
            return "now";
        } else if (differenceInSeconds < 60) {
            return `${differenceInSeconds} sec ago`;
        } else if (differenceInSeconds < 3600) {
            const minutes = Math.floor(differenceInSeconds / 60);
            return `${minutes} min ago`;
        } else if (differenceInSeconds < 86400) {
            const hours = Math.floor(differenceInSeconds / 3600);
            return `${hours} hour ago`;
        } else {
            const days = Math.floor(differenceInSeconds / 86400);
            if (!days) {
                return "";
            } else if (days) {
                const months = Math.floor(days / 30);
                if (!months) {
                    return `${days} day ago`;
                } else {
                    const years = Math.floor(months / 12);
                    if (!years) {
                        return `${months} months ago`;
                    } else {
                        return `${years} years ago`;
                    }
                    return `${months} months ago`;
                }
            }
            return `${days} day ago`;
        }
    };
    const formatDescription = (description) => {
        // Regular expression to match URLs
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        // Replace URLs with HTML links
        const formattedDescription = description.replace(urlRegex, (url) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        });

        return { __html: formattedDescription };
    };
    const alreadyAppliedJob = async (jobId) => {
        try {
            const response = await ifAlreadyAppliedSameJob(jobId);
            if (response && response.status === 200) {
                if (response.data.data > 0) {
                    return "Hello";
                }
                return "";
            }
            return "";
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        }
    };
    const applyForAJobPosted = async (appliedJob) => {
        const data = {
            job_id: appliedJob.id,
            company: appliedJob.job_subheading,
            username: user.user.name,
            job_title: appliedJob.job_title,
            email: user.user.email ? user.user.email : "",
            mobile: user.user.mobile ? user.user.mobile : "",
        };
        try {
            const response = await applyJob(data);
            if (response && response.status === 201) {
                setIsApplyClicked(false);
                setServerError("");
                setErrors("");
                getJobApplicantStatistics();
                alert('Successfully');
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
                setShow(true);
                setJobTitle(data.job_title);
            } else if (error.response && error.response.status === 401) {
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
    const formatDate = (dateString) => {
        const options = {
            day: "2-digit",
            month: "short",
            year: "numeric",
        };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };
    useEffect(() => {
        if (isApplyClicked && appliedJob) {
            applyForAJobPosted(appliedJob);
        }
    }, [isApplyClicked && appliedJob]);
    const getFileType = (url) => {
        // Extract the file extension from the URL
        const extension = url.split(".").pop().toLowerCase();

        // Define mappings of common file types
        const fileTypeMappings = {
            pdf: "PDF",
            doc: "DOC",
            docx: "DOCX",
            txt: "TXT",
            // Add more file types as needed
        };
        // Use the mapping or show the extension as-is
        return fileTypeMappings[extension] || extension.toUpperCase();
    };
    return (
        <div id="auth-wrapper" className="pt-5 pb-4 container">
            <div className="row">
                {/* <div className="col-12 col-sm-2">
                    <div className="card">
                        <FeaturedJobs />
                    </div>
                </div> */}

                <div className="col-12 col-sm-12  mx-auto">
                    <div className="card mb-3">
                        {serverError && <span className="error">{serverError}</span>}

                        <div className="card-header">
                            {activeNavItem === "MY JOBS" ? (
                                ""
                            ) : (
                                <div className="row">

                                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
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

                                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
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
                            )}

                            <Navbar bg="light" expand="lg" >
                                <Navbar.Brand>JOB BOARD</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                        <Nav.Link
                                            href="#"
                                            onClick={() => handleNavItemClick("ALL")}
                                            style={{
                                                color: activeNavItem === "ALL" ? "red" : "inherit",
                                            }}
                                        >
                                            ALL
                                        </Nav.Link>
                                        <Nav.Link
                                            href="#"
                                            onClick={() => handleNavItemClick("PART TIME")}
                                            style={{
                                                color:
                                                    activeNavItem === "PART TIME" ? "red" : "inherit",
                                            }}
                                        >
                                            PART TIME
                                        </Nav.Link>
                                        <Nav.Link
                                            href="#"
                                            onClick={() => handleNavItemClick("FULL TIME")}
                                            style={{
                                                color:
                                                    activeNavItem === "FULL TIME" ? "red" : "inherit",
                                            }}
                                        >
                                            FULL TIME
                                        </Nav.Link>
                                        <Nav.Link
                                            href="#"
                                            onClick={() => handleNavItemClick("FREELANCE")}
                                            style={{
                                                color:
                                                    activeNavItem === "FREELANCE" ? "red" : "inherit",
                                            }}
                                        >
                                            FREELANCE
                                        </Nav.Link>
                                        <Nav.Link
                                            href="#"
                                            onClick={() => handleNavItemClick("OTHERS")}
                                            style={{
                                                color: activeNavItem === "OTHERS" ? "red" : "inherit",
                                            }}
                                        >
                                            OTHERS
                                        </Nav.Link>
                                        <Nav.Link
                                            href="#"
                                            onClick={() => handleNavItemClick("MY JOBS")}
                                            style={{
                                                color: activeNavItem === "MY JOBS" ? "red" : "inherit",
                                            }}
                                        >
                                            MY JOBS
                                        </Nav.Link>
                                        <Nav.Link
                                            href="#"
                                            onClick={() => handleNavItemClick("APPLIED JOBS")}
                                            style={{
                                                color:
                                                    activeNavItem === "APPLIED JOBS" ? "red" : "inherit",
                                            }}
                                        >
                                            APPLIED JOBS
                                        </Nav.Link>
                                        <Nav.Link
                                            href="#"
                                            onClick={() => handleNavItemClick("CREATE JOB")}
                                            style={{
                                                color:
                                                    activeNavItem === "CREATE JOB" ? "red" : "inherit",
                                            }}
                                        >
                                            CREATE JOB
                                        </Nav.Link>

                                        {/* Remove the following NavDropdown section */}
                                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#">Search By State and City</NavDropdown.Item>
                                        <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
                                    </NavDropdown> */}
                                    </Nav>
                                    {/* Remove the following Form section */}
                                    {/* <Form inline className='d-flex'>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-success">Search</Button>
                                </Form> */}
                                </Navbar.Collapse>
                            </Navbar>
                            <div className="text-light bg-info">
                                You are searching for-{activeNavItem} jobs in state-
                                {selectedState ? selectedState.label : "All"} and city-
                                {selectedCity ? selectedCity.label : "All"}
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {/* Repeat the user card structure as needed */}
                                <InfiniteScroll
                                    style={{ overflowX: "hidden" }}
                                    dataLength={data.length}
                                    next={fetchMoreData}
                                    hasMore={data.length < totalRows}
                                    loader={isLoading && <h4>Loading...</h4>}
                                >
                                    <div className="row">
                                        {groupedItems.map((pair, index) => (
                                            <div className="col-md-6" key={index}>
                                                {pair.map((item, innerIndex) => (
                                                    <div className="" key={innerIndex}>
                                                        <div className="card shadow  mb-3">
                                                            <div className="card-body">
                                                                <div className="top-0 job-time-zone text-muted end-0 position-absolute">
                                                                    {formatDate(item.updated_at)}
                                                                </div>
                                                                <div className="row wow animate__animated animate__zoomIn ">
                                                                    <div className="col-md-3 col-sm-3">
                                                                        <Image
                                                                            src={
                                                                                item.logo ? item.logo : defaultImage
                                                                            }
                                                                            alt={item.name}
                                                                            title={item.name}
                                                                            className="avatar img-fluid img-circle"
                                                                            width={70}
                                                                        />
                                                                    </div>

                                                                    <div className="col-md-7 col-sm-8">
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <p className="m-0 ">
                                                                                    <b>Job Title : </b>
                                                                                    {item.job_title}
                                                                                </p>
                                                                                { }
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <p className="m-0">
                                                                                    <b>Company Name : </b>{" "}
                                                                                    {item.job_subheading}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {errors && errors.job_id ? (
                                                                    <Offcanvas
                                                                        show={show}
                                                                        onHide={handleClose}
                                                                        placement={"bottom"}
                                                                    >
                                                                        <Offcanvas.Header closeButton>
                                                                            <Offcanvas.Title className="text-danger mx-auto">
                                                                                <b>{jobTitle}</b>
                                                                            </Offcanvas.Title>
                                                                        </Offcanvas.Header>
                                                                        <Offcanvas.Body className="text-danger mx-auto">
                                                                            "Application Error: You have already
                                                                            submitted an application for this job.
                                                                            Duplicate applications are not allowed. If
                                                                            you have any questions or concerns, please
                                                                            contact our support team."
                                                                            <p className="mx-auto">
                                                                                <button
                                                                                    className="btn btn-success mt-3"
                                                                                    onClick={() => navigate("/contact")}
                                                                                >
                                                                                    Contact Us
                                                                                </button>
                                                                            </p>
                                                                        </Offcanvas.Body>
                                                                    </Offcanvas>
                                                                ) : (
                                                                    ""
                                                                )}

                                                                <div className="row wow animate__animated animate__zoomIn mt-2">
                                                                    <p
                                                                        className="col-12"
                                                                        dangerouslySetInnerHTML={formatDescription(
                                                                            item.description
                                                                        )}
                                                                    ></p>
                                                                </div>

                                                                <div className="row wow animate__animated animate__zoomIn">
                                                                    <div className="col-lg-6 col-sm-6 ">
                                                                        <p className="">
                                                                            <b>Sector : </b>
                                                                            {item.job_sector}
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-lg-6 col-sm-6">
                                                                        <p>
                                                                            {" "}
                                                                            <b>Job Type : </b>
                                                                            {item.job_type}
                                                                        </p>
                                                                    </div>
                                                                    {item.location ? (
                                                                        <>
                                                                            <div className="col-lg-6 col-sm-6">
                                                                                <p className="">
                                                                                    <b>Company Address : </b>
                                                                                    {item.location}
                                                                                </p>
                                                                            </div>

                                                                            <div className="col-lg-6 col-sm-6">
                                                                                <p className="">
                                                                                    <b>Location : </b>
                                                                                    {`${item.state
                                                                                        ? `${item.city}(${item.state})`
                                                                                        : ""
                                                                                        }`}
                                                                                </p>
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        ""
                                                                    )}

                                                                    {
                                                                        item.notification_pdf ? (
                                                                            <p>Attachment-{
                                                                                item.notification_pdf &&
                                                                                <span>
                                                                                    <a
                                                                                        href={item.notification_pdf}
                                                                                        download={`${item.job_title}.pdf`}
                                                                                        target="_blank"
                                                                                    >
                                                                                        <i className="fa-regular fa-file-lines"></i>{" "}
                                                                                        Download Attachment
                                                                                    </a>
                                                                                    &nbsp;(
                                                                                    {getFileType(
                                                                                        item.notification_pdf
                                                                                    )}
                                                                                    )
                                                                                </span>
                                                                            }
                                                                            </p>

                                                                        ) : ''
                                                                    }

                                                                </div>
                                                            </div>

                                                            <div className="card-footer btn btn-success bg-success text-light">
                                                                <div className="row">
                                                                    <div className="col-4 col-sm-4">
                                                                        {appliedStatistics.map((value) =>
                                                                            value.job_id === item.id ? (
                                                                                <div className="">
                                                                                    {activeNavItem === "MY JOBS" ? (
                                                                                        <p
                                                                                            className="m-0 p-0"
                                                                                            onClick={() =>
                                                                                                navigate(
                                                                                                    `/user/applied/${item.id}/job-details`
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            Applied
                                                                                            <span className="">
                                                                                                -{value.user_count}
                                                                                            </span>
                                                                                        </p>
                                                                                    ) : ""}
                                                                                </div>
                                                                            ) : (
                                                                                ""
                                                                            )
                                                                        )}
                                                                    </div>
                                                                    <div className="col-4 col-sm-4">
                                                                        <a
                                                                            className="hover-pointer text-decoration-none text-light fw-bold"
                                                                            onClick={() =>
                                                                                handleApplyClicked(true, item)

                                                                            }
                                                                        >
                                                                            Apply
                                                                        </a>
                                                                    </div>
                                                                    <div className="col-4 col-sm-4">
                                                                        {isMyJobsClicked ? (
                                                                            <div className="">
                                                                                <i
                                                                                    className="fa fa-edit  me-2"
                                                                                    title="Edit"
                                                                                    onClick={() =>
                                                                                        changeUpdateClickedFlag(
                                                                                            true,
                                                                                            item.id
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <i
                                                                                    className="fa fa-trash ms-2"
                                                                                    title="Delete"
                                                                                    onClick={() => deleteMyJob(item.id)}
                                                                                />
                                                                                {item.job_request_status ===
                                                                                    "Active" ? (
                                                                                    <a
                                                                                        className="ms-3"
                                                                                        href=""
                                                                                        onClick={(e) => {
                                                                                            e.preventDefault();
                                                                                            handleJobToggleStatus(item.id);
                                                                                        }}
                                                                                    >
                                                                                        <i
                                                                                            className="fa fa-thumbs-up text-white"
                                                                                            title="Active"
                                                                                        />
                                                                                    </a>
                                                                                ) : (
                                                                                    <a
                                                                                        className="text-secondary ms-3"
                                                                                        href=""
                                                                                        onClick={(e) => {
                                                                                            e.preventDefault();
                                                                                            handleJobToggleStatus(item.id);
                                                                                        }}
                                                                                    >
                                                                                        <i
                                                                                            className="fa fa-thumbs-down  text-danger"
                                                                                            title="Inactive"
                                                                                        />
                                                                                    </a>
                                                                                )}
                                                                            </div>
                                                                        ) : (
                                                                            ""
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {isUpdateClicked ? (
                                                                    <UpdateJobPosted
                                                                        changeUpdateClickedFlag={
                                                                            changeUpdateClickedFlag
                                                                        }
                                                                        jobId={jobId}
                                                                    />
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                            {item.featured === "true" ? (
                                                                <div className="card-footer text-danger">
                                                                    Featured
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </InfiniteScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default JobBoard;
