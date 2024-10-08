import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteJobsPosted, fetchAllJobsPosted, toggleJobPostFeatured, toggleJobPostStatus } from "../../services/AdminService";
import { Table } from "antd";
import { setLoader } from "../../actions/loaderAction";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
} from "react-bootstrap";
import UpdateJobPosted from "./UpdateJobPosted";
import CurrentOpenings from "./CurrentOpenings";

const AllJobs = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavItem, setActiveNavItem] = useState("ALL");
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [jobId, setJobId] = useState('');
  const [featured, setFeatured] = useState(false);
  const [isCurrentOpnings, setIsCurrentOpenings] = useState(false);

  const handleNavItemClick = (navItem) => {
    if (navItem === "CREATE JOBS") {
      console.log("Hello nav");
      setActiveNavItem(navItem);
    } else {
      setActiveNavItem(navItem);
    }
  };
  const toggleCurrentOpening = () => {
    setActiveNavItem(isCurrentOpnings?'ALL':'')
    setIsCurrentOpenings(!isCurrentOpnings)
  }

  const actionInModelToUpdate = (value, id) => {
    setOpenUpdateForm(value);
    if (id) {
      setJobId(id);
    }
  };

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
    console.log(e.target.value)
  };

  const handleFeaturedChange = async (id) => {
    try {
      const response = await toggleJobPostFeatured(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    }
  }

  const fetchData = async () => {
    let jobType = activeNavItem;
    if (jobType === "ALL") {
      jobType = "";
    } else if (jobType === "PART TIME") {
      jobType = "Part Time";
    } else if (jobType === "FULL TIME") {
      jobType = "Full Time";
    } else if (jobType === "FREELANCE") {
      console.log(jobType);
      jobType = "Freelance";
      jobType = jobType.trim();
    } else if (jobType === "OTHERS") {
      jobType = "Other";
    } else if (jobType === "MY JOBS") {
      jobType = "myJobs";
    }
    if (
      jobType === "" ||
      jobType === "Part Time" ||
      jobType === "Full Time" ||
      jobType === "Freelance" ||
      jobType === "Other" ||
      jobType === "myJobs" ||
      jobType === "GOVERNMENT"
    ) {
      try {
        let is_admin_post = "";
        if (jobType === "myJobs") {
          is_admin_post = true;
        } else {
          is_admin_post = false;
        }
        dispatch(setLoader(true));
        const response = await fetchAllJobsPosted(
          page,
          size,
          searchQuery,
          jobType
        );
        setData(response.data.data.jobs);
        setTotalRows(response.data.data.totalRowsAffected);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/admin");
        } else if (error.response && error.response.status === 500) {
          let errorMessage = error.response.data.message;
          navigate("/server/error", { state: { errorMessage } });
        }
      } finally {
        dispatch(setLoader(false));
      }
    }
  };

  const handleStatusToggle = async (id) => {
    try {
      const response = await toggleJobPostStatus(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate("/server/error", { state: { errorMessage } });
      }
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      try {
        const response = await deleteJobsPosted(id);
        if (response && response.status === 200) {
          fetchData();
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/admin");
        } else if (error.response && error.response.status === 500) {
          let errorMessage = error.response.data.message;
          navigate("/server/error", { state: { errorMessage } });
        }
      }
    }
  };

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
      title: "S.No",
      dataIndex: "sno",
      render: (text, record, index) => (page - 1) * size + index + 1,
      width: 100,
    },
    {
      title: "Posted By",
      dataIndex: "name",
    },
    {
      title: "Job Title",
      dataIndex: "job_title",
    },
    {
      title: "Job Posted",
      dataIndex: "updated_at",
      render: (text, record) => calculateTimeDifference(record.updated_at),
    },
    {
      title: "Application Begin",
      dataIndex: "job_start_date",
      render: (text, record) => formatDate(record.job_start_date),
    },
    {
      title: "Last Date",
      dataIndex: "job_end_date",
      render: (text, record) => formatDate(record.job_end_date),
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <div >
          {record.status == "true" ? (
            <a
              className="collapse-item hover-pointer-admin "
              onClick={(e) => {
                e.preventDefault();
                handleStatusToggle(record.id);
              }}
            >
              <i className="fa fa-thumbs-up text-primary" title="Active" />
            </a>
          ) : (
            <a
              className="collapse-item text-secondary hover-pointer-admin m-2"
              onClick={(e) => {
                e.preventDefault();
                handleStatusToggle(record.id);
              }}
            >
              <i className="fa fa-thumbs-down" title="Inactive" />
            </a>
          )}
        </div>
      ),
    },
    {
      title: 'Featured', dataIndex: 'featured', render: (text, record) => (record.featured === 'true' ? (
        <a
          className="collapse-item m-2"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleFeaturedChange(record.id);
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
            handleFeaturedChange(record.id);
          }}
        >
          <i class="fa fa-toggle-off" aria-hidden="true"></i>
        </a>
      )),
      fixed: 'right',
      width: 100,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex justify-content-between" style={{ width: '80px' }}>
          {
            activeNavItem === 'MY JOBS' ? (
              <a
                className="collapse-item hover-pointer-admin"
                onClick={(e) => actionInModelToUpdate(true, record.id)}
              >
                <i className="fa fa-edit mr-4" title="Edit" />
              </a>
            ) : ''
          }

          <a
            className="collapse-item hover-pointer-admin"
            onClick={(e) => {
              e.preventDefault();
              handleDelete(record.id);
            }}
          >
            <i className="fas fa-trash "></i>
          </a>
          <a
            className="collapse-item hover-pointer-admin"
            onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor tag behavior
              navigate(`/admin/rgistered-users/${record.id}/job/${record.job_title}/company/${record.job_subheading}`);
            }}
          >
            <i className="fas fa-eye "></i>
          </a>
        </div>
      ),
    },
    // Rest of the columns definition
  ];

  useEffect(() => {
    if (activeNavItem || searchQuery || openUpdateForm || page) {

      fetchData();
    }
  }, [activeNavItem, searchQuery, openUpdateForm, page]);
  return (
    <div>
      <div id="" className="">
        <div className="row">
          <div className="col-12 col-sm-12">
            <div className="card shadow">
              <div className="card-header shadow p-0">
                <Navbar bg="" expand="lg" className="text-green">
                  <Navbar.Brand>JOB BOARD</Navbar.Brand>
                  <Navbar.Brand className={`hover-pointer hover-pointer-red ${isCurrentOpnings?'text-danger':'inherit'}`} onClick={toggleCurrentOpening}>CURRENT OPENING</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto ">
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
                        onClick={() => handleNavItemClick("GOVERNMENT")}
                        style={{
                          color:
                            activeNavItem === "GOVERNMENT" ? "red" : "inherit",
                        }}
                      >
                        GOVERNMENT
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
                          color:
                            activeNavItem === "MY JOBS" ? "red" : "inherit",
                        }}
                      >
                        MY JOBS
                      </Nav.Link>

                      {/* Remove the following NavDropdown section */}
                      {/* <NavDropdown title="ACTION" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#">Requested Jobs</NavDropdown.Item>
                                    <NavDropdown.Item href="#">Create Job</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
                                </NavDropdown> */}
                    </Nav>
                    {/* Remove the following Form section */}
                    <Form inline className="d-flex">
                      <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                        onChange={handleSearchChange}
                      />
                    </Form>
                  </Navbar.Collapse>
                </Navbar>
              </div>
              <div className="card-body">
                {
                  isCurrentOpnings ? (
                    <CurrentOpenings />
                  ) : (
                    <Table
                      title={() => `${activeNavItem} JOB`} // Set the title to 'Enquiries'
                      dataSource={data}
                      columns={columns}
                      pagination={{
                        current: page,
                        pageSize: size,
                        total: totalRows,
                        onChange: handlePageChange,
                        onShowSizeChange: handlePageSizeChange,
                      }}
                      // onChange={handleTableChange}

                      rowKey={(record) => record.id}
                    // onChange={handleSearchChange}
                    />

                  )
                }
                {
                  openUpdateForm ? (<UpdateJobPosted actionInModelToUpdate={actionInModelToUpdate} jobId={jobId} />) : ''
                }

                {openUpdateForm ? (
                  <UpdateJobPosted
                    actionInModelToUpdate={actionInModelToUpdate}
                    jobId={jobId}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          {/* <div className="card col-12 col-sm-3 m-2">
                    <FeaturedJobs />
                </div> */}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
