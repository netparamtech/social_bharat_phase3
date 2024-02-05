import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import UserProfileDropdown from "./UserProfileDropdown";
import { Drawer } from "antd";
import { useEffect, useState } from "react";
import { setLoader } from "../../actions/loaderAction";

const NavbarTransparent = (props) => {
  const { data, community } = props;
  const user = useSelector((state) => state.userAuth);
  const isAuthenticUser = user && user.isAuthenticated;
  const isPasswordSet = user && user.user && user.user.is_password_set;

  const [visible, setVisible] = useState(false);
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const defaultLogo = '/user/images/sb-logo.png';

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleDashboardClicked = (e) => {
    e.preventDefault();
    if (isAndroidUsed) {
      showDrawer();
    }
    window.scrollTo(0, 0);
    if (isAuthenticUser) {
      navigate("/dashboard");
    } else {
      const userConfirmed = window.confirm("Access unauthorized. To access this service, please log in.");
      if (userConfirmed) {
        navigate('/login');
      }
    }
  };

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
        navigate("/user/search/jobs");
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
    <div id='customNavID'>
      <nav className="navbar navbar-transparent  navbar-expand-lg">
        <div className="container">

          <a className="navbar-brand m-3" onClick={handleHomeClicked}>
            <img src={defaultLogo} alt="Logo" />
          </a>

          <a>
            {isAndroidUsed && isAuthenticUser && isAuthenticUser ? (
              <UserProfileDropdown community={community} />
            ) : (
              ""
            )}
          </a>

          <button
            className={`navbar-toggler m-3 ${isAndroidUsed ? "" : "d-none"}`}
            type="button"
            onClick={showDrawer}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              {
                !isAuthenticUser && <><li className="nav-item">{" "}</li><li className="nav-item">{" "}</li></>
              }

              <li className="nav-item">
                <a
                  className={`nav-link rounded ${window.location.pathname === "/" ? "active" : "inactive"
                    }`}
                  onClick={handleHomeClicked}
                >
                  HOME
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
                  className={`nav-link rounded ${window.location.pathname === "/user/search"
                    ? "active"
                    : "inactive"
                    }`}
                  onClick={handleMembersClicked}
                >
                  MEMBERS
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link rounded ${window.location.pathname === "/user/search/jobs" || window.location.pathname === "/user/job/create" || window.location.pathname === "/user/all/applied/jobs"
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
                  className={`nav-link rounded ${window.location.pathname === "/user/search/service" || window.location.pathname === `/user/user-registered-services` || location.pathname.startsWith("/users-basedOn-services")
                    ? "active"
                    : "inactive"
                    }`}
                  onClick={handleServiceClick}
                >
                  SERVICES
                </a>
              </li>

              {/* You can add more nav items here */}
            </ul>
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
              {isAuthenticUser && isAuthenticUser ? (
                ""
              ) : (
                <li className="nav-item">
                  <a
                    className="text-decoration-none btn-primary login-btn rounded"
                    href=""
                    onClick={handleLoginClicked}
                  >
                    LOGIN
                  </a>
                </li>
              )}
            </ul>

            <ul className="navbar-nav ml-auto  mb-2 mb-lg-0">
              <li className="">
                {!isAndroidUsed && isAuthenticUser && isAuthenticUser ? (
                  <UserProfileDropdown />
                ) : (
                  ""
                )}
              </li>
            </ul>

            <Drawer
              title={"Menu"}
              placement="top"
              closable={true}
              onClose={showDrawer}
              open={visible}
              height={450}
              style={{
                zIndex: 99999,
                // width: "70%",
                background: "rgba(255, 255, 255, 0.8)",
                borderBottomLeftRadius: "3%",
                borderBottomRightRadius: "3%",
                // height:"70%"
              }}
            >
              <div className="customDrawerBody">
                <ul className="customUl">

                  <li className="nav-item mt-2">
                    <a className="nav-link" onClick={handleHomeClicked}>
                      <i class="fa fa-home me-2" aria-hidden="true"></i>
                      HOME
                    </a>
                  </li>
                  <li className="nav-item mt-2">
                    <a className="nav-link" onClick={handleDashboardClicked}>
                      <i class="fa-sharp fa-solid fa-bars me-2" aria-hidden="true"></i>
                      DASHBOARD
                    </a>
                  </li>
                  <li className="nav-item mt-2">
                    <a className="nav-link" onClick={handleMembersClicked}>
                      <i class="fa-solid fa-user me-2"></i>
                      MEMBERS
                    </a>
                  </li>
                  <li className="nav-item mt-2">
                    <a className="nav-link" onClick={handleJobsClicked}>
                      <i class="fa-solid fa-business-time me-2"></i>
                      JOBS
                    </a>
                  </li>
                  <li className="nav-item mt-2">
                    <a className="nav-link" onClick={handleBusinessClicked}>
                      <i class="fa-solid fa-business-time me-2"></i>
                      BUSINESS
                    </a>
                  </li>
                  <li className="nav-item mt-2">
                    <a className="nav-link" onClick={handleMatrimonialClicked}>
                      <i class="fa fa-ring me-2"></i>
                      MATRIMONIAL
                    </a>
                  </li>
                  <li className="nav-item mt-2">
                    <a className="nav-link" onClick={handleServiceClick}>
                      <i className="fa fa-wrench me-2" aria-hidden="true"></i>
                      SERVICES
                    </a>
                  </li>

                  <li className="nav-item mt-2">
                    <a className="nav-link" onClick={handleContactClicked}>
                      <i className="fas fa-address-book me-2"></i>CONTACT
                    </a>
                  </li>

                  {isAuthenticUser && isAuthenticUser ? (
                    <li className="nav-item mt-2">
                      <a onClick={() => navigate("/login")}>
                        <i className="fa fa-sign-out me-2" aria-hidden="true"></i>
                        LOG OUT
                      </a>
                    </li>
                  ) : (
                    <li className="nav-item mt-2">
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

export default NavbarTransparent;
