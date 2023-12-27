import { Divider, Table } from "antd";
import { useEffect, useState } from "react";
import { fetchFeaturedJobs } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const FeaturedJobs = () => {
  const defaultImage = "/user/images/netparamlogo.jpg";
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? description.slice(0, maxLength) + "...."
      : description;
  };
  const handlePageChange = (page) => {
    setPage(page);
  };
  const handlePageSizeChange = (current, pageSize) => {
    setSize(pageSize);
  };

  const columns = [
    {
      title: "Featured Jobs",
      dataIndex: "job_title",
      className: "mx-auto text-muted shadow fs-6",
      render: (text, record) => (
        <div
          className="services-hover hover-pointer"
          // onClick={() => navigate(`/users-basedOn-services/${record.title}`)}
        >
          <p className="text-muted mx-auto"> {record.company}</p>
          <img
            src={record.photo ? record.photo : defaultImage}
            className=""
            width="70"
            height={70}
          />
          <div className="text-muted">
            <b>Job Title : </b>
            {record.job_title}
          </div>
          <Divider />
          <div className="row">
          <p className="truncate-text-job text-muted ">
              {truncateDescription(record.description, 250)}
            </p>
           
            <Divider />
            <p className="text-muted m-0"><b>Address :  </b>{record.location}</p>
            {/* <button type="button" className="btn btn-primary btn-sm">Apply</button> */}
            <div className="row mt-4">
              <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                <button type="submit" className="btn btn-primary w-100">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];
  const fetchMyJobs = async () => {
    try {
      const response = await fetchFeaturedJobs();
      if (response && response.status === 200) {
        setDataSource(response.data.data);
        console.log(response.data.data);
        setTotalRows(response.data.data.length);
        setServerError("");
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  return (
    <div>
      {serverError && <span className="error">{serverError}</span>}
      <Table
        // title={()=>'Featured '}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          current: page,
          pageSize: size,
          total: totalRows,
          onChange: handlePageChange,
          onShowSizeChange: handlePageSizeChange,
        }}
        // onChange={handleTableChange}

        rowKey={(record) => record.id}
        // onChange={handleSearchChange}
      />
    </div>
  );
};
export default FeaturedJobs;
