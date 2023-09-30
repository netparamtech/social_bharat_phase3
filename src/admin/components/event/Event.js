import React, { forwardRef, useEffect, useState } from "react";
import MaterialTable from "material-table";
import {
  deleteEventByID,
  fetchAllUsers,
  fetchEvents,
  updateToggleStatus,
  updateToggleStatusForEvent,
} from "../../services/AdminService";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const theme = createTheme({
  // Your theme configuration
  direction: "ltr", // Set the direction to left-to-right (ltr) or right-to-left (rtl)
});

const Event = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

  const [defaultImage, setDefaultImage] = useState("img/de-default-1.jpeg");

  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    setPage(newPage + 1);
  };

  const handlePageSizeChange = (pageSize) => {
    setSize(pageSize);
  };

  const handleSearchChange = (query) => {
    setPage(1); // Reset page to 1 when search query changes
    setSearchQuery(query);
  };

  const fetchData = async () => {
    console.log(searchQuery);
    try {
      const response = await fetchEvents(page, size, searchQuery);

      setData(response.data.data);

      setTotalRows(response.data.totalRecords);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        navigate("/admin");
      }
    }
  };

  const handleEventToggleStatus = async (id) => {
    try {
      const response = await updateToggleStatusForEvent(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        navigate("/admin");
      }
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const response = await deleteEventByID(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        navigate("/admin");
      }
    }
  };

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(undefined, options);
  };

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
      }
      return `${days} day ago`;
    }
  };

  const columns = [
    {
      title: "S.No",
      field: "sno",
      render: (rowData) => rowData.tableData.id + 1, // Add 1 to start from 1
    },
    {
      title: "Photo",
      field: "photo",
      render: (rowData) => (
        <a href={rowData.photo} target="_blank">
          <img
            src={rowData.photo ? rowData.photo : defaultImage}
            alt={rowData.name}
            title={rowData.name}
            className="small-img-user-list"
          />
        </a>
      ),
    },
    { title: "Name", field: "name",cellStyle: {
      minWidth: 200,
      maxWidth: 200
    } },
    { title: "Email", field: "email",cellStyle: {
      minWidth: 200,
      maxWidth: 200
    } },
    { title: "Title", field: "title",cellStyle: {
      minWidth: 200,
      maxWidth: 200
    } },
    { title: "Venue", field: "venue" },
    { title: "City", field: "city" },
    { title: "State", field: "state" },
    { title: "Country", field: "country" },
    {
      title: "Thumb Image",
      field: "thumb_image",
      render: (rowData) => (
        <a href={rowData.thumb_image} target="_blank">
          <img
            src={rowData.thumb_image ? rowData.thumb_image : defaultImage}
            alt="Thumb Image"
            title="Thumb Image"
            className="small-img-user-list"
          />
        </a>
      ),
      cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }
    },

    {
      title: "Banner Image",
      field: "banner_image",
      render: (rowData) => (
        <a href={rowData.banner_image} target="_blank">
          <img
            src={rowData.banner_image ? rowData.banner_image : defaultImage}
            alt="Thumb Image"
            title="Thumb Image"
            className="small-img-user-list"
          />
        </a>
      ),
      cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }
    },
    {
      title: "Start Date Time",
      field: "start_datetime",
      render: (rowData) => formatDate(rowData.start_datetime),
      cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }
    },
    {
      title: "End Date Time",
      field: "end_datetime",
      render: (rowData) => formatDate(rowData.end_datetime),
      cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }
    },
    { title: "Status", field: "status",
    render: (rowData) => (
<>
      {rowData.status === "Active" ? (
        <a
          className="collapse-item m-2"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleEventToggleStatus(rowData.id);
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
            handleEventToggleStatus(rowData.id);
          }}
        >
          <i className="fa fa-thumbs-down" title="Inactive" />
        </a>
      )}
      </>
    )
  },
    {
      title: "Action",
      field: "action",
      render: (rowData) => (
        <div>
          <a
            className="collapse-item"
            href=""
            onClick={() => navigate(`/events/view/${rowData.id}`)}
          >
            <i className="fas fa-eye"></i>
          </a>

          <a
            className="collapse-item m-2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteEvent(rowData.id);
            }}
          >
            <i className="fas fa-trash"></i>
          </a>
        </div>
      ),
      cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }
    },
    // Add more columns as needed
  ];

  useEffect(() => {
    fetchData();
  }, [page, size, searchQuery]);

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        icons={tableIcons}
        title="Events"
        data={data}
        columns={columns}
        options={{
          paging: true,
          pageSize: size,
          pageSizeOptions: [5, 10, 20, 50],
          actionsColumnIndex: -1,
          emptyRowsWhenPaging: false, // Disable empty rows when paging
        }}
        options={{
          headerStyle: {
            backgroundColor: '#ffff',
            color: 'blaclk',
            fontWeight: 'bold',
            fontSize:'12px'
          },
          rowStyle:{
            fontSize:'12px'
          },
          
          
        }}
        
        onChangePage={handlePageChange} // Pass the updated handler
        onChangeRowsPerPage={handlePageSizeChange}
        onSearchChange={handleSearchChange}
      />
    </ThemeProvider>
  );
};

export default Event;
