import CountUp from "react-countup";
import { Statistic } from "antd";
import { useEffect, useState } from "react";
import { fetchAdminDashboardStatistics, fetchAdminDashboardStatisticsForActivities, fetchAdminDashboardStatisticsForBusiness, fetchAdminDashboardStatisticsForMatrimonial, fetchAdminInfoStatistics } from "../services/AdminService";
import { useNavigate } from "react-router-dom";
import UsersChart from "./charts/UsersChart";
import ServiceChart from "./charts/ServiceChart";
import JobChart from "./charts/JobChart";

const formatter = (value) => <CountUp end={value} separator="," />;
const BodyContent = () => {
  const [statistics, setStatistics] = useState("");
  const [companese, setCompanese] = useState([]);
  const [jobStatic, setJobStatic] = useState([]);
  const [isView, setIsView] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isActivityShow, setIsActivityShow] = useState(false);
  const [isBusinessShow, setIsBusinessShow] = useState(false);
  const [activities, setActivities] = useState([]);
  const [copyActivity, setCopyActivity] = useState([]);
  const [activityInput, setActivityInput] = useState('');
  const [business, setBusiness] = useState([]);
  const [copyBusiness, setCopyBusiness] = useState([]);
  const [matrimonials, setMatrimonials] = useState('');
  const [copyMatrimonial, setCopyMatrimonial] = useState('');
  const [isMatrimonialShow, setIsMatrimonialShow] = useState(false);
  const [activeAdmin, setActiveAdmin] = useState('');
  const [isShowAdmin, setIsShowAdmin] = useState(false);
  const [matrimonialInput, setMatrimonialInput] = useState('');
  const socialActivityIcon = '/admin/img/social-activity.png';
  const BusinessIcon = '/admin/img/briefcase.png'

  const navigate = useNavigate();

  const handleIsView = () => {
    setIsView(!isView);
  }
  const handleActivityShow = () => {
    setIsActivityShow(!isActivityShow);
  }

  const handleActivityChange = (e) => {
    setActivityInput(e.target.value);
    const filteredResults = copyActivity.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setActivities(filteredResults);
  }
  const handleBusinessShow = () => {
    setIsBusinessShow(!isBusinessShow);
  }
  const handleBusinessChange = (e) => {
    setActivityInput(e.target.value);
    const filteredResults = copyBusiness.filter((item) =>
      item.posted_by.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setBusiness(filteredResults);
  }

  const handleMatrimonialShow = () => {
    setIsMatrimonialShow(!isMatrimonialShow);
  }

  const handleMatrimonialChange = (e) => {
    setMatrimonialInput(e.target.value);
    const filteredResults = copyMatrimonial.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setMatrimonials(filteredResults);
  }

  const fetchDashboardStatistics = async () => {
    try {
      const response = await fetchAdminDashboardStatistics();
      if (response && response.status === 200) {
        setStatistics(response.data.data);

        console.log(response.data.data)
      }
    } catch (error) {
      // Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate("/server/error", { state: { errorMessage } });
      }
    }
  };
  const fetchActivitiesStatistics = async () => {
    try {
      const response = await fetchAdminDashboardStatisticsForActivities();
      if (response && response.status === 200) {
        setActivities(response.data.result);
        setCopyActivity(response.data.result);
      }
    } catch (error) {
      // Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate("/server/error", { state: { errorMessage } });
      }
    }
  };
  const fetchBusinessesStatistics = async () => {
    try {
      const response = await fetchAdminDashboardStatisticsForBusiness();
      if (response && response.status === 200) {
        setBusiness(response.data.result);
        setCopyBusiness(response.data.result);
      }
    } catch (error) {
      // Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate("/server/error", { state: { errorMessage } });
      }
    }
  };
  const fetchMatrimonialStatistics = async () => {
    try {
      const response = await fetchAdminDashboardStatisticsForMatrimonial();
      if (response && response.status === 200) {
        setMatrimonials(response.data.result);
        setCopyMatrimonial(response.data.result);
      }
    } catch (error) {
      // Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate("/server/error", { state: { errorMessage } });
      }
    }
  };
  const fetchAdminStatistics = async () => {
    try {
      const response = await fetchAdminInfoStatistics();
      if (response && response.status === 200) {
        setActiveAdmin(response.data.result);
      }
    } catch (error) {
      // Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate("/server/error", { state: { errorMessage } });
      }
    }
  };
  useEffect(() => {
    if (statistics) {
      if (statistics.companesePosted.length > 0) {
        setCompanese(statistics.companesePosted);
      }
      setJobStatic(statistics.job_statistics);

    }
  }, [statistics]);
  useEffect(() => {
    if (isActivityShow) {
      fetchActivitiesStatistics();
    }
  }, [isActivityShow])
  useEffect(() => {
    if (isBusinessShow) {
      fetchBusinessesStatistics();
    }
  }, [isBusinessShow]);
  useEffect(() => {
    if (isMatrimonialShow) {
      fetchMatrimonialStatistics();
    }
  }, [isMatrimonialShow])
  useEffect(() => {
    if (isShowAdmin) {
      fetchAdminStatistics();
    }
  }, [isShowAdmin])
  useEffect(() => {
    if (jobStatic.length > 0) {
      if (jobStatic.length > 1) {
        setTotalJobs(jobStatic[0].totalCount + jobStatic[1].totalCount)
      } else {
        setTotalJobs(jobStatic[0].totalCount)
      }
    }
  }, [jobStatic])

  useEffect(() => {
    fetchDashboardStatistics();
  }, []);
  return (
    <>
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50"></i> Generate
          Report
        </a>
      </div>

      {/* <!-- Content Row --> */}
      <div className="row">

        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="h5 mb-0 font-weight-bold text-gray-800">

                    <Statistic

                      title={
                        <span className="text-xs font-weight-bold  text-uppercase mb-1">
                          <a className="text-danger hover-pointer-admin stretched-link" onClick={() => navigate('/admin/users')}>
                            ACTIVE USERS
                          </a>
                        </span>
                      }
                      value={statistics && statistics.user_count}
                      formatter={formatter}
                    />
                  </div>
                  <div className="card-footer">

                    <Statistic

                      title={
                        <span className="text-xs font-weight-bold  text-uppercase mb-1">
                          <a className="text-danger hover-pointer-admin stretched-link">
                            ACTIVE ADMINS
                          </a>
                        </span>
                      }
                      value={statistics && statistics.admin_count}
                      formatter={formatter}
                    />
                  </div>
                </div>
                <div className="col-auto">
                  <h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-people text-gray-300"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                    </svg>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="h5 mb-0 font-weight-bold text-gray-800">

                    <Statistic

                      title={
                        <span className="text-xs font-weight-bold  text-uppercase mb-1">
                          <a className="text-primary stretched-link" onClick={() => navigate('/admin/communities')}>
                            USERS With Community
                          </a>
                        </span>
                      }
                      value={statistics && statistics.user_count}
                      formatter={formatter}
                    />
                  </div>
                </div>
                <div className="col-auto">
                  <h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-people text-gray-300"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                    </svg>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    <Statistic
                      title={
                        <span className="text-xs font-weight-bold  text-uppercase mb-1">
                          <a className="text-success stretched-link" onClick={() => navigate('/admin/enquiries')}>
                            ENQUIRES
                          </a>
                        </span>
                      }
                      value={statistics && statistics.enquiry_count}
                      formatter={formatter}
                    />
                  </div>
                </div>
                <div className="col-auto">
                  <h1>

                    <i
                      className="fa fa-question-circle h-20 text-gray-300"
                      aria-hidden="true"
                    ></i>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        <Statistic
                          title={
                            <span className="text-xs font-weight-bold text-uppercase mb-1">
                              <a className="text-info stretched-link" onClick={() => navigate('/admin/users')}>
                                MATRIMONIALS
                              </a>
                              <a className="text-primary m-2 stretched-link"
                                onClick={() => handleMatrimonialShow()}
                              >
                                View More
                              </a>
                            </span>

                          }
                          value={
                            statistics &&
                            statistics.interested_for_marriage_count
                          }
                          formatter={formatter}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className=" progress-sm mr-2">
                        <div
                          className=" bg-info"
                          aria-valuenow={
                            (statistics &&
                              statistics.interested_for_marriage_count) ||
                            0
                          }

                        >

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <h1>
                    {" "}
                    <i className="fa fa-heart text-gray-300"></i>
                  </h1>
                </div>
              </div>
            </div>
          </div>
          {
            isMatrimonialShow && (
              <div className="card card-body shadow col-xl-11 col-md-6 mb-4" style={{ position: 'absolute', zIndex: 9999, transition: 'height 0.8s', overflow: 'scroll' }}>
                <div className="input-group rounded">
                  <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={handleMatrimonialChange} />
                  <span className="input-group-text border-0" id="search-addon">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Community Name</th>
                      <th>Matrimonial Posted</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      matrimonials && matrimonials.length > 0 && matrimonials.map((item) => (

                        <tr>
                          <td>{item.name}</td>
                          <td>{item.totalCount}</td>
                          <td><a
                            className="collapse-item"
                            onClick={() => navigate(`/admin/matrimonial/${item.community_id}`)}
                          >
                            <i className="fas fa-eye"></i>
                          </a></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>

              </div>
            )
          }
        </div>

        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      <Statistic
                        title={
                          <span className="text-xs font-weight-bold  text-uppercase mb-1">
                            <a className="text-warning stretched-link" onClick={() => navigate('/admin/event/index')}>
                              Total Events
                            </a>
                          </span>
                        }
                        value={statistics && statistics.event_count}
                        formatter={formatter}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-auto">

                  <i class="fa fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      <Statistic
                        title={
                          <span className="text-xs font-weight-bold  text-uppercase mb-1 d-flex">
                            <a className="text-success stretched-link"
                            >
                              Total Social Activities
                            </a>
                            <a className="text-primary stretched-link"
                              onClick={() => handleActivityShow()}
                            >
                              View More
                            </a>
                          </span>
                        }
                        value={statistics && statistics.activity_count}
                        formatter={formatter}
                      />

                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <img src={socialActivityIcon} width={30} />
                </div>
              </div>
            </div>

          </div>

          {
            isActivityShow && (
              <div className="card card-body shadow col-xl-11 col-md-6 mb-4" style={{ position: 'absolute', zIndex: 9999, transition: 'height 0.8s', overflow: 'scroll' }}>
                <div className="input-group rounded">
                  <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={handleActivityChange} />
                  <span className="input-group-text border-0" id="search-addon">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Profile</th>
                      <th>Name</th>
                      <th>Total Activity Posted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      activities && activities.length > 0 && activities.map((item) => (

                        <tr>
                          <td><img src={item.photo} width={50} height={50}></img></td>
                          <td>{item.name}</td>
                          <td>{item.totalCount}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>

              </div>
            )
          }
        </div>
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      <Statistic
                        title={
                          <span className="text-xs font-weight-bold  text-uppercase mb-1 d-flex">
                            <a className="text-success stretched-link"
                            // onClick={() => navigate('/admin/event/index')}
                            >
                              Total Business Posted
                            </a>
                            <a className="text-primary stretched-link"
                              onClick={() => handleBusinessShow()}
                            >
                              View More
                            </a>
                          </span>
                        }
                        value={statistics && statistics.business_count}
                        formatter={formatter}
                      />

                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <img src={BusinessIcon} width={40} />
                </div>
              </div>
            </div>

          </div>

          {
            isBusinessShow && (
              <div className="card card-body shadow col-xl-11 col-md-6 mb-4" style={{ position: 'absolute', zIndex: 9999, transition: 'height 0.8s', overflow: 'scroll' }}>
                <div className="input-group rounded">
                  <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={handleBusinessChange} />
                  <span className="input-group-text border-0" id="search-addon">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Profile</th>
                      <th>Name</th>
                      <th>Total Business Posted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      business && business.length > 0 && business.map((item) => (

                        <tr>
                          <td><img src={item.user_photo} width={50} height={50}></img></td>
                          <td>{item.posted_by}</td>
                          <td>{item.totalPosted}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>

              </div>
            )
          }
        </div>

        <div className="col-xl-12 col-md-12 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      <div className="col-12 card-header fs-4">Job Statistic</div>
                      <div className="row">
                        <div className="col-xl-2">
                          <Statistic
                            title={
                              <span className="text-xs font-weight-bold  text-uppercase mb-1">
                                <a className="text-danger stretched-link">
                                  Total Jobs
                                </a>
                              </span>
                            }
                            value={totalJobs}
                            formatter={formatter}
                          />
                        </div>
                        <div className="col-xl-2">
                          <Statistic
                            title={
                              <span className="text-xs font-weight-bold  text-uppercase mb-1">
                                <a className="text-primary stretched-link">
                                  Total Unexpired Jobs
                                </a>
                              </span>
                            }
                            value={statistics && statistics.jobLiveStatistics && statistics.jobLiveStatistics.totalCount}
                            formatter={formatter}
                          />
                        </div>
                        <div className="col-xl-2">
                          <Statistic
                            title={
                              <span className="text-xs font-weight-bold  text-uppercase mb-1">
                                <a className="text-warning stretched-link">
                                  Total Featured Jobs
                                </a>
                              </span>
                            }
                            value={statistics && statistics.featuredJob.totalCount}
                            formatter={formatter}
                          />
                        </div>
                        <div className="col-xl-3">
                          <Statistic
                            title={
                              <span className="text-xs font-weight-bold  text-uppercase mb-1">
                                <a className="text-info stretched-link">
                                  Total UnExpired Featured Job
                                </a>
                              </span>
                            }
                            value={statistics && statistics.unexpiredFeaturedJob.totalCount}
                            formatter={formatter}
                          />
                        </div>
                        <div className="col-xl-3 text-success">
                          Companese Contribution<br></br>
                          <button type="button" onClick={handleIsView} className="btn btn-success" disabled={companese && companese.length === 0}>{isView ? 'Hide' : 'View'}</button>

                        </div>

                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-auto">

                  <i class="fa fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {
            isView && companese && companese.length > 0 && (
              <table className="table table-striped table-hover table-bordered m-2 btn">
                <thead>
                  <tr className="">
                    <th>Company</th>
                    <th>Jobs Count</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    companese.map((item) => (
                      <tr>
                        <td>{item.job_subheading}</td>
                        <td>{item.totalCount}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            )
          }

        </div>

      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {/* Service Chart */}
            <div className="card">
              <div className="card-body shadow">
                <h5 className="card-title">Service Chart</h5>
                <ServiceChart statistics={statistics} />
              </div>
            </div>
          </div>

          <div className="col-md-6 ">
            {/* Users Chart */}
            <div className="card">
              <div className="card-body shadow">
                <h5 className="card-title">Users Chart</h5>
                <UsersChart statistics={statistics} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          {/* Service Chart */}
          <div className="card">
            <div className="card-body shadow">
              <h5 className="card-title">Job Chart</h5>
              <JobChart statistics={statistics} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BodyContent;
