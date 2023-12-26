import { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import FeaturedJobs from './FeaturedJobs';
import { deleteUserPostedSingleJob, deleteUserPostedSingleService, fetchAllJobsByLoggedUser, fetchAllJobsPosted } from '../../services/userService';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UpdateJobPosted from './UpdateJobPosted';

const JobBoard = () => {
    const user = useSelector((state) => state.userAuth);
    const [activeNavItem, setActiveNavItem] = useState('ALL');
    const [page, setPage] = useState(1);
    const [size, setSize] = useState('');
    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [isMyJobsClicked, setIsMyJobsClicked] = useState(false);
    const [userId, setUserId] = useState('');
    const [jobId, setJobId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [isUpdateClicked, setIsUpdateClicked] = useState(false);
    const [defaultImage, setDefaultImage] = useState(
        "/user/images/netparamlogo.jpg"
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavItemClick = (navItem) => {
        setActiveNavItem(navItem);
    };

    const changeUpdateClickedFlag = (value, jobId) => {
        setIsUpdateClicked(value);
        if (jobId) {
            setJobId(jobId);
        }
    }

    const dataSource = [
        {
            key: '1',
            company: 'Netparam',
            job_title: 'UI & UX developer',
            apply_form: true,
            photo: '/user/images/job1.png',
            location: "747, Janpath, Rani Sati nagar, Nirman nagar, Jaipur-302019",
            age: 32,
            address: '10 Downing Street',
            description: 'jhvghjvjhvjhvugf bvbvjhgvjvj jhvjhvjhvjhvj hjbjhjhbvjbjbjbjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjkjbjk kjhjhkjhbkjbkjbkjbkjb vjhvjhvghvgvjvj vjhvjhvjhvjhvbjhvjhbjhbjhbjhbjhbjhjbj hjbjhbjhbjbjbvjbjbjbkjbkjbkjbkjbkbkjbkjb'
        },

    ];

    const fetchJobs = async (page, size, jobType) => {
        jobType = '';

        if (activeNavItem === 'PART TIME') {
            jobType = 'Part Time';
        } else if (activeNavItem === 'ALL') {
            jobType = '';
        } else if (activeNavItem === 'FULL TIME') {
            jobType = 'Full Time';
        } else if (activeNavItem === 'FREELANCE') {
            jobType = 'Freelance';
        } else if (activeNavItem === 'OTHERS') {
            jobType = 'Other';
        }
        try {
            const response = await fetchAllJobsPosted(page, size, jobType);
            if (response && response.status === 200) {
                setData(response.data.data.jobs);
                setTotalRows(response.data.data.totalRowsAffected)
                setServerError('');
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        }

    }

    const fetchMyJobs = async (page, size) => {
        try {
            const response = await fetchAllJobsByLoggedUser(userId, page, size);
            if (response && response.status === 200) {
                setData(response.data.data.jobs);
                setTotalRows(response.data.data.totalRowsAffected)
                setServerError('');
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        }
    }

    const deleteMyJob = async (id) => {
        try {
            const response = await deleteUserPostedSingleJob(id);
            if (response && response.status === 200) {
                fetchMyJobs(page, 20);
                setServerError('');
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            }
        }
    }


    const fetchMoreData = () => {
        if (!isLoading && data.length < totalRows) {
            fetchJobs(page + 1, 20, activeNavItem);
            setPage(page + 1);
        }
    };
    useEffect(() => {
        if (activeNavItem === 'ALL' || activeNavItem === 'PART TIME' || activeNavItem === 'FULL TIME' || activeNavItem === 'FREELANCE' || activeNavItem === 'OTHERS') {
            setPage(1);
            fetchJobs(page, 20, activeNavItem);
            setIsMyJobsClicked(false);
        } else if (activeNavItem === 'MY JOBS') {
            setPage(1);
            setIsMyJobsClicked(true);
            fetchMyJobs(page, 20);
        }

    }, [activeNavItem, isUpdateClicked]);

    useEffect(() => {
        if (user) {
            setUserId(user.user.id);
        }
    }, [user]);

    const groupedItems = [];
    for (let i = 0; i < data.length; i += 1) {
        const pair = data.slice(i, i + 1); // Change 3 to 2 here
        groupedItems.push(pair);
    }
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
    return (

        <div id="auth-wrapper" className="pt-5 pb-4 container">
            <div className="row">
                <div className="card col-12 col-sm-8">
                    <div className='card-header'>
                        <Navbar bg="light" expand="lg">
                            <Navbar.Brand>JOB BOARD</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="#" onClick={() => handleNavItemClick('ALL')}
                                        style={{ color: activeNavItem === 'ALL' ? 'red' : 'inherit' }}>ALL</Nav.Link>
                                    <Nav.Link href="#" onClick={() => handleNavItemClick('PART TIME')}
                                        style={{ color: activeNavItem === 'PART TIME' ? 'red' : 'inherit' }}>PART TIME</Nav.Link>
                                    <Nav.Link href="#" onClick={() => handleNavItemClick('FULL TIME')}
                                        style={{ color: activeNavItem === 'FULL TIME' ? 'red' : 'inherit' }}>FULL TIME</Nav.Link>
                                    <Nav.Link href="#" onClick={() => handleNavItemClick('FREELANCE')}
                                        style={{ color: activeNavItem === 'FREELANCE' ? 'red' : 'inherit' }}>FREELANCE</Nav.Link>
                                    <Nav.Link href="#" onClick={() => handleNavItemClick('OTHERS')}
                                        style={{ color: activeNavItem === 'OTHERS' ? 'red' : 'inherit' }}>OTHERS</Nav.Link>
                                    <Nav.Link href="#" onClick={() => handleNavItemClick('MY JOBS')}
                                        style={{ color: activeNavItem === 'MY JOBS' ? 'red' : 'inherit' }}>MY JOBS</Nav.Link>


                                    {/* Remove the following NavDropdown section */}
                                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#">Search By State and City</NavDropdown.Item>
                                        <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
                                    </NavDropdown> */}
                                </Nav>
                                {/* Remove the following Form section */}
                                {/* <Form inline className='d-flex'>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-success">Search</Button>
                                </Form> */}
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {/* Repeat the user card structure as needed */}
                            <InfiniteScroll
                                style={{ overflowX: "hidden" }}
                                dataLength={data.length}
                                next={fetchMoreData}
                                hasMore={data.length < totalRows}
                                loader={isLoading && <h4>Loading...</h4>}
                            >
                                <div className="container pw-20">
                                    {groupedItems.map((pair, index) => (
                                        <div className="row" key={index}>
                                            {pair.map((item, innerIndex) => (
                                                <div className="col-md-12" key={innerIndex}>
                                                    <div className="card shadow mb-2">

                                                        <div className="card-body">
                                                            <div className="row wow animate__animated animate__zoomIn">
                                                                <div className="col-4">
                                                                    <Image
                                                                        src={
                                                                            item.photo ? item.photo : defaultImage
                                                                        }
                                                                        alt={item.name}
                                                                        title={item.name}
                                                                        className="avatar img-fluid img-circle"
                                                                        width={100}
                                                                    />


                                                                </div>
                                                                <div className="col-3">
                                                                    <p><b>{item.job_title}</b></p>
                                                                    <p className='text-muted'>{item.job_subheading}</p>
                                                                </div>
                                                                <div className="col-3">
                                                                    <p className='btn btn-success remove-hover-pointer'>{item.job_sector}</p>
                                                                    <p>{item.job_type}</p>
                                                                </div>
                                                                <div className="col-2">
                                                                    <p>{calculateTimeDifference(item.updated_at)}</p>
                                                                </div>
                                                            </div>
                                                            <div className='row wow animate__animated animate__zoomIn'>
                                                                <p className='col-12'>{item.description}</p>
                                                            </div>
                                                        </div>
                                                        <div className='card-footer btn btn-success bg-success text-light'>
                                                            Apply
                                                            {
                                                                isMyJobsClicked ? (
                                                                    <>
                                                                        <i className="fa fa-edit mr-2 m-2" title='Edit' onClick={() => changeUpdateClickedFlag(true, item.id)} />
                                                                        <i className="fa fa-trash m-2" title='Delete' onClick={() => deleteMyJob(item.id)} />
                                                                        <i className="fa fa-thumbs-down m-2" title="Inactive" />
                                                                    </>
                                                                ) : ''
                                                            }
                                                            {
                                                                isUpdateClicked ? (<UpdateJobPosted changeUpdateClickedFlag={changeUpdateClickedFlag} jobId={jobId} />) : ''
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </InfiniteScroll>
                        </div>


                    </div>

                </div>
                <div className="card col-12 col-sm-3 m-2">
                    <FeaturedJobs />
                </div>
            </div>

        </div>
    );
}
export default JobBoard;