import { useEffect, useState } from "react";
import {
    Navbar,
    Nav
} from "react-bootstrap";
import {
    applyJob,
    deleteUserPostedSingleJob,
    fetchAllCitiesByStateID,
    fetchAllJobsByLoggedUser,
    fetchAllJobsPosted,
    fetchAllStatesByCountryID,
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
import { toast } from 'react-toastify';

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
    const [isAndroidUsed, setIsAndroidUsed] = useState(false);

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
        setPage(1);
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
        setPage(1);
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
        if (city === undefined || state === undefined) {
            city = '';
            state = '';
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
                if (page === 1) {
                    setData(response.data.data.jobs);
                } else {
                    setData((prevData) => [...prevData, ...response.data.data.jobs]);
                }
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
        const isConfirmed = window.confirm("Are you sure you want to delete?");
        if (isConfirmed) {
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

    const formatDescription = (description) => {
        // Regular expression to match URLs
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        // Replace URLs with HTML links
        const formattedDescription = description && description.replace(urlRegex, (url) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        });

        return { __html: formattedDescription };
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
                const state = selectedState ? selectedState.label : "";
                const city = selectedCity ? selectedCity.label : "";
                setIsApplyClicked(false);
                setServerError("");
                setErrors("");
                getJobApplicantStatistics();
                fetchJobs(page, 20, state, city, activeNavItem);
                toast.info(`Success! Your application for this job ${appliedJob.job_title} has been submitted successfully. Thank you for your interest. You will be notified of the status of your application once it has been reviewed. If you have any questions or concerns, please contact our support team at [contact@socialbharat.org].`)
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 400) {
                toast.error('"Application Error: You have already submitted an application for this job. Duplicate applications are not allowed. If you have any questions or concerns, please contact our support team."')
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
    const checkPdf = (pdfString) => {
        if (pdfString && pdfString.startsWith("uploads")) {
            return "";
        }
        return pdfString;
    }
    useEffect(() => {
        if (isApplyClicked && appliedJob) {
            applyForAJobPosted(appliedJob);
        }
    }, [isApplyClicked && appliedJob]);
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
    useEffect(() => {
        if (data.length === 0) {
            setServerError("No Jobs Available");
        } else {
            setServerError('');
        }
    }, [data]);

    const handleOnBoardClick = () => {
        setSelectedCity(null);
        setSelectedState(null);
        setActiveNavItem('ALL');
    }
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

                            <Navbar expanded={true} bg="light" expand="lg" >
                                <Navbar.Brand className="hover-pointer btn btn-success text-light fw-bold rounded" onClick={handleOnBoardClick}>JOB BOARD</Navbar.Brand>
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
                                {serverError && <span className="error">{serverError}</span>}
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
                                            <div className="col-md-4" key={index}>
                                                {pair.map((item, innerIndex) => (
                                                    <div className="" key={innerIndex}>
                                                        <div className="card shadow  mb-3" style={{ height: isAndroidUsed ? '' : '450px' }}>
                                                            <div className="card-body">
                                                                <div className="top-0 job-time-zone text-muted end-0 position-absolute">
                                                                    {formatDate(item.updated_at)}
                                                                </div>
                                                                <div className="row wow animate__animated animate__zoomIn ">
                                                                    <div className="col-md-3 col-sm-3">
                                                                        {
                                                                            checkPdf(item.logo) ? (
                                                                                <Image
                                                                                    src={
                                                                                        item.logo ? item.logo : defaultImage
                                                                                    }
                                                                                    alt={item.name}
                                                                                    title={item.name}
                                                                                    className="avatar img-fluid img-circle"
                                                                                    width={70}
                                                                                />
                                                                            ) : ''
                                                                        }
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
                                                                            <div className="col-md-12">
                                                                                {/* Display Job Start Date */}
                                                                                <p className="m-0">
                                                                                    <b>Application Start : </b>
                                                                                    {formatDate(item.job_start_date)}
                                                                                </p>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                {/* Display Job End Date */}
                                                                                <p className="m-0">
                                                                                    <b>Expire Date : </b>
                                                                                    {formatDate(item.job_end_date)}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

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
                                                                        checkPdf(item.attachment) ? (
                                                                            <p>Attachment-{
                                                                                item.attachment &&
                                                                                <span>
                                                                                    <a
                                                                                        href={item.attachment}
                                                                                        download={`${item.job_title}.pdf`}
                                                                                        target="_blank"
                                                                                    >
                                                                                        <i className="fa-regular fa-file-lines"></i>{" "}
                                                                                        Download Attachment
                                                                                    </a>
                                                                                    &nbsp;(
                                                                                    {getFileType(
                                                                                        item.attachment
                                                                                    )}
                                                                                    )
                                                                                </span>
                                                                            }
                                                                            </p>

                                                                        ) : ''
                                                                    }
                                                                    {
                                                                        item.apply_link ? (
                                                                            <div className="">
                                                                                <b>Apply Link : </b>
                                                                                <a className="" href={item.apply_link}>{item.apply_link}</a>
                                                                            </div>
                                                                        ) : ""
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
                                                                        {
                                                                            item.is_job_applied === 'false' ? (
                                                                                <a
                                                                                    className="hover-pointer text-decoration-none text-light fw-bold"
                                                                                    onClick={() => handleApplyClicked(true, item)}
                                                                                >
                                                                                    Apply
                                                                                </a>
                                                                            ) : (
                                                                                <a
                                                                                    className="text-decoration-none text-secondary fw-bold "
                                                                                >
                                                                                    Apply
                                                                                </a>
                                                                            )
                                                                        }
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
                                                                <div className="text-danger">
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
