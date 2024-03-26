import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // If you're using React Router
import { setLoader } from '../../actions/loaderAction';
import { logout } from '../../actions/userAction';
import UserNavDropdown from './UserNavDropdown';

const ReactNavbar = (props) => {
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
    <Card className="shadow-sm top-fixed">
      <Card.Body>
        <Navbar bg="white" expand="lg" style={{ height: '100px' }} fixed="top">
          <Container className=''>
            <Navbar.Brand as={Link} to="/" >
              <img
                src={defaultLogo}
                width="100"
                height="70"
                className="d-inline-block align-top m-2"
                alt="Logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className='m-2' />
            <Navbar.Collapse id="basic-navbar-nav" className='rounded' style={{backgroundColor:'white'}}>
              <Nav>
                <Nav.Link className='m-2' as={Link} onClick={handleHomeClicked}>Home</Nav.Link>
                <Nav.Link className='m-2' as={Link} onClick={handleDashboardClicked}>Dashboard</Nav.Link>
                <Nav.Link className='m-2' as={Link} onClick={handleMembersClicked}>Members</Nav.Link>
                <Nav.Link className='m-2' as={Link} onClick={handleMatrimonialClicked}>Matrimonials</Nav.Link>
                <Nav.Link className='m-2' as={Link} onClick={handleJobsClicked}>Jobs</Nav.Link>
                <Nav.Link className='m-2' as={Link} onClick={handleServiceClick}>Services</Nav.Link>
              </Nav>

              <Nav>
                <Nav.Link className='m-2' as={Link} onClick={handleLoginClicked}>Login</Nav.Link>
                <Nav.Link className='m-2' as={Link}>
              {isAuthenticUser && isAuthenticUser ? (
                ""
              ) : (
               
                <div className="button-container">
                  <button className={`default-button fw-bold ${window.location.pathname === "/login"
                    ? "custom-login-clicked"
                    : ''
                    }`} onClick={handleLoginClicked}>Login</button>
                  <button className={`custom-button fw-bold ${window.location.pathname === "/register"
                    ? "custom-sineUp-clicked"
                    : ''
                    }`} onClick={() => navigate("/register")}>Sign Up</button>
                </div>
              )}
            </Nav.Link>
            <Nav.Link className='m-2' as={Link}>
            {!isAndroidUsed && isAuthenticUser && isAuthenticUser ? (
                  <UserNavDropdown />
                ) : (
                  ""
                )}
            </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Card.Body>
    </Card>
  );
};

export default ReactNavbar;
