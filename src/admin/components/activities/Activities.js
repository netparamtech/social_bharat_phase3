import React, { useEffect, useState } from "react";
import { Image, Table } from "antd";
import {
  deleteActivity,
  fetchAllActivities,
  fetchEvents,
  toggleActivityPostStatus,
  updateToggleFeaturedForEvent,
  updateToggleStatusForEvent,
} from "../../services/AdminService";
import { useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";

const Activities = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [defaultImage, setDefaultImage] = useState("img/de-default-1.jpeg");

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePageSizeChange = (current, pageSize) => {
    setSize(pageSize);
  };

  const handleSearchChange = (query) => {
    setPage(1);
    setSearchQuery(query);
  };

  const fetchData = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllActivities(searchQuery, page, size);

      setData(response.data.data.activities);

      setTotalRows(response.data.data.totalRowsAffected);
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate("/server/error", { state: { errorMessage } });
      }
    }
  };

  const handleActivityToggleStatus = async (id) => {
    try {
      const response = await toggleActivityPostStatus(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate("/server/error", { state: { errorMessage } });
      }
    }
  };

  const handleEventToggleFeatured = async (id) => {
    try {
      const response = await updateToggleFeaturedForEvent(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate("/server/error", { state: { errorMessage } });
      }
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const response = await deleteActivity(id);
      if (response && response.status === 200) {
        fetchData();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate("/server/error", { state: { errorMessage } });
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
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      render: (text, record, index) => index + 1,
      width: 100,
    },

    {
      title: "Posted By",
      dataIndex: "name",
      width: 300,
      width: 200,
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => (
        <div className="description-cell">
          {record.title}
        </div>
      ),
      ellipsis: true,
    },
    {
      title: "Activitie(s)",
      dataIndex: "photo",
      render: (text, record) => (
        <div>
          {record.photo && Array.isArray(record.photo) ? (
            record.photo.map((item, value) => (
              <Image
                src={item}
                width={50}
                height={50}
                className="p-1"
                style={{
                  objectFit: "contain",
                }}
              ></Image>
            ))
          ) : (
            <Image src={record.photo} width={100} />
          )}
        </div>
      ),
      sorter: true,
      sortDirections: ["asc", "desc"],
      width: 350,
    },

    {
      title: "Description",
      dataIndex: "DESCRIPTION",
      render: (text, record) => (
        <div className="description-cell">
          {record.DESCRIPTION}
        </div>
      ),
      ellipsis: true,
    },
    

    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) =>
        record.STATUS === "true" ? (
          <a
            className="collapse-item m-2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleActivityToggleStatus(record.id);
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
              handleActivityToggleStatus(record.id);
            }}
          >
            <i className="fa fa-thumbs-down" title="Inactive" />
          </a>
        ),
      sorter: true,
      sortDirections: ["asc", "desc"],
      width: 100,
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="">
          <a
            className="collapse-item"
            onClick={() => navigate(`/users/view/${record.user_id}`)}
          >
            <i className="fas fa-eye"></i>
          </a>

          <a
            className="collapse-item m-2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteEvent(record.id);
            }}
          >
            <i className="fas fa-trash"></i>
          </a>
        </div>
      ),
      with: 200,
    },
    // Rest of the columns definition
  ];

  useEffect(() => {
    fetchData();
  }, [page, size, searchQuery, sortField, sortOrder]);

  return (
    <div>
      <Search
        placeholder="Search"
        allowClear
        onSearch={handleSearchChange}
        style={{ marginBottom: 20, width: 200 }}
      />

      <Table
        title={() => "Activities"} // Set the title to 'Enquiries'
        dataSource={data}
        columns={columns}
        pagination={{
          current: page,
          pageSize: size,
          total: totalRows,
          onChange: handlePageChange,
          onShowSizeChange: handlePageSizeChange,
        }}
        rowKey={(record) => record.id}
        // onChange={handleSearchChange}
      />
    </div>
  );
};

export default Activities;
