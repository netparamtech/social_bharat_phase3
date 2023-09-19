import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserProfileDropdown from "./UserProfileDropdown";
import { useEffect, useState } from "react";

const NavbarTransparent = () => {
  const user = useSelector((state) => state.userAuth);
  const isAuthenticUser = user && user.isAuthenticated;
  const isPasswordSet = user && user.user && user.user.is_password_set;
  const [isToggleClicked,setIsToggleClicked] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [isAndroidUsed,setIsAndroidUsed] = useState(false);

  const navigate = useNavigate();

  const handleToggleClicked = () => {
    setIsToggleClicked(prevToggleState => {
      setIsCollapsed(!prevToggleState);
      return !prevToggleState;
    });
  }

  const handleDashboardClick = () => {
    if (isAuthenticUser) {
      if (isPasswordSet) {
        navigate("/dashboard");
      } else {
        navigate("/set-password");
      }
    } else {
      window.location.href = '/#services';
    }
  };


  const handleSearchClick = () => {
    if (isAuthenticUser) {
      if (isPasswordSet) {
        navigate("/user/search");
      } else {
        navigate("/set-password");
      }
    } else {
      alert("You are not authorized to access.");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsAndroidUsed(window.innerWidth < 768); // Adjust the threshold based on your design considerations
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
      <div className="container ">
        <a className="navbar-brand" href="/">
          <img src="/user/images/sb-logo.png" alt="Logo" />
        </a>

        <a>
        {isAndroidUsed&&isAuthenticUser && isAuthenticUser ? (
                <UserProfileDropdown />
              ) : (
                ""
              )}
        </a>
        <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded={!isCollapsed} // Adjusted aria-expanded based on isCollapsed state
        aria-label="Toggle navigation"
        onClick={handleToggleClicked} // Added onClick to call handleToggleClicked
      >
        <span className="navbar-toggler-icon"></span>
      </button>
       
        
      <div className={`navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                
                onClick={() => navigate("/")}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#why-social-section" >
                About
              </a>
            </li>

            <li className="nav-item">
            <a className="nav-link" onClick={handleDashboardClick}>
                  Services
                </a>
            </li>
            
            
            <li className="nav-item">
              <a className="nav-link"  onClick={() => navigate('/contact')}>
                Contact
              </a>
            </li>

            <li className="nav-item">
              {isAuthenticUser && isAuthenticUser ? (
                <a className="nav-link" onClick={handleSearchClick}>
                  Search
                </a>
              ) : (
                ""
              )}
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
                  onClick={() => navigate("/login")}
                >
                  Login
                </a>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="">
              {!isAndroidUsed&&isAuthenticUser && isAuthenticUser ? (
                <UserProfileDropdown />
              ) : (
                ""
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTransparent;
