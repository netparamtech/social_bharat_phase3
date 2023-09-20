import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserProfileDropdown from "./UserProfileDropdown";
import { MenuOutlined } from "@ant-design/icons";
import { Layout, Button, Drawer } from "antd";
import { useEffect, useState } from "react";

const NavbarTransparent = () => {
  const user = useSelector((state) => state.userAuth);
  const isAuthenticUser = user && user.isAuthenticated;
  const isPasswordSet = user && user.user && user.user.is_password_set;

  const [visible, setVisible] = useState(false);
  const [isAndroidUsed,setIsAndroidUsed] = useState(false);

  const navigate = useNavigate();

  const handleLoginClicked = (e)=>{
    e.preventDefault();
    navigate('/login');
  }

  const handleHomeClicked = (e)=>{
    e.preventDefault();
    navigate('/');
  }

  const handleContactClicked = (e)=>{
    e.preventDefault();
    navigate('/contact');
  }

  const handleServiceClick = (e) => {
    if (isAuthenticUser) {
      if (isPasswordSet) {
        navigate("/dashboard");
      } else {
        navigate("/set-password");
      }
    } else {
      e.preventDefault();
      navigate('/#services');
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (isAuthenticUser) {
      if (isPasswordSet) {
        navigate("/user/search");
      } else {
        navigate("/set-password");
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
        <Button className={`menuButton ${isAndroidUsed ? '':'d-none'}`} type="text" onClick={showDrawer} style={{ float: "right" }}>
            <MenuOutlined />
          </Button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href=""
                onClick={handleHomeClicked}
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
              <a className="nav-link" onClick={handleServiceClick} >
                Services
              </a>
            </li>
            
            
            <li className="nav-item">
              <a className="nav-link" onClick={handleContactClicked}>
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
                  href=""
                  onClick={handleLoginClicked}
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

          <Drawer
            title={"Menu"}
            placement="right"
            closable={true}
            onClose={showDrawer}
            visible={visible}
            style={{ zIndex: 99999,width: "70%",background:'green' }}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
            <li className="nav-item mt-2">
              <a
                className="nav-link active"
                aria-current="page"
                href=""
                onClick={handleHomeClicked}
              >
                Home
              </a>
            </li>
            <li className="nav-item mt-2">
              <a className="nav-link" href="#why-social-section" >
                About
              </a>
            </li>
            <li className="nav-item mt-2">
              <a className="nav-link" onClick={handleServiceClick} >
                Services
              </a>
            </li>
            <li className="nav-item mt-2">
              <a className="nav-link" onClick={handleContactClicked}>
                Contact
              </a>
            </li>
            
            <li className="nav-item mt-2">
              {isAuthenticUser && isAuthenticUser ? (
                <a className="nav-link" onClick={handleSearchClick}>
                  Search
                </a>
              ) : (
                ""
              )}
            </li>
           
            {isAuthenticUser && isAuthenticUser ? (
               <li className="nav-item mt-2">
               <a
                 onClick={() => navigate("/login")}
               >
                 Log out
               </a>
             </li>
            ) : (
              <li className="nav-item mt-2">
                <a
                  onClick={() => navigate("/login")}
                >
                  Login
                </a>
              </li>
            )}
            
           
            </ul>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTransparent;