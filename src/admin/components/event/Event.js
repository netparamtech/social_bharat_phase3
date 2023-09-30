import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  deleteEventByID,
  fetchEvents,
  updateToggleStatusForEvent,
} from "../../services/AdminService";
import { useNavigate } from "react-router-dom";

const Event = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState("");
  const [totalRows, setTotalRows] = useState(0);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetchEvents(page, size);

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

  const handleSearchClick = () => {
    fetchData();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
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

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1 + (page - 1) * size,
    },

    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },

    {
      name: "Venue",
      selector: (row) => row.venue,
      sortable: true,
    },

    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
    },

    {
      name: "State",
      selector: (row) => row.state || "N/A",
      sortable: true,
    },

    {
      name: "Country",
      selector: (row) => row.country || "N/A",
      sortable: true,
    },

    {
      name: "Thumb Image",
      selector: (row) => row.thumb_image || "N/A",
      sortable: true,
    },
    
    {
      name: "Banner Image",
      selector: (row) => row.banner_image || "N/A",
      sortable: true,
    },
    {
      name: "Start Datetime",
      selector: (row) => formatDateTime(row.start_datetime) || "N/A",
      sortable: true,
    },
    {
      name: "End Datetime",
      selector: (row) => formatDateTime(row.end_datetime) || "N/A",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "User Id",
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email || "N/A",
      sortable: true,
    },
    {
      name: "Photo",
      selector: (row) => row.photo || "N/A",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <a
            className="collapse-item"
            href=""
            onClick={() => navigate(`/events/view/${row.id}`)}
          >
            <i className="fas fa-eye"></i>
          </a>
          {row.status === "Active" ? (
            <a
              className="collapse-item m-2"
              href=""
              onClick={(e) => {
                e.preventDefault();
                handleEventToggleStatus(row.id);
              }}
            >
              <i className="fa fa-thumbs-up text-primary" title="Active" />
            </a>
          ) : (
            <a
              className="collapse-item text-secondary m-2"
              href=""
              onClick={(e) => {
                e.preventDefault();
                handleEventToggleStatus(row.id);
              }}
            >
              <i className="fa fa-thumbs-down" title="Inactive" />
            </a>
          )}

          <a
            className="collapse-item"
            href=""
            onClick={() => handleDeleteEvent(row.id)}
          >
            <i className="fas fa-trash"></i>
          </a>
        </div>
      ),
    },
    // ... other column definitions
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
  };

  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search input changes
  const handleSearch = async (query) => {
    setSearchQuery(query);
    setPage(1); // Reset to the first page when searching

    // Fetch data for the first page with the new search query
    await fetchData();

    // Check if the searched user exists on the current page
    const userExistsOnCurrentPage = filteredData.some(
      (row) =>
        Object.values(row).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        ) || row.message.toLowerCase().includes(searchQuery.toLowerCase()) // Include community in the search
    );

    // If the user is not found on the current page and there are more pages, increment the page and search again
    if (!userExistsOnCurrentPage && page < Math.ceil(totalRows / size)) {
      setPage(page + 1);
      await fetchData(); // Fetch data for the next page

      // Filter the newly fetched data for the next page
      const newFilteredData = data.filter((row) =>
        Object.values(row).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

      setData([...filteredData, ...newFilteredData]); // Update filteredData
    }
  };

  // Function to filter data based on the search query
  const filteredData = data.filter(
    (row) =>
      Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      ) || row.message.toLowerCase().includes(searchQuery.toLowerCase()) // Include community in the search
  );

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

  useEffect(() => {
    fetchData();
  }, [page, size]);

  return (
    <div>
      <DataTable
        title="Event List"
        columns={columns}
        data={filteredData} // Use filteredData instead of data
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={(newPage) => handlePageChange(newPage)}
        onChangeRowsPerPage={(newSize) => setSize(newSize)}
        customStyles={customStyles}
        subHeader // Enable the subHeader
        subHeaderComponent={
          // Add a search input for the entire table
          <form className="form-inline mr-auto w-100 navbar-search">
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-light border-0 small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => handleSearchClick()}
                >
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
        }
      />
    </div>
  );
};

export default Event;
