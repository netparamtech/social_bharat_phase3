import React, { forwardRef, useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { deleteEnquiry, fetchAllEnquiries, updateToggleStatusForEnquiry } from '../../services/AdminService';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const theme = createTheme({
  // Your theme configuration
  direction: 'ltr', // Set the direction to left-to-right (ltr) or right-to-left (rtl)
});

const EnquiryList = () => {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

  const navigate = useNavigate();

  const handlePageChange = newPage => {
    setPage(newPage+1);
  };

  const handlePageSizeChange = (pageSize) => {
    setSize(pageSize);
  };

  const handleSearchChange = (query) => {
    setPage(1); // Reset page to 1 when search query changes
    setSearchQuery(query);

    if (query.length > 3) {
      fetchData();
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetchAllEnquiries(page, size,searchQuery);

      setData(response.data.data);

      setTotalRows(response.data.totalRecords);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        navigate('/admin');
      }
    }
  };


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

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
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
    fetchData();
  }, [page, size]);

  return (
    <ThemeProvider theme={theme}>
    <MaterialTable
     icons={tableIcons}
      title="Enquiry List"
      data={data}
      columns={columns}
      options={{
        paging: true,
        pageSize: size,
        pageSizeOptions: [5, 10, 20, 50],
        actionsColumnIndex: -1,
        emptyRowsWhenPaging: false, // Disable empty rows when paging
      }}
      onChangePage={handlePageChange} // Pass the updated handler
      onChangeRowsPerPage={handlePageSizeChange}
      onSearchChange={handleSearchChange}
    />
    </ThemeProvider>
  );
};

export default EnquiryList;
