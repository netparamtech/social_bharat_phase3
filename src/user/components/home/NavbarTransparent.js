import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserProfileDropdown from "./UserProfileDropdown";
import { Drawer } from "antd";
import { useEffect, useState } from "react";
import UserSearchDropdown from "./UserSearchDropdown";

const NavbarTransparent = (props) => {
  const {data,community} = props;
  const user = useSelector((state) => state.userAuth);
  const isAuthenticUser = user && user.isAuthenticated;
  const isPasswordSet = user && user.user && user.user.is_password_set;

  const [visible, setVisible] = useState(false);
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginClicked = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleHomeClicked = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    if (isAuthenticUser) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate("/about");
  };

  const handleEventClick = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    if (isAuthenticUser) {
      if (isPasswordSet) {
        navigate("/event");
      } else {
        navigate("/set-password");
      }
    } else {
      navigate("/login");
    }
  };

  const handleContactClicked = (e) => {
    e.preventDefault();
    navigate("/contact");
  };

  const handleServiceClick = (e) => {
    if (isAuthenticUser) {
      if (isPasswordSet) {
        navigate("/dashboard");
      } else {
        navigate("/set-password");
      }
    } else {
      // Check if the current page is the home page
      const isHomePage = window.location.pathname === "/";

      if (!isHomePage) {
        e.preventDefault();
        navigate("/login");
        return;
      }

      // Scroll to the "Services" section on the home page
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

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
    <nav className="navbar navbar-transparent  navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" onClick={handleHomeClicked}>
          <img src={data && data.logo1&&data.logo1} alt="Logo" />
        </a>

        <a>
          {isAndroidUsed && isAuthenticUser && isAuthenticUser ? (
            <UserProfileDropdown community = {community} />
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  window.location.pathname === "/" ? "active" : "inactive"
                }`}
                onClick={handleHomeClicked}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  window.location.pathname === "/service" ||
                  window.location.pathname === "/dashboard"
                    ? "active"
                    : "inactive"
                }`}
                onClick={handleServiceClick}
              >
                Services
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  window.location.pathname === "/contact" ? "active" : "inactive"
                }`}
                onClick={handleContactClicked}
              >
                Contact
              </a>
            </li>
            <li className="nav-item">
              {isAuthenticUser && isAuthenticUser ? <UserSearchDropdown /> : ""}
            </li>

            {/* You can add more nav items here */}
          </ul>
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            {isAuthenticUser && isAuthenticUser ? (
              ""
            ) : (
              <li className="nav-item">
                <a
                  className="text-decoration-none btn-primary login-btn"
                  href=""
                  onClick={handleLoginClicked}
                >
                  Login
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
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href=""
                    onClick={handleHomeClicked}
                  >
                    <i className="fa fa-home m-2" aria-hidden="true"></i> Home
                  </a>
                </li>

                <li className="nav-item mt-2">
                  <a className="nav-link" onClick={handleServiceClick}>
                    <i className="fa fa-wrench m-2" aria-hidden="true"></i>
                    Services
                  </a>
                </li>

                <li className="nav-item mt-2">
                  <a className="nav-link" onClick={handleContactClicked}>
                    <i className="fas fa-address-book m-2"></i>Contact
                  </a>
                </li>

                <li className="nav-item mt-2">
                  {isAuthenticUser && isAuthenticUser ? (
                    <a className="nav-link m-2">
                      <i className="fa fa-search" aria-hidden="true"></i>
                      <UserSearchDropdown />
                    </a>
                  ) : (
                    ""
                  )}
                </li>

                {isAuthenticUser && isAuthenticUser ? (
                  <li className="nav-item mt-2">
                    <a onClick={() => navigate("/login")}>
                      <i className="fa fa-sign-out m-2" aria-hidden="true"></i>
                      Log out
                    </a>
                  </li>
                ) : (
                  <li className="nav-item mt-2">
                    <a onClick={() => navigate("/login")}>
                      <i className="fa fa-sign-in m-2" aria-hidden="true"></i>{" "}
                      Login
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTransparent;
