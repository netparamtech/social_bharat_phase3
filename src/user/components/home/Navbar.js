import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserProfileDropdown from './UserProfileDropdown';


const Navbar = () => {
    const user = useSelector((state) => state.userAuth);
    const isAuthenticUser = user && user.isAuthenticated; 

    const navigate = useNavigate();

    const handleClick = ()=> {
        if(isAuthenticUser){
            navigate('/dashboard');
        }else{
            alert("You are not authorized to access.")
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src="/user/images/logo.jpg" alt="Logo" />
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
                            <a className="nav-link active" aria-current="page" href="#" onClick={() => navigate('/')}>
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                About
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={handleClick} >
                                Services
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Promote Business
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Matrimonial
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Contact
                            </a>
                        </li>
                       

                        <li className="nav-item">
                            {
                                isAuthenticUser && isAuthenticUser ? (
                                    <a className="nav-link" href="#" onClick={()=>navigate('/user/search')}>
                                        Search
                                    </a>
                                ) : ''
                            }
                        </li>


                        {/* You can add more nav items here */}
                    </ul>
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        {isAuthenticUser && isAuthenticUser ? '' : (
                            <li className="nav-item">
                                <a className="nav-link  btn-primary login-btn" href="#" onClick={() => navigate('/login')}>
                                    Login
                                </a>
                            </li>
                        )}
                    </ul>

                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
                            {isAuthenticUser && isAuthenticUser ? (
                                <UserProfileDropdown />
                            ) : (
                                ''
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
