import React, { useEffect, useRef, useState } from 'react';
import MaterialTable from 'material-table';
import { deleteEnquiry, fetchAllEnquiries, updateToggleStatusForEnquiry } from '../../services/AdminService';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Your theme configuration
  direction: 'ltr', // Set the direction to left-to-right (ltr) or right-to-left (rtl)
});

const EnquiryList = () => {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState([]);

  const isFirstRender = useRef(true);


  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setPage(page); // Increment the page
  };

  const fetchData = async () => {
    console.log(page)

    try {
      const response = await fetchAllEnquiries(page, size);

      // Check if there are no results for the current page
      if (response.data.data.length === 0 && page > 1) {
        // If no results for the current page, decrement the page and fetch again
        setPage(page-1);
        return;
      }

      setData(response.data.data);
      setTotalRows(response.data.totalRecords);
      setPage(page+1)
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 500)) {
        navigate('/admin');
      }
    }
  };

  const handlePageSizeChange = (pageSize) => {
    console.log("hello")
    setSize(pageSize);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }


  const handleUserToggleStatus = async (id) => {
    try {
      const response = await updateToggleStatusForEnquiry(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        navigate('/admin');
      }
    }
  }

  const handleDeleteEnquiry = async (id) => {
    try {
      const response = await deleteEnquiry(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        navigate('/admin');
      }
    }
  }

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };


  const columns = [
    {
      title: 'S.No',
      field: 'sno',
      render: (rowData) => rowData.tableData.id + 1, // Add 1 to start from 1
    },
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Mobile', field: 'mobile' },
    { title: 'Message', field: 'message' },
    {
      title: 'Updated at',
      field: 'updated_at',
      render: (rowData) => formatDate(rowData.updated_at),
    },
    {
      title: 'Created at',
      field: 'created_at',
      render: (rowData) => formatDate(rowData.created_at),
    },
    {
      title: 'Action',
      field: 'action',
      render: (rowData) => (
        <div>

          {rowData.status === 'Active' ? (
            <a
              className="collapse-item m-2"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleUserToggleStatus(rowData.id);
              }}
            >
              <i className="fa fa-thumbs-up text-primary" title="Active" />
            </a>
          ) : (
            <a
              className="collapse-item text-secondary m-2"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleUserToggleStatus(rowData.id);
              }}
            >
              <i className="fa fa-thumbs-down" title="Inactive" />
            </a>
          )}

          <a
            className="collapse-item"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteEnquiry(rowData.id);
            }}
          >
            <i className="fas fa-trash"></i>
          </a>

        </div>
      ),
    }
    // Add more columns as needed
  ];

  useEffect(() => {
    // Fetch data only on the initial render
    if (isFirstRender.current) {
      fetchData();
      isFirstRender.current = false;
    }
  }, []); // Empty dependency array ensures this runs only on the initial render

  useEffect(() => {
    // Log only when searchData length is zero
    if (searchData.length === 0 && searchQuery) {
      fetchData()
    }
  }, [searchData]);

  useEffect(() => {
    fetchData(); // Fetch data whenever page or size changes
  }, [size]);

  useEffect(() => {
    // Avoid actions on the first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Update searchData based on searchQuery
    if (searchQuery) {
      const filteredData = data.filter((item) => {
        const name = item.name ? item.name.toLowerCase() : '';
        const email = item.email ? item.email.toLowerCase() : '';
        const mobile = item.mobile ? item.mobile.toLowerCase() : '';
        const message = item.message ? item.message.toLowerCase() : '';

        return (
          name.includes(searchQuery.toLowerCase()) ||
          email.includes(searchQuery.toLowerCase()) ||
          mobile.includes(searchQuery.toLowerCase()) ||
          message.includes(searchQuery.toLowerCase())
        );
      });

      setSearchData(filteredData);
    }else {
      setSearchData([]);
      setPage(1);
    }
  }, [searchQuery, data]);




  return (
    <ThemeProvider theme={theme}>
      {/* Other components in your application */}
      <MaterialTable
        title="Enquiry List"
        data={data}
        columns={columns}
        options={{
          paging: true,
          pageSize: size,
          pageSizeOptions: [5, 10, 20, 50],
          actionsColumnIndex: -1,
        }}
        onChangePage={handlePageChange} // Pass the updated handler
        onChangeRowsPerPage={handlePageSizeChange}
        onSearchChange={handleSearchChange}
      />
    </ThemeProvider>
  );
};

export default EnquiryList;
