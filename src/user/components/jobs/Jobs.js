import React, { useEffect, useState } from "react";
import { Layout, Menu, Statistic } from "antd";
import Select from "react-select";
import CountUp from "react-countup";
import {
    DashboardOutlined,
    QuestionCircleOutlined,
    CalendarOutlined,
    HistoryOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import CurrentJobOpening from "./CurrentJobOpening";
import { Divider, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { applyJob, deleteUserPostedSingleJob, fetchAllCitiesByStateID, fetchAllJobsPosted, fetchAllStatesByCountryID, findOtherdetails, jobsApplicantStatistics, toggleJobRequest, updateResume, uploadPdf } from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import { logout } from "../../actions/userAction";
import CreateJob from "./CreateJob";
import { toast } from "react-toastify";
import { infoOptions, successOptions } from "../../../toastOption";
import ContactUsPage from "./ContactUsPage";
import UpdateJobPosted from "./UpdateJobPosted";
import { Card, Form, Button } from "react-bootstrap";

const { Sider } = Layout;
const { SubMenu } = Menu;

const formatter = (value) => <CountUp end={value} separator="," style={{ color: 'blue', fontSize: '100px', }} />;

function Jobs() {
    const user = useSelector((state) => state.userAuth);
    const [isAndroidUsed, setIsAndroidUsed] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState("All");
    const [isDetails, setIsDetails] = useState(false);
    const [totalRows, setTotalRows] = useState(1);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [dataStatic, setDataStatic] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isApplyClicked, setIsApplyClicked] = useState(false);
    const [appliedJob, setAppliedJob] = useState("");
    const [jobId, setJobId] = useState("");

    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [isAppliedJob, setIsAppliedJob] = useState(false);
    const [isMyJob, setIsMyJob] = useState(false);
    const [userPhoto, setUserPhoto] = useState('');
    const [defaultUserImage, setDefaultUserImage] = useState(
        "/admin/img/download.jpg"
    );
    const [defaultImage, setDefaultImage] = useState(
        "/user/images/netparamlogo.jpg"
    );
    const backgroundImageUrl = '/user/images/admin4.png';
    const whiteBackgroundImageUrl = 'url(/user/images/white2.jpg)';

    const [isJobCreate, setIsJobCreate] = useState(false);
    const [show, setShow] = useState(true);
    const [jobTitle, setJobTitle] = useState("");
    const [applicationStatus, setApplicationStatus] = useState("");
    const [appliedStatistics, setAppliedStatistics] = useState([]);
    const [isResume, setIsResume] = useState(false);
    const [isUploadResumeClicked, setIsUploadResumeClicked] = useState(false);
    const [isContactUsClicked, setIsContactUsClicked] = useState(false);
    const [isCurrentOpening, setIsCurrentOpening] = useState(true);
    const [resume, setResume] = useState('');
    const [isThumbUp, setIsThumbUp] = useState(false);
    const [isJobUpdate, setIsJobUpdate] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [jobPermission, setJobPermission] = useState(false);
    const [otherDetails, setOtherDetails] = useState('');
    const [isAction, setIsAction] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFilePreview, setSelectedFilePreview] = useState('');
    const [selectedFileTempUrl, setSelectedFileTempUrl] = useState('');
    const [messageAttachment, setMessageAttachment] = useState('');
    const [serverErrorPdf, setServerErrorPdf] = useState('');
    const [description, setDescription] = useState('');

    const [errors, setErrors] = useState("");
    const [serverError, setServerError] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleThumbClicked = () => {
        setIsThumbUp(!isThumbUp);
    }

    const handleApplyClicked = (value, item) => {
        console.log("hello")
        setIsApplyClicked(value);
        setAppliedJob(item);

    };

    const handleSearchText = (e) => {
        setSearchText(e.target.value);
    }
    const handleIsContactUs = () => {
        setIsContactUsClicked(!isContactUsClicked);
    }
    const handleUploadResumeClicked = () => {
        setIsUploadResumeClicked(!isUploadResumeClicked);
    }
    const handleMyJobClicked = () => {
        setIsMyJob(!isMyJob);
    }
    const toggleDescription = (index) => {
        setSelectedIndex(selectedIndex === index ? null : index);
    };

    const handleIsCreateJob = () => {
        setIsJobCreate(!isJobCreate)
    }
    const handleAppliedJobClicked = () => {
        setIsAppliedJob(!isAppliedJob);
    }
    const changeUpdateClickedFlag = (jobId) => {

        if (jobId) {
            setJobId(jobId);
        }
        setIsJobUpdate(!isJobUpdate);
    };
    const handleUploadResume = (value) => {
        handleNavItemClick("UPLOAD RESUME");
        setIsUploadResumeClicked(value);
        window.scroll(0, 0);
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!(file instanceof File)) {
            return;
        }
        setSelectedFile(file);
        const formData = new FormData();
        if (file) {
            formData.append("pdf", file);
        }

        try {
            dispatch(setLoader(true));
            const response = await uploadPdf(formData); // Make an API call to get temporary URL
            if (response && response.status === 200) {
                setSelectedFileTempUrl(response.data.data.file);
                setSelectedFilePreview(URL.createObjectURL(file));
                setServerErrorPdf('');
                setMessageAttachment('');
            }
        } catch (error) {
            // Handle error
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
                setMessageAttachment(error.response.data.message);
            }

            //Unauthorized
            else if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate("/login");
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                setServerErrorPdf("Oops! Something went wrong on our server.");
            }
        } finally {
            dispatch(setLoader(false));
        }
    };
    useEffect(() => {
        if (isResume) {
            fetchOtherDetails();
        }
    }, [isResume])
    const handleResumeSubmit = async () => {
        if (selectedFileTempUrl) {
            const data = {
                resume: selectedFileTempUrl,
                job_description: description,
            }
            try {
                dispatch(setLoader(true));
                const response = await updateResume(data);
                if (response && response.status === 201) {
                    toast.success("Resume Uploaded Successfully", successOptions);
                    setMessageAttachment('');
                    setServerErrorPdf('');
                    setIsResume(true);
                }
            } catch (error) {
                // Handle error
                if (error.response && error.response.status === 400) {
                    setErrors(error.response.data.errors);
                    setMessageAttachment(error.response.data.message);
                }

                //Unauthorized
                else if (error.response && error.response.status === 401) {
                    dispatch(logout());
                    navigate("/login");
                }
                //Internal Server Error
                else if (error.response && error.response.status === 500) {
                    setServerErrorPdf("Oops! Something went wrong on our server.");
                }
            } finally {
                dispatch(setLoader(false));
            }
        } else {
            // You can display an error message or take appropriate action
            window.confirm("Please select a file before submitting.")
        }
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

    const handleIsDetailsClicked = (index) => {
        setIsDetails(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    }

    const handleJobBoardClicked = () => {
        setSearchText('');
        setSelectedState(null);
        setSelectedCity(null);
        activeNavItem('');
    }

    const loadMoreData = () => {
        setLoading(false);
        if (dataStatic.length < totalRows) {
            if (loading) {
                return;
            }
            setLoading(true);

            const state = selectedState ? selectedState.label : "";
            const city = selectedCity ? selectedCity.label : "";
            fetchJobs(size, page, state, city, searchText, activeNavItem);
        }
    };

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
    const fetchJobs = async (size, page, state, city, searchText, jobType) => {
        if (activeNavItem === 'All') {
            jobType = ''
        }
        dispatch(setLoader(false));
        try {
            const response = await fetchAllJobsPosted(size, page, state, city, searchText, jobType);
            if (response && response.status === 200) {
                console.log(response.data.data, response.data.data.totalRowsAffected)
                setTotalRows(response.data.data.totalRowsAffected);
                if (page === 1) {
                    setDataStatic([...new Set([...response.data.data.jobs])]);
                } else {
                    setDataStatic([...new Set([...dataStatic, ...response.data.data.jobs])]);
                }
                if (jobType === 'myJobs' && response.data.data.jobs.length > 0) {
                    setIsAction(true);
                } else {
                    setIsAction(false);
                }
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
    const handleJobToggleStatus = async (id, index) => {

        try {
            const response = await toggleJobRequest(id);
            if (response && response.status === 200) {
                // const state = selectedState ? selectedState.label : "";
                // const city = selectedCity ? selectedCity.label : "";
                // fetchJobs(size, 1, state, city, searchText, activeNavItem);
                const dataMap = dataStatic.map((item) => {
                    if (item.id === id) {
                        item.job_request_status = item.job_request_status === 'Active' ? 'Inactive' : 'Active';
                    }
                    return item;
                });
                setDataStatic(dataMap);
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        }
    };
    useEffect(() => {
        if (isUploadResumeClicked) {
            // Perform actions when isUploadResumeClicked is true
            setIsUploadResumeClicked(true);
            // Add any other logic here
        }
    }, [isUploadResumeClicked])
    const applyForAJobPosted = async (appliedJob) => {
        console.log(appliedJob, "ffffffff");
        if (appliedJob.resume_apply) {
            if (!isResume) {
                if (window.confirm("Before proceeding to apply for this job, please ensure that you have uploaded your resume. Would you like to upload it now?")) {
                    setIsUploadResumeClicked(true);
                    setIsApplyClicked(false);
                    return;
                } else {
                    setIsApplyClicked(false);
                    return;
                }
            }

        }
        const data = {
            job_id: appliedJob.id,
            company: appliedJob.job_subheading,
            username: user.user.name,
            job_title: appliedJob.job_title,
            email: user.user.email ? user.user.email : "",
            mobile: user.user.mobile ? user.user.mobile : "",
            resume: resume ? resume : '',
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
                fetchJobs(size, 1, state, city, searchText, activeNavItem);
                toast.info(`Success! Your application for this job ${appliedJob.job_title} has been submitted successfully. Thank you for your interest. You will be notified of the status of your application once it has been reviewed. If you have any questions or concerns, please contact our support team at [support@socialbharat.org].`, infoOptions)
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
    const fetchOtherDetails = async () => {
        try {
            dispatch(setLoader(true));
            const response = await findOtherdetails();
            if (response && response.status === 200) {
                setOtherDetails(response.data.otherDetails);
                setServerErrorPdf('');
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            } else if (error.response && error.response.status === 404) {
                dispatch(logout());
                navigate('/');
            }
        } finally {
            dispatch(setLoader(false));
        }
    }

    const checkUrl = (url) => {
        if (url.startsWith("uploads\\users\\jobs") || url.startsWith("uploads/users/jobs")) {
            return false;
        }
        return true;
    }

    const deleteJob = async (id) => {
        const isConfirmed = window.confirm(`When you initiate the deletion of a job listing, please be aware that all user data associated with applications for that specific job will be automatically removed from our database.
        If you have any questions or concerns regarding this process, please do not hesitate to reach out to our support team for assistance.
        support@socialbharat.org
        जब आप किसी नौकरी लिस्टिंग को मिटाने का प्रारंभ करते हैं, तो कृपया ध्यान दें कि उस विशिष्ट नौकरी के लिए जमा की गई सभी उपयोगकर्ता डेटा स्वचालित रूप से हमारे डेटाबेस से हटा दिया जाएगा।
        यदि इस प्रक्रिया से संबंधित कोई सवाल या चिंता हो, तो कृपया हमारी सहायता टीम से संपर्क करें।
        support@socialbharat.org
        `)
        if (isConfirmed) {
            dispatch(setLoader(true));
            try {
                const response = await deleteUserPostedSingleJob(id);
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
        }

    };

    useEffect(() => {
        fetchOtherDetails();
        getJobApplicantStatistics();
        loadMoreData();
    }, []);


    useEffect(() => {
        const state = selectedState ? selectedState.label : "";
        const city = selectedCity ? selectedCity.label : "";
        fetchJobs(size, 1, state, city, searchText, activeNavItem);
    }, [searchText, selectedState, selectedCity, activeNavItem]);

    const handleNavItemClick = (navItem) => {
        if (navItem === 'All') {
            setSearchText('');
            setSelectedState(null);
            setSelectedCity(null);
        }
        setActiveNavItem(navItem);

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
    useEffect(() => {
        // Check if selectedCountry is already set
        if (user) {
            getAllStates();
            setIsAdmin(user.user.is_admin);
            setUserPhoto(user.user.photo);
        }
    }, [user]);
    useEffect(() => {
        if (isAdmin) {
            setJobPermission(user.user.permissions && user.user.permissions.have_job_permission);
        }
    }, [isAdmin]);

    useEffect(() => {
        if (selectedState) {
            getAllCities(selectedState.id);
        }
    }, [selectedState]);
    useEffect(() => {
        if (otherDetails) {
            setDescription(otherDetails.job_description);
            setSelectedFileTempUrl(otherDetails.RESUME);
            setResume(otherDetails.RESUME);
            setSelectedFilePreview(otherDetails.RESUME);
            setIsResume(otherDetails && otherDetails.RESUME ? true : false);
        }
    }, [otherDetails]);

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
    // const dataStatic = [
    //     {
    //         name: "John Doe",
    //         logo: "john_doe_logo.jpg",
    //         jobRole: "Software Engineer",
    //         company: "Tech Solutions Inc.",
    //         description: "Responsible for developing and maintaining web applications.",
    //         date: "2024-04-26",
    //         exp: "2024-04-26",

    //     },
    //     {
    //         name: "Alice Smith",
    //         logo: "alice_smith_logo.jpg",
    //         jobRole: "Marketing Manager",
    //         company: "Global Marketing Agency",
    //         description: "Develops marketing strategies and oversees promotional campaigns.",
    //         date: "2024-04-25",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "Michael Johnson",
    //         logo: "michael_johnson_logo.jpg",
    //         jobRole: "Financial Analyst",
    //         company: "Finance Corp.",
    //         description: "Analyzes financial data and prepares reports for management.",
    //         date: "2024-04-24",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "John Doe",
    //         logo: "john_doe_logo.jpg",
    //         jobRole: "Software Engineer",
    //         company: "Tech Solutions Inc.",
    //         description: "Responsible for developing and maintaining web applications.",
    //         date: "2024-04-26",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "Alice Smith",
    //         logo: "alice_smith_logo.jpg",
    //         jobRole: "Marketing Manager",
    //         company: "Global Marketing Agency",
    //         description: "Develops marketing strategies and oversees promotional campaigns.",
    //         date: "2024-04-25",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "Michael Johnson",
    //         logo: "michael_johnson_logo.jpg",
    //         jobRole: "Financial Analyst",
    //         company: "Finance Corp.",
    //         description: "Analyzes financial data and prepares reports for management.",
    //         date: "2024-04-24",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "John Doe",
    //         logo: "john_doe_logo.jpg",
    //         jobRole: "Software Engineer",
    //         company: "Tech Solutions Inc.",
    //         description: "Responsible for developing and maintaining web applications.",
    //         date: "2024-04-26",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "Michael Johnson",
    //         logo: "michael_johnson_logo.jpg",
    //         jobRole: "Financial Analyst",
    //         company: "Finance Corp.",
    //         description: "Analyzes financial data and prepares reports for management.",
    //         date: "2024-04-24",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "John Doe",
    //         logo: "john_doe_logo.jpg",
    //         jobRole: "Software Engineer",
    //         company: "Tech Solutions Inc.",
    //         description: "Responsible for developing and maintaining web applications.",
    //         date: "2024-04-26",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "Michael Johnson",
    //         logo: "michael_johnson_logo.jpg",
    //         jobRole: "Financial Analyst",
    //         company: "Finance Corp.",
    //         description: "Analyzes financial data and prepares reports for management.",
    //         date: "2024-04-24",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "John Doe",
    //         logo: "john_doe_logo.jpg",
    //         jobRole: "Software Engineer",
    //         company: "Tech Solutions Inc.",
    //         description: "Responsible for developing and maintaining web applications.",
    //         date: "2024-04-26",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "Michael Johnson",
    //         logo: "michael_johnson_logo.jpg",
    //         jobRole: "Financial Analyst",
    //         company: "Finance Corp.",
    //         description: "Analyzes financial data and prepares reports for management.",
    //         date: "2024-04-24",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "John Doe",
    //         logo: "john_doe_logo.jpg",
    //         jobRole: "Software Engineer",
    //         company: "Tech Solutions Inc.",
    //         description: "Responsible for developing and maintaining web applications.",
    //         date: "2024-04-26",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "Michael Johnson",
    //         logo: "michael_johnson_logo.jpg",
    //         jobRole: "Financial Analyst",
    //         company: "Finance Corp.",
    //         description: "Analyzes financial data and prepares reports for management.",
    //         date: "2024-04-24",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "John Doe",
    //         logo: "john_doe_logo.jpg",
    //         jobRole: "Software Engineer",
    //         company: "Tech Solutions Inc.",
    //         description: "Responsible for developing and maintaining web applications.",
    //         date: "2024-04-26",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "Michael Johnson",
    //         logo: "michael_johnson_logo.jpg",
    //         jobRole: "Financial Analyst",
    //         company: "Finance Corp.",
    //         description: "Analyzes financial data and prepares reports for management.",
    //         date: "2024-04-24",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "John Doe",
    //         logo: "john_doe_logo.jpg",
    //         jobRole: "Software Engineer",
    //         company: "Tech Solutions Inc.",
    //         description: "Responsible for developing and maintaining web applications.",
    //         date: "2024-04-26",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "Michael Johnson",
    //         logo: "michael_johnson_logo.jpg",
    //         jobRole: "Financial Analyst",
    //         company: "Finance Corp.",
    //         description: "Analyzes financial data and prepares reports for management.",
    //         date: "2024-04-24",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "John Doe",
    //         logo: "john_doe_logo.jpg",
    //         jobRole: "Software Engineer",
    //         company: "Tech Solutions Inc.",
    //         description: "Responsible for developing and maintaining web applications.",
    //         date: "2024-04-26",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "Alice Smith",
    //         logo: "alice_smith_logo.jpg",
    //         jobRole: "Marketing Manager",
    //         company: "Global Marketing Agency",
    //         description: "Develops marketing strategies and oversees promotional campaigns.",
    //         date: "2024-04-25",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "Michael Johnson",
    //         logo: "michael_johnson_logo.jpg",
    //         jobRole: "Financial Analyst",
    //         company: "Finance Corp.",
    //         description: "Analyzes financial data and prepares reports for management.",
    //         date: "2024-04-24",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "John Doe",
    //         logo: "john_doe_logo.jpg",
    //         jobRole: "Software Engineer",
    //         company: "Tech Solutions Inc.",
    //         description: "Responsible for developing and maintaining web applications.",
    //         date: "2024-04-26",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "Alice Smith",
    //         logo: "alice_smith_logo.jpg",
    //         jobRole: "Marketing Manager",
    //         company: "Global Marketing Agency",
    //         description: "Develops marketing strategies and oversees promotional campaigns.",
    //         date: "2024-04-25",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "Michael Johnson",
    //         logo: "michael_johnson_logo.jpg",
    //         jobRole: "Financial Analyst",
    //         company: "Finance Corp.",
    //         description: "Analyzes financial data and prepares reports for management.",
    //         date: "2024-04-24",
    //         exp: "2024-04-26",
    //     },
    //     {
    //         name: "John Doe",
    //         logo: "john_doe_logo.jpg",
    //         jobRole: "Software Engineer",
    //         company: "Tech Solutions Inc.",
    //         description: "Responsible for developing and maintaining web applications.",
    //         date: "2024-04-26"
    //     },
    //     {
    //         name: "Alice Smith",
    //         logo: "alice_smith_logo.jpg",
    //         jobRole: "Marketing Manager",
    //         company: "Global Marketing Agency",
    //         description: "Develops marketing strategies and oversees promotional campaigns.",
    //         date: "2024-04-25"
    //     },
    //     {
    //         name: "Michael Johnson",
    //         logo: "michael_johnson_logo.jpg",
    //         jobRole: "Financial Analyst",
    //         company: "Finance Corp.",
    //         description: "Analyzes financial data and prepares reports for management.",
    //         date: "2024-04-24"
    //     },
    //     // Add more objects as needed
    // ];

    return (
        <div id="job-board-section" className="pt-2">
            <Layout className="container card mx-auto">
                <div className="row d-flex">
                    <div className="col-md-2 col-12 " >
                        {/* <div className="logo">
          <img src="/user/images/sb-logo.png" className=" alt="Logo" />
        </div> */}
                        <Menu mode={isAndroidUsed ? 'horizontal' : 'vertical'} theme="light" defaultSelectedKeys={["dashboard"]} >
                            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                                <Link onClick={handleJobBoardClicked}>JOB BOARD</Link>
                            </Menu.Item>
                            <Menu.Item key="communities">
                                <Link onClick={() => handleNavItemClick('All')}>ALL</Link>
                            </Menu.Item>
                            <Menu.Item key="business-categories">
                                <Link onClick={() => handleNavItemClick('Full Time')}>FULL TIME</Link>
                            </Menu.Item>
                            <Menu.Item key="qualifications">
                                <Link onClick={() => handleNavItemClick('Part Time')}>PART TIME</Link>
                            </Menu.Item>
                            <Menu.Item key="degrees">
                                <Link onClick={() => handleNavItemClick('Freelance')}>FREELANCE</Link>
                            </Menu.Item>
                            <Menu.Item key="users">
                                <Link onClick={() => handleNavItemClick('Other')}>OTHERS</Link>
                            </Menu.Item>

                            <Menu.Item key="myjobs">
                                <Link onClick={() => handleNavItemClick('myJobs')}>MY JOBS</Link>
                            </Menu.Item>

                            <Menu.Item key="testimonials" icon={<img src="/user/images/createNewJob.png" width={15} ></img>}>
                                <Link onClick={() => handleIsCreateJob()}>CREATE NEW</Link>
                            </Menu.Item>
                            <Menu.Item key="bharatMataMandir" icon={<HistoryOutlined />}>
                                <Link onClick={handleUploadResumeClicked}>UPLOAD RESUME</Link>
                            </Menu.Item>
                            <Menu.Item key="services" icon={<QuestionCircleOutlined />}>
                                <Link onClick={() => handleIsContactUs()}>CONTACT US</Link>
                            </Menu.Item>

                        </Menu>
                        <div className="text-info fs-5 text-decoration-none m-2 ms-2">
                            <img src="/user/images/appliedJob.jpg" width={30} ></img>
                            <Link className="text-info fw-bold m-2" to="/user/all/applied/jobs">APPLIED JOBS</Link>
                        </div>
                        {
                            isAndroidUsed ? (
                               ""
                            ) : <div className="card" style={{ height: '100px' }}>
                                <div className="card-body " style={{ backgroundImage: 'url("/user/images/J.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                                    <Statistic
                                        title=""
                                        value={totalRows}
                                        formatter={formatter}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                    <div className="mt-5" style={{ maxHeight: '600px', width: '700px', overflow: 'scroll', position: 'absolute', zIndex: 1000, display: isJobCreate ? '' : 'none' }}>
                        <CreateJob handleIsCreateJob={handleIsCreateJob} />
                    </div>
                    <div className="mt-5" style={{ maxHeight: '600px', width: '700px', position: 'absolute', zIndex: 1000, display: isContactUsClicked ? '' : 'none' }}>
                        <ContactUsPage handleIsContactUs={handleIsContactUs} />
                    </div>
                    <div className="mt-5" style={{ maxHeight: '600px', overflow: 'scroll', width: '700px', position: 'absolute', zIndex: 1000, display: isUploadResumeClicked ? '' : 'none' }}>
                        <Card className="mb-3 mx-auto" style={{ borderRadius: '30px', flexDirection: 'column', display: 'flow' }}>
                            <Card.Header as="h5" className="d-flex justify-content-between">
                                <div>
                                    Upload Resume
                                </div>
                                <span onClick={() => setIsUploadResumeClicked(false)} className="position-absolute top-0 end-0 me-2 mt-3">
                                    {/* <i class="fs-1 fw-bold hover-pointer hover-pointer-red remove-btn-custom fa fa-remove"></i> */}
                                    <button className="hover-pointer-red round-button-delete"><i className="fa fa-remove"></i></button>
                                </span>
                            </Card.Header>
                            {serverErrorPdf && <span className="m-2 fs-5 text-danger">{serverErrorPdf}</span>}
                            {messageAttachment && <span className="m-2 error">{messageAttachment}</span>}
                            <Card.Body className="shadow" style={{ display: 'flow' }}>
                                {/* Select PDF container */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Select PDF File</Form.Label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="resumeFile"
                                        accept=".pdf"
                                        value=""
                                        onChange={handleFileChange}
                                    />
                                </Form.Group>

                                {/* Preview container (optional) */}
                                {selectedFilePreview && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Preview</Form.Label>
                                        <div>
                                            <div>
                                                <a className="bg-success text-light" href={selectedFilePreview} target="_blank" download="preview.pdf"><b><img src="/user/images/pdf.png" width={100}></img></b></a>

                                                {
                                                    isAndroidUsed ? '' : <iframe src={selectedFilePreview} type="application/pdf" width="100%" height="200px" />
                                                }
                                            </div>
                                        </div>
                                    </Form.Group>
                                )}

                                {/* Description */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Description (optional)</Form.Label>
                                    <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} defaultValue={description} />
                                </Form.Group>

                                {/* Submit and Cancel buttons */}
                                <Button variant="primary" onClick={handleResumeSubmit}>
                                    Submit
                                </Button>
                                <Button variant="primary m-2" onClick={() => handleUploadResume(false)}>
                                    Cancel
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 mx-auto">
                        <div className="container">
                            <div className="">
                                <div className="d-flex justify-content-between">
                                    <h4>Job Board</h4>
                                </div>
                                <p className="">You are searching {searchText ? [searchText] : ''} for-{activeNavItem} jobs in state-
                                    {selectedState ? selectedState.label : "All"} and city-
                                    {selectedCity ? selectedCity.label : "All"}</p>

                                <div className="row">

                                    <div className="mb-3 col-lg-12 col-sm-12 col-xs-12">
                                        <label className="form-label">Search</label>
                                        <div className="input-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Search i.e job title, company name, state, city..."
                                                name="text"
                                                value={searchText}
                                                onChange={handleSearchText}
                                                style={{ fontSize: '12px', height: '38px' }}
                                            />
                                            <span className="input-group-text">
                                                <i className="fas fa-search ps-2"></i>
                                            </span>
                                        </div>
                                    </div>

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
                            </div>
                            {!selectedFileTempUrl && <p className="error col-12 col-sm-12">You haven't uploaded your resume yet. Please upload your resume to proceed.</p>}


                            <div className="" id="scrollableDiv"
                                style={{
                                    height: 400,
                                    overflow: 'auto',


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
                                    scrollableTarget="scrollableDiv"
                                >

                                    {
                                        dataStatic && dataStatic.map((item, index) => (
                                            <div key={index} className={`card ${isDetails[index] ? 'rotate-card' : ''}`} >
                                                <img className={`card-img-top ${isDetails[index] ? 'hidden' : ''}`} src={checkUrl(item.logo) ? item.logo : (userPhoto ? userPhoto : defaultUserImage)} alt="Card image cap" style={{ width: isAndroidUsed ? '40px' : '100px', height: isAndroidUsed ? '40px' : '100px', marginTop: '30px', marginLeft: '10px' }} />
                                                <div className="card-body">
                                                    <div className={`section1 ${isDetails[index] ? 'hidden' : ''}`}>
                                                        <h5 className="card-title">{item.job_title}</h5>
                                                        <p className="card-text">{item.job_subheading}</p>
                                                        <p className="card-text m-2 fw-bold">Jaipur(Rajasthan)</p>
                                                        <a href="#" className="btn" onClick={() => handleIsDetailsClicked(index)}>View Details</a>
                                                    </div>
                                                    <div className={`top-0 job-time-zone text-muted end-0 position-absolute section2 ${isDetails[index] ? 'hidden' : ''}`}>
                                                        <p>{formatDate(item.job_start_date)}</p>
                                                        <p>{item.job_type}</p>
                                                        {
                                                            item.job_apply_form === 'Inactive' ? (item.is_job_applied === 'false' && item.job_apply_form === 'Inactive' ? (
                                                                <a
                                                                    className="btn btn-success"
                                                                    onClick={() => handleApplyClicked(true, item)}
                                                                >
                                                                    Easy Apply
                                                                </a>
                                                            ) : (
                                                                <a
                                                                    className="btn btn-success"
                                                                >
                                                                    Submitted
                                                                </a>
                                                            )) : (
                                                                <a href={item.apply_link} target="_blank"
                                                                    className="btn btn-success"
                                                                >
                                                                    Easy Apply
                                                                </a>
                                                            )
                                                        }
                                                        <div className={`mt-2 ${!isDetails[index] ? '' : 'hidden'}`}>
                                                            {activeNavItem === 'myJobs' && isAction ? (
                                                                <div className="hover-pointer text-danger">
                                                                    {appliedStatistics.map((value) =>
                                                                        value.job_id === item.id ? (
                                                                            <div className="">
                                                                                {activeNavItem === "myJobs" ? (
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
                                                                    <i
                                                                        className="fa fa-edit me-2 hover-pointer text-success"
                                                                        title="Edit"
                                                                        onClick={() =>
                                                                            changeUpdateClickedFlag(item.id)
                                                                        }
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
                                                                                className=" fa fa-thumbs-up text-success"
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
                                                                                className="fa fa-thumbs-down  text-secondary"
                                                                                title="Inactive"
                                                                            />
                                                                        </a>

                                                                    )}
                                                                    {
                                                                        jobPermission && <a className='text-danger ms-3'
                                                                            onClick={() => deleteJob(item.id)}
                                                                            title="Delete">
                                                                            <i className="text-success fas fa-trash"></i>
                                                                        </a>
                                                                    }
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                            {isJobUpdate ? (
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
                                                    </div>

                                                    <div className={`${!isDetails[index] ? 'hidden' : ''}`}>
                                                        <span
                                                            onClick={() => handleIsDetailsClicked(index)}
                                                            className="position-absolute top-0 end-0 me-2 mt-1">
                                                            {/* <i class="fs-1 fw-bold hover-pointer hover-pointer-red remove-btn-custom fa fa-remove"></i> */}
                                                            <button className="hover-pointer-red round-button-delete"><i className="fa fa-remove"></i></button>
                                                        </span>

                                                        <div className="top-0 job-time-zone text-muted end-0 position-absolute mt-5">
                                                            {formatDate(item.updated_at)}
                                                            <br />
                                                            {
                                                                item.job_apply_form === 'Inactive' ? (item.is_job_applied === 'false' && item.job_apply_form === 'Inactive' ? (
                                                                    <a
                                                                        className="btn btn-success"
                                                                        onClick={() => handleApplyClicked(true, item)}
                                                                    >
                                                                        Easy Apply
                                                                    </a>
                                                                ) : (
                                                                    <a
                                                                        className="btn btn-success"
                                                                    >
                                                                        Submitted
                                                                    </a>
                                                                )) : (
                                                                    <a href={item.apply_link} target="_blank"
                                                                        className="btn btn-success"
                                                                    >
                                                                        Easy Apply
                                                                    </a>
                                                                )
                                                            }
                                                        </div>
                                                        <div className="">
                                                            <img
                                                                src={checkUrl(item.logo) ? item.logo : (userPhoto ? userPhoto : defaultUserImage)}
                                                                alt={item.name}
                                                                title={item.name}
                                                                className="avatar img-fluid img-circle"
                                                                width={60}
                                                            />
                                                        </div>
                                                        <div className="col-md-7 col-sm-8" style={{ alignItems: 'center' }}>
                                                            <div className="row mt-2">
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
                                                        <div>
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
                                                                item.attachment ? (
                                                                    <p className="row col-12">
                                                                        <span className="col-5">
                                                                            <b> Attachment :</b>
                                                                        </span>
                                                                        {item.attachment && (
                                                                            <span className="col-7">
                                                                                <a
                                                                                    href={item.attachment}
                                                                                    download={`${item.job_title}.pdf`}
                                                                                    target="_blank"
                                                                                >
                                                                                    <i className="fa-regular fa-file-lines"></i> Download Attachment
                                                                                </a>

                                                                            </span>
                                                                        )}
                                                                    </p>


                                                                ) : ''
                                                            }
                                                            {
                                                                item.apply_link ? (
                                                                    <div className="row m-1">
                                                                        <div className="col-12 col-md-6">
                                                                            <b>Apply Link:</b>
                                                                        </div>
                                                                        <div className="col-12">
                                                                            <a className="d-block" href={item.apply_link} target="_blank" rel="noopener noreferrer">
                                                                                {item.apply_link}
                                                                            </a>
                                                                        </div>

                                                                    </div>

                                                                ) : ""
                                                            }
                                                            <div key={index} className="row m-1">
                                                                <div className="col-12 col-md-6"><b>Description :</b></div>
                                                                <div className="col-12">
                                                                    <p
                                                                        className=""
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: selectedIndex === index ? item.description : `${item && item.description && item.description.slice(0, 300)}<span style='color: gray;'>${item.description.length > 300 ? '...' : ''}</span>`
                                                                        }}
                                                                    ></p>
                                                                    {
                                                                        item.description.length > 300 && <button className="mx-auto over-pointer-g-effect" onClick={() => toggleDescription(index)}>
                                                                            {selectedIndex === index ? 'Show Less' : 'Show More'}
                                                                        </button>
                                                                    }
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </InfiniteScroll>

                            </div>
                        </div>
                    </div>
                    <div id="current-job-section" className="col-12 col-md-5 mt-2">
                        <div className="col-12 mb-3" >
                            <div className="">
                                <h4 className="text-danger">Current Openings</h4>
                                <div className="">
                                    <CurrentJobOpening />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default Jobs;
