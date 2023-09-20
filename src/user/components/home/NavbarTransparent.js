import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserProfileDropdown from "./UserProfileDropdown";

const NavbarTransparent = () => {
  const user = useSelector((state) => state.userAuth);
  const isAuthenticUser = user && user.isAuthenticated;
  const isPasswordSet = user && user.user && user.user.is_password_set;

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

  return (
    <nav className="navbar navbar-transparent  navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src="/user/images/sb-logo.png" alt="Logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
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
              {isAuthenticUser && isAuthenticUser ? (
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