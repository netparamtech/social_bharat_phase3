import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Drawer } from "antd";
import { useEffect, useState } from "react";
import { setLoader } from "../../actions/loaderAction";
import { logout } from "../../actions/userAction";
import UserNavDropdown from "./UserNavDropdown";
import { getToken } from "../../services/userService";
import { WechatOutlined } from "@ant-design/icons";

const NavbarCustom = (props) => {
  const { data, community } = props;
  const user = useSelector((state) => state.userAuth);
  const tokenExpireDate = user && user.token && user.token.expire_at;
  const [isAuthenticUser, setIsAuthenticatedUser] = useState(user && user.isAuthenticated)
  const isPasswordSet = user && user.user && user.user.is_password_set;

  const [visible, setVisible] = useState(false);
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);
  const location = useLocation();

  const defaultLogo = '/user/images/sb-logo.png';

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (tokenExpireDate) {
      const expireDate = new Date(tokenExpireDate);
      const currentDate = new Date();
      if (expireDate < currentDate && window.location.pathname !== '/' && window.location.pathname !== '/register') {
        dispatch(logout())
        setIsAuthenticatedUser(false);
        navigate('/login')
      } else if (expireDate < currentDate) {
        dispatch(logout())
      }
    }
  }, [tokenExpireDate]);

  const handleLoginClicked = (e) => {
    e.preventDefault();
    if (isAndroidUsed) {
      showDrawer();
    }
    dispatch(setLoader(true));
    navigate("/login");
    dispatch(setLoader(false));
  };

  const handleHomeClicked = (e) => {
    e.preventDefault();
    if (isAndroidUsed) {
      showDrawer();
    }
    window.scrollTo(0, 0);
    navigate("/");
  };
  const handleContClicked = (e) => {
    e.preventDefault();
    if (isAndroidUsed) {
      showDrawer();
    }
    window.scrollTo(0, 0);
    navigate("/contact");
  };

  const handleDashboardClicked = () => {
    if (isAndroidUsed) {
      showDrawer();
    }

    if (isAuthenticUser) {
      if (isPasswordSet) {
        navigate("/dashboard");
      } else {
        navigate("/set-password");
      }
    } else {
      if (isAndroidUsed) {
        showDrawer();
        const userConfirmed = window.confirm("Access unauthorized. To access this service, please log in.");
        if (userConfirmed) {
          navigate('/login');
        }
      } else {
        const userConfirmed = window.confirm("Access unauthorized. To access this service, please log in.");
        if (userConfirmed) {
          navigate('/login');
        }
      }

    }
  }

  const handleContactClicked = (e) => {
    e.preventDefault();
    if (isAndroidUsed) {
      showDrawer();
    }
    navigate("/contact");
  };

  const handleProvidesClick = (e) => {
    if (isAndroidUsed) {
      showDrawer();
    }

    if (isAuthenticUser) {
      if (isPasswordSet) {
        navigate("/dashboard");
      } else {
        navigate("/set-password");
      }
    } else {
      if (isAndroidUsed) {
        showDrawer();
      }
      // Check if the current page is the home page
      const isHomePage = window.location.pathname === "/";

      if (!isHomePage) {
        e.preventDefault();
        window.scroll(20, 20)
        navigate("/social-bharat-provides");
        return;
      }

      // Scroll to the "Services" section on the home page
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleServiceClick = (e) => {
    if (isAndroidUsed) {
      showDrawer();
    }

    if (isAuthenticUser) {
      if (isPasswordSet) {
        navigate("/user/search/service");
      } else {
        navigate("/set-password");
      }
    } else {
      if (isAndroidUsed) {
        showDrawer();
        const userConfirmed = window.confirm("Access unauthorized. To access this service, please log in.");
        if (userConfirmed) {
          navigate('/login');
        }
      } else {
        const userConfirmed = window.confirm("Access unauthorized. To access this service, please log in.");
        if (userConfirmed) {
          navigate('/login');
        }
      }

    }
  };

  const handleMembersClicked = () => {
    if (isAndroidUsed) {
      showDrawer();
    }

    if (isAuthenticUser) {
      if (isPasswordSet) {
        navigate("/user/search");
      } else {
        navigate("/set-password");
      }
    } else {
      if (isAndroidUsed) {
        showDrawer();
        const userConfirmed = window.confirm("Access unauthorized. To access this service, please log in.");
        if (userConfirmed) {
          navigate('/login');
        }
      } else {
        const userConfirmed = window.confirm("Access unauthorized. To access this service, please log in.");
        if (userConfirmed) {
          navigate('/login');
        }
      }

    }
  }

  const handleJobsClicked = () => {
    if (isAndroidUsed) {
      showDrawer();
    }

    if (isAuthenticUser) {
      if (isPasswordSet) {
        navigate("/user/search/job");
      } else {
        navigate("/set-password");
      }
    } else {
      if (isAndroidUsed) {
        showDrawer();
        const userConfirmed = window.confirm("Access unauthorized. To access this service, please log in.");
        if (userConfirmed) {
          navigate('/login');
        }
      } else {
        const userConfirmed = window.confirm("Access unauthorized. To access this service, please log in.");
        if (userConfirmed) {
          navigate('/login');
        }
      }

    }
  }

  const handleBusinessClicked = () => {
    if (isAndroidUsed) {
      showDrawer();
    }

    if (isAuthenticUser) {
      if (isPasswordSet) {
        navigate("/user/search/business");
      } else {
        navigate("/set-password");
      }
    } else {
      if (isAndroidUsed) {
        showDrawer();
        const userConfirmed = window.confirm("Access unauthorized. To access this service, please log in.");
        if (userConfirmed) {
          navigate('/login');
        }
      } else {
        const userConfirmed = window.confirm("Access unauthorized. To access this service, please log in.");
        if (userConfirmed) {
          navigate('/login');
        }
      }

    }
  }

  const handleMatrimonialClicked = () => {
    if (isAndroidUsed) {
      showDrawer();
    }

    if (isAuthenticUser) {
      if (isPasswordSet) {
        navigate("/user/search/partner");
      } else {
        navigate("/set-password");
      }
    } else {
      if (isAndroidUsed) {
        showDrawer();
        const userConfirmed = window.confirm("Access unauthorized. To access this service, please log in.");
        if (userConfirmed) {
          navigate('/login');
        }
      } else {
        const userConfirmed = window.confirm("Access unauthorized. To access this service, please log in.");
        if (userConfirmed) {
          navigate('/login');
        }
      }

    }
  }

  const handleChatClicked = () => {
    if (isAndroidUsed) {
      showDrawer();
    }

    if (isAuthenticUser) {
      if (isPasswordSet) {
        navigate("/user/chat/board");
      } else {
        navigate("/set-password");
      }
    } else {
      if (isAndroidUsed) {
        showDrawer();
        const userConfirmed = window.confirm("Access unauthorized. To access this service, please log in.");
        if (userConfirmed) {
          navigate('/login');
        }
      } else {
        const userConfirmed = window.confirm("Access unauthorized. To access this service, please log in.");
        if (userConfirmed) {
          navigate('/login');
        }
      }

    }
  }

  const getUserTokenExistance = async () => {
    dispatch(setLoader(true));
    try {
      const response = await getToken();

    } catch (error) {
      //handleFetchError(error);
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      } else if (error.response && error.response.status === 500) {
        dispatch(logout());
      } else if (error.response && error.response.status === 404) {
        dispatch(logout());
      }
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    getUserTokenExistance();
  }, []);


  const showDrawer = () => {
    setVisible(!visible);
  };

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

  return (
    <div id="customNavID">
      <nav className="navbar navbar-transparent navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand">
            <img src={defaultLogo} alt="Logo" onClick={handleHomeClicked} />
            <div className="" style={{ position: 'fixed', left: isAndroidUsed ? '75vw' : '94vw', color: '', fontSize: '60px', top: '90vh' }}
              onClick={() => navigate('/user/chat/board')} >
              <div style={{ position: 'relative', display: 'inline-block' }} onClick={handleChatClicked}>
                {/* <WechatOutlined style={{ fontSize: '44px' }} /> */}

                {
                  window.location.pathname === '/user/chat/board' || window.location.pathname === '/login' || window.location.pathname === '/register' ? '' : <img src="/user/images/chat-new.png" width={20} style={{ width: isAndroidUsed ? '70px' : '50px', zIndex: 1000 }} />
                }
                {/* <p className="" style={{
                  position: 'absolute',
                  top: '0px',
                  backgroundColor:'red',
                  borderRadius:'50%',
                  color:'white',
                  right: '0px',
                  color: 'white',
                  padding: '1px 6px',
                  fontSize: '12px'
                }}>5</p> */}
              </div>

            </div>
          </a>

          {/* Toggle button for small screens */}
          <a>
            {isAndroidUsed && isAuthenticUser && isAuthenticUser ? (
              <UserNavDropdown />
            ) : (
              ""
            )}
          </a>
          <button
            className={`navbar-toggler ${isAndroidUsed ? "" : "d-none"}`}
            type="button"
            onClick={showDrawer}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar items */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">


              {/* Navbar links */}
              <li className="nav-item">
                <a
                  className={`nav-link rounded ${window.location.pathname === "/" ? "active" : "inactive"
                    }`}
                  onClick={handleHomeClicked}
                >
                  HOME
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link rounded ${window.location.pathname === "/user/search/job" || window.location.pathname === "/user/job/create" || window.location.pathname === "/user/all/applied/jobs"
                    ? "active"
                    : "inactive"
                    }`}
                  onClick={handleJobsClicked}
                >
                  JOBS
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link rounded ${window.location.pathname === "/user/search/business"
                    ? "active"
                    : "inactive"
                    }`}
                  onClick={handleBusinessClicked}
                >
                  BUSINESS
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link rounded ${window.location.pathname === "/user/search/service" || window.location.pathname === `/user/user-registered-services` || location.pathname.startsWith("/users-basedOn-services")
                    ? "active"
                    : "inactive"
                    }`}
                  onClick={handleServiceClick}
                >
                  SERVICES
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link rounded ${window.location.pathname === "/user/search/partner"
                    ? "active"
                    : "inactive"
                    }`}
                  onClick={handleMatrimonialClicked}
                >
                  MATRIMONIAL
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link rounded ${window.location.pathname === "/user/search"
                    ? "active"
                    : "inactive"
                    }`}
                  onClick={handleMembersClicked}
                >
                  MEMBERS
                </a>
              </li>
              {
                isAuthenticUser ? (
                  <li className="nav-item">
                    <a
                      className={`nav-link rounded ${window.location.pathname === "/dashboard" ? "active" : "inactive"
                        }`}
                      onClick={handleDashboardClicked}
                    >
                      DASHBOARD
                    </a>
                  </li>
                ) : ''
              }

              <li className="nav-item">
                <a
                  className={`nav-link rounded ${window.location.pathname === "/contact" ? "active" : "inactive"
                    }`}
                  onClick={handleContClicked}
                >
                  CONTACT
                </a>
              </li>


            </ul>

            {/* Login and signup buttons */}


            {/* User dropdown for authenticated users */}
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0" style={{ width: isAuthenticUser ? '200px' : '' }}>
              <li className="">
                {!isAndroidUsed && isAuthenticUser && isAuthenticUser ? (
                  <UserNavDropdown />
                ) : (
                  !isAuthenticUser && (
                    <div className="button-container">
                      <button
                        className={`default-button fw-bold ${window.location.pathname === "/login" ? "custom-login-clicked" : ""
                          }`}
                        onClick={handleLoginClicked}
                      >
                        Login
                      </button>
                      <button
                        className={`custom-button fw-bold ${window.location.pathname === "/register" ? "custom-signup-clicked" : ""
                          }`}
                        onClick={() => navigate("/register")}
                      >
                        Sign Up
                      </button>
                    </div>
                  )
                )}
              </li>
            </ul>

            {/* Drawer for small screens */}
            <Drawer
              title="Menu"
              placement="left"
              closable={true}
              onClose={showDrawer}
              open={visible}
              height={450}
              style={{
                zIndex: 99999,
                background: "rgba(255, 255, 255, 0.8)",
                borderBottomLeftRadius: "3%",
                borderBottomRightRadius: "3%",
                width: "80%"
              }}
            >
              {/* Drawer content */}
              <div className="customDrawerBody">
                <ul className="customUl">

                  <li className="nav-item mt-2">
                    <a className="nav-link" onClick={handleHomeClicked}>
                      <i className="fa fa-home me-2" aria-hidden="true"></i>
                      HOME
                    </a>
                  </li>
                  <li className="nav-item mt-5">
                    <a className="nav-link" onClick={handleJobsClicked}>
                      <i className="fa-solid fa-business-time me-2"></i>
                      JOBS
                    </a>
                  </li>
                  <li className="nav-item mt-5">
                    <a className="nav-link" onClick={handleBusinessClicked}>
                      <i className="fa-solid fa-business-time me-2"></i>
                      BUSINESS
                    </a>
                  </li>
                  <li className="nav-item mt-5">
                    <a className="nav-link" onClick={handleServiceClick}>
                      <i className="fa fa-wrench me-2" aria-hidden="true"></i>
                      SERVICES
                    </a>
                  </li>
                  <li className="nav-item mt-5">
                    <a className="nav-link" onClick={handleMatrimonialClicked}>
                      <i className="fa fa-ring me-2"></i>
                      MATRIMONIAL
                    </a>
                  </li>
                  <li className="nav-item mt-5">
                    <a className="nav-link" onClick={handleMembersClicked}>
                      <i className="fa-solid fa-user me-2"></i>
                      MEMBERS
                    </a>
                  </li>

                  <li className="nav-item mt-5">
                    <a className="nav-link" onClick={handleDashboardClicked}>
                      <i className="fa-sharp fa-solid fa-bars me-2" aria-hidden="true"></i>
                      DASHBOARD
                    </a>
                  </li>

                  <li className="nav-item mt-5">
                    <a className="nav-link" onClick={handleContactClicked}>
                      <i className="fas fa-address-book me-2"></i>CONTACT
                    </a>
                  </li>

                  {isAuthenticUser && isAuthenticUser ? (
                    ""
                  ) : (
                    <li className="nav-item mt-5">
                      <a onClick={handleLoginClicked}>
                        <i className="fa fa-sign-in me-2" aria-hidden="true"></i>{" "}
                        LOGIN
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </Drawer>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarCustom;
