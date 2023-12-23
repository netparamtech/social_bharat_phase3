import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteQualificationsByID, deleteServiceByID, fetchAllQualifications, fetchAllServices, updateToggleStatusForQualifications, updateToggleStatusForService } from "../../services/AdminService";
import Search from "antd/es/input/Search";
import { Table } from "antd";
import { setLoader } from "../../actions/loaderAction";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

const AllJobs = () => {
  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(7);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePageSizeChange = (current, pageSize) => {
    setSize(pageSize);
  };

  const handleSearchChange = (e) => {
    setPage(1);
    setSearchQuery(e.target.value);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const newSortField = sorter.field || '';
    let newSortOrder = sorter.order || '';

    // If the same column is clicked again, toggle the sort order
    if (sortField === newSortField) {
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    }

    setSortField(newSortField);
    setSortOrder(newSortOrder);
  };

  const fetchData = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllServices();

      setData(response.data.data);
      setCopyData(response.data.data);
      setTotalRows(response.data.data.length);

      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    }
  };

  const handleStatusToggle = async (id) => {
    try {
      const response = await updateToggleStatusForService(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await deleteServiceByID(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
    }
  }

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      render: (text, record, index) => (page - 1) * size + index + 1,
      width: 100,
    },
    {
      title: 'Title', dataIndex: 'title',
      sorter: true,
      sortDirections: ['asc', 'desc'],
    },


    {
      title: 'Status', dataIndex: 'status',
      render: (text, record) => (
        <div>
          {record.status === 'Active' ? (
            <a
              className="collapse-item hover-pointer-admin m-2"
              onClick={(e) => {
                e.preventDefault();
                handleStatusToggle(record.id);
              }}
            >
              <i className="fa fa-thumbs-up text-primary" title="Active" />
            </a>
          ) : (
            <a
              className="collapse-item text-secondary hover-pointer-admin m-2"
              onClick={(e) => {
                e.preventDefault();
                handleStatusToggle(record.id);
              }}
            >
              <i className="fa fa-thumbs-down" title="Inactive" />
            </a>
          )}
        </div>
      ),
      sorter: true,
      sortDirections: ['asc', 'desc'],
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div>
          <a
            className="collapse-item hover-pointer-admin"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/admin/service/update/${record.id}`)
            }}
          >
            <i className="fa fa-edit mr-4" title="Edit" />
          </a>

          <a
            className="collapse-item hover-pointer-admin"
            onClick={(e) => {
              e.preventDefault();
              handleDelete(record.id);
            }}
          >
            <i className="fas fa-trash"></i>
          </a>
          <a className="collapse-item m-3 hover-pointer-admin" onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor tag behavior
            navigate(`/admin/service/in/${record.title}`);
          }}>
            <i className="fas fa-eye"></i>
          </a>
        </div>
      ),
      fixed: 'right',
    },
    // Rest of the columns definition
  ];

  useEffect(() => {
    const filteredData = copyData.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setData(filteredData);
  }, [searchQuery]);

  useEffect(() => {
    fetchData();
  }, []);

  const [activeNavItem, setActiveNavItem] = useState('ALL');

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  return (
    <div>
      <div id="" className="">
        <div className="row">
          <div className="card col-12 col-sm-12">
            <div className='card-header'>
              <Navbar bg="secondary" expand="lg" className="text-light">
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
                    <Nav.Link href="#" onClick={() => handleNavItemClick('REQUESTED JOBS')}
                      style={{ color: activeNavItem === 'REQUESTED JOBS' ? 'red' : 'inherit' }}>REQUESTED JOBS</Nav.Link>
                    <Nav.Link href="#" onClick={() => handleNavItemClick('CREATE JOBS')}
                      style={{ color: activeNavItem === 'CREATE JOBS' ? 'red' : 'inherit' }}>CREATE JOBS</Nav.Link>

                    {/* Remove the following NavDropdown section */}
                    {/* <NavDropdown title="ACTION" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#">Requested Jobs</NavDropdown.Item>
                                        <NavDropdown.Item href="#">Create Job</NavDropdown.Item>
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
          {/* <div className="card col-12 col-sm-3 m-2">
                    <FeaturedJobs />
                </div> */}
        </div>

      </div>
     
    </div>
  );
};

export default AllJobs;
