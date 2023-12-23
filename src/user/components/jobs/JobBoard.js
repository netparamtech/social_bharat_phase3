import { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import FeaturedJobs from './FeaturedJobs';

const JobBoard = () => {
    const [activeNavItem, setActiveNavItem] = useState('ALL');

    const handleNavItemClick = (navItem) => {
        setActiveNavItem(navItem);
    };

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
                                    <Nav.Link href="#" onClick={() => handleNavItemClick('FULL TIM')}
                                        style={{ color: activeNavItem === 'FULL TIM' ? 'red' : 'inherit' }}>FULL TIME</Nav.Link>
                                    <Nav.Link href="#" onClick={() => handleNavItemClick('FREELANCE')}
                                        style={{ color: activeNavItem === 'FREELANCE' ? 'red' : 'inherit' }}>FREELANCE</Nav.Link>
                                    <Nav.Link href="#" onClick={() => handleNavItemClick('OTHERS')}
                                        style={{ color: activeNavItem === 'OTHERS' ? 'red' : 'inherit' }}>OTHERS</Nav.Link>

                                    {/* Remove the following NavDropdown section */}
                                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#">Search By State and City</NavDropdown.Item>
                                        <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
                                    </NavDropdown> */}
                                </Nav>
                                {/* Remove the following Form section */}
                                <Form inline className='d-flex'>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-success">Search</Button>
                                </Form>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <div className="card-body">


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