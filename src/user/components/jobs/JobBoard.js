import { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import FeaturedJobs from "./FeaturedJobs";
import {
  deleteUserPostedSingleJob,
  deleteUserPostedSingleService,
  fetchAllCitiesByStateID,
  fetchAllJobsByLoggedUser,
  fetchAllJobsPosted,
  fetchAllStatesByCountryID,
} from "../../services/userService";
import InfiniteScroll from "react-infinite-scroll-component";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UpdateJobPosted from "./UpdateJobPosted";
import { setLoader } from "../../actions/loaderAction";
import Select from "react-select";

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
  const [defaultImage, setDefaultImage] = useState(
    "/user/images/netparamlogo.jpg"
  );

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  //state and city change operations
  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    console.log(selectedOption);

    if (selectedOption) {
      const selectedStateObject = states.find(
        (state) => state.name === selectedOption.value
      );
      console.log(selectedStateObject);
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

  const dataSource = [
    {
      key: "1",
      company: "Netparam",
      job_title: "UI & UX developer",
      apply_form: true,
      photo: "/user/images/job1.png",
      location: "747, Janpath, Rani Sati nagar, Nirman nagar, Jaipur-302019",
      age: 32,
      address: "10 Downing Street",
      description:
        "jhvghjvjhvjhvugf bvbvjhgvjvj jhvjhvjhvjhvj hjbjhjhbvjbjbjbjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjkjbjk kjhjhkjhbkjbkjbkjbkjb vjhvjhvghvgvjvj vjhvjhvjhvjhvbjhvjhbjhbjhbjhbjhbjhjbj hjbjhbjhbjbjbvjbjbjbkjbkjbkjbkjbkbkjbkjb",
    },
  ];

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
        console.log(response.data.data.totalRowsAffected);
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
        console.log(response.data.data.totalRowsAffected);
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

  const fetchMoreData = () => {
    if (!isLoading && data.length < totalRows) {
      console.log(data.length, totalRows);
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
      const state = selectedState && selectedState.label;
      const city = selectedCity ? selectedCity.label : "";
      fetchJobs(page, 20, state, city, activeNavItem);
      setIsMyJobsClicked(false);
    } else if (activeNavItem === "MY JOBS") {
      setPage(1);
      setIsMyJobsClicked(true);
      fetchMyJobs(page, 20);
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
    console.log(selectedState);
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
  return (
    <div id="auth-wrapper" className="pt-5 pb-4 container">
      <div className="row">
        <div className="col-12 col-sm-8">
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
              <Navbar bg="light" expand="lg">
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
                  <div className="">
                    {groupedItems.map((pair, index) => (
                      <div className="row" key={index}>
                        {pair.map((item, innerIndex) => (
                          <div className="col-md-12" key={innerIndex}>
                            <div className="card shadow  mb-3">
                              <div className="card-body">
                                <div className="top-0 job-time-zone text-muted end-0 position-absolute">
                                  {calculateTimeDifference(item.updated_at)}
                                </div>
                                <div className="row wow animate__animated animate__zoomIn ">
                                  <div className="col-md-3 col-sm-3">
                                    <Image
                                      src={
                                        item.photo ? item.photo : defaultImage
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
                                          {`${
                                            item.state
                                              ? `${item.city}(${item.state})`
                                              : ""
                                          }`}
                                        </p>
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>

                              <div className="card-footer btn btn-success bg-success text-light">
                                Apply
                                {isMyJobsClicked ? (
                                  <div className="float-right">
                                    <i
                                      className="fa fa-edit mr-2 m-2"
                                      title="Edit"
                                      onClick={() =>
                                        changeUpdateClickedFlag(true, item.id)
                                      }
                                    />
                                    <i
                                      className="fa fa-trash m-2"
                                      title="Delete"
                                      onClick={() => deleteMyJob(item.id)}
                                    />
                                    <i
                                      className="fa fa-thumbs-down m-2"
                                      title="Inactive"
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}
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

        <div className="col-12 col-sm-3">
          <div className="card">
            <FeaturedJobs />
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobBoard;
